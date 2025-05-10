import unocss from "unocss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  define: {
    __DEV__: "true",
  },
  plugins: [
    unocss(),
  ],
});
