import type { IComponent } from "../types.js";
import {
  type RadioRootSize,
  type RadioRootColor,
  type RadioRootProps,
  type RadioRootState,
  type RadioRootRadius,
  type RadioRootVariant,
  type RadioIndicatorProps,
  RadioRoot,
  RadioIndicator,
} from "./radio.parts.jsx";

// Types
// -----

/**
 * {@link RadioRootColor}
 */
export type RadioColor = RadioRootColor;

/**
 * {@link RadioRootRadius}
 */
export type RadioRadius = RadioRootRadius;

/**
 * {@link RadioRootSize}
 */
export type RadioSize = RadioRootSize;

/**
 * {@link RadioRootVariant}
 */
export type RadioVariant = RadioRootVariant;

/**
 * {@link Radio} の各パーツに渡す props です。
 */
export type RadioSlotProps = {
  /**
   * {@link RadioIndicator} に渡す props です。
   */
  readonly indicator?: Omit<RadioIndicatorProps, "children"> | undefined;
};

/**
 * {@link Radio} が持つ状態です。
 */
export type RadioState = RadioRootState;

/**
 * {@link Radio} に渡す props です。
 */
export type RadioProps = Omit<RadioRootProps, "children"> &
  Pick<RadioIndicatorProps, "children"> & {
    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     *
     * 各パーツの props が優先されます。
     */
    slotProps?: RadioSlotProps | undefined;
  };

// API
// ---

/**
 * {@link Radio} を構成する各パーツの props を作成するための API です。
 */
export interface RadioAPI {
  /**
   * {@link RadioIndicator} に渡す props を取得します。
   */
  getIndicatorProps(): RadioIndicatorProps;

  /**
   * {@link RadioRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<RadioRootProps, "children">;
}

interface IUseRadioAPI {
  /**
   * {@link RadioAPI} を作成します。
   *
   * @param props {@link Radio} の props です。
   * @returns ラジオボタンの API です
   */
  (props: RadioProps): RadioAPI;
}

/**
 * {@link RadioAPI} を作成するフックです。
 */
export const useRadioAPI: IUseRadioAPI = function useSuiRadioAPI(props) {
  const { children, slotProps: { indicator: indicatorProps = {} } = {}, ...otherRootProps } = props;

  return {
    getRootProps() {
      return otherRootProps;
    },
    getIndicatorProps() {
      return {
        ...indicatorProps,
        children,
      };
    },
  };
};

export { type RadioAPI as API, useRadioAPI as useAPI };

// Component
// ---------

/**
 * ラジオボタンを表示するコンポーネントです。
 */
export const Radio: IComponent<RadioProps> = function SuiRadio(props) {
  const api = useRadioAPI(props);

  return (
    <RadioRoot {...api.getRootProps()}>
      <RadioIndicator {...api.getIndicatorProps()} />
    </RadioRoot>
  );
};

export namespace Radio {
  /**
   * {@link RadioState}
   */
  export type State = RadioState;

  /**
   * {@link RadioProps}
   */
  export type Props = RadioProps;

  /**
   * {@link RadioSlotProps}
   */
  export type SlotProps = RadioSlotProps;

  /**
   * {@link RadioColor}
   */
  export type Color = RadioColor;

  /**
   * {@link RadioRadius}
   */
  export type Radius = RadioRadius;

  /**
   * {@link RadioSize}
   */
  export type Size = RadioSize;

  /**
   * {@link RadioVariant}
   */
  export type Variant = RadioVariant;
}
