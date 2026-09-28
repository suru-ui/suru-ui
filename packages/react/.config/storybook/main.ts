import { defineMain } from "@storybook/react-vite/node";
import { presetSuruUI } from "@suru-ui/unocss";
import react from "@vitejs/plugin-react";
import { presetWind3 } from "unocss";
import unocss from "unocss/vite";
import { mergeConfig } from "vite";

export default defineMain({
  framework: "@storybook/react-vite",
  stories: ["../../stories/**/*.stories.tsx"],
  addons: ["@storybook/addon-docs", "@storybook/addon-themes", "@storybook/addon-vitest"],
  core: {
    builder: "@storybook/builder-vite",
    allowedHosts: ["storybook.tai-kun.dev"],
    disableTelemetry: true,
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [
        react(),
        unocss({
          presets: [
            presetWind3(),
            presetSuruUI({ namespace: false }), // Suru UI のデザイントークンで上書きします。
          ],
        }),
      ],
    });
  },
});
