import {
  AccountDataEvent,
  JoinedRoom,
} from "../../../matrix/client/v3/sync/sync.type";
import {
  serializeJoinedRoomAccountData,
  serializeRoomAccountDataEvent,
} from "./roomAccountData";

test("serialize room account data event", () => {
  const roomId = "!some:example.com";
  const accountDataEvent: AccountDataEvent = {
    content: {
      some: "value",
    },
    type: "personal",
  };

  expect(serializeRoomAccountDataEvent(roomId, accountDataEvent)).toEqual({
    room_id: roomId,
    type: "personal",
    content: {
      some: "value",
    },
  });
});

test("serialize joined room account data", () => {
  const roomId = "!some:example.com";

  const joinedRoom: JoinedRoom = {
    account_data: {
      events: [
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
      ],
    },
  };

  expect(serializeJoinedRoomAccountData(roomId, joinedRoom)).toEqual([
    {
      room_id: roomId,
      type: "personal",
      content: {
        some: "value",
      },
    },
    {
      room_id: roomId,
      type: "fav",
      content: {
        some: "value",
      },
    },
  ]);

  expect(serializeJoinedRoomAccountData(roomId, joinedRoom)).not.toEqual([
    {
      room_id: roomId,
      type: "fav",
      content: {
        some: "value",
      },
    },
    {
      room_id: roomId,
      type: "public",
      content: {
        some: "value",
      },
    },
  ]);
});
