import { AccountDataEvent } from "../../../../api/types";
import { JoinRoom } from "../../../../api/matrix/client/v3/sync/sync.type";
import { roomAccountData } from "./accountData";

test("get join room account data event", () => {
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

  const joinRoom: JoinRoom = {
    account_data: {
      events,
    },
  };

  expect(roomAccountData(joinRoom)).toEqual(events);
  expect(roomAccountData(joinRoom)).not.toEqual([]);
});

test("get join room account data event with no events", () => {
  const events: AccountDataEvent[] = [];

  const joinRoom: JoinRoom = {
    account_data: {
      events,
    },
  };

  expect(roomAccountData(joinRoom).length).toEqual(0);
});
