import { defineConfig } from "vite-plus";

export default defineConfig({
  oxc: { target: "es2020" },
  test: {
    exclude: ["tests/**/*.client.test.ts", "tests/**/*.client.test.tsx"],
    include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],

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
