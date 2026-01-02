export type ThirdPartySigned = {
  mxid: string;
  sender: string;
  signatures: object;
  token: string;
};

export type ThirdPartyIdMedium = "email" | "msisdn";

export type ThirdPartyId = {
  added_at: number;
  address: string;
  medium: ThirdPartyIdMedium;
  validated_at: number;
};

export type ThirdPartyIdUnbindResult = "success" | "no-support";

export type ThirdPartyIdInvite = {
  address: string;
  id_access_token: string;
  id_server: string;
  medium: string;
};

export type ThirdPartyNetworkLocation = {
  alias: string;
  fields: object;
  protocol: string;
};

export type ProtocolInstance = {
  desc: string;
  fields: object;
  icon?: string;
  instance_id?: string;
  network_id: string;
};

export type ProtocolFieldType = {
  placeholder: string;
  regexp: string;
};

export type ThirdPartyProtocol = {
  field_types: Record<string, ProtocolFieldType>;
  icon: string;
  instances: ProtocolInstance[];
  location_fields: string[];
  user_fields: string[];
};

export type ThirdPartyUser = {
  fields: object;
  protocol: string;
  userid: string;
};
