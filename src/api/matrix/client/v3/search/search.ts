import { withSearchParams } from "../../../../utils";
import { PostSearchEndpoint } from "./search.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3search
 */
export const postSearch: PostSearchEndpoint = ({ body, searchParams }) => {
  const path = withSearchParams("/_matrix/client/v3/search", searchParams);

  return {
    method: "POST",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
