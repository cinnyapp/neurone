import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { ProfilePathParams } from "./profile.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3profileuserid
 */
export const profile = (pathParams: ProfilePathParams): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/profile/${encodeURIComponent(pathParams.userId)}`;

  return {
    method: "GET",
    path,
  };
};
