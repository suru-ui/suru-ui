import * as theme from "@suru-ui/theme";

import { preview, controls } from "../.config/storybook/preview.js";
import { Meter } from "../src/meter/index.js";

const COLORS: readonly Meter.Color[] = theme.COLORS;
const RADII: readonly Meter.Radius[] = ["none", ...theme.SIZES, "full"];
const SIZES: readonly Meter.Size[] = theme.SIZES;
const VARIANTS: readonly Meter.Variant[] = ["naked", "liquid"];

const meta = preview.meta({
  title: "Meter",
  component: Meter,
});

export default meta;

const ctrl = controls(Meter, {
  color: {
    control: "select",
    options: COLORS,
  },
  label: {
    control: "text",
  },
  max: {
    control: "number",
  },
  min: {
    control: "number",
  },
  outlined: {
    control: "boolean",
  },
  radius: {
    control: "select",
    options: RADII,
  },
  size: {
    control: "select",
    options: SIZES,
  },
  value: {
    control: "number",
  },
  variant: {
    control: "select",
    options: VARIANTS,
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    label: "ストレージ使用量",
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: "full",
    outlined: false,
    max: 100,
    value: 24,
    min: 0,
  }),
  render(props) {
    return <Meter {...props} className="w-[300px]" />;
  },
});

export const Variants = meta.story({
  name: "主な外観",
  ...ctrl({
    color: "grey",
    size: "md",
    radius: "full",
    outlined: false,
    max: 100,
    value: 24,
    min: 0,
  }),
  render(props) {
    return (
      <div className="flex w-[300px] flex-col gap-6">
        {VARIANTS.map((variant) => (
          <Meter {...props} key={variant} label={variant} variant={variant} />
        ))}
      </div>
    );
  },
});

export const Labelless = meta.story({
  name: "ラベルなし",
  ...ctrl({
    color: "grey",
    size: "md",
    radius: "full",
    outlined: false,
    max: 100,
    value: 24,
    min: 0,
  }),
  render(props) {
    return (
      <div className="flex w-[300px] flex-col gap-6">
        {VARIANTS.map((variant) => (
          <Meter {...props} key={variant} variant={variant} />
        ))}
      </div>
    );
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    size: "md",
    radius: "full",
    outlined: false,
    max: 100,
    value: 24,
    min: 0,
  }),
  render(props) {
    return (
      <div className="flex w-[300px] flex-col gap-4">
        {COLORS.map((color) => (
          <Meter {...props} key={color} color={color} label={color} />
        ))}
      </div>
    );
  },
});

export const Radius = meta.story({
  name: "角丸",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: "full",
    outlined: false,
    max: 100,
    value: 24,
    min: 0,
  }),
  render(props) {
    return (
      <div className="flex w-[300px] flex-col gap-6">
        {RADII.map((radius) => (
          <div key={radius} className="flex flex-col items-center gap-2">
            <Meter {...props} key={radius} label={radius} radius={radius} />
          </div>
        ))}
      </div>
    );
  },
});

export const Outlined = meta.story({
  name: "枠線",
  ...ctrl({
    size: "md",
    radius: "full",
    max: 100,
    value: 24,
    min: 0,
  }),
  render(props) {
    return (
      <div className="flex w-[300px] flex-col gap-6">
        <Meter {...props} label="naked" variant="naked" outlined />
        <Meter {...props} label="liquid" variant="liquid" outlined />
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    radius: "full",
    outlined: false,
    max: 100,
    value: 24,
    min: 0,
  }),
  render(props) {
    return (
      <div className="flex w-[300px] flex-col gap-6">
        {SIZES.map((size) => (
          <Meter key={size} {...props} size={size} label={size} />
        ))}
      </div>
    );
  },
});

export const Values = meta.story({
  name: "値の範囲",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: "full",
    outlined: false,
    max: 100,
    min: 0,
  }),
  render(props) {
    const items = [
      { label: "空 (0)", value: 0 },
      { label: "半分 (50)", value: 50 },
      { label: "満杯 (100)", value: 100 },
      { label: "範囲外 (120)", value: 120 },
    ] as const;
    return (
      <div className="flex w-[300px] flex-col gap-6">
        {items.map((item) => (
          <Meter {...props} key={item.label} label={item.label} value={item.value} />
        ))}
      </div>
    );
  },
});

export const CustomRange = meta.story({
  name: "範囲の指定",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: "full",
    outlined: false,
  }),
  render(props) {
    const items = [
      { label: "下限 (-50)", value: -50 },
      { label: "中央 (0)", value: 0 },
      { label: "上限 (50)", value: 50 },
    ] as const;
    return (
      <div className="flex w-[300px] flex-col gap-6">
        {items.map((item) => (
          <Meter
            {...props}
            key={item.label}
            max={50}
            min={-50}
            label={item.label}
            value={item.value}
          />
        ))}
      </div>
    );
  },
});

export const Formatting = meta.story({
  name: "値の書式",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: "full",
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex w-[300px] flex-col gap-6">
        <Meter
          {...props}
          max={50}
          min={0}
          label="容量 (GB)"
          value={36.5}
          format={{ style: "unit", unit: "gigabyte", maximumFractionDigits: 1 }}
          locale="ja-JP"
        />
        <Meter
          {...props}
          max={1}
          min={0}
          label="割合 (パーセント)"
          value={0.72}
          format={{ style: "percent" }}
          locale="ja-JP"
        />
      </div>
    );
  },
});

export const LongLabel = meta.story({
  name: "長いラベル",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: "full",
    outlined: false,
    max: 100,
    value: 24,
    min: 0,
  }),
  render(props) {
    return (
      <div className="flex w-[300px] flex-col gap-6">
        <Meter
          {...props}
          label="とても長いラベルがどのように表示されるかを確認するためのメーターです"
        />
        <Meter {...props} label="短いラベル" />
      </div>
    );
  },
});

export const Accessibility = meta.story({
  name: "アクセシビリティー",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: "full",
    outlined: false,
    max: 100,
    value: 24,
    min: 0,
  }),
  render(props) {
    return (
      <div className="flex w-[300px] flex-col gap-6">
        <Meter
          {...props}
          getAriaValueText={(formattedValue) => `${formattedValue}使用中`}
          aria-label="ストレージ使用量"
        />
        <Meter {...props} label="見えるラベルがある場合" />
      </div>
    );
  },
});

export const Storage = meta.story({
  name: "実践例: ストレージ使用量",
  ...ctrl({
    variant: "liquid",
    color: "blue",
    size: "md",
    radius: "full",
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex w-[300px] flex-col gap-1">
        <Meter
          {...props}
          max={256}
          min={0}
          label="ストレージ"
          value={183}
          format={{ style: "unit", unit: "gigabyte", maximumFractionDigits: 0 }}
          locale="ja-JP"
        />
        <span className="text-sm text-(--sui-canvas_text-2)">残り 73 GB です。</span>
      </div>
    );
  },
});

export const Dashboard = meta.story({
  name: "実践例: ダッシュボード",
  ...ctrl({
    variant: "liquid",
    size: "md",
    radius: "full",
    outlined: false,
    max: 100,
    min: 0,
  }),
  render(props) {
    const items = [
      { label: "CPU", color: "red", value: 82 },
      { label: "メモリー", color: "blue", value: 64 },
      { label: "ディスク", color: "green", value: 37 },
    ] as const;
    return (
      <div className="flex w-[300px] flex-col gap-6">
        {items.map((item) => (
          <Meter
            {...props}
            key={item.label}
            color={item.color}
            label={item.label}
            value={item.value}
          />
        ))}
      </div>
    );
  },
});
