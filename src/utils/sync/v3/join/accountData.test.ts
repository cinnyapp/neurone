import { AccountDataEvent } from "../../../../api/types";
import { JoinedRoom } from "../../../../api/matrix/client/v3/sync/sync.type";
import { roomAccountData } from "./accountData";

test("get joined room account data event", () => {
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

  const joinedRoom: JoinedRoom = {
    account_data: {
      events,
    },
  };

  expect(roomAccountData(joinedRoom)).toEqual(events);
  expect(roomAccountData(joinedRoom)).not.toEqual([]);
});

test("get joined room account data event with no events", () => {
  const events: AccountDataEvent[] = [];

  const joinedRoom: JoinedRoom = {
    account_data: {
      events,
    },
  };

  expect(roomAccountData(joinedRoom).length).toEqual(0);
});
