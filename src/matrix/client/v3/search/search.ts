import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { withSearchParams } from "../../../_utils/withSearchParams";
import { PostSearchBody, PostSearchSearchParams } from "./search.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3search
 */
export const postSearch = (
  body: PostSearchBody,
  searchParams?: PostSearchSearchParams,
): MatrixRequestStruct => {
  const sParams = new URLSearchParams(searchParams);
  const path = withSearchParams(
    "/_matrix/client/v3/search",
    sParams.toString(),
  );

  return {
    method: "POST",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
