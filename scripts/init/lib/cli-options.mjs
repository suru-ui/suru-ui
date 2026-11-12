import { parsePackagesArg } from "../../lib/cli-arguments.mjs";
import { validatePackageName } from "../../lib/input-validators.mjs";
import { PACKAGE_KIND_CANDIDATES } from "../../lib/template-constants.mjs";
import { ValidationError } from "../../lib/validation-error.mjs";

/** 文字列形式で値を受け付ける引数名です。 */
const STRING_OPTIONS = ["project", "slug", "owner", "repo", "scope", "packages"];

/** 値なしで指定する真偽値の引数名です。 */
const BOOLEAN_FLAGS = ["skip-install", "mise-update", "help"];

/** 受け付ける引数名の一覧です。 */
const KNOWN_ARGS = [...STRING_OPTIONS, ...BOOLEAN_FLAGS];

/**
 * コマンドライン引数の形式を検証します。質問やファイル操作の前に呼び出します。
 *
 * 文字列オプションの値なし指定は対話への切り替えを行わず例外を投げます。
 * パイプ入力時に行がずれて誤った回答が割り当てられるのを防ぐためです。
 * すべて ValidationError で投げ、呼び出し側の接頭辞で無書込保証を表示します。
 *
 * @param {Map<string, string | boolean>} args 解析済みの引数です。
 */
function validateCliArgs(args) {
  for (const key of args.keys()) {
    if (!KNOWN_ARGS.includes(key)) {
      throw new ValidationError(
        `不明な引数です: --${key}。利用可能な引数は ${KNOWN_ARGS.map((name) => `--${name}`).join(
          "、",
        )} です。--help で使い方を確認してください。`,
      );
    }
  }

  for (const key of STRING_OPTIONS) {
    if (args.get(key) === true) {
      throw new ValidationError(
        `--${key} には値が必要です。--${key}=<値> の形式で指定してください。値なしでは対話に切り替えません。`,
      );
    }
  }

  for (const key of BOOLEAN_FLAGS) {
    if (typeof args.get(key) === "string") {
      throw new ValidationError(
        `--${key} に値を付けないでください。指定あり・なしで切り替えます（例: --skip-install=false は受け付けません）。`,
      );
    }
  }

  const packagesRaw = args.get("packages");

  if (typeof packagesRaw === "string") {
    // 構文の早期検証です。結果は後段で改めて解析するためここでは破棄しませんが、rename 値の妥当性まで早期に検証して fail-fast にします。
    const selections = parsePackagesArg(packagesRaw);

    for (const { kind, rename } of selections) {
      if (rename === undefined) {
        continue;
      }

      const renameError = validatePackageName(rename);

      if (renameError !== undefined) {
        throw new ValidationError(
          `パッケージ（${kind}）の変更後名が不正です（${rename}）。${renameError}`,
        );
      }
    }
  }
}

/** 使用方法を表示します。 */
function printHelp() {
  console.log(`使い方: mise init [options]（または node scripts/init/run.mjs [options]）

テンプレートの初期化を対話形式で行います。
指定されなかった項目は対話形式で尋ねます。
標準入力がパイプやリダイレクトの場合は、回答を1行ずつ読み取ります。

すべての引数を指定した非対話実行の例:
  mise init --project=MySite --owner=acme --repo=mysite --slug=mysite --scope=acme --packages=server=@acme/api,server=@acme/worker --skip-install <回答ファイル>

全引数指定時も最後の実行確認に1行（y/n）が必要です。
対話の質問順序: プロジェクト名 → オーナー名 → リポジトリー名 → スラグ名（既定値: リポジトリー名の小文字(無効時は入力必須)）→ スコープ有無（ありの場合のみスコープ名、既定値: オーナー名の小文字(無効時は入力必須)）→（--packages 省略時のみ）パッケージ追加の繰り返し［タイプ番号 → 名前 → 追加有無］→（省略時のみ）pnpm install と pnpm exec skills experimental_install の有無（既定値: 実行する）→ 実行確認
対話では同じタイプを何度でも選択できます。パッケージ名に既定値はないため、必ず入力してください。
パイプ時は上記から指定済み項目を除いた順序で行を並べます。

options:
  --project=<名前>     プロジェクト名（website・README のタイトル用。日本語・半角スペース可）
  --slug=<名前>        スラグ名（*-monorepo・*.code-workspace 用。既定値: リポジトリー名の小文字(無効時は入力必須)。小文字の英数字で始め、小文字の英数字・-・.・_・~ のみ。末尾の .・- は不可）
  --owner=<名前>       GitHub オーナー名
  --repo=<名前>        GitHub リポジトリー名
  --scope=<名前>       パッケージスコープ（@ を除く。--scope= の空文字でスコープなし）
  --packages=<選択>    使用するパッケージ（カンマ区切り。例: server-client,server。候補: ${PACKAGE_KIND_CANDIDATES}。空要素なし）
                        同じ種類を複数回指定できます。2 件目以降は kind=名前 形式で重複しない名前を指定してください（例: server=@acme/api,server=@acme/worker）。
                        名前も変更する場合は kind=名前 形式（例: server=@acme/api）。CI・ワークスペース定義が空になるのを避けるため1つ以上必須。
                        対話・引数いずれも成果物（workspaces 等）の順序はテンプレート定義順に統一します（同じ種類内は指定順）。
  --skip-install       最後の pnpm install と pnpm exec skills experimental_install を省略します（値を付けないこと）
  --mise-update        最後に mise update を実行します（値を付けないこと。指定しない場合は実行しません）
  --help               この表示を出します（値を付けないこと。他の引数より優先します）

注意:
  位置引数・単一ダッシュ・-- 単体・引数の重複・文字列オプションの値なし指定・未知の引数・--packages の空要素や同名指定はエラーになります。
  --packages で同じ種類を複数回指定する場合、名前を省略できるのは 1 件目だけです。2 件目以降は kind=名前 形式で指定してください。
  ルート workspaces と pnpm-workspace.yaml の packages はテンプレート初期値との集合一致が必須です。不一致（extra 等）は黙って削除せずエラーになります。
  テンプレートは削除せず scripts/templates/ に移動し、選択したパッケージだけを packages/ に複製します。追加のパッケージは初期化後に mise create で作成できます。
  scripts/init/・scripts/create/・scripts/lib/・scripts/templates/ は Git の管理対象に含めます。初期化後にコミットしても fresh clone で mise create を利用できます。
  選択した種類を複数回使う場合、テンプレートのディレクトリーは複製されます（node_modules は複製しません）。
  pnpm-workspace.yaml の packages は1行・複数行のフロー配列のどちらでも置換でき、その他の改行形式（CRLF/LF）は維持します。
  pnpm install・pnpm exec skills experimental_install・mise update に失敗した場合は警告し、手動で再実行してください。
  release.yml の外部アクション参照と skills-lock.json の取得元は外部リポジトリーの参照のため更新しません。`);
}

export { printHelp, validateCliArgs };
