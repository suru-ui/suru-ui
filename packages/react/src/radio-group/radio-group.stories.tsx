import * as theme from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Radio } from "../radio/index.js";
import { RadioGroup } from "./index.js";

const COLORS: readonly RadioGroup.Color[] = theme.COLORS;
const SIZES: readonly RadioGroup.Size[] = theme.SIZES;
const RADII: readonly RadioGroup.Radius[] = ["none", ...SIZES, "full", "circle"];
const VARIANTS: readonly RadioGroup.Variant[] = ["naked", "liquid"];
const ORIENTATIONS: readonly RadioGroup.Orientation[] = ["vertical", "horizontal"];

const meta = preview.meta({
  title: "Radio Group",
  component: RadioGroup,
});

export default meta;

const ctrl = controls(RadioGroup, {
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
  orientation: {
    control: "select",
    options: ORIENTATIONS,
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
    size: "md",
    color: "grey",
    radius: "full",
    variant: "liquid",
    disabled: false,
    outlined: undefined,
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
    size: "md",
    color: "grey",
    radius: "full",
    variant: "liquid",
    disabled: false,
    outlined: undefined,
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
    color: "grey",
    radius: "full",
    variant: "liquid",
    disabled: false,
    outlined: undefined,
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
                  lg: "Large",
                  md: "Medium",
                  sm: "Small",
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
    size: "md",
    radius: "full",
    variant: "liquid",
    disabled: false,
    outlined: undefined,
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
    size: "md",
    color: "grey",
    radius: "full",
    variant: "liquid",
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
    size: "md",
    color: "grey",
    radius: "full",
    variant: "liquid",
    disabled: false,
    outlined: undefined,
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
    size: "md",
    color: "grey",
    variant: "liquid",
    disabled: false,
    outlined: undefined,
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
