import to from "await-to-js";
import { MatrixRequest } from "../matrix-request/types";
import { parseMatrixResp } from "../matrix-request/utils";
import { Presence } from "../matrix/client/v3/presence/status.type";
import { sync } from "../matrix/client/v3/sync/index";
import { SyncOK } from "../matrix/client/v3/sync/sync.type";
import { SyncListener, SyncLoop, SyncLoopOptions } from "./SyncLoop.type";

export const makeSyncLoop = (
  matrixRequest: MatrixRequest,
  options: SyncLoopOptions,
) => {
  let presence: Presence | undefined;
  let abortController: AbortController | undefined;

  let since: string | undefined = options.since;
  const timeout: number | undefined = options.timeout;
  const filter: string | undefined = options.filter;
  const fullState: boolean | undefined = options.fullState;

  const setSince = (s: string) => {
    since = s;
  };

  function setPresence(p: Presence): void {
    presence = p;
  }

  async function start(listener: SyncListener): Promise<void> {
    if (abortController) {
      throw new Error("Failed to start! SyncLoop is already running.");
    }

    abortController = new AbortController();
    while (abortController && !abortController.signal.aborted) {
      const request = matrixRequest(
        sync({
          full_state: fullState?.toString(),
          filter: filter,
          set_presence: presence,
          since: since,
          timeout: timeout?.toString(),
        }),
        abortController.signal,
      );
      listener.onRequest();
      const [requestError, response] = await to(request);

      if (requestError) {
        abortController = undefined;
        listener.onRequestError(requestError);
        return;
      }

      const [parseError, parsedResp] = await to(
        parseMatrixResp<SyncOK>(response),
      );

      if (parseError) {
        abortController = undefined;
        listener.onRequestError(parseError);
        return;
      }

      const [error, data] = parsedResp;
      if (error) {
        abortController = undefined;
        listener.onResponseError(error);
        return;
      }

      const sinceToken = data.next_batch;
      listener.onResponseData(data);
      setSince(sinceToken);
    }
  }

  function stop(): void {
    if (!abortController) {
      throw new Error("Failed to abort! SyncLoop is not running.");
    }
    abortController.abort();
    abortController = undefined;
  }

  const syncLoop: SyncLoop = {
    setPresence,
    start,
    stop,
  };

  return syncLoop;
};
