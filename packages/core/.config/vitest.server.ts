import { defineConfig } from "vitest/config";

export default defineConfig({
  define: {
    __DEV__: "true",
  },
  test: {
    exclude: [
      "**\/*.client.test.ts?(x)",
    ],
    environment: "happy-dom",
    setupFiles: "./tests/setup.ts",
  },
});
