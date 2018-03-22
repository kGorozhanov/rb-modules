import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, PLATFORM_ID} from '@angular/core';
import {GalleryImage, ImageLoadStatus, LocalGalleryImage} from './models/gallery-image.model';
import {isPlatformServer} from '@angular/common';
import {ImageLoadService} from './services/image-load.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  prevSelectedIndex: number;
  @Input() defaultImage: string;

  @Input()
  set images(value: GalleryImage[]) {
    this.localImages = value;
    this.selectedIndex = 0;
    this.prevSelectedIndex = 0;
    if (!this.localImages[this.selectedIndex]) {
      return;
    }
    if (this.isServer) {
      this.updateImageLoadStatus(this.selectedIndex, 'success');
    } else {
      this.loadNextImages();
    }
  }

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private imageLoadService: ImageLoadService,
              @Inject(PLATFORM_ID) platformId) {
    this.isServer = isPlatformServer(platformId);
  }

  updateSelectedIndex(next: boolean, event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.prevSelectedIndex = this.selectedIndex;
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
        this.imageLoadService.load(this.localImages[i].src)
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
