import { defineConfig } from "vite-plus";

export default defineConfig({
  oxc: { target: "es2020" },
  test: {
    exclude: ["src/**/*.client.test.{ts,tsx}", "tests/**/*.client.test.{ts,tsx}"],
    include: ["src/**/*.test.{ts,tsx}", "tests/**/*.test.{ts,tsx}"],

    coverage: {
      include: ["src/**/*.ts", "src/**/*.tsx"],

      provider: "v8",
      reporter: ["text", "json-summary", "html"],
      thresholds: {
        lines: 85,
        branches: 85,
        functions: 85,
        statements: 85,
      },
      reportsDirectory: "./coverage/server",
    },
  },
});
