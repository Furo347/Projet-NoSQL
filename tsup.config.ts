import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/server.ts"
  ],
  sourcemap: true,
  clean: true,
  format: "esm",
  target: "esnext"
})