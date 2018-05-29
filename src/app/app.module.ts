import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {GalleryModule} from './gallery/gallery.module';
import {RbSortableListModule} from './rb-sortable-list/rb-sortable-list.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GalleryModule,
    RbSortableListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
