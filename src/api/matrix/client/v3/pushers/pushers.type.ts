import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { Pusher, PusherData } from "../../../../types";

/**
 * getPushers types
 */
export type GetPushersOK = {
  pushers: Pusher[];
};
export type GetPushersEndpoint = MatrixEndpoint<object>;

/**
 * postPushersSet
 */
export type PostPushersBody = {
  app_display_name?: string;
  app_id: string;
  append?: boolean;
  data?: PusherData;
  device_display_name?: string;
  kind: string | null;
  lang?: string;
  profile_tag?: string;
  pushkey: string;
};
export type PostPushersOK = Record<string, never>;
export type PostPushersEndpoint = MatrixEndpoint<{
  body: PostPushersBody;
}>;
