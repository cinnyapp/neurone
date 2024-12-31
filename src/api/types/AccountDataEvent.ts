export type AccountDataEvent<Content extends object = object> = {
  type: string;
  content: Content;
};
