import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { LoginFlow, UserIdentifier } from "../../../../types";

/**
 * getLogin types
 */
export type GetLoginOK = {
  flows?: LoginFlow[];
};
export type GetLoginEndpoint = MatrixEndpoint<object>;

/**
 * postLogin types
 */
export type PostLoginBody = {
  device_id?: string;
  identifier?: UserIdentifier;
  initial_device_display_name?: string;
  password?: string;
  refresh_token?: boolean;
  token?: string;
  type: string;
};
export type PostLoginOK = {
  access_token: string;
  device_id: string;
  expires_in_ms?: number;
  refresh_token?: string;
  user_id: string;
  well_known: object;
};

export type PostLoginEndpoint = MatrixEndpoint<{
  body: PostLoginBody;
}>;
