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

export type ParseMatrixResponse<SuccessData, ErrorData = MatrixErrorData> = (
  response: Response,
) => Promise<MatrixResponseResult<SuccessData, ErrorData>>;

export type MatrixResponseParser = <SuccessData, ErrorData = MatrixErrorData>(
  response: Response,
) => Promise<MatrixResponseResult<SuccessData, ErrorData>>;

export interface PollListener<SuccessData, ErrorData = MatrixErrorData> {
  onRequest: () => void;
  onRequestError: (error: Error) => void;
  onResponseError: (error: MatrixError<ErrorData>) => void;
  onResponseSuccess: (data: SuccessData) => void;
}
export type LongPollRequest = (abortSignal: AbortSignal) => Promise<Response>;

export type StopLongPoll = () => void;

export type LongPoll = <SuccessData, ErrorData = MatrixErrorData>(
  request: LongPollRequest,
  parseResponse: ParseMatrixResponse<SuccessData, ErrorData>,
  listener: PollListener<SuccessData, ErrorData>,
) => StopLongPoll;
