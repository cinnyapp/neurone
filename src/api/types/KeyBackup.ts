export type KeyBackupData = {
  first_message_index: number;
  forwarded_count: number;
  is_verified: boolean;
  session_data: object;
};

export type RoomKeyBackup = {
  sessions: Record<string, KeyBackupData>;
};

export type BackupVersionInfo = {
  algorithm: string;
  auth_data: object;
  count: number;
  etag: string;
  version: string;
};
