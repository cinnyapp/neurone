import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { PublicRoomsChunk, PublicRoomsFilter } from "../../../../types";

/**
 * getPublicRooms types
 */
export type GetPublicRoomsSearchParams = {
  limit?: number;
  server?: string;
  since?: string;
};
export type GetPublicRoomsOK = {
  chunk: PublicRoomsChunk[];
  next_batch?: string;
  prev_batch?: string;
  total_room_count_estimate?: number;
};
export type GetPublicRoomsEndpoint = MatrixEndpoint<{
  searchParams?: GetPublicRoomsSearchParams;
}>;

/**
 * postPublicRooms types
 */
export type PostPublicRoomsSearchParams = {
  server?: string;
};
export type PostPublicRoomsBody = {
  filter?: PublicRoomsFilter;
  include_all_networks?: boolean;
  limit?: number;
  since?: string;
  third_party_instance_id?: string;
};
export type PostPublicRoomsOK = {
  chunk: PublicRoomsChunk[];
  next_batch?: string;
  prev_batch?: string;
  total_room_count_estimate?: number;
};
export type PostPublicRoomsEndpoint = MatrixEndpoint<{
  searchParams?: PostPublicRoomsSearchParams;
  body?: PostPublicRoomsBody;
}>;
