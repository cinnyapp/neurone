export type LoginFlow = {
  type: string;
  get_login_token?: boolean;
};

export type UserIdIdentifier = {
  type: "m.id.user";
  user: string;
};
export type ThirdPartyIdentifier = {
  type: "m.id.thirdparty";
  medium: string;
  address: string;
};
export type PhoneIdentifier = {
  type: "m.id.phone";
  country: string;
  phone: string;
};

export type UserIdentifier =
  | UserIdIdentifier
  | ThirdPartyIdentifier
  | PhoneIdentifier;

export type LoginType = "m.login.password" | "m.login.token";

/**
 * login types
 */
export type LoginOK = {
  flows?: LoginFlow[];
};

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
  type: LoginType;
};
export type PostLoginOK = {
  access_token: string;
  device_id: string;
  expires_in_ms?: number;
  refresh_token?: string;
  user_id: string;
  well_known: object;
};
