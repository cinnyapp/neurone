export type OneTimeKeys = Record<string, object>;
export type DeviceIdToOneTimeKeys = Record<string, OneTimeKeys>;
export type UserIdToDevicesOneTimeKeys = Record<string, DeviceIdToOneTimeKeys>;

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
