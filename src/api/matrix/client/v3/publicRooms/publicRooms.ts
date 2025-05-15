import { withSearchParams } from "../../../../utils";
import {
  GetPublicRoomsEndpoint,
  PostPublicRoomsEndpoint,
} from "./publicRooms.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3publicrooms
 */
export const getPublicRooms: GetPublicRoomsEndpoint = ({ searchParams }) => {
  const path = withSearchParams(`/_matrix/client/v3/publicRooms`, searchParams);

  return {
    method: "GET",
    path,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3publicrooms
 */
export const postPublicRooms: PostPublicRoomsEndpoint = ({
  searchParams,
  body,
}) => {
  const path = withSearchParams(`/_matrix/client/v3/publicRooms`, searchParams);

  return {
    method: "POST",
    path,
    requireAuthentication: true,
    body: body ? JSON.stringify(body) : undefined,
  };
};
