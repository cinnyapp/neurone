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
