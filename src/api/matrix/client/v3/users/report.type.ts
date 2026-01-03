import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * postReport
 */
export type PostReportPathParams = {
  userId: string;
};
export type PostReportBody = {
  reason: string;
};
export type PostReportOK = Record<string, never>;
export type PostReportEndpoint = MatrixEndpoint<{
  pathParams: PostReportPathParams;
  body?: PostReportBody;
}>;
