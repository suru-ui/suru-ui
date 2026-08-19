import { SIZES, COLORS } from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Slider } from "../../src/forms/slider/index.js";

const RADII = ["none", ...SIZES, "full"] as const;

const meta = preview.meta({
  title: "Forms / Slider",
  component: Slider,
});

export default meta;

const ctrl = controls(Slider, {
  color: {
    options: COLORS,
    control: "select",
  },
  disabled: {
    control: "boolean",
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
  variant: {
    options: ["naked", "liquid"],
    control: "select",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    variant: "liquid",
    color: "blue",
    size: "md",
    radius: "full",
    outlined: false,
    disabled: false,
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
  name: "バリエーション",
  ...ctrl({
    color: "blue",
    size: "md",
    radius: "full",
    outlined: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-6">
        <Slider {...props} variant="naked" defaultValue={25} />
        <Slider {...props} variant="liquid" defaultValue={50} />
      </div>
    );
  },
});

export const Outlined = meta.story({
  name: "枠線",
  ...ctrl({
    color: "blue",
    size: "md",
    radius: "full",
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-6">
        <Slider {...props} variant="naked" outlined defaultValue={25} />
        <Slider {...props} variant="liquid" outlined defaultValue={50} />
      </div>
    );
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    variant: "liquid",
    size: "md",
    radius: "full",
    outlined: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-6">
        {COLORS.map((color) => (
          <Slider key={color} {...props} color={color} defaultValue={25} />
        ))}
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    variant: "liquid",
    color: "blue",
    radius: "full",
    outlined: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-6">
        {SIZES.map((size) => (
          <div key={size}>
            <Slider {...props} size={size} defaultValue={25} />
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
    variant: "liquid",
    color: "blue",
    size: "md",
    outlined: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-6">
        {RADII.map((radius, index) => (
          <div key={radius}>
            <Slider {...props} radius={radius} defaultValue={(index + 1) * 25} />
            <div>{radius}</div>
          </div>
        ))}
      </div>
    );
  },
});

export const LabelAndValue = meta.story({
  name: "ラベルと現在値",
  ...ctrl({
    variant: "liquid",
    color: "blue",
    size: "md",
    radius: "full",
    outlined: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-6">
        <Slider
          {...props}
          slotProps={{
            label: { children: "音量" },
            value: {},
          }}
          defaultValue={25}
        />
        <Slider
          {...props}
          slotProps={{
            label: { children: "レンジ" },
            value: {},
          }}
          defaultValue={[25, 75]}
        />
      </div>
    );
  },
});

export const Range = meta.story({
  name: "レンジ",
  ...ctrl({
    variant: "liquid",
    color: "blue",
    size: "md",
    radius: "full",
    outlined: false,
    disabled: false,
  }),
  render(props) {
    return <Slider {...props} defaultValue={[25, 75]} />;
  },
});

export const Vertical = meta.story({
  name: "縦方向",
  ...ctrl({
    variant: "liquid",
    color: "blue",
    size: "md",
    radius: "full",
    outlined: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex items-center justify-center gap-10">
        <Slider
          {...props}
          slotProps={{ control: { style: { height: 160 } } }}
          orientation="vertical"
          defaultValue={25}
        />
        <Slider
          {...props}
          slotProps={{ control: { style: { height: 160 } } }}
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
    variant: "liquid",
    color: "blue",
    size: "md",
    radius: "full",
    outlined: false,
    disabled: false,
  }),
  render(props) {
    const [value, setValue] = React.useState(25);

    return (
      <div className="w-80">
        <Slider {...props} value={value} onValueChange={(next) => setValue(next as number)} />
        <p className="mt-2">現在値: {value}</p>
      </div>
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({
    variant: "liquid",
    color: "blue",
    size: "md",
    radius: "full",
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
