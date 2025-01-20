import * as path from "node:path";

/** @type {import("@ladle/react").UserConfig} */
export default {
  viteConfig: path.join(import.meta.dirname, "vite.config.ts"),
};
