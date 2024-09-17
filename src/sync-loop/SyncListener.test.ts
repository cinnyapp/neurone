import { MatrixError } from "../matrix-request";
import { SyncOK } from "../matrix/client/v3/sync";
import { makeSyncListener } from "./SyncListener";
import { SyncListenerState, SyncLoopStatus } from "./SyncListener.type";

test("test sync listener state change", () => {
  return new Promise((resolve) => {
    let syncState: SyncListenerState = {
      status: SyncLoopStatus.Idle,
    };

    const syncListener = makeSyncListener(syncState, {
      onData() {},
      onStateChange(state) {
        syncState = state;
      },
    });

    expect(syncState).toEqual({
      status: SyncLoopStatus.Idle,
    });

    syncListener.onRequest();
    expect(syncState).toEqual({
      status: SyncLoopStatus.Started,
    });

    const error = new Error("SomeError");
    syncListener.onRequestError(error);
    expect(syncState).toEqual({
      status: SyncLoopStatus.Stopped,
      error,
    });

    syncListener.onResponseData({ next_batch: "xyz" });
    expect(syncState).toEqual({
      status: SyncLoopStatus.Running,
    });

    const mxError: MatrixError = {
      status: 401,
      url: "",
      data: {},
    };
    syncListener.onResponseError(mxError);
    expect(syncState).toEqual({
      status: SyncLoopStatus.Stopped,
      error: mxError,
    });

    resolve(undefined);
  });
});

test("test sync listener data arrive", () => {
  return new Promise((resolve) => {
    let syncData: SyncOK | undefined;

    const syncListener = makeSyncListener(
      {
        status: SyncLoopStatus.Idle,
      },
      {
        onData(data) {
          syncData = data;
        },
        onStateChange() {},
      },
    );

    syncListener.onRequest();
    expect(syncData).toEqual(undefined);

    syncListener.onResponseData({
      next_batch: "xyz",
    });
    expect(syncData).toEqual({
      next_batch: "xyz",
    });

    resolve(true);
  });
});
