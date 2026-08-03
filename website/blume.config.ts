import { defineConfig } from "blume";

export default defineConfig({
  title: "Suru UI",
  description: "TypeScript 製の UI ライブラリー",
  github: {
    owner: "suru-ui",
    repo: "suru-ui",
  },
  examples: {
    css: "examples/theme.css",
  },
  i18n: {
    locales: [
      {
        code: "ja",
        label: "日本語",
      },
      {
        code: "en",
        label: "English",
      },
    ],
    defaultLocale: "ja",
    // hideDefaultLocalePrefix: false,
  },
});
