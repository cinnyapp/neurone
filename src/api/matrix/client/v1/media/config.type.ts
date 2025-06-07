import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * getConfig types
 */
export type GetConfigOK = {
  "m.upload.size"?: number;
};
export type GetConfigEndpoint = MatrixEndpoint<object>;
