export type StrippedStateEvent<EventContent extends object = object> = {
  content: EventContent;
  sender: string;
  state_key: string;
  type: string;
};
