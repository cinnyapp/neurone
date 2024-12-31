import { postKnock } from "./knock";

test("post knock room with alias or id request", () => {
  const roomIdOrAlias = "!room.server.name";
  const body = {
    reason: "some reason",
  };

  expect(
    postKnock({
      pathParams: { roomIdOrAlias },
      searchParams: {
        server_name: "server.name",
      },
      body,
    }),
  ).toEqual({
    method: "POST",
    path: `/_matrix/client/v3/knock/${encodeURIComponent(roomIdOrAlias)}?server_name=server.name`,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
