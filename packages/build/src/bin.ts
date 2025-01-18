#!/usr/bin/env node
import build, { type BuildOptions } from "./build.js";

function parseArgs(args: string[]): BuildOptions {
  const options: BuildOptions = {};

  for (let i = 2; i < args.length; i++) {
    const arg = args[i];

    if (arg === undefined) {
      throw new Error("no arg");
    }

    switch (true) {
      case arg.startsWith("--outDir="):
        options.outDir = arg.slice("--outDir=".length);
        break;

      case arg.startsWith("--platform="):
        options.platform = arg.slice("--platform=".length) as BuildOptions["platform"];
        break;

      default:
        throw new Error(`invalid arg: ${arg}`);
    }
  }

  return options;
}

async function main(): Promise<void> {
  const buildOptions = parseArgs(process.argv);
  await build(buildOptions);
}

main().then(
  () => {
    console.log("suru-ui(build): OK");
  },
  err => {
    console.error("suru-ui(build): ERR");
    console.error(err);
    process.exit(1);
  },
);
