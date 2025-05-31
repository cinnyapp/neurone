import { longPoll } from "./longPool";
import { LongPollRequest } from "./types";
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

describe("longPoll", () => {
  let abortController: AbortController;
  let abortSignal: AbortSignal;

  beforeEach(() => {
    abortController = new AbortController();
    abortSignal = abortController.signal;
  });

  describe("listener", () => {
    test("onRequest should be called after making request", async () => {
      const request = mockLongPollRequest();
      let requesting = false;
      const requestMiddleware: LongPollRequest = (abortSignal) => {
        requesting = true;
        return request(abortSignal);
      };

      await new Promise((resolve, reject) => {
        longPoll(requestMiddleware, abortSignal, parseMatrixResp, {
          onRequest() {
            expect(requesting).toBe(true);
            abortController.abort();
            resolve(undefined);
          },
          onRequestError() {
            reject();
          },
          onResponseError() {
            reject();
          },
          async onResponseSuccess() {
            reject();
          },
        });
      });
    });

    test("onRequestError should be called if request is aborted", async () => {
      const request = mockLongPollRequest();

      await new Promise((resolve, reject) => {
        longPoll(request, abortSignal, parseMatrixResp, {
          onRequest() {},
          onRequestError(error) {
            expect(error.name).toBe("AbortError");
            resolve(undefined);
          },
          onResponseError() {
            reject();
          },
          async onResponseSuccess() {
            reject();
          },
        });

        abortController.abort();
      });
    });

    test("onRequestError should be called if request errors", async () => {
      const request = mockLongPollRequest(new Error("error"));

      await new Promise((resolve, reject) => {
        longPoll(request, abortSignal, parseMatrixResp, {
          onRequest() {},
          onRequestError(error) {
            expect(error.message).toBe("error");
            resolve(undefined);
          },
          onResponseError() {
            reject();
          },
          async onResponseSuccess() {
            reject();
          },
        });
      });
    });

    test("onResponseError should be called after getting response error", async () => {
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
        longPoll(request, abortSignal, parseMatrixResp, {
          onRequest() {},
          onRequestError() {
            reject();
          },
          onResponseError(error) {
            expect(error.status).toBe(404);
            resolve(undefined);
          },
          async onResponseSuccess() {
            reject();
          },
        });
      });
    });

    test("async onResponseSuccess shoud be called after getting reponse data", async () => {
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
        longPoll(request, abortSignal, parseMatrixResp, {
          onRequest() {},
          onRequestError() {
            reject();
          },
          onResponseError() {
            reject();
          },
          async onResponseSuccess(data) {
            expect(data).toEqual(requestData);
            abortController.abort();
            resolve(true);
          },
        });
      });
    });
  });

  test("should stop on request abort", async () => {
    const request = mockLongPollRequest();

    await new Promise((resolve, reject) => {
      longPoll(request, abortSignal, parseMatrixResp, {
        onRequest() {},
        onRequestError() {},
        onResponseError() {
          reject();
        },
        async onResponseSuccess() {
          reject();
        },
      })
        .then(() => {
          resolve(undefined);
        })
        .catch(() => {
          reject();
        });

      abortController.abort();
    });
  });

  test("should stop on request error", async () => {
    const request = mockLongPollRequest(new Error("error"));

    await new Promise((resolve, reject) => {
      longPoll(request, abortSignal, parseMatrixResp, {
        onRequest() {},
        onRequestError() {},
        onResponseError() {
          reject();
        },
        async onResponseSuccess() {
          reject();
        },
      })
        .then(() => {
          resolve(undefined);
        })
        .catch(() => {
          reject();
        });
    });
  });

  test("should stop on response error", async () => {
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
      longPoll(request, abortSignal, parseMatrixResp, {
        onRequest() {},
        onRequestError() {
          reject();
        },
        onResponseError() {},
        async onResponseSuccess() {
          reject();
        },
      })
        .then(() => {
          resolve(undefined);
        })
        .catch(() => {
          reject();
        });
    });
  });
});
