import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * postReport
 */
export type PostReportPathParams = {
  roomId: string;
};
export type PostReportBody = {
  reason: string;
};
export type PostReportOK = Record<string, never>;
export type PostReportEndpoint = MatrixEndpoint<{
  pathParams: PostReportPathParams;
  body?: PostReportBody;
}>;

/**
 * postReportEventId types
 */
export type PostReportEventIdPathParams = {
  roomId: string;
  eventId: string;
};
export type PostReportEventIdBody = {
  reason?: string;
  score?: number;
};
export type PostReportEventIdOK = Record<string, never>;
export type PostReportEventIdEndpoint = MatrixEndpoint<{
  pathParams: PostReportEventIdPathParams;
  body?: PostReportEventIdBody;
}>;
