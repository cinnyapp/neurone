import { MatrixRequestStruct } from "../../MatrixRequestStruct";
import { PostDeleteDevicesBody } from "./deleteDevices.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3delete_devices
 */
export const postDeleteDevices = (
  body: PostDeleteDevicesBody,
): MatrixRequestStruct => {
  const path = "/_matrix/client/v3/delete_devices";

  return {
    method: "POST",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
