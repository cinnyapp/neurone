import { getRoomSummary } from "./roomSummary";

test("get room summary request", () => {
  const roomIdOrAlias = "!roomId:server.name";

  expect(
    getRoomSummary({
      pathParams: { roomIdOrAlias },
      searchParams: {
        via: ["server.name"],
      },
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v1/room_summary/${encodeURIComponent(roomIdOrAlias)}?via=server.name`,
    requireAuthentication: true,
  });
});
