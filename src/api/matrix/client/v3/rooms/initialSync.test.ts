import { getInitialSync } from "./initialSync";

test("get room initial sync", () => {
  const roomId = "!roomId:server.name";

  expect(
    getInitialSync({
      pathParams: { roomId },
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/initialSync`,
    requireAuthentication: true,
  });
});
