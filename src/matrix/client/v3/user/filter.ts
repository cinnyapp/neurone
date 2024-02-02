import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import {
  FilterPathParams,
  PostFilterBody,
  PostFilterPathParams,
} from "./filter.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3useruseridfilter
 */
export const postFilter = (
  pathParams: PostFilterPathParams,
  body: PostFilterBody,
): MatrixRequestStruct => {
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
export const filter = (pathParams: FilterPathParams): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/user/${encodeURIComponent(pathParams.userId)}/filter/${encodeURIComponent(pathParams.filterId)}`;

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};
