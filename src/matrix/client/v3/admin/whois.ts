import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { WhoisPathParams } from "./whois.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3adminwhoisuserid
 */
export const whois = (pathParams: WhoisPathParams): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/admin/whois/${encodeURIComponent(pathParams.userId)}`;

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};
