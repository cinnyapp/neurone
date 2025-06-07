import { withSearchParams } from "../../../../utils";
import { GetPreviewUrlEndpoint } from "./previewUrl.type";

/**
 * https://spec.matrix.org/v1.11/client-server-api/#get_matrixclientv1mediapreview_url
 */
export const getPreviewUrl: GetPreviewUrlEndpoint = ({ searchParams }) => {
  const path = withSearchParams(
    "/_matrix/client/v1/media/preview_url",
    searchParams,
  );

  return {
    method: "GET",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};
