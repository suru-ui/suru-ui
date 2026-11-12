import { defineConfig } from "vite-plus";
import { playwright } from "vite-plus/test/browser-playwright";

export default defineConfig({
  oxc: { target: "es2020" },
  test: {
    exclude: ["tests/**/*.server.test.ts", "tests/**/*.server.test.tsx"],
    include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],

    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: "chromium" }, { browser: "firefox" }, { browser: "webkit" }],
    },
    coverage: {
      include: ["src/**/*.ts", "src/**/*.tsx"],

      provider: "istanbul",
      reporter: ["text", "json-summary", "html"],
      thresholds: {
        lines: 85,
        branches: 85,
        functions: 85,
        statements: 85,
      },
      reportsDirectory: "./coverage/client",
    },
  },
});
