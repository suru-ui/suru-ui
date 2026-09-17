import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import type { Override, IComponent } from "../types.js";
import {
  type SliderRootSize,
  type SliderRootColor,
  type SliderRootProps,
  type SliderRootState,
  type SliderLabelProps,
  type SliderRootRadius,
  type SliderThumbProps,
  type SliderTrackProps,
  type SliderValueProps,
  type SliderRootVariant,
  type SliderControlProps,
  type SliderIndicatorProps,
  type SliderRootChangeEventReason,
  type SliderRootCommitEventReason,
  type SliderRootChangeEventDetails,
  type SliderRootCommitEventDetails,
  SliderRoot,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValue,
  SliderControl,
  SliderIndicator,
} from "./slider.parts.js";

// Types
// -----

export type SliderChangeEventDetails = SliderRootChangeEventDetails;

export type SliderChangeEventReason = SliderRootChangeEventReason;

export type SliderCommitEventDetails = SliderRootCommitEventDetails;

export type SliderCommitEventReason = SliderRootCommitEventReason;

export type SliderColor = SliderRootColor;

export type SliderRadius = SliderRootRadius;

export type SliderSize = SliderRootSize;

export type SliderVariant = SliderRootVariant;

/**
 * {@link Slider} の各パーツに渡す props です。
 */
export type SliderSlotProps = {
  /**
   * {@link SliderControl} に渡す props です。
   */
  readonly control?: Omit<SliderControlProps, "children"> | undefined;

  /**
   * {@link SliderIndicator} に渡す props です。
   */
  readonly indicator?: Omit<SliderIndicatorProps, "children"> | undefined;

  /**
   * {@link SliderLabel} に渡す props です。
   */
  readonly label?: Omit<SliderLabelProps, "children"> | undefined;

  /**
   * {@link SliderThumb} に渡す props です。
   */
  readonly thumb?: Omit<SliderThumbProps, "children"> | undefined;

  /**
   * {@link SliderTrack} に渡す props です。
   */
  readonly track?: Omit<SliderTrackProps, "children"> | undefined;

  /**
   * {@link SliderValue} に渡す props です。
   */
  readonly value?: Omit<SliderValueProps, "children"> | undefined;
};

/**
 * {@link Slider} が持つ状態です。
 */
export type SliderState = SliderRootState;

/**
 * {@link Slider} に渡す props です。
 *
 * `value` を指定すると制御コンポーネントになり、`onValueChange` とあわせて使います。
 * `value` が配列のときは値の数だけつまみが表示されます。
 *
 * @template TValue 値の型です。
 */
export type SliderProps<TValue extends number | readonly number[] = number | readonly number[]> =
  Override<
    Omit<SliderRootProps<TValue>, "children">,
    {
      /**
       * スライダーの説明ラベルです。
       *
       * 指定すると {@link SliderLabel} を表示します。
       */
      label?: SliderLabelProps["children"] | undefined;

      /**
       * 現在値の表示内容です。
       *
       * `true` を指定すると {@link SliderValue} が数値を既定の形式で表示します。
       * 関数を指定すると、書式化された値と生の値を引数として受け取り、表示内容を返します。
       */
      renderValue?: SliderValueProps["children"] | true | undefined;

      /**
       * 各パーツに個別の props を渡すためのオブジェクトです。
       */
      slotProps?: SliderSlotProps | undefined;
    }
  >;

// API
// ---

/**
 * {@link Slider} を構成する各パーツの props を作成するための API です。
 *
 * @template TValue 値の型です。
 */
export interface SliderAPI<TValue extends number | readonly number[] = number | readonly number[]> {
  /**
   * {@link SliderControl} に渡す props を取得します。
   */
  getControlProps(): SliderControlProps;

  /**
   * {@link SliderIndicator} に渡す props を取得します。
   */
  getIndicatorProps(): SliderIndicatorProps;

  /**
   * {@link SliderLabel} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  getLabelProps(): SliderLabelProps | null;

  /**
   * {@link SliderRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<SliderRootProps<TValue>, "children">;

  /**
   * {@link SliderThumb} に渡す props の一覧を取得します。
   *
   * `value` または `defaultValue` が配列のときは値の数だけ返します。
   */
  getThumbPropsList(): readonly SliderThumbProps[];

