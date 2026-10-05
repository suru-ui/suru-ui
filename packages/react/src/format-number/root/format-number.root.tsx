import * as React from "react";

import getNumberFormatter, {
  type INumberFormatter,
  type NumberFormatterStyle,
  type NumberFormatterLocale,
  type NumberFormatterOptions,
  type NumberFormatterNotation,
  type NumberFormatterSignDisplay,
  type NumberFormatterUnitDisplay,
  type NumberFormatterUseGrouping,
  type NumberFormatterCurrencySign,
  type NumberFormatterRoundingMode,
  type NumberFormatterLocaleMatcher,
  type NumberFormatterCompactDisplay,
  type NumberFormatterCurrencyDisplay,
  type NumberFormatterRoundingPriority,
  type NumberFormatterRoundingIncrement,
  type NumberFormatterTrailingZeroDisplay,
} from "../../get-number-formatter.js";
import type { IComponent } from "../../types.js";

/**
 * 短縮表記の表示スタイルです。
 */
export type FormatNumberRootCompactDisplay = NumberFormatterCompactDisplay;

/**
 * 通貨の表示方法です。
 */
export type FormatNumberRootCurrencyDisplay = NumberFormatterCurrencyDisplay;

/**
 * 負の通貨額の表示方法です。
 */
export type FormatNumberRootCurrencySign = NumberFormatterCurrencySign;

/**
 * ロケールの照合方法です。
 */
export type FormatNumberRootLocaleMatcher = NumberFormatterLocaleMatcher;

/**
 * 数値の表記方法です。
 */
export type FormatNumberRootNotation = NumberFormatterNotation;

/**
 * 数値の書式に使うロケールです。
 */
export type FormatNumberRootLocale = NumberFormatterLocale;

/**
 * 丸めの刻み幅です。
 */
export type FormatNumberRootRoundingIncrement = NumberFormatterRoundingIncrement;

/**
 * 数値の丸め方法です。
 */
export type FormatNumberRootRoundingMode = NumberFormatterRoundingMode;

/**
 * `minimumFractionDigits` と `minimumSignificantDigits` のどちらの精度を優先するかです。
 */
export type FormatNumberRootRoundingPriority = NumberFormatterRoundingPriority;

/**
 * 数値の符号の表示方法です。
 */
export type FormatNumberRootSignDisplay = NumberFormatterSignDisplay;

/**
 * 数値の書式の種類です。
 */
export type FormatNumberRootStyle = NumberFormatterStyle;

/**
 * 小数点以下の末尾のゼロの表示方法です。
 */
export type FormatNumberRootTrailingZeroDisplay = NumberFormatterTrailingZeroDisplay;

/**
 * 単位の表示スタイルです。
 */
export type FormatNumberRootUnitDisplay = NumberFormatterUnitDisplay;

/**
 * 位取りの区切り (例: `1,000`) を表示するかどうかです。
 */
export type FormatNumberRootUseGrouping = NumberFormatterUseGrouping;

/**
 * 書式化する数値です。
 */
export type FormatNumberRootValue = Parameters<INumberFormatter["format"]>[0];

/**
 * {@link FormatNumberRoot} が持つ状態です。
 */
export type FormatNumberRootState = {};

export namespace FormatNumberRootProps {
  export type Render = {};

  export type SuruUI = NumberFormatterOptions & {
    /**
     * 書式化する数値です。
     */
    value: FormatNumberRootValue;
  };

  export type BaseUI = {};

  export type HTML = {};
}

/**
 * {@link FormatNumberRoot} に渡す props です。
 */
export type FormatNumberRootProps = FormatNumberRootProps.Render &
  FormatNumberRootProps.SuruUI &
  FormatNumberRootProps.BaseUI &
  FormatNumberRootProps.HTML;

export type IFormatNumberRoot = IComponent<FormatNumberRootProps>;

/**
 * 数値をロケールに従って書式化して表示するルートコンポーネントです。
 *
 * 小数、通貨、パーセント、単位などの書式を指定できます。テキストノードとして描画されるため、見た目の調整は親要素で行います。
 */
export const FormatNumberRoot: IFormatNumberRoot = function SuiFormatNumberRoot(props) {
  const { value, ...options } = props;
  const formatter = getNumberFormatter(options);
  const formatted = React.useMemo(() => formatter.format(value), [formatter, value]);

  return formatted;
};

export { FormatNumberRoot as Root };

export namespace Root {
  export type State = FormatNumberRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = FormatNumberRootProps.Render;

    export type SuruUI = FormatNumberRootProps.SuruUI;

    export type BaseUI = FormatNumberRootProps.BaseUI;

    export type HTML = FormatNumberRootProps.HTML;
  }

  export type CompactDisplay = FormatNumberRootCompactDisplay;

  export type CurrencyDisplay = FormatNumberRootCurrencyDisplay;

  export type CurrencySign = FormatNumberRootCurrencySign;

  export type Locale = FormatNumberRootLocale;

  export type LocaleMatcher = FormatNumberRootLocaleMatcher;

  export type Notation = FormatNumberRootNotation;

  export type RoundingIncrement = FormatNumberRootRoundingIncrement;

  export type RoundingMode = FormatNumberRootRoundingMode;

  export type RoundingPriority = FormatNumberRootRoundingPriority;

  export type SignDisplay = FormatNumberRootSignDisplay;

  export type Style = FormatNumberRootStyle;

  export type TrailingZeroDisplay = FormatNumberRootTrailingZeroDisplay;

  export type UnitDisplay = FormatNumberRootUnitDisplay;

  export type UseGrouping = FormatNumberRootUseGrouping;

  export type Value = FormatNumberRootValue;
}
