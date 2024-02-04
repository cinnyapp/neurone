/**
 * postReport types
 */
export type PostReportPathParams = {
  roomId: string;
  eventId: string;
};
export type PostReportBody = {
  reason?: string;
  score?: number;
};
export type PostReportOK = Record<string, never>;
