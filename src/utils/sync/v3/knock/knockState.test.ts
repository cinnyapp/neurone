import { KnockRoom } from "../../../../api/matrix/client/v3/sync";
import { StrippedStateEvent } from "../../../../api/types";
import { roomKnockState } from "./knockState";

test("get room knock state events from sync response", () => {
  const events: StrippedStateEvent[] = [
    {
      content: {
        name: "some",
      },
      sender: "@sender:server.name",
      state_key: "",
      type: "m.room.name",
    },
  ];

  const knockRoom: KnockRoom = {
    knock_state: {
      events,
    },
  };

  expect(roomKnockState(knockRoom)).toEqual(events);
  expect(roomKnockState({})).toEqual([]);
});
