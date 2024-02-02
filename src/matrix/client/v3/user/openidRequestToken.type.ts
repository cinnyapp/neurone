export type OpenIdCredentials = {
  access_token: string;
  expires_in: number;
  matrix_server_name: string;
  token_type: "Bearer";
};

/**
 * postOpenidRequestToken types
 */
export type PostOpenidRequestTokenPathParams = {
  userId: string;
};

export type PostOpenidRequestTokenOK = OpenIdCredentials;
