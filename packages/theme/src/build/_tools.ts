import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import {
  CSS_VARIABLE_REFERENCE_SYMBOL,
  getCurrentThemeReferenceId,
  getThemeReferenceSymbol,
} from "../theme/_tools.ts";

/**
 * プロジェクトのルートディレクトリーへの絶対パスです。
 */
export const rootDir = path.join(import.meta.dirname, "..", "..");

/**
 * ビルド成果物を格納するディレクトリーへの絶対パスです。
 */
export const distDir = path.join(rootDir, "dist");

/**
 * ソースコードを格納するディレクトリーへの絶対パスです。
 */
export const srcDir = path.join(rootDir, "src");

/**
 * テキストコンテンツを保持し、ファイルへの書き出しを管理するクラスです。
 */
export class Writer {
  /**
   * 内部で保持されるテキスト文字列です。
   */
  private text: string = "";

  /**
   * 内部のテキストコンテンツを空にします。
   */
  public clear(): void {
    this.text = "";
  }

  /**
   * 指定されたテキストを内部のテキストコンテンツの末尾に追加します。
   *
   * @param text 追加するテキストです。
   */
  public write(text: string): void {
    this.text += text;
  }

  /**
   * 指定されたテキストを内部のテキストコンテンツの末尾に追加し、さらにプラットフォーム固有の改行コード（`os.EOL`）を追加します。
   *
   * @param text 追加するテキストです。
   */
  public writeln(text: string): void {
    this.text += text + os.EOL;
  }

  /**
   * 内部に保持されているすべてのテキストコンテンツを文字列として返します。
   *
   * @returns 保持されているテキストコンテンツです。
   */
  public string(): string {
    return this.text;
  }

  /**
   * 内部のテキストコンテンツを指定されたファイルパスに書き出します。
   *
   * ファイルが存在しない場合は作成され、ディレクトリーも再帰的に作成されます。
   *
   * @param file 書き出し先のファイルパスです。
   */
  public output(file: string): void {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, this.text, "utf-8");
  }
}

/**
 * CSS の `@layer` 定義を `Writer` に書き込みます。
 *
 * この関数は、テーマやコンポーネントのスタイルを階層的に管理するための CSS レイヤーを定義します。
 *
 * @param w テキストの書き込みに使用される `Writer` インスタンスです。
 */
export function defineLayers(w: Writer): void {
  w.writeln("@layer sui;");
  w.writeln("@layer sui.theme;");
  w.writeln("@layer sui.component;");
  w.writeln("@layer sui.important;");
}

/**
 * テーマ定義オブジェクトを、ドット区切りで指定されたパス（配列）に従って再帰的に探索し、対応する値を取得します。
 *
 * 参照シンボル（`CSS_VARIABLE_REFERENCE_SYMBOL` やテーマ参照シンボル）を持つオブジェクトを適切に処理します。
 *
 * @param rootDef ルートとなるテーマ定義オブジェクトです。
 * @param path 探索するパスを構成する文字列の配列です。
 * @returns パスに対応する値、または参照解決後の値です。
 * @throws 参照パスが途中でプリミティブ型や `undefined` に到達した場合、エラーを投げます。
 */
function getValueByPath(rootDef: any, path: readonly string[]): any {
  return inner(rootDef, path);

  /**
   * パスに従ってテーマ定義オブジェクトを再帰的に探索する内部関数です。
   *
   * @param def 現在探索中のテーマ定義の一部です。
   * @param subPath 残りの探索パスです。
   * @returns パスに対応する値、または参照解決後の値です。
   * @throws 参照パスが途中でプリミティブ型や `undefined` に到達した場合、エラーを投げます。
   */
  function inner(def: any, subPath: readonly string[]): any {
    // パスが空になった場合、現在の定義が最終的な値です。
    if (subPath.length === 0) {
      return def;
    }

    // 探索中に文字列、数値、または undefined に到達した場合、パス解決に失敗しています。
    if (typeof def === "string" || typeof def === "number" || def === undefined) {
      // デバッグのためにルート定義全体を出力します。
      console.dir(rootDef, { depth: null });

      throw new Error(`参照 ${path} は ${subPath} を残したところで値 ${def} に到達しました。`);
    }

    // CSS 変数参照シンボルを持つ場合、参照を解決します。
    if (CSS_VARIABLE_REFERENCE_SYMBOL in def) {
      // 参照先のパスを取得し、ルート定義に対して再度 `getValueByPath` を再帰的に呼び出します。
      return getValueByPath(rootDef, def[CSS_VARIABLE_REFERENCE_SYMBOL].split("."));
    }

    // 配列の場合、パスの最初の要素をインデックスとして数値に変換してアクセスします。
    if (Array.isArray(def)) {
      const [idx, ...rest] = subPath;

      // 数値インデックスでアクセスし、残りのパスで再帰します。
      return inner(def[Number(idx)], rest);
    }

    // テーマ参照シンボルを持つオブジェクトの場合、参照シンボル以外のプロパティーを抽出します。
    // `getCurrentThemeReferenceId()` は、登録されたテーマ参照の最大 ID を取得します。
    for (let i = 0; i < getCurrentThemeReferenceId(); i++) {
      const symbol = getThemeReferenceSymbol(i);
      if (symbol in def) {
        // テーマ参照シンボルとその値を除外したオブジェクトを取得します。
        const {
          [symbol]: _, // 型参照のために存在しているので、定義から取り除きます。
          ...other
        } = def;
        def = other;
      }
    }

    // オブジェクトの場合、パスの最初の要素をキーとしてアクセスします。
    const [key, ...rest] = subPath;

    // キーでアクセスし、残りのパスで再帰します。
    return inner(def[key!], rest);
  }
}

