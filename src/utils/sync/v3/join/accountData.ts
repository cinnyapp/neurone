import { AccountDataEvent } from "../../../../api/types";
import { JoinRoom } from "../../../../api/matrix/client/v3/sync/sync.type";

export const roomAccountData = (joinRoom: JoinRoom): AccountDataEvent[] =>
  joinRoom.account_data?.events ?? [];
