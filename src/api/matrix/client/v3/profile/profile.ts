import { GetProfileEndpoint } from "./profile.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3profileuserid
 */
export const getProfile: GetProfileEndpoint = ({ pathParams }) => {
  const path = `/_matrix/client/v3/profile/${encodeURIComponent(pathParams.userId)}`;

  return {
    method: "GET",
    path,
  };
};
