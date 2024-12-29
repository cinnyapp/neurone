import { MatrixResponseParser } from "./types";

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
