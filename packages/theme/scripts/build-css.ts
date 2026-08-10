import { readFile, writeFile, readdir, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SRC = resolve(ROOT, "src");
const DIST = resolve(ROOT, "dist");

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

/** Files that are included verbatim in every output. */
const COMMON_FILES = new Set(["layers.css", "reset.css", "source.css", "utilities.css"]);

/** Regex to extract family and mode from token filenames (e.g. tokens.suru.dark.css → ["suru", "dark"]). */
const THEME_FILE_RE = /^tokens\.(.+)\.(.+)\.css$/;

/** Theme-mode definitions — media query + attribute selector. */
const THEMES = {
  dark: {
    media: "(prefers-color-scheme: dark)",
    attr: '[data-theme="dark"]',
  },
  light: {
    media: "(prefers-color-scheme: light)",
    attr: '[data-theme="light"]',
  },
} as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function indent(text: string, level: number): string {
  const pad = "  ".repeat(level);
  return text
    .split("\n")
    .map((line) => (line.length > 0 ? `${pad}${line}` : line))
    .join("\n");
}

/**
 * Extract inner declarations from a `.layer__sui_tokens { … }` block.
 *
 * Returns the raw property declarations (one per line) with leading/trailing
 * whitespace stripped, ready to be re-indented into a new wrapper.
 */
function extractTokenDeclarations(content: string): string {
  const lines = content.split("\n");
  const startIdx = lines.findIndex((l) => l.includes("{"));
  const endIdx = lines.findLastIndex((l) => l.includes("}"));

  if (startIdx === -1 || endIdx === -1 || startIdx >= endIdx) {
    throw new Error(
      "Could not find a valid `.layer__sui_tokens { … }` block in:\n" + content.slice(0, 200),
    );
  }

  return lines
    .slice(startIdx + 1, endIdx)
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .join("\n");
}

/**
 * \@layer sui.tokens {
 *   :root {
 *     <declarations>
 *   }
 * }
 */
function buildRootBlock(declarations: string): string {
  return [
    `@layer sui.tokens {`,
    indent(`:root {`, 1),
    indent(declarations, 2),
    indent(`}`, 1),
    `}`,
  ].join("\n");
}

/**
 * \@layer sui.tokens {
 *   [data-theme="<mode>"] {
 *     <declarations>
 *   }
 * }
 */
function buildAttrBlock(theme: "dark" | "light", declarations: string): string {
  const { attr } = THEMES[theme];

  return [
    `@layer sui.tokens {`,
    indent(`${attr} {`, 1),
    indent(declarations, 2),
    indent(`}`, 1),
    `}`,
  ].join("\n");
}

/**
 * \@media (prefers-color-scheme: <mode>) {
 *   @layer sui.tokens {
 *     :root {
 *       <declarations>
 *     }
 *   }
 * }
 */
function buildMediaBlock(theme: "dark" | "light", declarations: string): string {
  const { media } = THEMES[theme];

  return [
    `@media ${media} {`,
    indent(`@layer sui.tokens {`, 1),
    indent(`:root {`, 2),
    indent(declarations, 3),
    indent(`}`, 2),
    indent(`}`, 1),
    `}`,
  ].join("\n");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  // 1. Discover source files
  const entries = await readdir(SRC);
  const cssFiles = entries.filter((f) => f.endsWith(".css"));

  // 2. Read and classify files
  const commonParts: string[] = [];
  const families = new Map<string, Map<string, string>>();

  for (const file of cssFiles) {
    const content = await readFile(resolve(SRC, file), "utf-8");

    if (COMMON_FILES.has(file)) {
      commonParts.push(content);
    } else {
      const match = file.match(THEME_FILE_RE);

      if (match) {
        const family = match[1]!; // e.g. "suru", "vscode"
        const mode = match[2]!; // e.g. "dark", "light"
        const decls = extractTokenDeclarations(content);

        let modes = families.get(family);

        if (!modes) {
          modes = new Map();
          families.set(family, modes);
        }

        modes.set(mode, decls);
      }
    }
  }

  const commonBlock = commonParts.join("\n\n");

  // 3. Ensure output directory exists
  await mkdir(DIST, { recursive: true });

  // 4. Build output files per family
  for (const [family, modes] of families) {
    const darkDecl = modes.get("dark");
    const lightDecl = modes.get("light");

    // {family}-{mode}.css — single-mode files
    if (darkDecl) {
      const css = [commonBlock, buildRootBlock(darkDecl), buildAttrBlock("dark", darkDecl)].join(
        "\n\n",
      );

      await writeFile(resolve(DIST, `${family}-dark.css`), `${css}\n`);
    }

    if (lightDecl) {
      const css = [commonBlock, buildRootBlock(lightDecl), buildAttrBlock("light", lightDecl)].join(
        "\n\n",
      );

      await writeFile(resolve(DIST, `${family}-light.css`), `${css}\n`);
    }

    // {family}.css — combined modes
    // Order: media blocks first (system preference), then attr blocks (manual override)
    if (darkDecl && lightDecl) {
      const css = [
        commonBlock,
        buildMediaBlock("dark", darkDecl),
        buildMediaBlock("light", lightDecl),
        buildAttrBlock("dark", darkDecl),
        buildAttrBlock("light", lightDecl),
      ].join("\n\n");

      await writeFile(resolve(DIST, `${family}.css`), `${css}\n`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
