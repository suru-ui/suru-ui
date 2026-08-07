import type { Component } from "../../types.js";
import * as SliderParts from "./slider.parts.jsx";

/**
 * {@link Slider} コンポーネントのプロパティーです。
 */
export type SliderProps = SliderParts.Root.Props & {
  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   */
  slotProps?:
    | {
        readonly label?: SliderParts.Label.Props | undefined;

        readonly value?: SliderParts.Value.Props | undefined;

        readonly control?: SliderParts.Control.Props | undefined;

        readonly track?: SliderParts.Track.Props | undefined;

        readonly indicator?: SliderParts.Indicator.Props | undefined;

        readonly thumb?: SliderParts.Thumb.Props | undefined;
      }
    | undefined;
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
  const thumbCount = Array.isArray(value) ? value.length : 1;

  return (
    <SliderParts.Root {...rootProps}>
      {labelProps ? <SliderParts.Label {...labelProps} /> : null}
      {valueProps ? <SliderParts.Value {...valueProps} /> : null}
      <SliderParts.Control {...controlProps}>
        <SliderParts.Track {...trackProps}>
          <SliderParts.Indicator {...indicatorProps} />
          {Array.from({ length: thumbCount }, (_, index) => (
            <SliderParts.Thumb key={index} index={index} {...thumbProps} />
          ))}
        </SliderParts.Track>
      </SliderParts.Control>
    </SliderParts.Root>
  );
};
