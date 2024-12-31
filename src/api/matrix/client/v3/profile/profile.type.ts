import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { UserProfile } from "../../../../types";

/**
 * getProfile types
 */
export type GetProfilePathParams = {
  userId: string;
};
export type GetProfileOK = UserProfile;
export type GetProfileEndpoint = MatrixEndpoint<{
  pathParams: GetProfilePathParams;
}>;
