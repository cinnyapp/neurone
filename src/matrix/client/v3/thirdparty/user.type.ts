export type TPUser = {
  fields: object;
  protocol: string;
  userid: string;
};

/**
 * user types
 */
export type UserSearchParams = {
  userid: string;
};
export type UserOK = TPUser[];

/**
 * userProtocol types
 */
export type UserProtocolPathParams = {
  protocol: string;
};
export type UserProtocolSearchParams = {
  fields?: string;
};
export type UserProtocolOK = TPUser[];
