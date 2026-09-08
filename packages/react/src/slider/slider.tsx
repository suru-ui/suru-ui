import type { IComponent } from "../types.js";
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
} from "./slider.parts.jsx";

// Types
// -----

/**
 * {@link SliderRootChangeEventDetails}
 */
export type SliderChangeEventDetails = SliderRootChangeEventDetails;

/**
 * {@link SliderRootChangeEventReason}
 */
export type SliderChangeEventReason = SliderRootChangeEventReason;

/**
 * {@link SliderRootCommitEventDetails}
 */
export type SliderCommitEventDetails = SliderRootCommitEventDetails;

/**
 * {@link SliderRootCommitEventReason}
 */
export type SliderCommitEventReason = SliderRootCommitEventReason;

/**
 * {@link SliderRootColor}
 */
export type SliderColor = SliderRootColor;

/**
 * {@link SliderRootRadius}
 */
export type SliderRadius = SliderRootRadius;

/**
 * {@link SliderRootSize}
 */
export type SliderSize = SliderRootSize;

/**
 * {@link SliderRootVariant}
 */
export type SliderVariant = SliderRootVariant;

/**
 * {@link Slider} の各パーツに渡す props です。
 */
export type SliderSlotProps = {
  /**
   * {@link SliderControl} に渡す props です。
   */
  readonly control?: SliderControlProps | undefined;

  /**
   * {@link SliderIndicator} に渡す props です。
   */
  readonly indicator?: SliderIndicatorProps | undefined;

  /**
   * {@link SliderLabel} に渡す props です。
   */
  readonly label?: SliderLabelProps | undefined;

  /**
   * {@link SliderThumb} に渡す props です。
   */
  readonly thumb?: SliderThumbProps | undefined;

  /**
   * {@link SliderTrack} に渡す props です。
   */
  readonly track?: SliderTrackProps | undefined;

  /**
   * {@link SliderValue} に渡す props です。
   */
  readonly value?: SliderValueProps | undefined;
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
  Omit<SliderRootProps<TValue>, "children"> & {
    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: SliderSlotProps | undefined;
  };

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
    slotProps: {
      label: labelProps,
      thumb: thumbProps = {},
      track: trackProps = {},
      value: valueProps,
      control: controlProps = {},
      indicator: indicatorProps = {},
    } = {},
    ...otherRootProps
  } = props;
  const current = otherRootProps.value ?? otherRootProps.defaultValue;
  const thumbCount = Array.isArray(current) ? current.length : 1;

  return {
    getRootProps() {
      return otherRootProps;
    },
    getLabelProps() {
      if (!labelProps) {
        return null;
      }

      return {
        ...labelProps,
      };
    },
    getTrackProps() {
      return trackProps;
    },
    getValueProps() {
      if (!valueProps) {
        return null;
      }

      return {
        ...valueProps,
      };
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
 * つまみは矢印キーで操作でき、ラベルと現在値は `slotProps` を渡したときだけ表示します。
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
  /**
   * {@link SliderState}
   */
  export type State = SliderState;

  /**
   * {@link SliderProps}
   */
  export type Props<TValue extends number | readonly number[] = number | readonly number[]> =
    SliderProps<TValue>;

  /**
   * {@link SliderSlotProps}
   */
  export type SlotProps = SliderSlotProps;

  /**
   * {@link SliderChangeEventDetails}
   */
  export type ChangeEventDetails = SliderChangeEventDetails;

  /**
   * {@link SliderChangeEventReason}
   */
  export type ChangeEventReason = SliderChangeEventReason;

  /**
   * {@link SliderColor}
   */
  export type Color = SliderColor;

  /**
   * {@link SliderCommitEventDetails}
   */
  export type CommitEventDetails = SliderCommitEventDetails;

  /**
   * {@link SliderCommitEventReason}
   */
  export type CommitEventReason = SliderCommitEventReason;

  /**
   * {@link SliderRadius}
   */
  export type Radius = SliderRadius;

  /**
   * {@link SliderSize}
   */
  export type Size = SliderSize;

  /**
   * {@link SliderVariant}
   */
  export type Variant = SliderVariant;
}
