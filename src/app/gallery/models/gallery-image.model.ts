export type ImageLoadStatus = 'loading' | 'success' | 'failed';

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface LocalGalleryImage extends GalleryImage {
  status?: ImageLoadStatus;
}
