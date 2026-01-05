import addonDocs from "@storybook/addon-docs";
import addonThemes, { withThemeByDataAttribute } from "@storybook/addon-themes";
import addonVitest from "@storybook/addon-vitest";
import { definePreview } from "@storybook/react-vite";

import "@suru-ui/theme/all.css";
import "./preview.css";
import "virtual:uno.css";

export default definePreview({
  decorators: [
    withThemeByDataAttribute({
      themes: {
        "ダーク（標準）": "dark",
        "ライト（標準）": "light",
        "ダーク（ビビッド）": "dark-vivid",
        "ライト（ビビッド）": "light-vivid",
      },
      defaultTheme: "ダーク（標準）",
    }),
  ],
  addons: [
    addonDocs(),
    // @ts-expect-error よくわからないけど呼び出し可能じゃないらしい。
    addonThemes(),
    addonVitest(),
  ],
  parameters: {
    layout: "centered",
  },
  tags: [
    "autodocs",
  ],
});
