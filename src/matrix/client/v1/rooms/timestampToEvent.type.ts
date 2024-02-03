/**
 * timestampToEvent types
 */
export type TimestampToEventPathParams = {
  roomId: string;
};
export type TimestampToEventSearchParams = {
  dir: "b" | "f";
  ts: string;
};
export type TimestampToEventOK = {
  event_id: string;
  origin_server_ts: number;
};
