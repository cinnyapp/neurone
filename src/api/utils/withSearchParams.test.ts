import { withSearchParams } from "./withSearchParams";

test("empty search param", () => {
  expect(withSearchParams("/my_path", {})).toBe("/my_path");
});

test("no search param", () => {
  expect(withSearchParams("/my_path")).toBe("/my_path");
});

test("no search param must not contain ?", () => {
  expect(withSearchParams("/my_path")).not.toBe("/my_path?");
});

test("empty search param must not contain ?", () => {
  expect(withSearchParams("/my_path", {})).not.toBe("/my_path?");
});

test("search param", () => {
  expect(
    withSearchParams("/my_path", {
      abc: "1",
    }),
  ).toBe("/my_path?abc=1");
});

test("optional search param as undefined", () => {
  const s: {
    abc?: string;
  } = {
    abc: undefined,
  };
  expect(withSearchParams("/my_path", s)).toBe("/my_path");
});

test("required and optional search param", () => {
  const s: {
    x: string;
    abc?: string;
  } = {
    x: "1",
    abc: undefined,
  };
  expect(withSearchParams("/my_path", s)).toBe("/my_path?x=1");
});
