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
} from "./radio.parts.js";

// Types
// -----

export type RadioColor = RadioRootColor;

export type RadioRadius = RadioRootRadius;

export type RadioSize = RadioRootSize;

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
        children,
        ...indicatorProps,
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
  export type State = RadioState;

  export type Props = RadioProps;

  export type SlotProps = RadioSlotProps;

  export type Color = RadioColor;

  export type Radius = RadioRadius;

  export type Size = RadioSize;

  export type Variant = RadioVariant;
}
