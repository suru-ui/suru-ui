import { presetWind3 } from "unocss";
import unocss from "unocss/vite";
import { defineConfig } from "vite";
global.__DEV__ = true;
import presetSuiSuru from "../../src/unocss-vite";

export default defineConfig({
  define: {
    __DEV__: "true",
  },
  plugins: [
    unocss({
      presets: [
        presetWind3(),
        presetSuiSuru(),
      ],
    }),
  ],
});
