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
  let abortController: AbortController = new AbortController();

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
    abortController = new AbortController();
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
      listener.onRequestError(requestError);
      return;
    }

    const [parseError, parsedResp] = await to(
      parseMatrixResp<SyncOK>(response),
    );

    if (parseError) {
      listener.onRequestError(parseError);
      return;
    }

    const [error, data] = parsedResp;
    if (error) {
      listener.onResponseError(error);
      return;
    }

    const sinceToken = data.next_batch;
    listener.onResponseData(data);
    setSince(sinceToken);

    if (!abortController.signal.aborted) {
      start(listener);
    }
  }

  function stop(): void {
    abortController.abort();
  }

  const syncLoop: SyncLoop = {
    setPresence,
    start,
    stop,
  };

  return syncLoop;
};
