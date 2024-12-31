import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * postCreate request
 */
export type PostCreateOK = {
  content_uri: string;
  unused_expires_at?: number;
};
export type PostCreateEndpoint = MatrixEndpoint<object>;
