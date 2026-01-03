import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * getAuthMetadata types
 */
export type GetAuthMetadataOK = {
  authorization_endpoint: string;
  code_challenge_methods_supported: string[];
  grant_types_supported: string[];
  issuer: string;
  prompt_values_supported?: string;
  registration_endpoint: string;
  response_modes_supported: string[];
  response_types_supported: string[];
  revocation_endpoint: string;
  token_endpoint: string;
};

export type GetAuthMetadataEndpoint = MatrixEndpoint<object>;
