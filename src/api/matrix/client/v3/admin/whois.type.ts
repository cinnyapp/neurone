import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { DeviceInfo } from "../../../../types";

/**
 * getWhois types
 */
export type GetWhoisPathParams = {
  userId: string;
};
export type GetWhoisOK = {
  devices?: Record<string, DeviceInfo>;
  user_id?: string;
};
export type GetWhoisEndpoint = MatrixEndpoint<{
  pathParams: GetWhoisPathParams;
}>;
