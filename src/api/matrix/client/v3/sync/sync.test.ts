import { getSync } from "./sync";

test("sync request with no search params", () => {
  const syncRequest = getSync({});

  expect(syncRequest).toEqual({
    method: "GET",
    path: "/_matrix/client/v3/sync",
    requireAuthentication: true,
  });
});

test("sync request with single search params", () => {
  const syncRequest = getSync({
    searchParams: {
      set_presence: "offline",
    },
  });

  expect(syncRequest).toEqual({
    method: "GET",
    path: "/_matrix/client/v3/sync?set_presence=offline",
    requireAuthentication: true,
  });
});

test("sync request with multiple search params", () => {
  const syncRequest = getSync({
    searchParams: {
      set_presence: "offline",
      full_state: "true",
    },
  });

  expect(syncRequest).toEqual({
    method: "GET",
    path: "/_matrix/client/v3/sync?set_presence=offline&full_state=true",
    requireAuthentication: true,
  });
});
