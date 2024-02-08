export type PusherData = {
  format?: string;
  url?: string;
};
export type Pusher = {
  app_display_name: string;
  app_id: string;
  data: PusherData;
  device_display_name: string;
  kind: string;
  lang: string;
  profile_tag?: string;
  pushkey: string;
};

/**
 * pushers types
 */
export type PushersOK = {
  pushers: Pusher[];
};

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
