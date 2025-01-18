import * as esbuild from "esbuild";
import { replace } from "esbuild-plugin-replace";
import * as fs from "node:fs/promises";
import tsconfig from "./../../../tsconfig.json" with { type: "json" };
import resolve from "./esbuild-plugin-resolve.js";

export interface BuildOptions {
  /**
   * @default "dist"
   */
  outDir?: string | undefined;
  /**
   * @default "browser"
   */
  platform?: esbuild.Platform | undefined;
}

export default async function build(options: BuildOptions | undefined = {}): Promise<void> {
  const {
    outDir = "dist",
    platform = "browser",
  } = options;
  await esbuild.build({
    // General

    platform,
    bundle: true,
    target: [
      tsconfig.compilerOptions.target,
      "safari15",
    ],

    // Input

    entryPoints: await Array.fromAsync(
      fs.glob(`src/**/*.{ts,tsx}`, {
        exclude: file => (
          file.endsWith(".d.ts")
          || file.endsWith(".stories.tsx")
          || file.includes("/__snapshots__/")
        ),
      }),
    ),

    // Output contents

    format: "esm",
    lineLimit: 100,

    // Output location

    write: true,
    outdir: outDir,
    outbase: "src",
    outExtension: {
      ".js": ".js",
    },

    // Transformation

    jsx: "automatic",

    // Source maps

    sourcemap: "linked",

    // Plugins

    plugins: [
      resolve(),
      replace({
        "__DEV__": `process.env.NODE_ENV !== "production"`,
      }),
    ],
  });
}
