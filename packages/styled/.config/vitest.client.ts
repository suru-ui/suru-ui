import { defineConfig } from "vitest/config";

export default defineConfig({
  esbuild: {
    target: "safari15",
  },
  define: {
    __DEV__: "true",
  },
  test: {
    include: [
      "**\/*.test.ts?(x)",
    ],
    exclude: [
      "**\/*.server.test.ts?(x)",
    ],
    passWithNoTests: true,
    browser: {
      provider: "playwright",
      enabled: true,
      headless: true,
      instances: [
        {
          browser: "chromium",
        },
      ],
    },
  },
});
