import type { Plugin } from "esbuild";
import * as fs from "node:fs";
import * as path from "node:path";

export default function esbuildPluginResolve(): Plugin {
  const accessCache: Record<string, boolean> = {};

  function exists(file: string): boolean {
    if (file in accessCache) {
      return accessCache[file]!;
    }

    try {
      fs.accessSync(file, fs.constants.R_OK);

      return (accessCache[file] = fs.statSync(file).isFile());
    } catch {
      return (accessCache[file] = false);
    }
  }

  const builtPathCache: Record<string, string | null> = {};

  function createGetBuiltPath(resolvers: [string, string][]) {
    return function getBuiltPath(
      resolveDir: string,
      file: string,
    ): string | null {
      const filepath = path.resolve(resolveDir, file);

      if (filepath in builtPathCache) {
        return builtPathCache[filepath]!;
      }

      for (const [src, dst] of resolvers) {
        if (exists(filepath + src)) {
          return (builtPathCache[filepath] = filepath + dst);
        }
      }

      return (builtPathCache[filepath] = null);
    };
  }

  function createToOutFilePath(resolveDir: string) {
    return function toOutFilePath(file: string): string {
      file = path.normalize(path.relative(resolveDir + "/", file));

      if (!file.startsWith(".")) {
        file = `.${path.sep}${file}`;
      }

      return file;
    };
  }

  return {
    name: "esbuild-plugin-resolve",
    setup(build) {
      if (build.initialOptions.bundle !== true) {
        throw new Error("esbuild-plugin-resolve はバンドルモードでのみ動作します。");
      }

      const resolvers = Object.entries({
        "": "",
        ".ts": ".js",
        ".tsx": ".js",
        ".mts": ".mjs",
        ".cts": ".cjs",
        "/index.ts": "/index.js",
        "/index.tsx": "/index.js",
        "/index.mts": "/index.mjs",
        "/index.cts": "/index.cjs",
        ".js": ".js",
        ".jsx": ".js",
        ".mjs": ".mjs",
        ".cjs": ".cjs",
        "/index.js": "/index.js",
        "/index.jsx": "/index.js",
        "/index.mjs": "/index.mjs",
        "/index.cjs": "/index.cjs",
      });
      const getBuiltPath = createGetBuiltPath(resolvers);

      build.onResolve({ filter: /.*/ }, async args => {
        const { namespace, kind, path: pkg, resolveDir } = args;
        const toOutFilePath = createToOutFilePath(resolveDir);

        switch (true) {
          case namespace !== "file" || kind !== "import-statement":
            return null;

          case pkg.startsWith("."): {
            const builtPath = getBuiltPath(resolveDir, pkg);

            if (builtPath) {
              return {
                path: toOutFilePath(builtPath),
                external: true,
              };
            }

            return {
              errors: [
                {
                  text: `パッケージを解決できませんでした: ${pkg}`,
                },
              ],
            };
          }

          default:
            return {
              external: true,
            };
        }
      });
    },
  };
}
