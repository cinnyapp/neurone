import { withSearchParams } from "../../../../utils";
import { GetPreviewUrlEndpoint } from "./previewUrl.type";

/**
 * @deprecated
 * https://spec.matrix.org/v1.11/client-server-api/#get_matrixmediav3preview_url
 */
export const getPreviewUrl: GetPreviewUrlEndpoint = ({ searchParams }) => {
  const path = withSearchParams("/_matrix/media/v3/preview_url", searchParams);

  return {
    method: "GET",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};
