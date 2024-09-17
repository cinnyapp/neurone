import { MatrixRequestStruct } from "../matrix/MatrixRequestStruct";

export type MatrixRequest = (
  requestStruct: MatrixRequestStruct,
  abortSignal?: AbortSignal,
) => Promise<Response>;

export type MatrixErrorData = {
  errcode?: string;
  error?: string;
};

export type MatrixError<ErrorData = MatrixErrorData> = {
  url: string;
  status: number;
  data: ErrorData;
};
