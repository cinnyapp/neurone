import { PostDeviceSigningUploadEndpoint } from "./deviceSigning.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3keysdevice_signingupload
 */
export const postDeviceSigningUpload: PostDeviceSigningUploadEndpoint = ({
  body,
}) => {
  const path = "/_matrix/client/v3/keys/device_signing/upload";

  return {
    method: "POST",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
