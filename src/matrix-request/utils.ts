import { MatrixErrorData, MatrixError } from "./types";

export const parseMatrixResp = async <SuccessData, ErrorData = MatrixErrorData>(
  response: Response,
): Promise<[undefined, SuccessData] | [MatrixError<ErrorData>, undefined]> => {
  const data = await response.json();

  if (!response.ok) {
    const err: MatrixError<ErrorData> = {
      url: response.url,
      status: response.status,
      data,
    };

    return [err, undefined];
  }
  return [undefined, data];
};
