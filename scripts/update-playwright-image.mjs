#!/usr/bin/env node
/**
 * Playwright コンテナーイメージのタグを catalog の版に合わせます。
 *
 * mise update の一部として実行します。
 * .github/workflows 内の mcr.microsoft.com/playwright のタグを pnpm-workspace.yaml の catalog の版に書き換えます。
 * catalog と食い違うと、コンテナー同梱のブラウザーが見つからずテストが失敗します。
 *
 * Usage: node scripts/update-playwright-image.mjs
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * pnpm-workspace.yaml の catalog から playwright の版を読み取ります。
 *
 * @param {string} root リポジトリールートです。
 *
 * @returns {string} playwright の版です。
 */
function readCatalogPlaywrightVersion(root) {
  const path = join(root, "pnpm-workspace.yaml");
  const content = readFileSync(path, "utf8");
  const catalogIndex = content.search(/^catalog:/mu);

  if (catalogIndex < 0) {
    throw new Error(`${path}: catalog が見つかりません。`);
  }

  const catalog = content.slice(catalogIndex);
  const match = /^ {2}playwright: *(?<version>\S+) *$/mu.exec(catalog);
  const version = match?.groups?.version;

  if (version === undefined || !/^\d+\.\d+\.\d+$/u.test(version)) {
    throw new Error(`${path}: catalog の playwright の版が見つかりません。`);
  }

  return version;
}

/**
 * playwright の版からコンテナーイメージの参照を作ります。
 *
 * @param {string} version playwright の版です。
 *
 * @returns {string} コンテナーイメージの参照です。
 */
function playwrightImageRef(version) {
  return `mcr.microsoft.com/playwright:v${version}-noble`;
}

/**
 * ワークフロー定義内のイメージ参照を更新します。
 *
 * @param {string} content ワークフロー定義の内容です。
 * @param {string} version playwright の版です。
 *
 * @returns {{ content: string, replaced: number, found: number }} 更新後の内容と件数です。
 */
function updateWorkflowImage(content, version) {
  const ref = playwrightImageRef(version);
  const pattern = /mcr\.microsoft\.com\/playwright:v[^-"'\s]+-noble/gu;
  let replaced = 0;
  let found = 0;
  const next = content.replaceAll(pattern, (matched) => {
    found += 1;

    if (matched === ref) {
      return matched;
    }

    replaced += 1;

    return ref;
  });

  return {
    found,
    content: next,
    replaced,
  };
}

/** スクリプトの入口です。 */
function main() {
  const version = readCatalogPlaywrightVersion(ROOT);
  const workflowsDir = join(ROOT, ".github", "workflows");
  let total = 0;

  for (const name of readdirSync(workflowsDir).toSorted()) {
    if (!name.endsWith(".yml")) {
      continue;
    }

    const path = join(workflowsDir, name);
    const { found, content, replaced } = updateWorkflowImage(readFileSync(path, "utf8"), version);
    total += found;

    if (replaced === 0) {
      continue;
    }

    writeFileSync(path, content);
    console.log(`${path}: ${playwrightImageRef(version)} に更新しました（${replaced} 件）。`);
  }

  if (total === 0) {
    console.log("更新対象のイメージ参照はありません。");
  } else {
    console.log(`イメージ参照は ${playwrightImageRef(version)} と一致しています。`);
  }
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}

export { playwrightImageRef, updateWorkflowImage, readCatalogPlaywrightVersion };
