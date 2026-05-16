import { postJoin } from "./join";

test("post join room with alias or id request", () => {
  const roomIdOrAlias = "!room.server.name";
  const body = {
    reason: "some reason",
  };

  expect(
    postJoin({
      pathParams: { roomIdOrAlias },
      searchParams: {
        via: ["server.name"],
      },
      body,
    }),
  ).toEqual({
    method: "POST",
    path: `/_matrix/client/v3/join/${encodeURIComponent(roomIdOrAlias)}?via=server.name`,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
