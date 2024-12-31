import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * postEmailRegisterToken types
 */
export type PostEmailRegisterTokenBody = {
  client_secret: string;
  email: string;
  id_access_token?: string;
  id_server?: string;
  next_link?: string;
  send_attempt: number;
};
export type PostEmailRegisterTokenOK = {
  sid: string;
  submit_url?: string;
};
export type PostEmailRegisterTokenEndpoint = MatrixEndpoint<{
  body: PostEmailRegisterTokenBody;
}>;
