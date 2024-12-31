import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { ThirdPartyUser } from "../../../../types";

/**
 * getUser types
 */
export type GetUserSearchParams = {
  userid: string;
};
export type GetUserOK = ThirdPartyUser[];
export type GetUserEndpoint = MatrixEndpoint<{
  searchParams: GetUserSearchParams;
}>;

/**
 * getUserProtocol types
 */
export type GetUserProtocolPathParams = {
  protocol: string;
};
export type GetUserProtocolSearchParams = {
  fields?: string;
};
export type GetUserProtocolOK = ThirdPartyUser[];
export type GetUserProtocolEndpoint = MatrixEndpoint<{
  pathParams: GetUserProtocolPathParams;
  searchParams?: GetUserProtocolSearchParams;
}>;
