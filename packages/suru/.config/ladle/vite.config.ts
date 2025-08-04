import { presetWind3 } from "unocss";
import unocss from "unocss/vite";
import { defineConfig } from "vite";
import { presetSuru } from "../../src/unocss-vite";

// @ts-expect-error
global.__DEV__ = true;

export default defineConfig({
  define: {
    __DEV__: "true",
  },
  plugins: [
    unocss({
      presets: [
        presetWind3(),
        presetSuru(),
      ],
    }),
  ],
});
