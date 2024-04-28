import { JoinedRoom } from "../../../matrix/client/v3/sync/sync.type";
import { serializeRoomReceipt, serializeRoomTyping } from "./roomEphemeral";

test("serialize room typing from sync data", () => {
  const roomId = "!some:serve.name";

  const joinedRoom: JoinedRoom = {
    ephemeral: {
      events: [
        {
          type: "m.typing",
          content: {
            user_ids: ["@joe:server.name", "@john:server.name"],
          },
        },
      ],
    },
  };

  expect(serializeRoomTyping(roomId, joinedRoom)).toEqual({
    roomId,
    userIds: ["@joe:server.name", "@john:server.name"],
  });

  expect(serializeRoomTyping(roomId, {})).toEqual({
    roomId,
    userIds: [],
  });
});

test("serialize rom receipt from sync data", () => {
  const roomId = "!some:serve.name";

  const joinedRoom: JoinedRoom = {
    ephemeral: {
      events: [
        {
          type: "m.receipt",
          content: {
            "$evt1:server.name": {
              "m.read": {
                "@u1:server.name": {
                  ts: 123,
                },
              },
            },
            "$evt2:server.name": {
              "m.read": {
                "@u1:server.name": {
                  ts: 123,
                },
              },
              "m.read.private": {
                "@me:server.name": {
                  ts: 124,
                },
              },
            },
          },
        },
      ],
    },
  };

  expect(serializeRoomReceipt(roomId, joinedRoom)).toEqual([
    {
      roomId,
      eventId: "$evt1:server.name",
      receipts: {
        "m.read": {
          "@u1:server.name": {
            ts: 123,
          },
        },
      },
    },
    {
      roomId,
      eventId: "$evt2:server.name",
      receipts: {
        "m.read": {
          "@u1:server.name": {
            ts: 123,
          },
        },
        "m.read.private": {
          "@me:server.name": {
            ts: 124,
          },
        },
      },
    },
  ]);

  expect(serializeRoomReceipt(roomId, {})).toEqual([]);
});
