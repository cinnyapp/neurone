import { withSearchParams } from "./withSearchParams";

test("path with undefined search param", () => {
  expect(withSearchParams("/my_path")).toBe("/my_path");
});

test("path with empty search param", () => {
  expect(withSearchParams("/my_path", "")).toBe("/my_path");
});

test("path with empty search param not to be", () => {
  expect(withSearchParams("/my_path", "")).not.toBe("/my_path?");
});

test("path with search param", () => {
  expect(withSearchParams("/my_path", "abc=1")).toBe("/my_path?abc=1");
});
