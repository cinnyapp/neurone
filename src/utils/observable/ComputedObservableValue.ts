import { ObservableValue } from "./ObservableValue";

export class ComputedObservableValue<T> extends ObservableValue<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(compute: () => T, deps: ObservableValue<any>[]) {
    const publisherKey = Math.random().toString();
    super(compute(), publisherKey);

    const handleRecompute = () => {
      const newValue = compute();
      if (newValue === this.read) return;
      super.publish(publisherKey, newValue);
    };

    deps.forEach((dep) => dep.subscribe(handleRecompute));

    super.onDispose(publisherKey, () => {
      deps.forEach((dep) => dep.unsubscribe(handleRecompute));
    });
  }
}
