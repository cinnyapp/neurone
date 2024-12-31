import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * postLogout types
 */
export type PostLogoutOK = Record<string, never>;
export type PostLogoutEndpoint = MatrixEndpoint<object>;
