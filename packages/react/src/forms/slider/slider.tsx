import type { IComponent } from "../../types.js";
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

/**
 * {@link SliderRootColor} です。
 */
export type SliderColor = SliderRootColor;

/**
 * {@link SliderRootRadius} です。
 */
export type SliderRadius = SliderRootRadius;

/**
 * {@link SliderRootSize} です。
 */
export type SliderSize = SliderRootSize;

/**
 * {@link SliderRootVariant} です。
 */
export type SliderVariant = SliderRootVariant;

/**
 * {@link Slider} の各パーツに渡すプロパティーです。
 *
 * `label` または `value` を指定した場合だけ、対応するパーツが表示されます。
 * その他のプロパティーは対応するパーツへそのまま渡され、パーツ側の既定値より優先されます。
 */
export type SliderSlotProps = {
  /**
   * {@link SliderLabel} に渡すプロパティーです。
   */
  readonly label?: SliderLabelProps | undefined;

  /**
   * {@link SliderValue} に渡すプロパティーです。
   */
  readonly value?: SliderValueProps | undefined;

  /**
   * {@link SliderControl} に渡すプロパティーです。
   */
  readonly control?: SliderControlProps | undefined;

  /**
   * {@link SliderTrack} に渡すプロパティーです。
   */
  readonly track?: SliderTrackProps | undefined;

  /**
   * {@link SliderIndicator} に渡すプロパティーです。
   */
  readonly indicator?: SliderIndicatorProps | undefined;

  /**
   * {@link SliderThumb} に渡すプロパティーです。
   */
  readonly thumb?: SliderThumbProps | undefined;
};

/**
 * {@link Slider} の状態です。
 */
export type SliderState = SliderRootState;

/**
 * {@link Slider} コンポーネントのプロパティーです。
 *
 * `value` が指定されている場合は `defaultValue` より優先され、値が配列になると Thumb の数も更新されます。
 */
export type SliderProps = Omit<SliderRootProps, "children"> & {
  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   *
   * {@link SliderSlotProps} を参照してください。
   * 各パーツのプロパティーが優先されます。
   */
  slotProps?: SliderSlotProps | undefined;
};

/**
 * スライダーを表示するコンポーネントです。
 *
 * `value` または `defaultValue` が配列の場合は、値の数だけ Thumb を自動的に配置します。
 * Label と Value は `slotProps` を渡したときだけ表示します。
 */
export const Slider: IComponent<SliderProps> = function SuiSlider(props) {
  const {
    slotProps: {
      label: labelProps,
      thumb: thumbProps,
      track: trackProps,
      value: valueProps,
      control: controlProps,
      indicator: indicatorProps,
    } = {},
    ...rootProps
  } = props;
  const value = rootProps.value ?? rootProps.defaultValue;
  const thumbs = Array.isArray(value) ? (
    value.map((_, index) => <SliderThumb key={index} index={index} {...thumbProps} />)
  ) : (
    <SliderThumb index={0} {...thumbProps} />
  );

  return (
    <SliderRoot {...rootProps}>
      {labelProps ? <SliderLabel {...labelProps} /> : null}
      {valueProps ? <SliderValue {...valueProps} /> : null}
      <SliderControl {...controlProps}>
        <SliderTrack {...trackProps}>
          <SliderIndicator {...indicatorProps} />
          {thumbs}
        </SliderTrack>
      </SliderControl>
    </SliderRoot>
  );
};

/**
 * {@link Slider} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Slider {
  /**
   * {@link SliderState} です。
   */
  export type State = SliderState;

  /**
   * {@link SliderProps} です。
   */
  export type Props = SliderProps;

  /**
   * {@link SliderSlotProps} です。
   */
  export type SlotProps = SliderSlotProps;

  /**
   * {@link SliderColor} です。
   */
  export type Color = SliderColor;

  /**
   * {@link SliderRadius} です。
   */
  export type Radius = SliderRadius;

  /**
   * {@link SliderSize} です。
   */
  export type Size = SliderSize;

  /**
   * {@link SliderVariant} です。
   */
  export type Variant = SliderVariant;
}
