import { defineMain } from "@storybook/react-vite/node";
import { presetSuruUI } from "@suru-ui/unocss";
import react from "@vitejs/plugin-react";
import { presetWind3 } from "unocss";
import unocss from "unocss/vite";
import { mergeConfig } from "vite-plus";

export default defineMain({
  core: {
    builder: "@storybook/builder-vite",
    allowedHosts: ["storybook.tai-kun.dev"],
    disableTelemetry: true,
  },
  addons: ["@storybook/addon-docs", "@storybook/addon-themes", "@storybook/addon-vitest"],
  stories: ["../../src/**/*.stories.tsx"],
  framework: "@storybook/react-vite",
  async viteFinal(config) {
    // Vite+ と各プラグインの Vite 型は実装が異なり、配列リテラルにすると TypeScript のスタック上限を超えるため、unknown[] として渡します。
    const plugins: unknown[] = [];
    plugins.push(react());
    plugins.push(
      unocss({
        presets: [
          presetWind3(),
          presetSuruUI({ namespace: false }), // Suru UI のデザイントークンで上書きします。
        ],
      }),
    );

    return mergeConfig(config, { plugins });
  },
});
