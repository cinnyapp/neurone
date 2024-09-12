import {
  version,
  postVersion,
  versionVersion,
  putVersionVersion,
  deleteVersionVersion,
} from "./version";

test("get rooms key version request", () => {
  expect(version()).toEqual({
    method: "GET",
    path: "/_matrix/client/v3/room_keys/version",
    rateLimited: true,
    requireAuthentication: true,
  });
});

test("post rooms key version request", () => {
  const body = {
    algorithm: "algo",
    auth_data: {},
  };

  expect(postVersion(body)).toEqual({
    method: "POST",
    path: "/_matrix/client/v3/room_keys/version",
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});

test("get rooms key version version request", () => {
  const version = "1";

  expect(
    versionVersion({
      version,
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/room_keys/version/${encodeURIComponent(version)}`,
    rateLimited: true,
    requireAuthentication: true,
  });
});

test("put rooms key version version request", () => {
  const version = "1";
  const body = {
    algorithm: "algo",
    auth_data: {},
  };

  expect(
    putVersionVersion(
      {
        version,
      },
      body,
    ),
  ).toEqual({
    method: "PUT",
    path: `/_matrix/client/v3/room_keys/version/${encodeURIComponent(version)}`,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});

test("delete rooms key version version request", () => {
  const version = "1";

  expect(
    deleteVersionVersion({
      version,
    }),
  ).toEqual({
    method: "DELETE",
    path: `/_matrix/client/v3/room_keys/version/${encodeURIComponent(version)}`,
    rateLimited: true,
    requireAuthentication: true,
  });
});
