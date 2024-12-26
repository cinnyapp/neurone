import { MatrixRequestStruct } from "../../MatrixRequestStruct";
import { withSearchParams } from "../../_utils/withSearchParams";
import { PreviewUrlSearchParams } from "./previewUrl.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixmediav3preview_url
 */
export const previewUrl = (
  searchParams: PreviewUrlSearchParams,
): MatrixRequestStruct => {
  const path = withSearchParams("/_matrix/media/v3/preview_url", searchParams);

  return {
    method: "GET",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};
