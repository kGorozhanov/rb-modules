import {LocalGalleryImage} from '../models/gallery-image.model';

export function loadImage(image: LocalGalleryImage) {
  let i = 0;
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = image.src;
    img.onload = () => resolve();
    img.onerror = () => {
      if (++i < 3) {
        setTimeout(() => img.src = image.src, 1000);
      } else {
        reject();
      }
    };
  });
}
