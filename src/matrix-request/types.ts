export type MatrixErrorData = {
  errcode?: string;
  error?: string;
};

export type MatrixError<ErrorData = MatrixErrorData> = {
  url: string;
  status: number;
  data: ErrorData;
};
