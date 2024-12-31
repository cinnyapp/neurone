export type Presence = "online" | "offline" | "unavailable";

export type StatusContent = {
  currently_active?: boolean;
  last_active_ago?: number;
  presence: Presence;
  status_msg?: string | null;
};

export type PresenceEvent<Content extends object = object> = {
  content: Content;
  sender: string;
  type: string;
};
