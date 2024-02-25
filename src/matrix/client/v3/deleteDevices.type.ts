/**
 * postDeleteDevices types
 */
export type PostDeleteDevicesBody = {
  auth?: object;
  devices: string[];
};
export type PostDeleteDevicesOK = Record<string, never>;
