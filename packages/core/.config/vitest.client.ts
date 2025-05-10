import { defineConfig } from "vitest/config";

export default defineConfig({
  define: {
    __DEV__: "true",
  },
  test: {
    exclude: [
      "**\/*.server.test.ts?(x)",
    ],
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
