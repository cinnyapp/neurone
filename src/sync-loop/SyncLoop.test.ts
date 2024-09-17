import { MatrixRequest } from "../matrix-request";
import { makeSyncLoop } from "./SyncLoop";

test("sync loop request called first", async () => {
  let requestCalledFirst = false;
  const matrixRequest: MatrixRequest = async () =>
    new Promise((resolve) => {
      requestCalledFirst = true;
      resolve(new Response());
    });

  const syncLoop = makeSyncLoop(matrixRequest, { timeout: 2000 });

  await new Promise((resolve) => {
    syncLoop.start({
      onRequest() {
        expect(requestCalledFirst).toBe(true);
        resolve(undefined);
      },
      onRequestError() {
        requestCalledFirst = false;
      },
      onResponseData() {
        requestCalledFirst = false;
      },
      onResponseError() {
        requestCalledFirst = false;
      },
    });
    syncLoop.stop();
  });
});

test("sync loop abort request", async () => {
  const matrixRequest: MatrixRequest = async (_, abortSignal) =>
    new Promise((resolve, reject) => {
      if (abortSignal) {
        abortSignal.onabort = () => {
          reject(new DOMException("Aborted", "AbortError"));
        };
      }

      setTimeout(() => {
        if (!abortSignal?.aborted) {
          resolve(new Response());
        }
      }, 500);
    });

  const syncLoop = makeSyncLoop(matrixRequest, { timeout: 2000 });

  return new Promise((resolve, reject) => {
    syncLoop.start({
      onRequest() {},
      onRequestError(error) {
        expect(error.name).toBe("AbortError");
        resolve(undefined);
      },
      onResponseData() {
        reject();
      },
      onResponseError() {
        reject();
      },
    });
    syncLoop.stop();
  });
});

test("sync loop response data", async () => {
  const matrixRequest: MatrixRequest = async () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          new Response(
            JSON.stringify({
              next_batch: "xyz",
            }),
            {
              status: 200,
              headers: {
                "Content-Type": "application/json",
              },
            },
          ),
        );
      }, 500);
    });

  const syncLoop = makeSyncLoop(matrixRequest, { timeout: 2000 });

  return new Promise((resolve, reject) => {
    syncLoop.start({
      onRequest() {},
      onRequestError() {
        syncLoop.stop();
        reject();
      },
      onResponseData(data) {
        syncLoop.stop();
        expect(data).toEqual({
          next_batch: "xyz",
        });
        resolve(undefined);
      },
      onResponseError() {
        syncLoop.stop();
        reject();
      },
    });
  });
});

test("sync loop response error", async () => {
  const matrixRequest: MatrixRequest = async () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          new Response(
            JSON.stringify({
              error: "xyz",
            }),
            {
              status: 400,
              headers: {
                "Content-Type": "application/json",
              },
            },
          ),
        );
      }, 500);
    });

  const syncLoop = makeSyncLoop(matrixRequest, { timeout: 2000 });

  return new Promise((resolve, reject) => {
    syncLoop.start({
      onRequest() {},
      onRequestError() {
        syncLoop.stop();
        reject();
      },
      onResponseData() {
        syncLoop.stop();
        reject();
      },
      onResponseError(error) {
        syncLoop.stop();
        expect(error).toEqual({
          status: 400,
          url: "",
          data: {
            error: "xyz",
          },
        });
        resolve(undefined);
      },
    });
  });
});
