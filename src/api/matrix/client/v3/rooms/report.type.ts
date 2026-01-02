import { MatrixEndpoint } from "../../../../MatrixEndpoint";

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
