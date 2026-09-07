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
 */
export type SliderProps = Omit<SliderRootProps, "children"> & {
  /**
   * 各パーツに個別の props を渡すためのオブジェクトです。
   *
   * 各パーツの props が優先されます。
   */
  slotProps?: SliderSlotProps | undefined;
};

// API
// ---

/**
 * {@link Slider} を構成する各パーツの props を作成するための API です。
 */
export interface SliderAPI {
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
  getRootProps(): Omit<SliderRootProps, "children">;

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
   * @param props {@link Slider} の props です。
   * @returns スライダーの API です
   */
  (props: SliderProps): SliderAPI;
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
    getControlProps() {
      return controlProps;
    },
    getIndicatorProps() {
      return indicatorProps;
    },
    getLabelProps() {
      if (!labelProps) {
        return null;
      }

      return {
        ...labelProps,
      };
    },
    getRootProps() {
      return otherRootProps;
    },
    getThumbPropsList() {
      return Array.from({ length: thumbCount }, (_, index) => ({
        ...thumbProps,
        index,
      }));
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
export const Slider: IComponent<SliderProps> = function SuiSlider(props) {
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
  export type Props = SliderProps;

  /**
   * {@link SliderSlotProps}
   */
  export type SlotProps = SliderSlotProps;

  /**
   * {@link SliderColor}
   */
  export type Color = SliderColor;

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
