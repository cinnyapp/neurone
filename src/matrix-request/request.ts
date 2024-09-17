import { MatrixRequest } from "./types";

export const makeRequest = (
  fetchFunc: typeof fetch,
  baseUrl: string,
  requestInit: RequestInit,
): MatrixRequest => {
  const request: MatrixRequest = async (
    requestStruct,
    abortSignal,
  ): Promise<Response> => {
    const { method, path, requireAuthentication, body } = requestStruct;
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
