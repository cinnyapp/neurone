import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src", "!src/**/*.test.*"],
  outDir: "./lib",
  format: ["esm"],
  platform: "neutral",
  splitting: true,
  bundle: false,
  dts: false,
  sourcemap: false,
  clean: true,
  minify: false,
});
