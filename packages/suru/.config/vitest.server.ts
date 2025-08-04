import { defineConfig } from "vitest/config";

export default defineConfig({
  esbuild: {
    target: "node22",
  },
  define: {
    __DEV__: "true",
  },
  test: {
    include: [
      "**\/*.test.ts?(x)",
    ],
    exclude: [
      "**\/*.client.test.ts?(x)",
    ],
    passWithNoTests: true,
  },
});
