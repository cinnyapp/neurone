import { AccountDataEvent } from "../../../../api/types";
import { JoinedRoom } from "../../../../api/matrix/client/v3/sync/sync.type";

export const roomAccountData = (joinedRoom: JoinedRoom): AccountDataEvent[] =>
  joinedRoom.account_data?.events ?? [];
