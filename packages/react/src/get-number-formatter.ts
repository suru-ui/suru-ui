import { callFnOnce } from "call-fn-once";

type Option<T extends keyof Intl.NumberFormatOptions> = NonNullable<Intl.NumberFormatOptions[T]>;

/**
 * 短縮表記の表示スタイルです。
 *
 * - `"short"`: 短縮した表記
 * - `"long"`: 短縮しない表記
 */
export type NumberFormatterCompactDisplay = Option<"compactDisplay">;

/**
 * 通貨の表示方法です。
 *
 * - `"symbol"`: 通貨記号 (例: `¥`)
 * - `"narrowSymbol"`: より短い通貨記号 (例: `$`)
 * - `"code"`: ISO 4217 の通貨コード (例: `JPY`)
 * - `"name"`: 通貨名 (例: `日本円`)
 */
export type NumberFormatterCurrencyDisplay = Option<"currencyDisplay">;

/**
 * 負の通貨額の表示方法です。
 *
 * - `"standard"`: 負号を付けて表示します。
 * - `"accounting"`: 括弧で囲んで表示します。
 */
export type NumberFormatterCurrencySign = Option<"currencySign">;

/**
 * 数値の書式に使うロケールです。
 *
 * 言語タグ、または {@link Intl.Locale} を指定します。
 */
export type NumberFormatterLocale =
  NonNullable<ConstructorParameters<typeof Intl.NumberFormat>[0]> extends
    | (infer TLocale)
    | ReadonlyArray<infer TLocale>
    ? TLocale
    : never;

/**
 * ロケールの照合方法です。
 *
 * - `"lookup"`: 言語タグを順に照合します。
 * - `"best fit"`: 利用可能なロケールの中から最適なものを選びます。
 */
export type NumberFormatterLocaleMatcher = Option<"localeMatcher">;

/**
 * 数値の表記方法です。
 *
 * - `"standard"`: 通常の表記
 * - `"scientific"`: 科学的記数法 (例: `1.5E3`)
 * - `"engineering"`: 指数が 3 の倍数になる科学的記数法 (例: `15E3`)
 * - `"compact"`: 短縮表記 (例: `1.5万`)
 */
export type NumberFormatterNotation = Option<"notation">;

/**
 * 丸めの刻み幅です。
 */
export type NumberFormatterRoundingIncrement = Option<"roundingIncrement">;

/**
 * 数値の丸め方法です。
 */
export type NumberFormatterRoundingMode = Option<"roundingMode">;

/**
 * `minimumFractionDigits` と `minimumSignificantDigits` のどちらの精度を優先するかです。
 */
export type NumberFormatterRoundingPriority = Option<"roundingPriority">;

/**
 * 数値の符号の表示方法です。
 *
 * - `"auto"`: 負の値に符号を付けます (負のゼロを含む)。
 * - `"always"`: 常に符号を付けます。
 * - `"exceptZero"`: ゼロを除くすべての値に符号を付けます。
 * - `"negative"`: 負の値に符号を付けます (負のゼロを含まない)。
 * - `"never"`: 符号を付けません。
 */
export type NumberFormatterSignDisplay = Option<"signDisplay">;

/**
 * 数値の書式の種類です。
 *
 * - `"decimal"`: 小数
 * - `"percent"`: パーセント
 * - `"currency"`: 通貨
 * - `"unit"`: 単位
 */
export type NumberFormatterStyle = Option<"style">;

/**
 * 小数点以下の末尾のゼロの表示方法です。
 *
 * - `"auto"`: 必要に応じてゼロを表示します。
 * - `"stripIfInteger"`: 値が整数のときは末尾のゼロを削除します。
 */
export type NumberFormatterTrailingZeroDisplay = Option<"trailingZeroDisplay">;

/**
 * 単位の表示スタイルです。
 *
 * - `"short"`: 短縮した単位 (例: `km`)
 * - `"narrow"`: より短い単位 (例: `km`)
 * - `"long"`: 省略しない単位 (例: `キロメートル`)
 */
export type NumberFormatterUnitDisplay = Option<"unitDisplay">;

/**
 * 位取りの区切り (例: `1,000`) を表示するかどうかです。
 */
export type NumberFormatterUseGrouping = Option<"useGrouping">;

/**
 * 数値の書式設定オプションです。
 *
 * `Intl.NumberFormat` のコンストラクターに渡すオプションです。
 */
export type NumberFormatterOptions = Readonly<
  Intl.NumberFormatOptions & {
    locales?: NumberFormatterLocale | readonly NumberFormatterLocale[] | undefined;
  }
>;

/**
 * 数値を書式化するフォーマッターです。
 */
export type INumberFormatter = Intl.NumberFormat;

const cacheMap: callFnOnce.CacheMap = new Map();

/**
 * 指定されたロケールとオプションに対応する `Intl.NumberFormat` を取得します。
 *
 * 同じロケールとオプションの組み合わせに対するインスタンスはキャッシュされ、再利用されます。
 *
 * @param options 数値の書式設定オプションです。
 * @returns 数値の書式化に使う `Intl.NumberFormat` です。
 */
export default function getNumberFormatter(options: NumberFormatterOptions = {}): INumberFormatter {
  const { locales = [] } = options;
  const cacheKey = JSON.stringify({
    ...options,
    locales: (Array.isArray(locales) ? locales : [locales]).map((locale) =>
      // new Intl.Locale で作成されたオブジェクトも文字列に変換します。
      // 例: String(new Intl.Locale("ja-JP")) -> "ja-JP"
      String(locale),
    ),
  });

  return callFnOnce(cacheMap, cacheKey, () => new Intl.NumberFormat(locales, options));
}
