import { MatrixRequestStruct } from "../matrix/MatrixRequestStruct";

export const makeRequest = (
  fetchFunc: typeof fetch,
  baseUrl: string,
  requestInit: RequestInit,
) => {
  const request = async (
    mxRequestStruct: MatrixRequestStruct,
    abortSignal?: AbortSignal,
  ): Promise<Response> => {
    const { method, path, requireAuthentication, body } = mxRequestStruct;
    const signal = abortSignal ?? requestInit.signal;

    const headers = new Headers(requestInit.headers);
    if (!requireAuthentication) {
      headers.delete("Authorization");
    }

    const response = await fetchFunc(`${baseUrl}${path}`, {
      ...requestInit,
      method,
      headers,
      body,
      signal,
    });

    return response;
  };

  return request;
};

// const matrixReq = makeRequest(
//   fetch,
//   "https://matrix-client.matrix.org",
//   {
//     headers: {
//       Authorization: "Bearer <access_token>",
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//   },
// );

// matrixReq({
//   method: "GET",
//   path: "/",
//   requireAuthentication: true,
// });
