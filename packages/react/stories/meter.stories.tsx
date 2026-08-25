import { SIZES, COLORS } from "@suru-ui/theme";

import { preview, controls } from "../.config/storybook/preview.js";
import { Meter } from "../src/meter/index.js";

const RADII = ["none", ...SIZES, "full"] as const;
const VARIANTS = ["naked", "liquid"] as const;

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
    options: RADII,
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
    options: VARIANTS,
    control: "select",
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
