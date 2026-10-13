/*
Cinny Project
Copyright 2024-present Ajay Bura
SPDX-License-Identifier: Apache-2.0
https://cinny.in

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

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

test("string search param", () => {
  expect(
    withSearchParams("/my_path", {
      abc: "1",
    }),
  ).toBe("/my_path?abc=1");
});

test("number search param", () => {
  expect(
    withSearchParams("/my_path", {
      page: 2,
    }),
  ).toBe("/my_path?page=2");
});

test("boolean search param", () => {
  expect(
    withSearchParams("/my_path", {
      active: true,
    }),
  ).toBe("/my_path?active=true");
});

test("null search param", () => {
  expect(
    withSearchParams("/my_path", {
      value: null,
    }),
  ).toBe("/my_path?value=null");
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

test("array search params", () => {
  expect(
    withSearchParams("/my_path", {
      tag: ["a", "b", "c"],
    }),
  ).toBe("/my_path?tag=a&tag=b&tag=c");
});

test("mixed primitive array search params", () => {
  expect(
    withSearchParams("/my_path", {
      value: [1, true, "abc", null],
    }),
  ).toBe("/my_path?value=1&value=true&value=abc&value=null");
});

test("undefined inside array is ignored", () => {
  expect(
    withSearchParams("/my_path", {
      value: ["a", undefined, "b"] as string[],
    }),
  ).toBe("/my_path?value=a&value=b");
});
