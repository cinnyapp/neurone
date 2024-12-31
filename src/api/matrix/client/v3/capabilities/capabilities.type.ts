import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * getCapabilities types
 */
export type GetCapabilitiesOK = {
  capabilities: Record<string, object>;
};
export type GetCapabilitiesEndpoint = MatrixEndpoint<object>;
