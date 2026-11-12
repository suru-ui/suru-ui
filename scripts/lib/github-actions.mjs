import { appendFileSync } from "node:fs";

/**
 * ログを折りたたみ可能なグループとして開始します。
 *
 * @param {string} name グループの名前です。
 */
function startGroup(name) {
  console.log(`::group::${name}`);
}

/** ログのグループを終了します。 */
function endGroup() {
  console.log("::endgroup::");
}

/**
 * 通知メッセージを出力します。
 *
 * @param {string} message 通知内容です。
 */
function issueNotice(message) {
  console.log(`::notice::${message}`);
}

/**
 * 警告メッセージを出力します。
 *
 * @param {string} message 警告内容です。
 */
function issueWarning(message) {
  console.log(`::warning::${message}`);
}

/**
 * エラーメッセージを出力します。
 *
 * @param {string} message エラー内容です。
 */
function issueError(message) {
  console.log(`::error::${message}`);
}

/**
 * GitHub Actions の出力ファイルのパスを取得します。
 *
 * @param {string} name 環境変数の名前です。
 *
 * @returns {string} 出力ファイルのパスです。
 */
function outputFilePath(name) {
  const path = process.env[name];

  if (path === undefined || path === "") {
    throw new Error(`${name} が設定されていません。GitHub Actions の実行環境で使ってください。`);
  }

  return path;
}

/**
 * heredoc の区切り文字を生成します。
 *
 * 値に含まれない文字列にするため、`EOF` から始め、重なる場合は先頭に `_` を足します。
 *
 * @param {string} value 書き込む値です。
 *
 * @returns {string} 値に含まれない区切り文字です。
 */
function createDelimiter(value) {
  let delimiter = "EOF";

  while (value.includes(delimiter)) {
    delimiter = `_${delimiter}`;
  }

  return delimiter;
}

/**
 * 値を GITHUB_OUTPUT 形式の 1 件分に整形します。
 *
 * 値に改行を含む場合は heredoc 形式にし、含まない場合は `name=value` 形式にします。
 *
 * @param {string} name 出力名です。
 * @param {string} value 出力値です。
 *
 * @returns {string} 追記する内容です。
 */
function formatOutput(name, value) {
  if (value.includes("\n") || value.includes("\r")) {
    const delimiter = createDelimiter(value);

    return `${name}<<${delimiter}\n${value}\n${delimiter}\n`;
  }

  return `${name}=${value}\n`;
}

/**
 * GITHUB_OUTPUT に 1 件追記します。
 *
 * @param {string} name 出力名です。
 * @param {string} value 出力値です。
 */
function appendOutput(name, value) {
  appendFileSync(outputFilePath("GITHUB_OUTPUT"), formatOutput(name, value), "utf8");
}

/**
 * GITHUB_OUTPUT に複数件追記します。
 *
 * @param {Record<string, string>} record 出力名から出力値への対応です。
 */
function appendOutputs(record) {
  for (const [name, value] of Object.entries(record)) {
    appendOutput(name, value);
  }
}

/**
 * GITHUB_STEP_SUMMARY に Markdown を追記します。
 *
 * 末尾に改行がない場合は改行を付けて追記します。
 *
 * @param {string} markdown 追記する Markdown です。
 */
function appendSummary(markdown) {
  const body = markdown.endsWith("\n") ? markdown : `${markdown}\n`;
  appendFileSync(outputFilePath("GITHUB_STEP_SUMMARY"), body, "utf8");
}

export {
  endGroup,
  issueError,
  startGroup,
  issueNotice,
  appendOutput,
  issueWarning,
  appendOutputs,
  appendSummary,
};
