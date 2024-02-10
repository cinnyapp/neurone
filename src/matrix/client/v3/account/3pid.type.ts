import { IdServerUnbindResult } from "./deactivate.type";

export type ThirdPartyIdMedium = "email" | "msisdn";

export type ThirdPartyId = {
  added_at: number;
  address: string;
  medium: ThirdPartyIdMedium;
  validated_at: number;
};

/**
 * _3pid types
 */
export type _3pidOK = {
  threepids: ThirdPartyId[];
};

/**
 * post3pidAdd types
 */
export type Post3pidAddBody = {
  auth?: object;
  client_secret: string;
  sid: string;
};
export type Post3pidAddOK = Record<string, never>;

/**
 * post3pidBind types
 */
export type Post3pidBindBody = {
  client_secret: string;
  id_access_token: string;
  id_server: string;
  sid: string;
};
export type Post3pidBindOK = Record<string, never>;

/**
 * post3pidDelete types
 */
export type Post3pidDeleteBody = {
  address: string;
  id_server?: string;
  medium: ThirdPartyIdMedium;
};
export type Post3pidDeleteOK = {
  id_server_unbind_result: IdServerUnbindResult;
};

/**
 * post3pidEmailRequestToken types
 */
export type Post3pidEmailRequestTokenBody = {
  client_secret: string;
  email: string;
  id_access_token?: string;
  id_server?: string;
  next_link?: string;
  send_attempt: number;
};
export type Post3pidEmailRequestTokenOK = {
  sid: string;
  submit_url?: string;
};

/**
 * post3pidEmailRequestToken types
 */
export type Post3pidMsisdnRequestTokenBody = {
  client_secret: string;
  country: string;
  id_access_token?: string;
  id_server?: string;
  next_link?: string;
  phone_number: string;
  send_attempt: number;
};
export type Post3pidMsisdnRequestTokenOK = {
  sid: string;
  submit_url?: string;
};

/**
 * post3pidUnbind types
 */
export type Post3pidUnbindBody = {
  address: string;
  id_server?: string;
  medium: ThirdPartyIdMedium;
};
export type Post3pidUnbindOK = {
  id_server_unbind_result: IdServerUnbindResult;
};
