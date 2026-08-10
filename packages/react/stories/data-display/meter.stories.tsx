import { COLORS, SIZES } from "@suru-ui/theme";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Meter } from "../../src/data-display/meter/index.js";

const meta = preview.meta({
  title: "Data Display / Meter",
  component: Meter,
});

export default meta;

const ctrl = controls(Meter, {
  color: {
    options: COLORS,
    control: "select",
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
    options: ["none", "rounded", "full"],
    control: "select",
  },
  size: {
    options: SIZES,
    control: "select",
  },
  value: {
    control: "number",
  },
  variant: {
    options: ["naked", "liquid"],
    control: "select",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    color: "blue",
    max: 100,
    min: 0,
    outlined: false,
    radius: "full",
    size: "md",
    value: 24,
    variant: "liquid",
  }),
  render(props) {
    return (
      <div className="w-80">
        <Meter
          {...props}
          slotProps={{
            label: { children: "ストレージ使用量" },
            value: {},
          }}
        />
      </div>
    );
  },
});

export const Variants = meta.story({
  name: "バリエーション",
  ...ctrl({
    color: "blue",
    max: 100,
    min: 0,
    outlined: false,
    radius: "full",
    size: "md",
    value: 50,
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-6">
        <Meter {...props} variant="naked" />
        <Meter {...props} variant="liquid" />
      </div>
    );
  },
});

export const Outlined = meta.story({
  name: "枠線",
  ...ctrl({
    color: "blue",
    max: 100,
    min: 0,
    radius: "full",
    size: "md",
    value: 50,
    variant: "liquid",
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-6">
        <Meter {...props} variant="naked" outlined />
        <Meter {...props} variant="liquid" outlined />
      </div>
    );
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    max: 100,
    min: 0,
    outlined: false,
    radius: "full",
    size: "md",
    value: 50,
    variant: "liquid",
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-4">
        {COLORS.map((color) => (
          <div key={color}>
            <Meter {...props} color={color} />
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
    color: "blue",
    max: 100,
    min: 0,
    outlined: false,
    radius: "full",
    value: 50,
    variant: "liquid",
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-6">
        {SIZES.map((size) => (
          <div key={size}>
            <Meter {...props} size={size} />
            <div>{size}</div>
          </div>
        ))}
      </div>
    );
  },
});

export const Radius = meta.story({
  name: "角丸",
  ...ctrl({
    color: "blue",
    max: 100,
    min: 0,
    outlined: false,
    size: "md",
    value: 50,
    variant: "liquid",
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-6">
        {(["none", "rounded", "full"] as const).map((radius) => (
          <div key={radius}>
            <Meter {...props} radius={radius} />
            <div>{radius}</div>
          </div>
        ))}
      </div>
    );
  },
});

export const Range = meta.story({
  name: "範囲",
  ...ctrl({
    color: "blue",
    outlined: false,
    radius: "full",
    size: "md",
    value: 50,
    variant: "liquid",
  }),
  render(props) {
    return (
      <div className="w-80">
        <Meter
          {...props}
          min={20}
          max={80}
          value={50}
          slotProps={{
            label: { children: "範囲 20 から 80" },
            value: {},
          }}
        />
      </div>
    );
  },
});
