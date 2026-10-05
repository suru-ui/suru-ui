import * as theme from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Segments, SegmentsItem } from "./index.js";

const ACTIVE_VARIANTS: readonly Segments.ActiveVariant[] = theme.COLOR_TEMPLATES;
const COLORS: readonly Segments.Color[] = theme.COLORS;
const RADII: readonly Segments.Radius[] = ["none", ...theme.SIZES, "full"];
const SIZES: readonly Segments.Size[] = theme.SIZES;

const meta = preview.meta({
  title: "Segments",
  component: Segments,
});

export default meta;

const ctrl = controls(Segments, {
  size: {
    control: "select",
    options: SIZES,
  },
  color: {
    control: "select",
    options: COLORS,
  },
  radius: {
    control: "select",
    options: RADII,
  },
  activeVariant: {
    control: "select",
    options: ACTIVE_VARIANTS,
  },
});

const usageItems = [
  {
    label: "日",
    value: "day",
  },
  {
    label: "週",
    value: "week",
  },
  {
    label: "月",
    value: "month",
  },
];

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    activeVariant: "solid",
  }),
  render(props) {
    return <Segments {...props} items={usageItems} defaultValue="week" />;
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    size: "md",
    radius: undefined,
    activeVariant: "solid",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {COLORS.map((color) => (
          <div key={color} className="flex flex-col gap-2">
            <span>{color}</span>
            <Segments {...props} color={color} items={usageItems} defaultValue="week" />
          </div>
        ))}
      </div>
    );
  },
});

export const ActiveVariants = meta.story({
  name: "選択中の外観",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {ACTIVE_VARIANTS.map((activeVariant) => (
          <div key={activeVariant} className="flex flex-col gap-2">
            <span>{activeVariant}</span>
            <Segments
              {...props}
              items={usageItems}
              defaultValue="week"
              activeVariant={activeVariant}
            />
          </div>
        ))}
      </div>
    );
  },
});

export const Radii = meta.story({
  name: "角丸",
  ...ctrl({
    size: "md",
    color: "grey",
    activeVariant: "solid",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {RADII.map((radius) => (
          <div key={radius} className="flex flex-col gap-2">
            <span>{radius}</span>
            <Segments {...props} items={usageItems} radius={radius} defaultValue="week" />
          </div>
        ))}
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    color: "grey",
    radius: undefined,
    activeVariant: "solid",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col gap-2">
            <span>{size}</span>
            <Segments {...props} size={size} items={usageItems} defaultValue="week" />
          </div>
        ))}
      </div>
    );
  },
});

export const Controlled = meta.story({
  name: "制御",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    activeVariant: "solid",
  }),
  render(props) {
    const [value, setValue] = React.useState("week");

    return (
      <div className="flex flex-col gap-2">
        <Segments
          {...props}
          items={usageItems}
          value={value}
          onValueChange={(nextValue) => setValue(String(nextValue))}
        />
        <span>現在の値: {value}</span>
      </div>
    );
  },
});

export const Renderer = meta.story({
  name: "描画の上書き",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    activeVariant: "solid",
  }),
  render(props) {
    return (
      <Segments {...props} items={usageItems} defaultValue="week">
        {(item, index) => (
          <SegmentsItem key={index} value={item.value}>
            「{item.label}」
          </SegmentsItem>
        )}
      </Segments>
    );
  },
});

export const DisabledItem = meta.story({
  name: "無効な項目",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    activeVariant: "solid",
  }),
  render(props) {
    return (
      <Segments
        {...props}
        items={[
          {
            label: "日",
            value: "day",
          },
          {
            label: "週",
            value: "week",
            disabled: true,
          },
          {
            label: "月",
            value: "month",
          },
        ]}
        defaultValue="month"
      />
    );
  },
});
