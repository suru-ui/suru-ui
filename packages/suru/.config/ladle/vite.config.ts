import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  define: {
    __DEV__: "true",
  },
  plugins: [
    tailwindcss(),
  ],
});
