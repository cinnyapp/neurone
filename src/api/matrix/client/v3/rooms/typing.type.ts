import { MatrixEndpoint } from "../../../../MatrixEndpoint";

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
export type PutTypingEndpoint = MatrixEndpoint<{
  pathParams: PutTypingPathParams;
  body: PutTypingBody;
}>;
