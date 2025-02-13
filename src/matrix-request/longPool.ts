import to from "await-to-js";
import { LongPoll } from "./types";

export const longPoll: LongPoll = async (
  request,
  abortSignal,
  parseResponse,
  listener,
) => {
  while (!abortSignal.aborted) {
    const reqPromise = request(abortSignal);
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
