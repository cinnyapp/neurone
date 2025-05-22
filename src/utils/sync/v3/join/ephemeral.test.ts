import { JoinedRoom } from "../../../../api/matrix/client/v3/sync/sync.type";
import {
  roomEphemeral,
  roomReceiptEphemeral,
  roomTypingEphemeral,
} from "./ephemeral";

test("get room typing ephemeral events from sync data", () => {
  const events = [
    {
      type: "m.typing",
      content: {
        user_ids: ["@joe:server.name", "@john:server.name"],
      },
    },
  ];

  const joinedRoom: JoinedRoom = {
    ephemeral: {
      events,
    },
  };

  expect(roomTypingEphemeral(roomEphemeral(joinedRoom))).toEqual(events[0]);

  expect(roomTypingEphemeral(roomEphemeral({}))).toEqual(undefined);
});

test("get room event receipt ephemeral events from sync data", () => {
  const events = [
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
  ];

  const joinedRoom: JoinedRoom = {
    ephemeral: {
      events: events,
    },
  };

  expect(roomReceiptEphemeral(roomEphemeral(joinedRoom))).toEqual(events[0]);

  expect(roomReceiptEphemeral(roomEphemeral({}))).toEqual(undefined);
});
