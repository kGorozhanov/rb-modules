import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, PLATFORM_ID} from '@angular/core';
import {GalleryImage, ImageLoadStatus, LocalGalleryImage} from './models/gallery-image.model';
import {loadImage} from './utils/image-loader';
import {isPlatformServer} from '@angular/common';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('image', [
      transition('* => void', animate(300, style({opacity: 0}))),
      transition('void => *', [
        style({opacity: 0}),
        animate(300, style({opacity: 1}))
      ])
    ])
  ]
})
export class GalleryComponent {
  localImages: LocalGalleryImage[];
  private isServer: boolean;

  private get prevIndex(): number {
    return this.selectedIndex - 1 === -1 ? this.localImages.length - 1 : this.selectedIndex - 1;
  }

  private get nextIndex(): number {
    return this.selectedIndex + 1 === this.localImages.length ? 0 : this.selectedIndex + 1;
  }

  selectedIndex: number;
  @Input() defaultImage: string;

  @Input()
  set images(value: GalleryImage[]) {
    this.localImages = value;
    this.selectedIndex = 0;
    this.changeDetectorRef.markForCheck();
    if (!this.localImages[this.selectedIndex]) {
      return;
    }
    if (this.isServer) {
      this.updateImageLoadStatus(this.selectedIndex, 'success');
    } else {
      this.loadNextImages();
    }
  }

  constructor(private changeDetectorRef: ChangeDetectorRef, @Inject(PLATFORM_ID) platformId) {
    this.isServer = isPlatformServer(platformId);
  }

  updateSelectedIndex(next: boolean) {
    this.selectedIndex = next ? this.nextIndex : this.prevIndex;
    this.changeDetectorRef.markForCheck();
    this.loadNextImages();
  }

  private loadNextImages() {
    const indexes = [this.selectedIndex];
    if (this.nextIndex !== this.selectedIndex) {
      indexes.push(this.nextIndex);
    }
    if (indexes.indexOf(this.prevIndex)) {
      indexes.push(this.prevIndex);
    }
    indexes
      .filter(i => !this.localImages[i].status)
      .forEach(i => {
        this.updateImageLoadStatus(i, 'loading');
        loadImage(this.localImages[i])
          .then(() => this.updateImageLoadStatus(i, 'success'))
          .catch(() => this.updateImageLoadStatus(i, 'failed'));
      });
  }

  private updateImageLoadStatus(index: number, status: ImageLoadStatus) {
    this.localImages = [
      ...this.localImages.slice(0, index),
      {
        ...this.localImages[index],
        status
      },
      ...this.localImages.slice(index + 1)
    ];
    this.changeDetectorRef.markForCheck();
  }
}
