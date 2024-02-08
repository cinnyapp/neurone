export type TPNetworkLocation = {
  alias: string;
  fields: object;
  protocol: string;
};

/**
 * location types
 */
export type LocationSearchParams = {
  alias: string;
};
export type LocationOK = TPNetworkLocation[];

/**
 * location types
 */
export type LocationProtocolPathParams = {
  protocol: string;
};
export type LocationProtocolSearchParams = {
  searchFields?: string;
};
export type LocationProtocolOK = TPNetworkLocation[];
