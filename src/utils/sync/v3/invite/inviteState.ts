import { InvitedRoom } from "../../../../api/matrix/client/v3/sync";
import { StrippedStateEvent } from "../../../../api/types";

export const roomInviteState = (
  inviteRoom: InvitedRoom,
): StrippedStateEvent[] => inviteRoom.invite_state?.events ?? [];
