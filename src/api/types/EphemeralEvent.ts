export type EphemeralEvent<Content extends object = object> = {
  content: Content;
  type: string;
};
