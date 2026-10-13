/*
Cinny Project
Copyright 2024-present Ajay Bura
SPDX-License-Identifier: Apache-2.0
https://cinny.in

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { Entry } from "./Entry";
import { WriteObserverBridge } from "./WriteObserverBridge";
import { WriteObserver } from "./type";

describe("WriteObserverBridge", () => {
  type TestEntry = Entry<"id">;

  let bridge: WriteObserverBridge<"id", never, TestEntry>;
  let observer1: WriteObserver<"id", never, TestEntry>;
  let observer2: WriteObserver<"id", never, TestEntry>;

  let onPut1: jest.Mock;
  let onDelete1: jest.Mock;
  let onPut2: jest.Mock;
  let onDelete2: jest.Mock;

  beforeEach(() => {
    bridge = new WriteObserverBridge<"id", never, TestEntry>();

    onPut1 = jest.fn();
    onDelete1 = jest.fn();
    onPut2 = jest.fn();
    onDelete2 = jest.fn();

    observer1 = {
      onPut: onPut1,
      onDelete: onDelete1,
    };

    observer2 = {
      onPut: onPut2,
      onDelete: onDelete2,
    };
  });

  it("calls observer onPut when onPut is triggered", () => {
    bridge.observe(observer1);

    const entries = [{ id: "1" }] as TestEntry[];

    bridge.onPut(entries);

    expect(onPut1).toHaveBeenCalledTimes(1);
    expect(onPut1).toHaveBeenCalledWith(entries);
    expect(onDelete1).not.toHaveBeenCalled();
  });

  it("calls observer onDelete when onDelete is triggered", () => {
    bridge.observe(observer1);

    const keys = ["1"];

    bridge.onDelete(keys);

    expect(onDelete1).toHaveBeenCalledTimes(1);
    expect(onDelete1).toHaveBeenCalledWith(keys);
    expect(onPut1).not.toHaveBeenCalled();
  });

  it("calls multiple observers", () => {
    bridge.observe(observer1);
    bridge.observe(observer2);

    const entries = [{ id: "1" }] as TestEntry[];

    bridge.onPut(entries);

    expect(onPut1).toHaveBeenCalledTimes(1);
    expect(onPut2).toHaveBeenCalledTimes(1);
  });

  it("stops calling observer after disconnect", () => {
    const disconnect = bridge.observe(observer1);

    const entries = [{ id: "1" }] as TestEntry[];

    bridge.onPut(entries);
    expect(onPut1).toHaveBeenCalledTimes(1);

    disconnect();

    bridge.onPut(entries);
    expect(onPut1).toHaveBeenCalledTimes(1); // unchanged
  });

  it("only calls remaining observers after one is removed", () => {
    const disconnect1 = bridge.observe(observer1);
    bridge.observe(observer2);

    const keys = ["1"];

    bridge.onDelete(keys);
    expect(onDelete1).toHaveBeenCalledTimes(1);
    expect(onDelete2).toHaveBeenCalledTimes(1);

    disconnect1();

    bridge.onDelete(keys);
    expect(onDelete1).toHaveBeenCalledTimes(1);
    expect(onDelete2).toHaveBeenCalledTimes(2);
  });
});
