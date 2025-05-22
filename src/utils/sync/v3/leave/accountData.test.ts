import { AccountDataEvent } from "../../../../api/types";
import { LeaveRoom } from "../../../../api/matrix/client/v3/sync/sync.type";
import { roomAccountData } from "./accountData";

test("get leave room account data event", () => {
  const events: AccountDataEvent[] = [
    {
      content: {
        some: "value",
      },
      type: "personal",
    },
    {
      content: {
        some: "value",
      },
      type: "fav",
    },
  ];

  const leaveRoom: LeaveRoom = {
    account_data: {
      events,
    },
  };

  expect(roomAccountData(leaveRoom)).toEqual(events);
  expect(roomAccountData(leaveRoom)).not.toEqual([]);
});

test("get leave room account data event with no events", () => {
  const events: AccountDataEvent[] = [];

  const leaveRoom: LeaveRoom = {
    account_data: {
      events,
    },
  };

  expect(roomAccountData(leaveRoom).length).toEqual(0);
});
