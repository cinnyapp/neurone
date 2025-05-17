import { KeyValue, PrimitiveKeyValue } from "./Entry";

export class QueryRange<T extends KeyValue> {
  public readonly lower?: T;

  public readonly upper?: T;

  constructor(lower?: T, upper?: T) {
    this.lower = lower;
    this.upper = upper;
  }

  private comparePrimitiveLower<U extends PrimitiveKeyValue>(
    value: U,
    lower?: U,
  ): boolean {
    if (!lower) return true;
    return lower <= value;
  }

  private compareLower(value: T): boolean {
    const lower = this.lower;
    if (!lower) return true;

    if (Array.isArray(value)) {
      if (Array.isArray(lower)) {
        if (value.length < lower.length) return false;
        return value.every((v, index) =>
          this.comparePrimitiveLower(v, lower[index]),
        );
      }
      return true;
    }
    if (Array.isArray(lower)) {
      return false;
    }
    return this.comparePrimitiveLower(value, lower);
  }

  private comparePrimitiveUpper<U extends PrimitiveKeyValue>(
    value: U,
    upper?: U,
  ): boolean {
    if (!upper) return true;
    return value <= upper;
  }

  private compareUpper(value: T): boolean {
    const upper = this.upper;
    if (!upper) return true;

    if (Array.isArray(value)) {
      if (Array.isArray(upper)) {
        if (value.length > upper.length) return false;
        return value.every((v, index) =>
          this.comparePrimitiveUpper(v, upper[index]),
        );
      }
      return false;
    }
    if (Array.isArray(upper)) {
      return true;
    }
    return this.comparePrimitiveUpper(value, upper);
  }

  public includes(value: T): boolean {
    return this.compareLower(value) && this.compareUpper(value);
  }
}
