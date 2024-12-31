import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * getTurnServer types
 */
export type GetTurnServerOK = {
  password: string;
  ttl: string;
  uris: string[];
  username: string;
};
export type GetTurnServerEndpoint = MatrixEndpoint<object>;
