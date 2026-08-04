import { defineConfig } from "blume";

export default defineConfig({
  title: "Suru UI",
  description: "TypeScript 製の UI ライブラリー",
  github: {
    owner: "suru-ui",
    repo: "suru-ui",
  },
  navigation: {
    tabs: [
      {
        label: "React",
        path: "/docs/react",
      },
    ],
  },
  content: {
    root: "content",
  },
  examples: {
    css: "examples/.style.css",
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
