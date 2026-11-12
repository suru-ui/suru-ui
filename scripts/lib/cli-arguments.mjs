import { TEMPLATE_PACKAGES, PACKAGE_KIND_CANDIDATES } from "./template-constants.mjs";
import { ValidationError } from "./validation-error.mjs";

/**
 * `--packages` で指定されたパッケージ 1 件分の選択内容です。
 *
 * @typedef {object} PackageSelection
 *
 * @property {import("./template-constants.mjs").TemplateKind} kind 使用するテンプレートの種類です。
 * @property {string} [rename] 変更後のパッケージ名です。省略時は種類から既定名を作ります。
 */

/**
 * コマンドライン引数を `--key=value`、`--key value`、`--flag` 形式で解析します。
 *
 * 位置引数（`--` で始まらない token）・単一ダッシュ・`--` 単体・重複指定はいずれも即時に ValidationError を投げます（黙殺や last-wins をしません）。
 * 検証フェーズ前のためファイルは一切書き換えていません。
 *
 * @param {string[]} argv コマンドライン引数です。
 *
 * @returns {Map<string, string | boolean>} 引数名から値への対応表です。値なしのフラグは true になります。
 */
function parseArgs(argv) {
  const args = new Map();
  const seen = new Set();

  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];

    if (token === "--") {
      throw new ValidationError(
        "`--` 単体では引数になりません。--help で使い方を確認してください。",
      );
    }

    if (!token.startsWith("--")) {
      if (token.startsWith("-")) {
        throw new ValidationError(
          `単一ダッシュは受け付けません: ${JSON.stringify(token)}。--key=value 形式で指定してください。--help で使い方を確認できます。`,
        );
      }

      throw new ValidationError(
        `位置引数は受け付けません: ${JSON.stringify(token)}。--key=value 形式で指定してください。--help で使い方を確認できます。`,
      );
    }

    const eq = token.indexOf("=");

    if (eq >= 0) {
      const key = token.slice(2, eq);

      if (key === "") {
        throw new ValidationError(
          `引数名が空です: ${JSON.stringify(token)}。--key=value 形式で指定してください。`,
        );
      }

      if (seen.has(key)) {
        throw new ValidationError(`--${key} が重複しています。同じ引数は1回だけ指定してください。`);
      }

      seen.add(key);
      args.set(key, token.slice(eq + 1));
      continue;
    }

    const key = token.slice(2);

    if (key === "") {
      throw new ValidationError(
        "`--` 単体では引数になりません。--help で使い方を確認してください。",
      );
    }

    if (seen.has(key)) {
      throw new ValidationError(`--${key} が重複しています。同じ引数は1回だけ指定してください。`);
    }

    seen.add(key);
    const next = argv[i + 1];

    if (next !== undefined && !next.startsWith("--") && !next.startsWith("-")) {
      args.set(key, next);
      i++;
    } else if (next !== undefined && next.startsWith("-") && !next.startsWith("--")) {
      throw new ValidationError(
        `単一ダッシュは受け付けません: ${JSON.stringify(next)}。--key=value 形式で指定してください。--help で使い方を確認できます。`,
      );
    } else {
      args.set(key, true);
    }
  }

  return args;
}

/**
 * `--packages` の構文を解析します。
 *
 * 同じ種類を複数回指定できます。2 件目以降は `kind=名前` 形式で重複しない名前を指定してください（省略時の既定名は種類ごとに同じになるため）。
 * 空要素（`,,` や先頭・末尾のカンマなど）は黙殺せずエラーにします。
 * すべて ValidationError で投げます。
 *
 * @param {string} raw `--packages` の値です。
 *
 * @returns {PackageSelection[]} 選択内容の一覧です。テンプレート定義順で、同じ種類内は指定順を保ちます。
 */
function parsePackagesArg(raw) {
  const selections = [];

  if (raw.trim() === "") {
    throw new ValidationError(
      `--packages が空です。${PACKAGE_KIND_CANDIDATES} から1つ以上をカンマ区切りで指定してください。（例: --packages=server-client,server）`,
    );
  }

  for (const part of raw.split(",")) {
    const item = part.trim();

    if (item === "") {
      throw new ValidationError(
        `--packages に空の要素があります（${JSON.stringify(raw)}）。カンマの前後に種類を1つずつ指定してください。（例: --packages=server-client,server）`,
      );
    }

    const eq = item.indexOf("=");
    const key = (eq < 0 ? item : item.slice(0, eq)).trim();
    const found = TEMPLATE_PACKAGES.find((pkg) => pkg.kind === key);

    if (found === undefined) {
      throw new ValidationError(
        `--packages に不明な種類があります: ${key === "" ? "(空)" : key}。候補は ${PACKAGE_KIND_CANDIDATES} です。`,
      );
    }

    const selection = { kind: found.kind };

    if (eq >= 0) {
      const rename = item.slice(eq + 1).trim();

      if (rename === "") {
        throw new ValidationError(
          `パッケージ（${found.kind}）の変更後名が空です。kind=名前 形式で名前を指定してください。（例: ${found.kind}=@acme/api）`,
        );
      }

      selection.rename = rename;
    }

    selections.push(selection);
  }

  return selections.toSorted(
    (a, b) =>
      TEMPLATE_PACKAGES.findIndex((pkg) => pkg.kind === a.kind) -
      TEMPLATE_PACKAGES.findIndex((pkg) => pkg.kind === b.kind),
  );
}

export { parseArgs, parsePackagesArg };
