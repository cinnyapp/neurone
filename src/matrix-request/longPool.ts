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

    let response: Response;

    try {
      response = await reqPromise;
    } catch (requestError) {
      listener.onRequestError(requestError as Error);
      return;
    }

    let result: Awaited<ReturnType<typeof parseResponse>>;

    try {
      result = await parseResponse(response);
    } catch (parsingError) {
      listener.onRequestError(parsingError as Error);
      return;
    }

    const [error, data] = result;
    if (error) {
      listener.onResponseError(error);
      return;
    }

    listener.onResponseSuccess(data);
  }
};
