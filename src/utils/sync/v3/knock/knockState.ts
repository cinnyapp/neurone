import { KnockRoom } from "../../../../api/matrix/client/v3/sync";
import { StrippedStateEvent } from "../../../../api/types";

export const roomKnockState = (knockState: KnockRoom): StrippedStateEvent[] =>
  knockState.knock_state?.events ?? [];
