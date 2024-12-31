import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { ThirdPartySigned } from "../../../../types";

/**
 * postJoin types
 */
export type PostJoinPathParams = {
  roomId: string;
};
export type PostJoinBody = {
  reason?: string;
  third_party_signed?: ThirdPartySigned;
};
export type PostJoinOK = {
  room_id: string;
};
export type PostJoinEndpoint = MatrixEndpoint<{
  pathParams: PostJoinPathParams;
  body: PostJoinBody;
}>;
