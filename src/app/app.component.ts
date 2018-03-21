import { Component } from '@angular/core';
import {GalleryImage} from './gallery/models/gallery-image.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  images: GalleryImage[] = [
    {
      src: 'https://cdn.rentberry.com/cache/440x440/media/apartments/9838501a-2a9c-11e8-af53-0242ac110005.jpeg?s=6b5e052b439d66a604b838b4c7a7fdb8a0cd46a99e7e13157bb9e0aa211a3344',
      alt: 'pixel'
    },
    {
      src: 'https://cdn.rentberry.com/cache/440x440/media/apartments/9838501a-2a9c-11e8-af53-0242ac110005.jpeg?s=6b5e052b439d66a604b838b4c7a7fdb8a0cd46a99e7e13157bb9e0aa211a3344',
      alt: 'pixel'
    },
    {
      src: 'https://cdn.rentberry.com/cache/440x440/media/apartmsdcsdcents/9838501a-2a9c-11e8-af53-0242ac110005.jpeg?s=6b5e052b439d66a604b838b4c7a7fdb8a0cd46a99e7e13157bb9e0aa211a3344',
      alt: 'pixel'
    },
    {
      src: 'https://cdn.rentberry.com/cache/440x440/media/apartments/9838501a-2a9c-11e8-af53-0242ac110005.jpeg?s=6b5e052b439d66a604b838b4c7a7fdb8a0cd46a99e7e13157bb9e0aa211a3344',
      alt: 'pixel'
    },
    {
      src: 'https://cdn.rentberry.com/cache/440x440/media/apartments/9838501a-2a9c-11e8-af53-0242ac110005.jpeg?s=6b5e052b439d66a604b838b4c7a7fdb8a0cd46a99e7e13157bb9e0aa211a3344',
      alt: 'pixel'
    },
    {
      src: 'https://cdn.rentberry.com/cache/440x440/media/apartments/9838501a-2a9c-11e8-af53-0242ac110005.jpeg?s=6b5e052b439d66a604b838b4c7a7fdb8a0cd46a99e7e13157bb9e0aa211a3344',
      alt: 'pixel'
    },
    {
      src: 'https://cdn.rentberry.com/cache/440x440/media/apartments/9838501a-2a9c-11e8-af53-0242ac110005.jpeg?s=6b5e052b439d66a604b838b4c7a7fdb8a0cd46a99e7e13157bb9e0aa211a3344',
      alt: 'pixel'
    },
    {
      src: 'https://cdn.rentberry.com/cache/440x440/media/apartments/9838501a-2a9c-11e8-af53-0242ac110005.jpeg?s=6b5e052b439d66a604b838b4c7a7fdb8a0cd46a99e7e13157bb9e0aa211a3344',
      alt: 'pixel'
    },
    {
      src: 'https://cdn.rentberry.com/cache/440x440/media/apartments/9838501a-2a9c-11e8-af53-0242ac110005.jpeg?s=6b5e052b439d66a604b838b4c7a7fdb8a0cd46a99e7e13157bb9e0aa211a3344',
      alt: 'pixel'
    }
  ];
}
