// Watches the Blume-generated astro.config.mjs and re-adds
// `vite.server.allowedHosts` whenever the file is regenerated.
import { watchFile } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";

const FILE = new URL("../.blume/astro.config.mjs", import.meta.url);
const HOSTS = JSON.stringify(["blume.tai-kun.dev"]);

function patch(src) {
  if (src.includes("blume.tai-kun.dev")) return null;
  const viteIdx = src.indexOf("vite:");
  const serverIdx = src.indexOf("server:", viteIdx);
  const braceIdx = src.indexOf("{", serverIdx);
  if (viteIdx === -1 || serverIdx === -1 || braceIdx === -1) return null;
  const lineStart = src.lastIndexOf("\n", serverIdx) + 1;
  const indent = src.slice(lineStart).match(/^[ \t]*/)[0];
  return (
    src.slice(0, braceIdx + 1) +
    "\n" +
    indent +
    "  " +
    `allowedHosts: ${HOSTS},` +
    src.slice(braceIdx + 1)
  );
}

async function apply() {
  try {
    const src = await readFile(FILE, "utf8");
    const patched = patch(src);
    if (patched === null) return;
    await writeFile(FILE, patched);
    console.log(`[watch-astro-config] patched ${FILE.pathname}`);
  } catch {
    // The file is not generated yet.
  }
}

process.on("SIGTERM", () => process.exit(0));

// setTimeout(async () => {
//   await apply();
//   setInterval(async () => {
//     await apply();
//   }, 3e3);
// }, 10e3);

await apply();
watchFile(FILE, { interval: 500 }, async () => {
  await new Promise((r) => setTimeout(r, 10e3));
  await apply();
});
console.log("[watch-astro-config] watching", FILE.pathname);

// await apply();
// watchFile(FILE, { interval: 500 }, async () => {
//   await apply();
// });
// console.log("[watch-astro-config] watching", FILE.pathname);
