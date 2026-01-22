import { Disposable } from "./Disposable";

export type DisposeFn = () => void;
export class Disposer {
  private readonly disposables: Set<Disposable | DisposeFn> = new Set();

  collect(...disposables: Array<Disposable | DisposeFn>) {
    disposables.forEach((disposable) => this.disposables.add(disposable));
  }

  run() {
    this.disposables.forEach((disposable) => {
      if (typeof disposable === "function") {
        disposable();
        return;
      }
      disposable.dispose();
    });
    this.disposables.clear();
  }
}
