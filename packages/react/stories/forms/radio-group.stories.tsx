import { SIZES, COLORS } from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { RadioGroup } from "../../src/forms/radio-group/index.js";
import { Radio } from "../../src/forms/radio/index.js";

const RADII = ["none", ...SIZES, "full"] as const;

const meta = preview.meta({
  title: "Forms / Radio Group",
  component: RadioGroup,
});

export default meta;

const ctrl = controls(RadioGroup, {
  color: {
    options: COLORS,
    control: "select",
  },
  disabled: {
    control: "boolean",
  },
  orientation: {
    options: ["vertical", "horizontal"],
    control: "select",
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

const Item = ({ value, children }: { value: string; children: React.ReactNode }) => (
  <label className="flex items-center gap-2">
    <Radio value={value} />
    {children}
  </label>
);

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    variant: "naked",
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

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    variant: "naked",
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
    variant: "naked",
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
    variant: "naked",
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
    variant: "naked",
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

export const Radius = meta.story({
  name: "角丸",
  ...ctrl({
    variant: "naked",
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
