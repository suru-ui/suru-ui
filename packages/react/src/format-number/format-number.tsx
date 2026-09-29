import type { IComponent } from "../types.js";
import {
  type FormatNumberRootProps,
  type FormatNumberRootState,
  type FormatNumberRootStyle,
  type FormatNumberRootValue,
  type FormatNumberRootLocale,
  type FormatNumberRootNotation,
  type FormatNumberRootSignDisplay,
  type FormatNumberRootUnitDisplay,
  type FormatNumberRootUseGrouping,
  type FormatNumberRootCurrencySign,
  type FormatNumberRootRoundingMode,
  type FormatNumberRootLocaleMatcher,
  type FormatNumberRootCompactDisplay,
  type FormatNumberRootCurrencyDisplay,
  type FormatNumberRootRoundingPriority,
  type FormatNumberRootRoundingIncrement,
  type FormatNumberRootTrailingZeroDisplay,
  FormatNumberRoot,
} from "./format-number.parts.js";

// Types
// -----

export type FormatNumberCompactDisplay = FormatNumberRootCompactDisplay;

export type FormatNumberCurrencyDisplay = FormatNumberRootCurrencyDisplay;

export type FormatNumberCurrencySign = FormatNumberRootCurrencySign;

export type FormatNumberLocaleMatcher = FormatNumberRootLocaleMatcher;

export type FormatNumberNotation = FormatNumberRootNotation;

export type FormatNumberLocale = FormatNumberRootLocale;

export type FormatNumberRoundingIncrement = FormatNumberRootRoundingIncrement;

export type FormatNumberRoundingMode = FormatNumberRootRoundingMode;

export type FormatNumberRoundingPriority = FormatNumberRootRoundingPriority;

export type FormatNumberSignDisplay = FormatNumberRootSignDisplay;

export type FormatNumberStyle = FormatNumberRootStyle;

export type FormatNumberTrailingZeroDisplay = FormatNumberRootTrailingZeroDisplay;

export type FormatNumberUnitDisplay = FormatNumberRootUnitDisplay;

export type FormatNumberUseGrouping = FormatNumberRootUseGrouping;

export type FormatNumberValue = FormatNumberRootValue;

/**
 * {@link FormatNumber} が持つ状態です。
 */
export type FormatNumberState = FormatNumberRootState;

/**
 * {@link FormatNumber} に渡す props です。
 */
export type FormatNumberProps = FormatNumberRootProps;

export type IFormatNumber = IComponent<FormatNumberProps>;

// API
// ---

/**
 * {@link FormatNumber} を構成する各パーツの props を作成するための API です。
 */
export class FormatNumberAPI {
  private readonly rootProps: FormatNumberRootProps;

  /**
   * @param props {@link FormatNumber} の props です。
   * @internal
   */
  public constructor(props: FormatNumberProps) {
    this.rootProps = props;
  }

  /**
   * {@link FormatNumberRoot} に渡す props を取得します。
   */
  public getRootProps(): FormatNumberRootProps {
    return this.rootProps;
  }
}

export interface IUseFormatNumberAPI {
  /**
   * {@link FormatNumberAPI} を作成します。
   *
   * @param props {@link FormatNumber} の props です。
   * @returns 数値書式の API です
   */
  (props: FormatNumberProps): FormatNumberAPI;
}

/**
 * {@link FormatNumberAPI} を作成するフックです。
 */
export const useFormatNumberAPI: IUseFormatNumberAPI = function useSuiFormatNumberAPI(props) {
  return new FormatNumberAPI(props);
};

export { FormatNumberAPI as API, useFormatNumberAPI as useAPI };

// Component
// ---------

/**
 * 数値をロケールに従って書式化して表示するコンポーネントです。
 *
 * 小数、通貨、パーセント、単位などの書式を指定できます。テキストノードとして描画されるため、見た目の調整は親要素で行います。
 */
export const FormatNumber: IFormatNumber = function SuiFormatNumber(props) {
  const api = useFormatNumberAPI(props);

  return <FormatNumberRoot {...api.getRootProps()} />;
};

export namespace FormatNumber {
  export type State = FormatNumberState;

  export type Props = FormatNumberProps;

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
