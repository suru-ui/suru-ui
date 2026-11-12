import { execFile } from "node:child_process";
import { cp, rm, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import { test, expect, describe, afterEach, beforeEach } from "vite-plus/test";

const PACKAGE_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const execFileAsync = promisify(execFile);

async function runBuild(cwd: string): Promise<void> {
  await execFileAsync(process.execPath, ["scripts/build-css.ts"], { cwd });
}

async function readDist(cwd: string, name: string): Promise<string> {
  return readFile(join(cwd, "dist", name), "utf-8");
}

describe("build-css", () => {
  let tmp: string;
  beforeEach(async () => {
    tmp = await mkdtemp(join(tmpdir(), "suru-theme-"));
    await cp(join(PACKAGE_ROOT, "scripts"), join(tmp, "scripts"), { recursive: true });
    await cp(join(PACKAGE_ROOT, "src"), join(tmp, "src"), { recursive: true });
  });
  afterEach(async () => {
    await rm(tmp, {
      force: true,
      recursive: true,
    });
  });
  test("テーマごとの CSS ファイルを生成する", async () => {
    // 実行：
    await runBuild(tmp);

    // 検証：
    await expect(readDist(tmp, "suru.css")).resolves.toBeTruthy();
    await expect(readDist(tmp, "suru-dark.css")).resolves.toBeTruthy();
    await expect(readDist(tmp, "suru-light.css")).resolves.toBeTruthy();
  });
  test("共通部分 (レイヤー・ソース・ユーティリティー) をすべてのファイルに含める", async () => {
    // 準備：
    await runBuild(tmp);

    // 実行：
    const css = await readDist(tmp, "suru.css");

    // 検証：
    expect(css).toContain("@layer sui;");
    expect(css).toContain("@layer sui.source;");
    expect(css).toContain("@layer sui.tokens;");
    expect(css).toContain("@layer sui.utilities;");
    expect(css).toContain("@layer sui.component;");
    expect(css).toContain("@layer sui.important;");
    expect(css).toMatch(/--_flexoki-paper:\s+#fffcf0/iu);
    expect(css).toContain("@function --sui-rem(--length)");
  });
  test("システム設定用のメディアクエリーと手動設定用の属性セレクターを生成する", async () => {
    // 準備：
    await runBuild(tmp);

    // 実行：
    const css = await readDist(tmp, "suru.css");

    // 検証：メディアクエリー → 属性セレクターの順に並ぶ。
    const order = [
      css.indexOf("@media (prefers-color-scheme: dark)"),
      css.indexOf("@media (prefers-color-scheme: light)"),
      css.indexOf('[data-theme="dark"]'),
      css.indexOf('[data-theme="light"]'),
    ];
    expect(order).toStrictEqual(order.toSorted((a, b) => a - b));
    expect(order).not.toContain(-1);

    // 検証：各ブロックにテーマ名が含まれる。
    const darkMediaBlock = css.slice(
      css.indexOf("@media (prefers-color-scheme: dark)"),
      css.indexOf("@media (prefers-color-scheme: light)"),
    );
    const lightMediaBlock = css.slice(
      css.indexOf("@media (prefers-color-scheme: light)"),
      css.indexOf('[data-theme="dark"]'),
    );
    const darkAttrBlock = css.slice(
      css.indexOf('[data-theme="dark"]'),
      css.indexOf('[data-theme="light"]'),
    );
    const lightAttrBlock = css.slice(css.indexOf('[data-theme="light"]'));
    expect(darkMediaBlock).toContain("--sui-scheme: dark");
    expect(lightMediaBlock).toContain("--sui-scheme: light");
    expect(darkAttrBlock).toContain("--sui-scheme: dark");
    expect(lightAttrBlock).toContain("--sui-scheme: light");
  });
  test("単一モードのファイルは :root と属性セレクターにトークンを書き出す", async () => {
    // 準備：
    await runBuild(tmp);

    // 実行：
    const darkCss = await readDist(tmp, "suru-dark.css");
    const lightCss = await readDist(tmp, "suru-light.css");

    // 検証：
    expect(darkCss).toContain("@layer sui.tokens {\n  :root {");
    expect(darkCss).toContain('[data-theme="dark"] {');
    expect(darkCss).toContain("--sui-scheme: dark");
    expect(darkCss).not.toContain("prefers-color-scheme");
    expect(darkCss).not.toContain("--sui-scheme: light;");
    expect(lightCss).toContain("@layer sui.tokens {\n  :root {");
    expect(lightCss).toContain('[data-theme="light"] {');
    expect(lightCss).toContain("--sui-scheme: light");
    expect(lightCss).not.toContain("prefers-color-scheme");
    expect(lightCss).not.toContain("--sui-scheme: dark;");
  });
  test("アルファ版ソースをモード別のファイルに含める", async () => {
    // 準備：
    await runBuild(tmp);

    // 実行：
    const darkCss = await readDist(tmp, "suru-dark.css");
    const lightCss = await readDist(tmp, "suru-light.css");
    const css = await readDist(tmp, "suru.css");

    // 検証：単一モードのファイルは対応するモードのアルファ版ソースのみを含む。
    expect(darkCss).toContain("@layer sui.source {\n  :root {");
    expect(darkCss).toContain("--_flexoki-base-alpha-50: #f2f0e5");
    expect(darkCss).not.toContain("--_flexoki-base-50: rgb(239 237 226 / 0.8)");
    expect(lightCss).toContain("@layer sui.source {\n  :root {");
    expect(lightCss).toContain("--_flexoki-base-alpha-50: rgb(239 237 226 / 0.8)");
    expect(lightCss).not.toContain("--_flexoki-base-alpha-50: #f2f0e5");

    // 検証：結合ファイルはメディアクエリーと属性セレクターでモード分岐する。
    const darkMediaBlock = css.slice(
      css.indexOf("@media (prefers-color-scheme: dark)"),
      css.indexOf("@media (prefers-color-scheme: light)"),
    );
    const lightMediaBlock = css.slice(
      css.indexOf("@media (prefers-color-scheme: light)"),
      css.indexOf('[data-theme="dark"]'),
    );
    const darkAttrBlock = css.slice(
      css.indexOf('[data-theme="dark"]'),
      css.indexOf('[data-theme="light"]'),
    );
    const lightAttrBlock = css.slice(css.indexOf('[data-theme="light"]'));
    expect(darkMediaBlock).toContain("--_flexoki-base-alpha-50: #f2f0e5");
    expect(darkAttrBlock).toContain("--_flexoki-base-alpha-50: #f2f0e5");
    expect(lightMediaBlock).toContain("--_flexoki-base-alpha-50: rgb(239 237 226 / 0.8)");
    expect(lightAttrBlock).toContain("--_flexoki-base-alpha-50: rgb(239 237 226 / 0.8)");
  });
  test("トークンファイルが壊れているとエラーになる", async () => {
    // 準備：
    await writeFile(join(tmp, "src", "tokens.broken.unknown.css"), ".broken { color: red; }\n");

    // 実行・検証：
    await expect(runBuild(tmp)).rejects.toMatchObject({
      stderr: expect.stringContaining("Could not find a valid `.layer__sui_tokens { … }` block"),
    });
  });
});
