export type MegolmSessionData = {
  sender_key: string;
  forwarding_curve25519_key_chain: string[];
  sender_claimed_keys: Record<string, string>;
  room_id: string;
  session_id: string;
  session_key: string;
  algorithm?: string;
  untrusted?: boolean;
};

export type RoomKeysImportResult = {
  imported: number;
  total: number;
};
