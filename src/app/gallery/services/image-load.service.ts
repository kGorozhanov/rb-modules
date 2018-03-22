import {Injectable} from '@angular/core';
import {ImageStackItem} from '../models/image-stack-item.model';

const noop = () => {
};

@Injectable()
export class ImageLoadService {
  private loaders: any[] = [];
  private imageStack: ImageStackItem[] = [];
  private retryDelay = 1000;

  private get freeLoader() {
    return this.loaders.find(loader => !loader.working);
  }

  constructor() {
    this.createLoaders(10);
  }

  load(src: string): Promise<boolean> {
    const stackItem = new ImageStackItem(src);
    const loader = this.freeLoader;
    if (loader) {
      this.startLoad(loader, stackItem);
    } else {
      this.imageStack.push(stackItem);
    }
    return stackItem.promise;
  }

  private createLoaders(count: number) {
    for (let i = count; i > 0; i--) {
      this.loaders.push({
        working: false,
        img: new Image()
      });
    }
  }

  private startLoad(loader, stackItem: ImageStackItem) {
    let i = 0;
    loader.working = true;
    loader.img.src = stackItem.src;
    loader.img.onload = () => {
      stackItem.resolve(true);
      this.onLoadEnd(loader);
    };
    loader.img.onerror = () => {
      if (++i < 3) {
        setTimeout(() => loader.img.src = stackItem.src, this.retryDelay);
      } else {
        stackItem.reject(false);
        this.onLoadEnd(loader);
      }
    };
  }

  private onLoadEnd(loader) {
    const stackItem = this.imageStack.shift();
    if (stackItem) {
      this.startLoad(loader, stackItem);
    } else {
      loader.working = false;
      loader.img.onload = noop;
      loader.img.onerror = noop;
    }
  }
}
