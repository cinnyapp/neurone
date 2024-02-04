import { MatrixRequestStruct } from "../../MatrixRequestStruct";
import { PostCreateRoomBody } from "./createRoom.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3createroom
 */
export const postCreateRoom = (
  body?: PostCreateRoomBody,
): MatrixRequestStruct => {
  const path = "/_matrix/client/v3/createRoom";

  return {
    method: "POST",
    path,
    requireAuthentication: true,
    body: body ? JSON.stringify(body) : undefined,
  };
};
