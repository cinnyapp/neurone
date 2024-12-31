export type LoginType = "m.login.password" | "m.login.token";

export type LoginFlow = {
  type: LoginType;
  get_login_token?: boolean;
};
