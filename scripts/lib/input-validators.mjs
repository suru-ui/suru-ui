/**
 * プロジェクト名として有効かどうかを検証します。
 *
 * 表示名のため日本語・半角スペースを含め幅広く許可します。
 * 識別子としての制約はスラグ側が担います。
 * 改行・制御文字は README 見出しや front matter を壊すため拒否します。
 *
 * @param {string} value 検証する値です。
 *
 * @returns {string | undefined} 問題がなければ undefined、問題があれば理由です。
 */
function validateProjectName(value) {
  if (value.trim() === "") {
    return "値を入力してください。";
  }

  if (value !== value.trim()) {
    return "前後の空白は使用できません。";
  }

  if (value.length > 100) {
    return "100 文字以下にしてください。";
  }

  // oxlint-disable-next-line no-control-regex
  if (/[\u0000-\u001F\u007F]/u.test(value)) {
    return "改行や制御文字は使用できません。";
  }
}

/**
 * GitHub オーナー名として有効かどうかを検証します。
 *
 * @param {string} value 検証する値です。
 *
 * @returns {string | undefined} 問題がなければ undefined、問題があれば理由です。
 */
function validateOwnerName(value) {
  if (value.length > 39 || !/^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/u.test(value)) {
    return "GitHub のユーザー名・Organization 名の形式にしてください。";
  }
}

/**
 * GitHub リポジトリー名として有効かどうかを検証します。
 *
 * GitHub 上で末尾ドットが扱いにくいこと・`.` のみの名前を防ぐため、末尾ドットとドットのみの名前も拒否します。
 *
 * @param {string} value 検証する値です。
 *
 * @returns {string | undefined} 問題がなければ undefined、問題があれば理由です。
 */
function validateRepoName(value) {
  if (value === "." || value === ".." || /^\.+$/u.test(value)) {
    return "`.` や `..` は使用できません。";
  }

  if (value.endsWith(".")) {
    return "末尾に `.` は使用できません。";
  }

  if (value.length > 100 || !/^[A-Za-z0-9_.-]+$/u.test(value)) {
    return "英数字・`-`・`_`・`.` のみを使用してください。";
  }
}

/**
 * npm スコープ名（`@` を除いた部分）として有効かどうかを検証します。
 *
 * パッケージ名全体の予約語検査と対称になるよう、スコープ単体でも予約語を拒否します。
 *
 * @param {string} value 検証する値です。
 *
 * @returns {string | undefined} 問題がなければ undefined、問題があれば理由です。
 */
function validateScopeName(value) {
  if (!/^[a-z0-9][a-z0-9-._~]*$/u.test(value)) {
    return "小文字の英数字で始め、小文字の英数字・`-`・`.`・`_`・`~` のみを使用してください。";
  }

  const lower = value.toLowerCase();

  if (lower === "node_modules" || lower === "favicon.ico") {
    return "その名前は予約されているため使用できません。";
  }
}

/**
 * npm パッケージ名として有効かどうかを検証します。
 *
 * npm の命名規則（小文字・長さ・先頭文字・スコープ形式）の抜粋です。
 * レジストリーの空き状況や公開済みパッケージとの衝突までは確認しません。
 *
 * @param {string} value 検証する値です。
 *
 * @returns {string | undefined} 問題がなければ undefined、問題があれば理由です。
 */
function validatePackageName(value) {
  if (value.length === 0 || value.length > 214) {
    return "1 文字以上 214 文字以下にしてください。";
  }

  if (/[A-Z]/u.test(value)) {
    return "大文字は使用できません。小文字にしてください。";
  }

  if (/\s/u.test(value)) {
    return "空白は使用できません。";
  }

  if (value.startsWith(".") || value.startsWith("_")) {
    return "`.` や `_` で始めることはできません。";
  }

  if (value.toLowerCase() === "node_modules" || value.toLowerCase() === "favicon.ico") {
    return "その名前は予約されているため使用できません。";
  }

  if (value.includes("/")) {
    const match = value.match(/^@(?<scope>[^/]+)\/(?<packageName>.+)$/u);

    if (match === null) {
      return "`@scope/name` 形式にしてください。";
    }

    const scope = match.groups?.scope;
    const packageName = match.groups?.packageName;

    if (scope === undefined || packageName === undefined) {
      return "`@scope/name` 形式にしてください。";
    }

    const scopeError = validateScopeName(scope);

    if (scopeError !== undefined) {
      return `スコープが不正です。${scopeError}`;
    }

    if (!/^[a-z0-9][a-z0-9-._~]*$/u.test(packageName)) {
      return "パッケージ名部分は小文字の英数字で始め、小文字の英数字・`-`・`.`・`_`・`~` のみを使用してください。";
    }

    const leaf = packageName.toLowerCase();

    if (leaf === "node_modules" || leaf === "favicon.ico") {
      return "その名前は予約されているため使用できません。";
    }
  } else if (!/^[a-z0-9][a-z0-9-._~]*$/u.test(value)) {
    return "小文字の英数字で始め、小文字の英数字・`-`・`.`・`_`・`~` のみを使用してください。";
  }
}

/**
 * スラグ名として有効かどうかを検証します。
 *
 * ルートパッケージ名（`${slug}-monorepo`）とワークスペースファイル名（`${slug}.code-workspace`）に使うため、npm パッケージ名と同等の厳しさで検証します。`/` を含むスコープ形式はファイル名に使えないため拒否します。
 * 生成後のルートパッケージ名も改めて検証します。
 * repo は末尾 `.` を拒否するため slug も末尾 `.`・`-` を拒否し、`foo.` → `foo..code-workspace` の二重ドット生成と末尾ハイフンの扱いにくさを防ぎます（repo との統一）。
 *
 * @param {string} value 検証する値です。
 *
 * @returns {string | undefined} 問題がなければ undefined、問題があれば理由です。
 */
function validateSlugName(value) {
  if (value.endsWith(".") || value.endsWith("-")) {
    return "末尾に `.` や `-` は使用できません。";
  }

  if (value.includes("/") || value.includes("\\")) {
    return "`/` や `\\` は使用できません。単一の名前を指定してください。";
  }

  const error = validatePackageName(value);

  if (error !== undefined) {
    return error;
  }

  const rootName = `${value}-monorepo`;
  const rootError = validatePackageName(rootName);

  if (rootError !== undefined) {
    return `「${rootName}」が不正なパッケージ名になります。${rootError}`;
  }
}

export {
  validateRepoName,
  validateSlugName,
  validateOwnerName,
  validateScopeName,
  validatePackageName,
  validateProjectName,
};
