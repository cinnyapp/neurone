import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { ThirdPartyNetworkLocation } from "../../../../types";

/**
 * getLocation types
 */
export type GetLocationSearchParams = {
  alias: string;
};
export type GetLocationOK = ThirdPartyNetworkLocation[];
export type GetLocationEndpoint = MatrixEndpoint<{
  searchParams: GetLocationSearchParams;
}>;

/**
 * getLocation types
 */
export type GetLocationProtocolPathParams = {
  protocol: string;
};
export type GetLocationProtocolSearchParams = {
  searchFields?: string;
};
export type GetLocationProtocolOK = ThirdPartyNetworkLocation[];
export type GetLocationProtocolEndpoint = MatrixEndpoint<{
  pathParams: GetLocationProtocolPathParams;
  searchParams?: GetLocationProtocolSearchParams;
}>;
