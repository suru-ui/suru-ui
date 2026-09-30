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

namespace RadioProps {
  export type Indicator = Pick<RadioIndicatorProps, "children">;

  export type Radio = {
    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: RadioSlotProps | undefined;
  };

  export type Root = Omit<RadioRootProps, keyof Radio | keyof Indicator>;
}

/**
 * {@link Radio} に渡す props です。
 */
export type RadioProps = RadioProps.Radio & RadioProps.Root & RadioProps.Indicator;

export type IRadio = IComponent<RadioProps>;

export interface IUseRadioAPI {
  /**
   * {@link RadioAPI} を作成します。
   *
   * @param props {@link Radio} の props です。
   * @returns ラジオボタンの API です。
   */
  (props: RadioProps): RadioAPI;
}

// API
// ---

/**
 * {@link Radio} を構成する各パーツの props などを作成するための API です。
 */
export class RadioAPI {
  private readonly indicatorProps: Required<RadioProps.Indicator>;

  private readonly slotProps: RadioSlotProps;

  private readonly rootProps: RadioProps.Root;

  /**
   * @param props {@link Radio} の props です。
   * @internal
   */
  public constructor(props: RadioProps) {
    const { children, slotProps = {}, ...rootProps } = props;
    this.indicatorProps = { children };
    this.slotProps = slotProps;
    this.rootProps = rootProps;
  }

  /**
   * {@link RadioIndicator} に渡す props を取得します。
   */
  public getIndicatorProps(): RadioIndicatorProps {
    const { indicator: props = {} } = this.slotProps;

    return {
      ...props,
      ...this.indicatorProps,
    };
  }

  /**
   * {@link RadioRoot} に渡す props を取得します。
   */
  public getRootProps(): Omit<RadioRootProps, "children"> {
    return this.rootProps;
  }
}

/**
 * {@link RadioAPI} を作成するフックです。
 */
export const useRadioAPI: IUseRadioAPI = function useSuiRadioAPI(props) {
  return new RadioAPI(props);
};

export { RadioAPI as API, useRadioAPI as useAPI };

// Component
// ---------

/**
 * ラジオボタンを表示するコンポーネントです。
 *
 * ラベルのテキストは `label` 要素で囲んで指定します。
 */
export const Radio: IRadio = function SuiRadio(props) {
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
