import type { SuiClassNameFunction } from "./types.js";

/**
 * クラス名として直接使用できるプリミティブな型を定義します。0 は数値ですが、CSS クラス名として有効でないため、他の falsy 値と一緒にフィルタリングされることを想定しています。
 */
export type PrimitiveClassName =
  // 有効なクラス名
  | string
  // Falsy 値
  | 0
  | null
  | false
  | undefined;

/**
 * cn 関数に渡すことができるクラス名の基本型を定義します。
 *
 * プリミティブなクラス名か、状態に基づいてクラス名を生成するファクトリー関数です。
 *
 * @template TState UI の状態を表す型パラメーターです。
 */
export type BaseUiClassName<TState> =
  | PrimitiveClassName
  | SuiClassNameFunction<TState>;

/**
 * 静的なクラス名（既に整形・結合済み）を表すパートの型です。
 */
type StaticPart = Readonly<{
  dyn: false;
  val: string; // 既に整形・結合された文字列です。
}>;

/**
 * 動的なクラス名（ファクトリー関数）を表すパートの型です。
 *
 * @template TState UI の状態を表す型パラメーターです。
 */
type DynamicPart<TState> = Readonly<{
  dyn: true;
  val: SuiClassNameFunction<TState>;
}>;

/**
 * cn 関数によって構造化されたクラス名要素の配列の要素型です。
 *
 * @template TState UI の状態を表す型パラメーターです。
 */
type ClassNamePart<TState> = StaticPart | DynamicPart<TState>;

/**
 * 複数のクラス名を結合し、単一のクラス名文字列を生成する関数です。
 *
 * @param classNames 結合するプリミティブなクラス名の配列です。
 * @returns 結合されたクラス名文字列を返します。
 */
function cn(...classNames: PrimitiveClassName[]): string;

/**
 * 結合された文字列またはクラス名ファクトリー関数を返します。
 *
 * @template TState UI の状態を表す型パラメーターです。
 * @param classNames 結合するクラス名またはクラス名ファクトリー関数の配列です。
 * @returns 結合されたクラス名文字列、または状態に基づいてクラス名を生成するファクトリー関数を返します。
 */
function cn<TState>(
  ...classNames: BaseUiClassName<TState>[]
): string | SuiClassNameFunction<TState>;

function cn<TState>(
  ...classNames: BaseUiClassName<TState>[]
): string | SuiClassNameFunction<TState> {
  const parts: ClassNamePart<TState>[] = [];
  let currentClassName = "";
  let hasFactory = false;

  /**
   * currentValidClassNames を結合して StaticPart として parts に追加します。
   */
  function finalizeStaticPart(): void {
    if (currentClassName) {
      parts.push({
        dyn: false,
        val: currentClassName,
      });

      currentClassName = ""; // リセットします。
    }
  }

  // 引数リストを一度だけトラバースし、静的な部分と動的な部分に構造化します。
  for (let i = 0, n = classNames.length, className; i < n; i++) {
    if (className = classNames[i]) {
      if (typeof className === "string") {
        currentClassName += (currentClassName && " ") + className;
      } else if (typeof className === "function") {
        // 関数が見つかったら、それまでのプリミティブなクラス名を静的な部分として確定させます。
        finalizeStaticPart();

        // 動的な部分（ファクトリー関数）をそのまま追加します。
        parts.push({
          dyn: true,
          val: className,
        });
        hasFactory = true;
      }
    }
  }

  // 構造化された parts に基づいて処理を分岐させます。
  if (!hasFactory) {
    // ファクトリー関数が含まれていない場合: 現在のクラス名をそのまま返します。
    return currentClassName;
  }

  // ファクトリー関数が含まれている場合: 順序を保持し、実行時の計算量を最小化する新しいファクトリー関数を返します。

  // 最後に残ったプリミティブなクラス名を確定させます。
  finalizeStaticPart();

  return function suiClassName(state) {
    let className = "";
    for (let i = 0, n = parts.length, part: ClassNamePart<TState>, temp: string; i < n; i++) {
      part = parts[i]!;
      temp = "";
      if (part.dyn) {
        // 動的な部分（ファクトリー関数）のみを実行します。
        const ret: unknown = part.val(state);
        // 結果が有効な文字列の場合のみ使用します。
        if (ret && typeof ret === "string") {
          temp = ret;
        }
      } else {
        // 静的な部分は既に整形済みのため、そのまま使用します。
        temp = part.val;
      }

      if (temp) {
        className += (className && " ") + temp;
      }
    }

    // 空文字列の場合、undefined を返します。
    return className || undefined;
  };
}

export default cn;
