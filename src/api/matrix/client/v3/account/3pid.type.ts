import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import {
  ThirdPartyId,
  ThirdPartyIdMedium,
  ThirdPartyIdUnbindResult,
} from "../../../../types";

/**
 * get3pid types
 */
export type Get3pidOK = {
  threepids: ThirdPartyId[];
};
export type Get3pidEndpoint = MatrixEndpoint<object>;

/**
 * post3pidAdd types
 */
export type Post3pidAddBody = {
  auth?: object;
  client_secret: string;
  sid: string;
};
export type Post3pidAddOK = Record<string, never>;
export type Post3pidAddEndpoint = MatrixEndpoint<{
  body: Post3pidAddBody;
}>;

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
export type Post3pidBindEndpoint = MatrixEndpoint<{
  body: Post3pidBindBody;
}>;

/**
 * post3pidDelete types
 */
export type Post3pidDeleteBody = {
  address: string;
  id_server?: string;
  medium: ThirdPartyIdMedium;
};
export type Post3pidDeleteOK = {
  id_server_unbind_result: ThirdPartyIdUnbindResult;
};
export type Post3pidDeleteEndpoint = MatrixEndpoint<{
  body: Post3pidDeleteBody;
}>;

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
export type Post3pidEmailRequestTokenEndpoint = MatrixEndpoint<{
  body: Post3pidEmailRequestTokenBody;
}>;

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
export type Post3pidMsisdnRequestTokenEndpoint = MatrixEndpoint<{
  body: Post3pidMsisdnRequestTokenBody;
}>;

/**
 * post3pidUnbind types
 */
export type Post3pidUnbindBody = {
  address: string;
  id_server?: string;
  medium: ThirdPartyIdMedium;
};
export type Post3pidUnbindOK = {
  id_server_unbind_result: ThirdPartyIdUnbindResult;
};
export type Post3pidUnbindEndpoint = MatrixEndpoint<{
  body: Post3pidUnbindBody;
}>;
