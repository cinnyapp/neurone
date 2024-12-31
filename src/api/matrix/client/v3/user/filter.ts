import { GetFilterEndpoint, PostFilterEndpoint } from "./filter.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3useruseridfilter
 */
export const postFilter: PostFilterEndpoint = ({ pathParams, body }) => {
  const path = `/_matrix/client/v3/user/${encodeURIComponent(pathParams.userId)}/filter`;

  return {
    method: "POST",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3useruseridfilterfilterid
 */
export const getFilter: GetFilterEndpoint = ({ pathParams }) => {
  const path = `/_matrix/client/v3/user/${encodeURIComponent(pathParams.userId)}/filter/${encodeURIComponent(pathParams.filterId)}`;

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};
