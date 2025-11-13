import { MatrixError, MatrixErrorData, MatrixResponseParser } from "./types";

export const parseMatrixResp: MatrixResponseParser = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    const err = {
      url: response.url,
      status: response.status,
      data,
    };

    return [err, undefined];
  }
  return [undefined, data];
};

export function printMatrixError<ErrorData extends MatrixErrorData>(
  error: MatrixError<ErrorData>,
): string {
  const { url, status, data } = error;
  const errcode = data.errcode ?? "UNKNOWN_ERROR";
  const message = data.error ?? "An unexpected error occurred.";
  return `[${status}] ${errcode}: ${message} (${url})`;
}