/**
 * サイズの文字列（`xs`、`sm`、`md`、`lg`、`xl`、または数値文字列）を、ソートに使用できる数値に変換します。
 *
 * @param s 変換対象の文字列です。
 * @returns ソート用の数値、または変換できない場合は `null` です。
 */
function toOrderNumber(s: string): number | null {
  // まず文字列を数値としてパースを試みます。
  let n = Number(s);
  if (!Number.isNaN(n)) {
    return n;
  }

  // 特定のサイズを表す文字列リテラルを、数値の順序にマップします。
  switch (s) {
    case "xs":
      return 0.8;
    case "sm":
      return 0.9;
    case "md":
      return 1.0;
    case "lg":
      return 1.1;
    case "xl":
      return 1.2;
    default:
      return null;
  }
}

/**
 * スタイル書き出しオプションの型定義です。
 */
export type GenerateOptions = {
  /**
   * 各 CSS プロパティーのインデントに使用される文字列です。
   */
  readonly indent?: string | undefined;
};

/**
 * テーマ定義オブジェクトを走査し、対応する CSS カスタムプロパティー（変数）の定義を `Writer` に書き出します。
 *
 * オブジェクトのキーをハイフン区切りに変換し、値は CSS の値として出力されます。
 *
 * @param w テキストの書き込みに使用される `Writer` インスタンスです。
 * @param def テーマ定義オブジェクトです。
 * @param options スタイル書き出しのためのオプションです。
 */
export function writeStyle(w: Writer, def: any, options: GenerateOptions | undefined = {}): void {
  const { indent = "" } = options;
  const rootDef = def;
  inner(w, rootDef, []);

  /**
   * テーマ定義を再帰的に走査し、カスタムプロパティーを書き出す内部関数です。
   *
   * @param w テキストの書き込みに使用される `Writer` インスタンスです。
   * @param def 現在探索中のテーマ定義の一部です。
   * @param path 現在のプロパティーまでのパス（文字列の配列）です。
   */
  function inner(w: Writer, def: any, path: readonly string[]): void {
    if (typeof def === "string" || typeof def === "number") {
      // プリミティブ型（文字列または数値）の場合、CSS カスタムプロパティーとして書き出します。

      w.write(indent);
      w.write("--");
      // パス配列をハイフン区切りで結合し、CSS 変数名を生成します。
      w.write(path.join("-"));
      w.write(": ");
      // 数値は文字列として書き出します。
      w.write(def.toString());
      w.writeln(";");
    } else if (CSS_VARIABLE_REFERENCE_SYMBOL in def) {
      // CSS 変数参照シンボルを持つ場合、参照を解決して書き出します。

      // 参照先を `getValueByPath` で解決します。
      const ref = getValueByPath(rootDef, def[CSS_VARIABLE_REFERENCE_SYMBOL].split("."));

      // 参照先がプリミティブ型（文字列または数値）の場合、CSS `var()` 関数として書き出します。
      if (typeof ref === "string" || typeof ref === "number") {
        w.write(indent);
        w.write("--");
        w.write(path.join("-"));
        w.write(": ");
        w.write("var(");
        w.write("--");
        // 参照パスをハイフン区切りに変換し、`var()` の引数として使用します。
        w.write(def[CSS_VARIABLE_REFERENCE_SYMBOL].replaceAll(".", "-"));
        w.writeln(");");
      } else {
        // 参照先がオブジェクト（または配列）の場合、再帰的に処理を継続します。
        inner(w, ref, path);
      }
    } else if (Array.isArray(def)) {
      // 配列の場合、要素をインデックス付きで再帰的に処理します。

      def.forEach((d, i) => {
        // パスに現在のインデックスを文字列として追加します。
        inner(w, d, [...path, `${i}`]);
      });
    } else {
      // オブジェクトの場合、プロパティーをソートしてから再帰的に処理します。

      Object.entries(def)
        .sort(([a], [b]) => {
          const na = toOrderNumber(a);
          const nb = toOrderNumber(b);

          switch (true) {
            case na === null && nb === null:
              // 両方ともサイズ文字列でない場合、アルファベット順でソートします。
              return a.localeCompare(b);
            case na === null:
              // a がサイズでない場合、a を後（+1）にします。
              return +1;
            case nb === null:
              // b がサイズでない場合、b を後（-1）にします。
              return -1;
            default:
              // 両方ともサイズである場合、数値の差でソートします。
              return na - nb;
          }
        })
        .forEach(([p, d]) => {
          // パスに現在のプロパティー名を追加して再帰します。
          inner(w, d, [...path, p]);
        });
    }
  }
}
