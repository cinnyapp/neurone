export class ObjectReader {
  static isRecord(object: unknown): object is Record<string, unknown> {
    return (
      typeof object === "object" && object !== null && !Array.isArray(object)
    );
  }

  static string(object: unknown, key: string): string | undefined {
    return ObjectReader.isRecord(object) && typeof object[key] === "string"
      ? object[key]
      : undefined;
  }

  static number(object: unknown, key: string): number | undefined {
    return ObjectReader.isRecord(object) && typeof object[key] === "number"
      ? object[key]
      : undefined;
  }

  static boolean(object: unknown, key: string): boolean | undefined {
    return ObjectReader.isRecord(object) && typeof object[key] === "boolean"
      ? object[key]
      : undefined;
  }

  static null(object: unknown, key: string): null | undefined {
    return ObjectReader.isRecord(object) && object[key] === null
      ? null
      : undefined;
  }

  static object(object: unknown, key: string): object | undefined {
    return ObjectReader.isRecord(object) && ObjectReader.isRecord(object[key])
      ? object[key]
      : undefined;
  }

  static array(object: unknown, key: string): unknown[] | undefined {
    return ObjectReader.isRecord(object) && Array.isArray(object[key])
      ? object[key]
      : undefined;
  }
}
