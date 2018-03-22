import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GalleryComponent} from './gallery.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ImageLoadService} from './services/image-load.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  declarations: [GalleryComponent],
  exports: [GalleryComponent],
  providers: [ImageLoadService]
})
export class GalleryModule {
}
