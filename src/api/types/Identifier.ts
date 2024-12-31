export type UserIdIdentifier = {
  type: "m.id.user";
  user: string;
};
export type ThirdPartyIdentifier = {
  type: "m.id.thirdparty";
  medium: string;
  address: string;
};
export type PhoneIdentifier = {
  type: "m.id.phone";
  country: string;
  phone: string;
};

export type UserIdentifier =
  | UserIdIdentifier
  | ThirdPartyIdentifier
  | PhoneIdentifier;
