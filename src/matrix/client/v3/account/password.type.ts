/**
 * postPassword types
 */
export type PostPasswordBody = {
  auth?: object;
  logout_devices?: boolean;
  new_password: string;
};
export type PostPasswordOK = Record<string, never>;

/**
 * postPasswordEmailRequestToken types
 */
export type PostPasswordEmailRequestTokenBody = {
  client_secret: string;
  email: string;
  id_access_token?: string;
  id_server?: string;
  next_link?: string;
  send_attempt: number;
};
export type PostPasswordEmailRequestTokenOK = {
  sid: string;
  submit_url?: string;
};

/**
 * postPasswordMsisdnRequestToken types
 */
export type PostPasswordMsisdnRequestTokenBody = {
  client_secret: string;
  country: string;
  id_access_token?: string;
  id_server?: string;
  next_link?: string;
  phone_number: string;
  send_attempt: number;
};
export type PostPasswordMsisdnRequestTokenOK = {
  sid: string;
  submit_url?: string;
};
