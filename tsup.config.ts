import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/server.ts",
    "src/api/**/*.ts"
  ],
  splitting: false,
  sourcemap: true,
  clean: true,
  format: "esm",
  target: "esnext"
})