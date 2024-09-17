import { MatrixError } from "../matrix-request";
import { Presence } from "../matrix/client/v3/presence/status.type";
import { SyncOK } from "../matrix/client/v3/sync";

export interface SyncListener {
  onRequest: () => void;
  onRequestError: (error: Error) => void;
  onResponseError: (error: MatrixError) => void;
  onResponseData: (data: SyncOK) => void;
}

export interface SyncLoop {
  setPresence: (presence: Presence) => void;

  start: (listener: SyncListener) => void;
  stop: () => void;
}

export type SyncLoopOptions = {
  timeout?: number;
  since?: string;
  fullState?: boolean;
  filter?: string;
};
