import { QueryRange } from "./QueryRange"; // Adjust the import path as necessary

describe("QueryRange", () => {
  describe("includes", () => {
    it("should return true when no range is defined", () => {
      const range = new QueryRange<number>();
      expect(range.includes(5)).toBe(true);
      expect(range.includes(0)).toBe(true);
      expect(range.includes(100)).toBe(true);
    });

    it("should return true for value within a defined lower bound", () => {
      const range = new QueryRange<number>(5);
      expect(range.includes(5)).toBe(true); // Value equal to lower bound
      expect(range.includes(10)).toBe(true); // Value greater than lower bound
      expect(range.includes(0)).toBe(false); // Value less than lower bound
    });

    it("should return true for value within a defined upper bound", () => {
      const range = new QueryRange<number>(undefined, 10);
      expect(range.includes(10)).toBe(true); // Value equal to upper bound
      expect(range.includes(5)).toBe(true); // Value less than upper bound
      expect(range.includes(15)).toBe(false); // Value greater than upper bound
    });

    it("should return true for value within a defined lower and upper bound", () => {
      const range = new QueryRange<number>(5, 10);
      expect(range.includes(5)).toBe(true); // Lower bound
      expect(range.includes(7)).toBe(true); // Between bounds
      expect(range.includes(10)).toBe(true); // Upper bound
      expect(range.includes(0)).toBe(false); // Below lower bound
      expect(range.includes(15)).toBe(false); // Above upper bound
    });

    it("should return false when value is outside lower and upper bounds", () => {
      const range = new QueryRange<number>(5, 10);
      expect(range.includes(0)).toBe(false); // Below lower bound
      expect(range.includes(15)).toBe(false); // Above upper bound
    });

    it("should handle arrays as lower and upper bounds correctly", () => {
      const range = new QueryRange<number[]>([1, 2], [3, 4]);
      expect(range.includes([1, 2])).toBe(true); // Exactly the lower bound
      expect(range.includes([2, 3])).toBe(true); // Between bounds
      expect(range.includes([3, 4])).toBe(true); // Exactly the upper bound
      expect(range.includes([4, 5])).toBe(false); // Above upper bound
      expect(range.includes([0, 0])).toBe(false); // Below lower bound
    });

    it("should correctly compare array bounds element-wise", () => {
      const range = new QueryRange<number[]>([1, 2], [3, 4]);
      expect(range.includes([2, 3])).toBe(true); // Each element in range is valid
      expect(range.includes([3, 5])).toBe(false); // Second element is above upper bound
      expect(range.includes([0, 2])).toBe(false); // First element is below lower bound
    });

    it("should correctly handle edge cases for arrays with different lengths", () => {
      const range = new QueryRange<number[]>([1, 2], [3, 4]);
      expect(range.includes([1, 2])).toBe(true); // Equal length and values
      expect(range.includes([1])).toBe(false); // Array too short
      expect(range.includes([1, 2, 3])).toBe(false); // Array too long
    });
  });
});
