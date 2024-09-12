import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { withSearchParams } from "../../../_utils/withSearchParams";
import {
  PostPublicRoomsBody,
  PostPublicRoomsSearchParams,
  PublicRoomsSearchParams,
} from "./publicRooms.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3publicrooms
 */
export const publicRooms = (
  searchParams?: PublicRoomsSearchParams,
): MatrixRequestStruct => {
  const sParams = new URLSearchParams(searchParams);
  const path = withSearchParams(
    `/_matrix/client/v3/publicRooms`,
    sParams.toString(),
  );

  return {
    method: "GET",
    path,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3publicrooms
 */
export const postPublicRooms = (
  searchParams?: PostPublicRoomsSearchParams,
  body?: PostPublicRoomsBody,
): MatrixRequestStruct => {
  const sParams = new URLSearchParams(searchParams);
  const path = withSearchParams(
    `/_matrix/client/v3/publicRooms`,
    sParams.toString(),
  );

  return {
    method: "POST",
    path,
    requireAuthentication: true,
    body: body ? JSON.stringify(body) : undefined,
  };
};
