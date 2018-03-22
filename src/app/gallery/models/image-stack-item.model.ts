export class ImageStackItem {
  promise: Promise<boolean>;
  resolve: Function;
  reject: Function;

  constructor(public src: string) {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}
