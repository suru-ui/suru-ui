import { defineConfig } from "vite-plus";

export default defineConfig({
  oxc: { target: "es2020" },
  pack: {
    dts: {
      generator: "oxc",
      sourcemap: true,
    },
    entry: ["../src/index.ts"],
    format: ["esm"],
    outDir: "../dist",
    target: "es2020",
    platform: "node",
    tsconfig: "tsconfig.build.json",
    sourcemap: true,
    fixedExtension: false,
  },
  test: {
    include: ["tests/**/*.test.ts"],

    coverage: {
      include: ["src/**/*.ts"],

      provider: "v8",
      reporter: ["text", "json-summary", "html"],
      // thresholds: {
      //   lines: 85,
      //   branches: 85,
      //   functions: 85,
      //   statements: 85,
      // },
      reportsDirectory: "./coverage",
    },
  },
});
