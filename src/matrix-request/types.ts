import { MatrixEndpointStruct } from "../api/MatrixEndpoint";

export type MatrixRequest = (
  matrixEndpointStruct: MatrixEndpointStruct,
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

export type MatrixResponseResult<SuccessData, ErrorData = MatrixErrorData> =
  | [undefined, SuccessData]
  | [MatrixError<ErrorData>, undefined];

export type MatrixResponseParser = <SuccessData, ErrorData = MatrixErrorData>(
  response: Response,
) => Promise<MatrixResponseResult<SuccessData, ErrorData>>;
