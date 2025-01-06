import { QueryRange } from "./QueryRange";

test("test query range for numbers", () => {
  expect(new QueryRange<number>().includes(1)).toBeTruthy();
  expect(new QueryRange<number>(1, 1).includes(1)).toBeTruthy();
  expect(new QueryRange<number>(1, 1).includes(2)).toBeFalsy();
  expect(new QueryRange<number>(1, 3).includes(2)).toBeTruthy();
  expect(new QueryRange<number>(1, 3).includes(0)).toBeFalsy();
  expect(new QueryRange<number>(1).includes(0)).toBeFalsy();
  expect(new QueryRange<number>(1).includes(2)).toBeTruthy();
  expect(new QueryRange<number>(1).includes(0)).toBeFalsy();
  expect(new QueryRange<number>(undefined, 2).includes(2)).toBeTruthy();
  expect(new QueryRange<number>(undefined, 2).includes(1)).toBeTruthy();
  expect(new QueryRange<number>(undefined, 2).includes(3)).toBeFalsy();
});

test("test query range for numbers array", () => {
  expect(new QueryRange<number[]>().includes([1])).toBeTruthy();
  expect(new QueryRange<number[]>([1], [1]).includes([1])).toBeTruthy();
  expect(new QueryRange<number[]>([1], [1]).includes([2])).toBeFalsy();
  expect(new QueryRange<number[]>([1], [3]).includes([2])).toBeTruthy();
  expect(new QueryRange<number[]>([1], [3]).includes([0])).toBeFalsy();
  expect(new QueryRange<number[]>([1], [3, 1]).includes([3, 0])).toBeTruthy();
  expect(new QueryRange<number[]>([1], [3, 1]).includes([3, 2])).toBeFalsy();
  expect(new QueryRange<number[]>([1], [3, 1]).includes([3, 1, 3])).toBeFalsy();
  expect(new QueryRange<number[]>(undefined, [3, 1]).includes([])).toBeTruthy();
  expect(new QueryRange<number[]>([3, 1]).includes([])).toBeFalsy();
  expect(new QueryRange<number[]>([3, 1]).includes([3, 2, 3])).toBeTruthy();
});
