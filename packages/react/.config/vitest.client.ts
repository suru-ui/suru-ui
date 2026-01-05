import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { presetWind3 } from "unocss";
import unocss from "unocss/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  esbuild: {
    target: "es2020",
  },
  plugins: [
    react(),
  ],
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          unocss({
            presets: [
              presetWind3(),
            ],
          }),
        ],
        test: {
          name: "storybook",
          include: [
            "tests/**/*.stories.test.tsx",
          ],
          browser: {
            provider: playwright(),
            enabled: true,
            headless: true,
            instances: [
              { browser: "chromium" },
            ],
          },
          setupFiles: [".config/storybook/vitest.setup.ts"],
        },
      },
      {
        extends: true,
        test: {
          name: "unit-test",
          include: [
            "tests/**/*.test.ts",
            "tests/**/*.test.tsx",
          ],
          exclude: [
            "tests/**/*.server.test.ts",
            "tests/**/*.server.test.tsx",
            "tests/**/*.stories.test.tsx",
          ],
          browser: {
            provider: playwright(),
            enabled: true,
            headless: true,
            instances: [
              { browser: "chromium" },
            ],
          },
        },
      },
    ],
  },
});
