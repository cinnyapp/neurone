export type IdentityProvider = {
  brand?: string;
  icon?: string;
  id: string;
  name: string;
};

export type LoginFlow = {
  type: string;
  get_login_token?: boolean;
  identity_providers?: IdentityProvider[];
};
