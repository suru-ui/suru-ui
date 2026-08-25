import { SIZES, COLORS } from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Progress } from "../src/progress/index.js";

const RADII = ["none", ...SIZES, "full"] as const;
const VARIANTS = ["naked", "liquid"] as const;

const meta = preview.meta({
  title: "Data Display / Progress",
  component: Progress,
});

export default meta;

const ctrl = controls(Progress, {
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
    label: "データを準備しています",
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: "full",
    outlined: false,
    max: 100,
    value: null,
    min: 0,
  }),
  render(props) {
    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
      const interval = setInterval(() => {
        setValue((current) => {
          if (current >= props.max!) {
            return 0;
          } else {
            return Math.min(100, Math.round(current + Math.random() * 25));
          }
        });
      }, 2e3);

      return () => clearInterval(interval);
    }, [props.max]);

    return <Progress {...props} value={value} className="w-[300px]" />;
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
          <Progress {...props} key={variant} label={variant} variant={variant} />
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
          <Progress {...props} key={variant} variant={variant} />
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
          <Progress {...props} key={color} color={color} label={color} />
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
            <Progress {...props} key={radius} label={radius} radius={radius} />
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
        <Progress {...props} label="naked" variant="naked" outlined />
        <Progress {...props} label="liquid" variant="liquid" outlined />
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
          <Progress key={size} {...props} size={size} label={size} />
        ))}
      </div>
    );
  },
});

export const Indeterminate = meta.story({
  name: "不確定状態",
  ...ctrl({
    label: "データを準備しています",
    variant: "liquid",
    color: "grey",
    radius: "full",
    outlined: false,
    value: null,
  }),
  render(props) {
    return (
      <div className="w-80">
        <Progress {...props} value={null} />
      </div>
    );
  },
});
