import {
  SyncListenerOptions,
  SyncListenerState,
  SyncLoopStatus,
} from "./SyncListener.type";
import { SyncListener } from "./SyncLoop.type";

export const makeSyncListener = (
  initialState: SyncListenerState,
  options: SyncListenerOptions,
): SyncListener => {
  let state: SyncListenerState = initialState;

  const syncListener: SyncListener = {
    onRequest() {
      if (state.status !== SyncLoopStatus.Running) {
        state = {
          status: SyncLoopStatus.Started,
        };
        options.onStateChange(state);
      }
    },
    onRequestError(error) {
      state = {
        status: SyncLoopStatus.Stopped,
        error: error,
      };
      options.onStateChange(state);
    },
    onResponseData(data) {
      options.onData(data);
      if (state.status !== SyncLoopStatus.Running) {
        state = {
          status: SyncLoopStatus.Running,
        };
        options.onStateChange(state);
      }
    },
    onResponseError(error) {
      state = {
        status: SyncLoopStatus.Stopped,
        error: error,
      };
      options.onStateChange(state);
    },
  };

  return syncListener;
};
