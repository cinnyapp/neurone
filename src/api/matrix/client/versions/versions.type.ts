import { MatrixEndpoint } from "../../../MatrixEndpoint";

/**
 * getVersions types
 */
export type GetVersionsOK = {
  unstable_features?: Record<string, boolean>;
  versions: string[];
};
export type GetVersionsEndpoint = MatrixEndpoint<object>;
