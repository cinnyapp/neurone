import { LeaveRoom } from "../../../../api/matrix/client/v3/sync";
import { AccountDataEvent } from "../../../../api/types";

export const roomAccountData = (leaveRoom: LeaveRoom): AccountDataEvent[] =>
  leaveRoom.account_data?.events ?? [];
