import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { sync } from "./sync";

test("sync request with no search params", () => {
  const syncRequest = sync();

  expect(syncRequest).toEqual<MatrixRequestStruct>({
    method: "GET",
    path: "/_matrix/client/v3/sync",
    requireAuthentication: true,
  });
});

test("sync request with single search params", () => {
  const syncRequest = sync({
    set_presence: "offline",
  });

  expect(syncRequest).toEqual<MatrixRequestStruct>({
    method: "GET",
    path: "/_matrix/client/v3/sync?set_presence=offline",
    requireAuthentication: true,
  });
});

test("sync request with multiple search params", () => {
  const syncRequest = sync({
    set_presence: "offline",
    full_state: "true",
  });

  expect(syncRequest).toEqual<MatrixRequestStruct>({
    method: "GET",
    path: "/_matrix/client/v3/sync?set_presence=offline&full_state=true",
    requireAuthentication: true,
  });
});
