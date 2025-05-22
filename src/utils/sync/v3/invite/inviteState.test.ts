import { InviteRoom } from "../../../../api/matrix/client/v3/sync";
import { StrippedStateEvent } from "../../../../api/types";
import { roomInviteState } from "./inviteState";

test("get room invite state events from sync response", () => {
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

  const inviteRoom: InviteRoom = {
    invite_state: {
      events,
    },
  };

  expect(roomInviteState(inviteRoom)).toEqual(events);
  expect(roomInviteState({})).toEqual([]);
});
