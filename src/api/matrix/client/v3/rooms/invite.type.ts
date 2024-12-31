import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { ThirdPartyIdInvite } from "../../../../types";

/**
 * postInvite types
 */
export type PostInvitePathParams = {
  roomId: string;
};
export type PostInviteBody =
  | {
      reason?: string;
      user_id: string;
    }
  | ThirdPartyIdInvite;

export type PostInviteOK = Record<string, never>;
export type PostInviteEndpoint = MatrixEndpoint<{
  pathParams: PostInvitePathParams;
  body: PostInviteBody;
}>;
