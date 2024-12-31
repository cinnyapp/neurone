import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { UserIdToDevicesOneTimeKeys } from "../../../../types";

/**
 * postClaim request
 */
export type PostClaimBody = {
  one_time_keys: Record<string, Record<string, string>>;
  timeout?: number;
};
export type PostClaimOK = {
  failures?: Record<string, object>;
  one_time_keys: UserIdToDevicesOneTimeKeys;
};
export type PostClaimEndpoint = MatrixEndpoint<{
  body: PostClaimBody;
}>;
