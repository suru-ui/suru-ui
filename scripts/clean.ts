import { readdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function removeDirIfExists(path: string) {
  try {
    await rm(path, { recursive: true, force: true });
    console.log(`Deleted: ${path}`);
  } catch (err) {
    console.error(`Failed to delete ${path}:`, err);
  }
}

async function main() {
  // node_modules/
  await removeDirIfExists(join(__dirname, "..", "node_modules"));

  // packages/*/{dist,node_modules}/
  const packagesDir = join(__dirname, "..", "packages");
  let dirs: string[] = [];
  try {
    dirs = await readdir(packagesDir, { withFileTypes: true })
      .then(entries => entries.filter(e => e.isDirectory()).map(e => e.name));
  } catch {
    console.warn("No packages directory found.");
    return;
  }

  for (const dir of dirs) {
    const base = join(packagesDir, dir);
    await removeDirIfExists(join(base, "dist"));
    await removeDirIfExists(join(base, "node_modules"));
  }
}

main();
