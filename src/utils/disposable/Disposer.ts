import { Disposable } from "./Disposable";

export class Disposer {
  private readonly disposables: Set<Disposable> = new Set();

  collect(...disposables: Disposable[]) {
    disposables.forEach((disposable) => this.disposables.add(disposable));
  }

  run() {
    this.disposables.forEach((disposable) => {
      disposable.dispose();
    });
    this.disposables.clear();
  }
}
