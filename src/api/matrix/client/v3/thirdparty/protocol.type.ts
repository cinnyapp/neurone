import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { ThirdPartyProtocol } from "../../../../types";

/**
 * getProtocol types
 */
export type GetProtocolPathParams = {
  protocol: string;
};
export type GetProtocolOK = ThirdPartyProtocol;
export type GetProtocolEndpoint = MatrixEndpoint<{
  pathParams: GetProtocolPathParams;
}>;

/**
 * getProtocols types
 */
export type GetProtocolsOK = Record<string, ThirdPartyProtocol>;
export type GetProtocolsEndpoint = MatrixEndpoint<object>;
