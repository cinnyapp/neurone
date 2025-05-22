import { JoinRoom } from "../../../../api/matrix/client/v3/sync";
import { RoomSummary } from "../../../../api/types";
import { roomSummary } from "./summary";

test("get room summary from sync response", () => {
  const summary: RoomSummary = {
    "m.joined_member_count": 2,
    "m.invited_member_count": 1,
  };

  const joinRoom: JoinRoom = {
    summary,
  };

  expect(roomSummary(joinRoom)).toEqual(summary);

  expect(roomSummary({})).toBe(undefined);
});
