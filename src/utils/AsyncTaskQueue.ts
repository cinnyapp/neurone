/**
 * Executes async tasks sequentially in FIFO order.
 */
export class AsyncTaskQueue {
  /**
   * Internal promise chain representing the queue.
   */
  private queue: Promise<void> = Promise.resolve();

  /**
   * Adds a task to the queue.
   */
  enqueue<T>(task: () => Promise<T>): Promise<T> {
    const result = this.queue.then(task);

    this.queue = result.then(
      () => undefined,
      () => undefined,
    );

    return result;
  }
}
