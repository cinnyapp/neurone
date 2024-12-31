import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * postDeleteDevices types
 */
export type PostDeleteDevicesBody = {
  auth?: object;
  devices: string[];
};
export type PostDeleteDevicesOK = Record<string, never>;
export type PostDeleteDevicesEndpoint = MatrixEndpoint<{
  body: PostDeleteDevicesBody;
}>;
