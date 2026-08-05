import { execFile } from "node:child_process";
import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import { afterEach, beforeEach, describe, expect, test } from "vitest";

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
    await rm(tmp, { recursive: true, force: true });
  });

  test("テーマごとの CSS ファイルを生成する", async () => {
    // 実行
    await runBuild(tmp);

    // 検証
    await expect(readDist(tmp, "suru.css")).resolves.toBeTruthy();
    await expect(readDist(tmp, "suru-dark.css")).resolves.toBeTruthy();
    await expect(readDist(tmp, "suru-light.css")).resolves.toBeTruthy();
  });

  test("共通部分 (レイヤー・ソース・ユーティリティー) をすべてのファイルに含める", async () => {
    // 準備
    await runBuild(tmp);

    // 実行
    const css = await readDist(tmp, "suru.css");

    // 検証
    expect(css).toContain("@layer sui;");
    expect(css).toContain("@layer sui.source;");
    expect(css).toContain("@layer sui.tokens;");
    expect(css).toContain("@layer sui.utilities;");
    expect(css).toContain("@layer sui.component;");
    expect(css).toContain("@layer sui.important;");
    expect(css).toMatch(/--_flexoki-paper:\s+#fffcf0/i);
    expect(css).toContain("@function --_sui-exp-func(--level, --base, --growth, --offset)");
  });

  test("システム設定用のメディアクエリーと手動設定用の属性セレクターを生成する", async () => {
    // 準備
    await runBuild(tmp);

    // 実行
    const css = await readDist(tmp, "suru.css");

    // 検証: メディアクエリー → 属性セレクターの順に並ぶ
    const order = [
      css.indexOf("@media (prefers-color-scheme: dark)"),
      css.indexOf("@media (prefers-color-scheme: light)"),
      css.indexOf('[data-theme="dark"]'),
      css.indexOf('[data-theme="light"]'),
    ];
    expect(order).toEqual([...order].sort((a, b) => a - b));
    expect(order).not.toContain(-1);

    // 検証: 各ブロックにテーマ名が含まれる
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

    expect(darkMediaBlock).toContain("--sui-theme: dark");
    expect(lightMediaBlock).toContain("--sui-theme: light");
    expect(darkAttrBlock).toContain("--sui-theme: dark");
    expect(lightAttrBlock).toContain("--sui-theme: light");
  });

  test("単一モードのファイルは :root と属性セレクターにトークンを書き出す", async () => {
    // 準備
    await runBuild(tmp);

    // 実行
    const darkCss = await readDist(tmp, "suru-dark.css");
    const lightCss = await readDist(tmp, "suru-light.css");

    // 検証
    expect(darkCss).toContain("@layer sui.tokens {\n  :root {");
    expect(darkCss).toContain('[data-theme="dark"] {');
    expect(darkCss).toContain("--sui-theme: dark");
    expect(darkCss).not.toContain("prefers-color-scheme");
    expect(darkCss).not.toContain("--sui-theme: light");

    expect(lightCss).toContain("@layer sui.tokens {\n  :root {");
    expect(lightCss).toContain('[data-theme="light"] {');
    expect(lightCss).toContain("--sui-theme: light");
    expect(lightCss).not.toContain("prefers-color-scheme");
    expect(lightCss).not.toContain("--sui-theme: dark");
  });

  test("トークンファイルが壊れているとエラーになる", async () => {
    // 準備
    await writeFile(join(tmp, "src", "tokens.broken.unknown.css"), ".broken { color: red; }\n");

    // 実行・検証
    await expect(runBuild(tmp)).rejects.toMatchObject({
      stderr: expect.stringContaining("Could not find a valid `.layer__sui_tokens { … }` block"),
    });
  });
});
