import { longPoll } from "./longPool";
import { LongPollRequest, StopLongPoll } from "./types";
import { parseMatrixResp } from "./utils";

const mockLongPollRequest = (
  rejectReason?: unknown,
  response?: {
    data?: string;
    init: ResponseInit;
  },
): LongPollRequest => {
  const request: LongPollRequest = (abortSignal) =>
    new Promise((resolve, reject) => {
      if (abortSignal) {
        abortSignal.onabort = () => {
          reject(new DOMException("Aborted", "AbortError"));
        };
      }

      setTimeout(() => {
        if (!abortSignal?.aborted) {
          if (rejectReason) {
            reject(rejectReason);
            return;
          }

          resolve(new Response(response?.data, response?.init));
        }
      }, 500);
    });

  return request;
};

test("long poll request before onRequest", async () => {
  const request = mockLongPollRequest();
  let requestBeforeOnRequest = false;
  const requestMiddleware: LongPollRequest = (abortSignal) => {
    requestBeforeOnRequest = true;
    return request(abortSignal);
  };

  await new Promise((resolve, reject) => {
    longPoll(requestMiddleware, parseMatrixResp, {
      onRequest() {
        expect(requestBeforeOnRequest).toBe(true);
        requestBeforeOnRequest = false;
        resolve(undefined);
      },
      onRequestError() {
        reject();
      },
      onResponseError() {
        reject();
      },
      onResponseSuccess() {
        reject();
      },
    });
  });
});

test("long poll request abort", async () => {
  const request = mockLongPollRequest();

  await new Promise((resolve, reject) => {
    const stopLongPoll: StopLongPoll = longPoll(request, parseMatrixResp, {
      onRequest() {},
      onRequestError(error) {
        expect(error.name).toBe("AbortError");
        resolve(undefined);
      },
      onResponseError() {
        reject();
      },
      onResponseSuccess() {
        reject();
      },
    });

    stopLongPoll();
  });
});

test("long poll request error", async () => {
  const request = mockLongPollRequest(new Error("error"));

  await new Promise((resolve, reject) => {
    longPoll(request, parseMatrixResp, {
      onRequest() {},
      onRequestError(error) {
        expect(error.message).toBe("error");
        resolve(undefined);
      },
      onResponseError() {
        reject();
      },
      onResponseSuccess() {
        reject();
      },
    });
  });
});

test("long poll response error", async () => {
  const request = mockLongPollRequest(undefined, {
    data: JSON.stringify({}),
    init: {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    },
  });

  await new Promise((resolve, reject) => {
    longPoll(request, parseMatrixResp, {
      onRequest() {},
      onRequestError() {
        reject();
      },
      onResponseError(error) {
        expect(error.status).toBe(404);
        resolve(undefined);
      },
      onResponseSuccess() {
        reject();
      },
    });
  });
});

test("long poll response data", async () => {
  const requestData = {
    some: true,
  };
  const request = mockLongPollRequest(undefined, {
    data: JSON.stringify(requestData),
    init: {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  });

  await new Promise((resolve, reject) => {
    longPoll(request, parseMatrixResp, {
      onRequest() {},
      onRequestError() {
        reject();
      },
      onResponseError() {
        reject();
      },
      onResponseSuccess(data) {
        expect(data).toEqual(requestData);
        resolve(true);
      },
    });
  });
});