  /**
   * {@link SliderTrack} に渡す props を取得します。
   */
  getTrackProps(): SliderTrackProps;

  /**
   * {@link SliderValue} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  getValueProps(): SliderValueProps | null;
}

interface IUseSliderAPI {
  /**
   * {@link SliderAPI} を作成します。
   *
   * @template TValue 値の型です。
   * @param props {@link Slider} の props です。
   * @returns スライダーの API です
   */
  <TValue extends number | readonly number[] = number | readonly number[]>(
    props: SliderProps<TValue>,
  ): SliderAPI<TValue>;
}

/**
 * {@link SliderAPI} を作成するフックです。
 */
export const useSliderAPI: IUseSliderAPI = function useSuiSliderAPI(props) {
  const {
    label,
    slotProps: {
      label: labelProps,
      thumb: thumbProps = {},
      track: trackProps = {},
      value: valueProps,
      control: controlProps = {},
      indicator: indicatorProps = {},
    } = {},
    renderValue,
    ...otherRootProps
  } = props;
  const current = otherRootProps.value ?? otherRootProps.defaultValue;
  const thumbCount = Array.isArray(current) ? current.length : 1;

  return {
    getRootProps() {
      return otherRootProps;
    },
    getLabelProps() {
      if (isLikelyVisibleNode(label)) {
        return {
          ...labelProps,
          children: label,
        };
      }

      if (labelProps) {
        return labelProps;
      }

      return null;
    },
    getTrackProps() {
      return trackProps;
    },
    getValueProps() {
      if (renderValue !== undefined) {
        return {
          ...valueProps,
          children: renderValue === true ? undefined : renderValue,
        };
      }

      if (valueProps) {
        return valueProps;
      }

      return null;
    },
    getControlProps() {
      return controlProps;
    },
    getIndicatorProps() {
      return indicatorProps;
    },
    getThumbPropsList() {
      return Array.from({ length: thumbCount }, (_, index) => ({
        ...thumbProps,
        index,
      }));
    },
  };
};

export { type SliderAPI as API, useSliderAPI as useAPI };

// Component
// ---------

/**
 * スライダーを表示するコンポーネントです。
 *
 * 単一値のときはつまみを 1 つ、配列のときは値の数だけつまみを表示します。
 * つまみは矢印キーで操作でき、ラベルと現在値は `label` と `renderValue` を渡したときだけ表示します。
 */
interface ISlider extends IComponent<SliderProps> {
  /**
   * @template TValue 値の型です。
   */
  <TValue extends number | readonly number[] = number | readonly number[]>(
    props: SliderProps<TValue>,
  ): IComponent.Return;
}

export const Slider: ISlider = function SuiSlider(props: SliderProps) {
  const api = useSliderAPI(props);
  const labelProps = api.getLabelProps();
  const valueProps = api.getValueProps();

  return (
    <SliderRoot {...api.getRootProps()}>
      {labelProps && <SliderLabel {...labelProps} />}
      {valueProps && <SliderValue {...valueProps} />}
      <SliderControl {...api.getControlProps()}>
        <SliderTrack {...api.getTrackProps()}>
          <SliderIndicator {...api.getIndicatorProps()} />
          {api.getThumbPropsList().map((thumbProps, index) => (
            <SliderThumb key={index} {...thumbProps} />
          ))}
        </SliderTrack>
      </SliderControl>
    </SliderRoot>
  );
};

export namespace Slider {
  export type State = SliderState;

  export type Props<TValue extends number | readonly number[] = number | readonly number[]> =
    SliderProps<TValue>;

  export type SlotProps = SliderSlotProps;

  export type ChangeEventDetails = SliderChangeEventDetails;

  export type ChangeEventReason = SliderChangeEventReason;

  export type Color = SliderColor;

  export type CommitEventDetails = SliderCommitEventDetails;

  export type CommitEventReason = SliderCommitEventReason;

  export type Radius = SliderRadius;

  export type Size = SliderSize;

  export type Variant = SliderVariant;
}
