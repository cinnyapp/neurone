/**
 * postEmailRegisterToken types
 */
export type PostMsisdnRegisterTokenBody = {
  client_secret: string;
  country: string;
  id_access_token?: string;
  id_server?: string;
  next_link?: string;
  phone_number: string;
  send_attempt: number;
};
export type PostMsisdnRegisterTokenOK = {
  sid: string;
  submit_url?: string;
};
