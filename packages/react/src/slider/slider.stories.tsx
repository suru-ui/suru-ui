import * as theme from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Slider } from "./index.js";

const COLORS: readonly Slider.Color[] = theme.COLORS;
const RADII: readonly Slider.Radius[] = ["none", ...theme.SIZES, "full"];
const SIZES: readonly Slider.Size[] = theme.SIZES;
const VARIANTS: readonly Slider.Variant[] = ["naked", "liquid"];

const meta = preview.meta({
  title: "Slider",
  component: Slider,
});

export default meta;

const ctrl = controls(Slider, {
  size: {
    control: "select",
    options: SIZES,
  },
  color: {
    control: "select",
    options: COLORS,
  },
  label: {
    control: "text",
  },
  radius: {
    control: "select",
    options: RADII,
  },
  variant: {
    control: "select",
    options: VARIANTS,
  },
  disabled: {
    control: "boolean",
  },
  outlined: {
    control: "boolean",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    size: "md",
    color: "blue",
    radius: "full",
    variant: "liquid",
    disabled: false,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="w-80">
        <Slider {...props} defaultValue={25} />
      </div>
    );
  },
});

export const Variants = meta.story({
  name: "主な外観",
  ...ctrl({
    size: "md",
    color: "blue",
    radius: "full",
    disabled: false,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-6">
        {VARIANTS.map((variant) => (
          <div key={variant}>
            <div>{variant}</div>
            <Slider {...props} variant={variant} defaultValue={25} />
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
    color: "blue",
    radius: "full",
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-6">
        {VARIANTS.map((variant) => (
          <div key={variant}>
            <div>{variant}</div>
            <Slider {...props} variant={variant} outlined defaultValue={25} />
          </div>
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
    variant: "liquid",
    disabled: false,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-6">
        {COLORS.map((color) => (
          <div key={color}>
            <div>{color}</div>
            <Slider {...props} color={color} defaultValue={25} />
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
    radius: "full",
    variant: "liquid",
    disabled: false,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-6">
        {SIZES.map((size) => (
          <div key={size}>
            <div>{size}</div>
            <Slider {...props} size={size} defaultValue={25} />
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
    color: "blue",
    variant: "liquid",
    disabled: false,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-6">
        {RADII.map((radius, index) => (
          <div key={radius}>
            <div>{radius}</div>
            <Slider {...props} radius={radius} defaultValue={(index + 1) * 25} />
          </div>
        ))}
      </div>
    );
  },
});

export const LabelAndValue = meta.story({
  name: "ラベルと現在値",
  ...ctrl({
    size: "md",
    color: "blue",
    radius: "full",
    variant: "liquid",
    disabled: false,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-6">
        <Slider {...props} label="音量" renderValue defaultValue={25} />
        <Slider {...props} label="範囲" renderValue defaultValue={[25, 75]} />
        <Slider
          {...props}
          label="カスタム表示"
          renderValue={(formatted) => `${formatted[0]} dB`}
          defaultValue={25}
        />
      </div>
    );
  },
});

export const Range = meta.story({
  name: "範囲",
  ...ctrl({
    size: "md",
    color: "blue",
    radius: "full",
    variant: "liquid",
    disabled: false,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="w-80">
        <Slider {...props} defaultValue={[25, 75]} />
      </div>
    );
  },
});

export const Step = meta.story({
  name: "刻み幅",
  ...ctrl({
    size: "md",
    color: "blue",
    radius: "full",
    variant: "liquid",
    disabled: false,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-6">
        <Slider {...props} max={100} min={0} step={10} defaultValue={25} />
        <Slider {...props} max={100} min={0} step={5} label="音量" renderValue defaultValue={50} />
      </div>
    );
  },
});

export const Vertical = meta.story({
  name: "縦方向",
  ...ctrl({
    size: "md",
    color: "blue",
    radius: "full",
    variant: "liquid",
    disabled: false,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex items-center justify-center gap-10">
        <Slider
          {...props}
          slotProps={{
            control: {
              style: {
                height: 160,
              },
            },
          }}
          orientation="vertical"
          defaultValue={25}
        />
        <Slider
          {...props}
          slotProps={{
            control: {
              style: {
                height: 160,
              },
            },
          }}
          orientation="vertical"
          defaultValue={[25, 75]}
        />
      </div>
    );
  },
});

export const Controlled = meta.story({
  name: "制御",
  ...ctrl({
    size: "md",
    color: "blue",
    radius: "full",
    variant: "liquid",
    disabled: false,
    outlined: false,
  }),
  render(props: {}) {
    const [value, setValue] = React.useState(25);

    return (
      <div className="w-80">
        <Slider {...props} value={value} onValueChange={setValue} />
        <p className="mt-2">現在値: {value}</p>
      </div>
    );
  },
});

export const RangeControlled = meta.story({
  name: "範囲の制御",
  ...ctrl({
    size: "md",
    color: "blue",
    radius: "full",
    variant: "liquid",
    disabled: false,
    outlined: false,
  }),
  render(props: {}) {
    const [value, setValue] = React.useState<readonly number[]>([25, 75]);

    return (
      <div className="w-80">
        <Slider {...props} max={100} min={0} value={value} onValueChange={setValue} />
        <p className="mt-2">
          現在値: {value[0]}から{value[1]}
        </p>
      </div>
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({
    size: "md",
    color: "blue",
    radius: "full",
    variant: "liquid",
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-6">
        <Slider {...props} disabled defaultValue={25} />
        <Slider {...props} disabled defaultValue={[25, 75]} />
      </div>
    );
  },
});
