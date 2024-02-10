/**
 * postRegister types
 */
export type PostRegisterSearchParams = {
  kind?: "user" | "guest";
};
export type PostRegisterBody = {
  auth?: object;
  device_id?: string;
  inhibit_login?: boolean;
  initial_device_display_name?: string;
  password?: string;
  refresh_token?: boolean;
  username?: string;
};
export type PostRegisterOK = {
  access_token?: string;
  device_id?: string;
  expires_in_ms?: string;
  refresh_token?: string;
  user_id: string;
};
