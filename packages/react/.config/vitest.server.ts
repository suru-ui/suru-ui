import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  esbuild: {
    target: [
      "es2020",
      "node22",
    ],
  },
  plugins: [
    react(),
  ],
  test: {
    include: [
      "tests/**/*.test.ts",
      "tests/**/*.test.tsx",
    ],
    exclude: [
      "tests/**/*.client.test.ts",
      "tests/**/*.client.test.tsx",
      "tests/**/*.stories.test.tsx",
    ],
  },
});
