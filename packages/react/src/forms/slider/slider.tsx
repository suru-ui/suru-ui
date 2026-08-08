import type { Component } from "../../types.js";
import * as SliderParts from "./slider.parts.jsx";

/**
 * {@link Slider} の各パーツに渡すプロパティーです。
 *
 * `label` または `value` を指定した場合だけ、対応するパーツが表示されます。
 * その他のプロパティーは対応するパーツへそのまま渡され、パーツ側の既定値より優先されます。
 */
export type SliderSlotProps = {
  /**
   * {@link SliderParts.Label} に渡すプロパティーです。
   */
  readonly label?: SliderParts.Label.Props | undefined;

  /**
   * {@link SliderParts.Value} に渡すプロパティーです。
   */
  readonly value?: SliderParts.Value.Props | undefined;

  /**
   * {@link SliderParts.Control} に渡すプロパティーです。
   */
  readonly control?: SliderParts.Control.Props | undefined;

  /**
   * {@link SliderParts.Track} に渡すプロパティーです。
   */
  readonly track?: SliderParts.Track.Props | undefined;

  /**
   * {@link SliderParts.Indicator} に渡すプロパティーです。
   */
  readonly indicator?: SliderParts.Indicator.Props | undefined;

  /**
   * {@link SliderParts.Thumb} に渡すプロパティーです。
   */
  readonly thumb?: SliderParts.Thumb.Props | undefined;
};

/**
 * {@link Slider} コンポーネントのプロパティーです。
 *
 * `value` が指定されている場合は `defaultValue` より優先され、値が配列になると Thumb の数も更新されます。
 */
export type SliderProps = SliderParts.Root.Props & {
  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   *
   * {@link SliderSlotProps} を参照してください。
   */
  slotProps?: SliderSlotProps | undefined;
};

/**
 * スライダーを表示するコンポーネントです。
 *
 * `value` または `defaultValue` が配列の場合は、値の数だけ Thumb を自動的に配置します。
 * Label と Value は `slotProps` を渡したときだけ表示します。
 *
 * @example 基本
 * ```tsx
 * <Slider defaultValue={25} />
 * ```
 *
 * @example ラベルと現在値の表示
 * ```tsx
 * <Slider
 *   defaultValue={25}
 *   slotProps={{
 *     label: { children: "音量" },
 *     value: {},
 *   }}
 * />
 * ```
 *
 * @example レンジスライダー
 * ```tsx
 * <Slider defaultValue={[25, 75]} />
 * ```
 */
export const Slider: Component<SliderProps> = function SuiSlider(props) {
  const {
    slotProps: {
      label: labelProps,
      value: valueProps,
      control: controlProps,
      track: trackProps,
      indicator: indicatorProps,
      thumb: thumbProps,
    } = {},
    ...rootProps
  } = props;
  const value = rootProps.value ?? rootProps.defaultValue;
  const thumbs = Array.isArray(value) ? (
    value.map((_, index) => <SliderParts.Thumb key={index} index={index} {...thumbProps} />)
  ) : (
    <SliderParts.Thumb index={0} {...thumbProps} />
  );

  return (
    <SliderParts.Root {...rootProps}>
      {labelProps ? <SliderParts.Label {...labelProps} /> : null}
      {valueProps ? <SliderParts.Value {...valueProps} /> : null}
      <SliderParts.Control {...controlProps}>
        <SliderParts.Track {...trackProps}>
          <SliderParts.Indicator {...indicatorProps} />
          {thumbs}
        </SliderParts.Track>
      </SliderParts.Control>
    </SliderParts.Root>
  );
};
