export type ProtocolInstance = {
  desc: string;
  fields: object;
  icon?: string;
  network_id: string;
};

export type ProtocolFieldType = {
  placeholder: string;
  regexp: string;
};

export type TPProtocol = {
  field_types: Record<string, ProtocolFieldType>;
  icon: string;
  instances: ProtocolInstance[];
  location_fields: string[];
  user_fields: string[];
};

/**
 * protocol types
 */
export type ProtocolPathParams = {
  protocol: string;
};
export type ProtocolOK = TPProtocol;

/**
 * protocols types
 */
export type ProtocolsOK = Record<string, TPProtocol>;
