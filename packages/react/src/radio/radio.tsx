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

// Types.

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
    /** 各パーツに個別の props を渡すためのオブジェクトです。 */
    slotProps?: RadioSlotProps | undefined;
  };

  export type Root<TValue = any> = Omit<RadioRootProps<TValue>, keyof Radio | keyof Indicator>;
}

/**
 * {@link Radio} に渡す props です。
 *
 * @template TValue 項目の値の型です。
 */
export type RadioProps<TValue = any> = RadioProps.Radio &
  RadioProps.Root<TValue> &
  RadioProps.Indicator;

export interface IRadio extends IComponent<RadioProps> {
  /**
   * @template TValue 項目の値の型です。
   */
  <TValue = any>(props: RadioProps<TValue>): IComponent.Return;
}

export interface IUseRadioAPI {
  /**
   * {@link RadioAPI} を作成します。
   *
   * @template TValue 項目の値の型です。
   *
   * @param props {@link Radio} の props です。
   *
   * @returns ラジオボタンの API です。
   */
  <TValue = any>(props: RadioProps<TValue>): RadioAPI<TValue>;
}

// API.

/**
 * {@link Radio} を構成する各パーツの props などを作成するための API です。
 *
 * @template TValue 項目の値の型です。
 */
export class RadioAPI<TValue = any> {
  private readonly indicatorProps: Required<RadioProps.Indicator>;

  private readonly slotProps: RadioSlotProps;

  private readonly rootProps: RadioProps.Root<TValue>;

  /**
   * @param props {@link Radio} の props です。
   *
   * @internal
   */
  public constructor(props: RadioProps<TValue>) {
    const { children, slotProps = {}, ...rootProps } = props;
    this.indicatorProps = {
      children,
    };
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
  public getRootProps(): Omit<RadioRootProps<TValue>, "children"> {
    return this.rootProps;
  }
}

/**
 * {@link RadioAPI} を作成するフックです。
 */
export const useRadioAPI: IUseRadioAPI = <TValue = any,>(props: RadioProps<TValue>) =>
  new RadioAPI(props);

export { RadioAPI as API, useRadioAPI as useAPI };

// Component.

/**
 * ラジオボタンを表示するコンポーネントです。
 *
 * ラベルのテキストは `label` 要素で囲んで指定します。
 */
export const Radio: IRadio = <TValue = any,>(props: RadioProps<TValue>) => {
  const api = useRadioAPI(props);

  return (
    <RadioRoot {...api.getRootProps()}>
      <RadioIndicator {...api.getIndicatorProps()} />
    </RadioRoot>
  );
};

export namespace Radio {
  export type State = RadioState;

  export type Props<TValue = any> = RadioProps<TValue>;

  export type SlotProps = RadioSlotProps;

  export type Color = RadioColor;

  export type Radius = RadioRadius;

  export type Size = RadioSize;

  export type Variant = RadioVariant;
}
