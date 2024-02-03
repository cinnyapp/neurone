/**
 * putTyping types
 */
export type PutTypingPathParams = {
  roomId: string;
  userId: string;
};
export type PutTypingBody = {
  timeout?: number;
  typing: boolean;
};
export type PutTypingOK = Record<string, never>;
