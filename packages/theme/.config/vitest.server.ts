import { defineConfig } from "vitest/config";

export default defineConfig({
  esbuild: {
    target: [
      "es2020",
      "node22",
    ],
  },
  test: {
    include: [
      "tests/**/*.test.ts",
    ],
    exclude: [
      "tests/**/*.client.test.ts",
    ],
  },
});
