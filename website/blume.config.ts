import { defineConfig } from "blume";

import "./.settings";

export default defineConfig({
  title: __PAGE_TITLE,
  description: "TypeScript 製の UI ライブラリー",
  basePath: __BASE_PATH ?? undefined,
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
    selectors: [
      {
        kind: "version",
        label: "Version",
        items: [
          {
            label: "v0 (latest)",
            path: "/",
          },
        ],
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
    locales: __LOCALES,
    defaultLocale: "ja",
    fallbackLocale: "en",
  },
});
