import to from "await-to-js";
import { LongPoll } from "./types";

export const longPoll: LongPoll = (request, parseResponse, listener) => {
  const abortController = new AbortController();

  const loop = async () => {
    while (!abortController.signal.aborted) {
      const reqPromise = request(abortController.signal);
      listener.onRequest();
      const [requestError, response] = await to(reqPromise);

      if (requestError) {
        listener.onRequestError(requestError);
        return;
      }

      const [parsingError, parsedResp] = await to(parseResponse(response));

      if (parsingError) {
        listener.onRequestError(parsingError);
        return;
      }

      const [error, data] = parsedResp;
      if (error) {
        listener.onResponseError(error);
        return;
      }

      listener.onResponseSuccess(data);
    }
  };

  loop();

  return () => {
    abortController.abort();
  };
};
