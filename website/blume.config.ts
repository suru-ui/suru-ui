import { typeTableDetailsIds, routeByBrowserLanguage } from "@tai-kun/blume-integrations";
import { defineConfig } from "blume";
import { filesystem, githubReleases } from "blume/sources";

const PROJET_NAME = "Suru UI";
const GITHUB_REPO = "suru-ui";
const GITHUB_OWNER = "suru-ui";

export default defineConfig({
  integrations: [typeTableDetailsIds(), routeByBrowserLanguage()],

  title: PROJET_NAME,
  description: `Documentation for ${PROJET_NAME}`,

  content: {
    sources: [
      filesystem(),
      githubReleases({
        repo: GITHUB_REPO,
        owner: GITHUB_OWNER,
        prefix: "changelog",
      }),
    ],
  },
  examples: {
    css: "examples/examples.css",
  },
  deployment: {
    base: `/${GITHUB_REPO}`,
    site: `https://${GITHUB_OWNER}.github.io`,
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
  },
  navigation: {
    repo: `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`,
    tabs: [
      {
        path: "/",
        label: {
          en: "Documents",
          ja: "ドキュメント",
        },
      },
      {
        path: "/changelog",
        label: {
          en: "Changelog",
          ja: "変更履歴",
        },
      },
    ],
  },
});
