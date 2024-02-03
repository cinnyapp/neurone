/**
 * postLeave types
 */
export type PostLeavePathParams = {
  roomId: string;
};
export type PostLeaveBody = {
  reason?: string;
};
export type PostLeaveOK = Record<string, never>;
