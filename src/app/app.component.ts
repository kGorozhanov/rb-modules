import {Component} from '@angular/core';
import {GalleryImage} from './gallery/models/gallery-image.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  images: GalleryImage[] = [
    {
      src: 'https://cdn.rentberry.com/cache/440x440/media/apartments/abf9458e-c3ac-11e7-9560-350716dbeb01.jpeg?s=135425e7a47ed2f4214985831f86a177f072a29bdf33dce95a354406e5d57261',
      alt: 'pixel'
    },
    {
      src: 'https://cdn.rentberry.com/cache/440x440/media/apartments/927a6b86-c935-11e7-8b43-475609e839b7.jpeg?s=981e714ae7932e1ac0039ae72a0905055b985a9c1154f5244e6da7e9585c1197',
      alt: 'pixel'
    },
    {
      src: 'https://cdn.rentberry.com/cache/440x440/media/apartmendfvts/bdb59ac2-2840-11e8-8041-0242ac110006.jpeg?s=e3058748201b06e81ae1282ecb7e90e61f3c309b0e9342122954ae9ec2385a8c',
      alt: 'pixel'
    },
    {
      src: 'https://cdn.rentberry.com/cache/440x440/media/apartments/0e26daa6-cb95-11e7-8cee-1534b82c9247.jpeg?s=d289d66d5bfb854ee9a022a2d6a9abd59dfc6fce9a97fdd97d601e14ba9520a3',
      alt: 'pixel'
    },
    {
      src: 'https://cdn.rentberry.com/cache/440x440/media/apartments/31a99962-14ad-11e8-98f7-0242ac110005.jpeg?s=def250f467f6a83cd7151125742bdf3aeb922a5e4ac3f4b44271db4638622b6b',
      alt: 'pixel'
    }
  ];
  galer: number[];
  constructor() {
    this.galer = [];
    for(let i = 0; i < 100; i++) {
      this.galer.push(i);
    }
  }
}
