import { Entry } from "./Entry";
import { WriteObserverBridge } from "./WriteObserverBridge";
import { WriteOperation } from "./type";

describe("WriteObserverBridge", () => {
  let bridge: WriteObserverBridge<"id", Entry<"id">>;
  let mockObserver1: jest.Mock;
  let mockObserver2: jest.Mock;

  beforeEach(() => {
    bridge = new WriteObserverBridge<"id", Entry<"id">>();
    mockObserver1 = jest.fn();
    mockObserver2 = jest.fn();
  });

  it("should call observers when onWrite is triggered", () => {
    bridge.observe(mockObserver1);

    const keys: string[] = ["key1", "key2"];

    bridge.onWrite(WriteOperation.PUT, keys);

    // Check that mockObserver1 was called with the correct arguments
    expect(mockObserver1).toHaveBeenCalledWith(WriteOperation.PUT, keys);
    expect(mockObserver1).toHaveBeenCalledTimes(1);
  });

  it("should call multiple observers when onWrite is triggered", () => {
    bridge.observe(mockObserver1);
    bridge.observe(mockObserver2);

    const keys: string[] = ["key1"];

    bridge.onWrite(WriteOperation.DELETE, keys);

    // Check that both mockObservers were called
    expect(mockObserver1).toHaveBeenCalledWith(WriteOperation.DELETE, keys);
    expect(mockObserver2).toHaveBeenCalledWith(WriteOperation.DELETE, keys);
    expect(mockObserver1).toHaveBeenCalledTimes(1);
    expect(mockObserver2).toHaveBeenCalledTimes(1);
  });

  it("should stop calling an observer after it is disconnected", () => {
    const disconnect = bridge.observe(mockObserver1);

    const keys: string[] = ["key1"];

    bridge.onWrite(WriteOperation.DELETE, keys);
    expect(mockObserver1).toHaveBeenCalledTimes(1);

    // Disconnect observer
    disconnect();

    bridge.onWrite(WriteOperation.DELETE, keys);

    // Check that observer1 is no longer called
    expect(mockObserver1).toHaveBeenCalledTimes(1);
  });

  it("should not call removed observers after onWrite", () => {
    const disconnect1 = bridge.observe(mockObserver1);
    bridge.observe(mockObserver2);

    const keys: string[] = ["key1"];

    bridge.onWrite(WriteOperation.PUT, keys);
    expect(mockObserver1).toHaveBeenCalledTimes(1);
    expect(mockObserver2).toHaveBeenCalledTimes(1);

    // Remove mockObserver1 and trigger again
    disconnect1();
    bridge.onWrite(WriteOperation.PUT, keys);

    // Ensure only mockObserver2 gets called
    expect(mockObserver1).toHaveBeenCalledTimes(1); // still only 1 time
    expect(mockObserver2).toHaveBeenCalledTimes(2); // now called twice
  });
});
