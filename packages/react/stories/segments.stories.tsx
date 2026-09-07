import { SIZES, COLORS } from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Segments, SegmentsItem } from "../src/segments/index.js";

const meta = preview.meta({
  title: "Segments",
  component: Segments,
});

export default meta;

const ctrl = controls(Segments, {
  color: {
    options: COLORS,
    control: "select",
  },
  size: {
    options: SIZES,
    control: "select",
  },
  radius: {
    control: "select",
    options: ["none", "sm", "md", "lg", "full"],
  },
});

const usageItems = [
  {
    value: "day",
    label: "日",
  },
  {
    value: "week",
    label: "週",
  },
  {
    value: "month",
    label: "月",
  },
];

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    color: "grey",
    radius: "full",
    size: "md",
  }),
  render(props) {
    return <Segments {...props} items={usageItems} defaultValue="week" />;
  },
});

export const Controlled = meta.story({
  name: "制御",
  ...ctrl({
    color: "grey",
    radius: "full",
    size: "md",
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
    color: "grey",
    radius: "full",
    size: "md",
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
    color: "grey",
    radius: "full",
    size: "md",
  }),
  render(props) {
    return (
      <Segments
        {...props}
        items={[
          {
            value: "day",
            label: "日",
          },
          {
            value: "week",
            label: "週",
            disabled: true,
          },
          {
            value: "month",
            label: "月",
          },
        ]}
        defaultValue="month"
      />
    );
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    radius: "full",
    size: "md",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {COLORS.map((color) => (
          <div key={color}>
            <Segments {...props} color={color} items={usageItems} defaultValue="week" />
            <div>{color}</div>
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
    radius: "full",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {SIZES.map((size) => (
          <div key={size}>
            <Segments {...props} size={size} items={usageItems} defaultValue="week" />
            <div>{size}</div>
          </div>
        ))}
      </div>
    );
  },
});

export const Radiuses = meta.story({
  name: "角丸",
  ...ctrl({
    color: "grey",
    size: "md",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {(["none", "sm", "md", "lg", "full"] as const).map((radius) => (
          <div key={radius}>
            <Segments {...props} items={usageItems} radius={radius} defaultValue="week" />
            <div>{radius}</div>
          </div>
        ))}
      </div>
    );
  },
});
