import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

import isDebugMode from "./_is-debug-mode.js";

export default defineConfig({
  plugins: [react()],
  oxc: {
    target: "es2020",
  },
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  define: {
    __DEBUG__: `${isDebugMode}`,
    __CLIENT__: "true",
    __SERVER__: "false",
  },
  test: {
    include: ["tests/**/*.test.{ts,tsx}"],
    exclude: ["tests/**/*.server.test.{ts,tsx}"],
    browser: {
      provider: playwright(),
      enabled: true,
      headless: true,
      instances: [{ browser: "chromium" }, { browser: "firefox" }, { browser: "webkit" }],
    },
  },
});
