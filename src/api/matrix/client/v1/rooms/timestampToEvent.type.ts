import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * getTimestampToEvent types
 */
export type GetTimestampToEventPathParams = {
  roomId: string;
};
export type GetTimestampToEventSearchParams = {
  dir: "b" | "f";
  ts: string;
};
export type GetTimestampToEventOK = {
  event_id: string;
  origin_server_ts: number;
};
export type GetTimestampToEventEndpoint = MatrixEndpoint<{
  pathParams: GetTimestampToEventPathParams;
  searchParams: GetTimestampToEventSearchParams;
}>;
