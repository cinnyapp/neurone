import { MatrixError } from "../matrix-request";
import { SyncOK } from "../matrix/client/v3/sync";

export enum SyncLoopStatus {
  Idle = "Idle",
  Started = "Started",
  Running = "Running",
  Stopped = "Stopped",
}

export type SyncListenerState =
  | {
      status: SyncLoopStatus.Idle;
    }
  | {
      status: SyncLoopStatus.Started;
    }
  | {
      status: SyncLoopStatus.Running;
    }
  | {
      status: SyncLoopStatus.Stopped;
      error: Error | MatrixError;
    };

export type SyncListenerOptions = {
  onStateChange: (state: SyncListenerState) => void;
  onData: (data: SyncOK) => void;
};
