import * as theme from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { RadioGroup } from "../src/radio-group/index.js";
import { Radio } from "../src/radio/index.js";

const COLORS: readonly RadioGroup.Color[] = theme.COLORS;
const SIZES: readonly RadioGroup.Size[] = theme.SIZES;
const RADII: readonly RadioGroup.Radius[] = ["none", ...SIZES, "full"];
const VARIANTS: readonly RadioGroup.Variant[] = ["naked", "liquid"];
const ORIENTATIONS: readonly RadioGroup.Orientation[] = ["vertical", "horizontal"];

const meta = preview.meta({
  title: "Radio Group",
  component: RadioGroup,
});

export default meta;

const ctrl = controls(RadioGroup, {
  color: {
    control: "select",
    options: COLORS,
  },
  disabled: {
    control: "boolean",
  },
  orientation: {
    control: "select",
    options: ORIENTATIONS,
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
  variant: {
    control: "select",
    options: VARIANTS,
  },
});

const Item = ({ value, children }: { children: React.ReactNode; value: string }) => (
  <label className="flex items-center gap-2">
    <Radio value={value} />
    {children}
  </label>
);

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: "full",
    outlined: undefined,
    disabled: false,
    orientation: "vertical",
  }),
  render(props) {
    return (
      <RadioGroup defaultValue="option-a" {...props}>
        <Item value="option-a">オプション A</Item>
        <Item value="option-b">オプション B</Item>
        <Item value="option-c">オプション C</Item>
      </RadioGroup>
    );
  },
});

export const Controlled = meta.story({
  name: "制御",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: "full",
    outlined: undefined,
    disabled: false,
    orientation: "vertical",
  }),
  render(props) {
    const [value, setValue] = React.useState("option-a");

    return (
      <RadioGroup
        {...props}
        value={value}
        onValueChange={(next) => {
          if (typeof next === "string") {
            setValue(next);
          }
        }}
      >
        <Item value="option-a">オプション A</Item>
        <Item value="option-b">オプション B</Item>
        <Item value="option-c">オプション C</Item>
      </RadioGroup>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    radius: "full",
    outlined: undefined,
    disabled: false,
    orientation: "vertical",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {SIZES.map((size) => (
          <RadioGroup key={size} size={size} {...props} defaultValue={size}>
            <Item value={size}>
              {
                {
                  sm: "Small",
                  md: "Medium",
                  lg: "Large",
                }[size]
              }
            </Item>
          </RadioGroup>
        ))}
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
    outlined: undefined,
    disabled: false,
    orientation: "vertical",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {COLORS.map((color) => (
          <RadioGroup key={color} color={color} {...props} defaultValue={color}>
            <Item value={color}>{color}</Item>
          </RadioGroup>
        ))}
      </div>
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: "full",
    outlined: undefined,
    orientation: "vertical",
  }),
  render(props) {
    return (
      <RadioGroup disabled {...props} defaultValue="option-a">
        <Item value="option-a">無効（選択済み）</Item>
        <Item value="option-b">無効（未選択）</Item>
      </RadioGroup>
    );
  },
});

export const Horizontal = meta.story({
  name: "横並び",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: "full",
    outlined: undefined,
    disabled: false,
  }),
  render(props) {
    return (
      <RadioGroup className="gap-3" {...props} orientation="horizontal" defaultValue="option-a">
        <Item value="option-a">オプション A</Item>
        <Item value="option-b">オプション B</Item>
      </RadioGroup>
    );
  },
});

export const Radii = meta.story({
  name: "角丸",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    outlined: undefined,
    disabled: false,
    orientation: "vertical",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {RADII.map((radius) => (
          <RadioGroup key={radius} radius={radius} {...props} defaultValue={radius}>
            <Item value={radius}>{radius}</Item>
          </RadioGroup>
        ))}
      </div>
    );
  },
});
