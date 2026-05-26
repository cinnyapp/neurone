export class Base64 {
  static encode(data: Uint8Array): string {
    // Node.js / Bun / Deno (Node compat)
    if (typeof Buffer !== "undefined") {
      return Buffer.from(data).toString("base64");
    }

    // Browser
    let binary = "";

    for (let i = 0; i < data.length; i++) {
      binary += String.fromCharCode(data[i]);
    }

    return btoa(binary);
  }

  static decode(data: string): Uint8Array {
    // Support base64url
    let safeData = data.replace(/-/g, "+").replace(/_/g, "/");

    // Restore padding
    while (safeData.length % 4 !== 0) {
      safeData += "=";
    }

    // Node.js / Bun / Deno (Node compat)
    if (typeof Buffer !== "undefined") {
      return new Uint8Array(Buffer.from(safeData, "base64"));
    }

    // Browser
    const binary = atob(safeData);
    const bytes = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    return bytes;
  }
}
