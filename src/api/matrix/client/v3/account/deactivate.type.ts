import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { ThirdPartyIdUnbindResult } from "../../../../types";

/**
 * postDeactivate types
 */
export type PostDeactivateBody = {
  auth?: object;
  id_server?: string;
};
export type PostDeactivateOK = {
  id_server_unbind_result: ThirdPartyIdUnbindResult;
};
export type PostDeactivateEndpoint = MatrixEndpoint<{
  body?: PostDeactivateBody;
}>;
