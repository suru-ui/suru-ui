import { COLORS, SIZES } from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { RadioGroup } from "../../src/forms/radio-group/index.js";
import { Radio } from "../../src/forms/radio/index.js";

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
    options: ["none", "rounded", "full"],
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
    outlined: true,
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
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {SIZES.map((size) => (
          <RadioGroup key={size} defaultValue={size} {...props} size={size}>
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
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {COLORS.map((color) => (
          <RadioGroup key={color} defaultValue={color} {...props} color={color}>
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
    outlined: true,
  }),
  render(props) {
    return (
      <RadioGroup defaultValue="option-a" {...props} disabled>
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
    outlined: true,
  }),
  render(props) {
    return (
      <RadioGroup defaultValue="option-a" {...props} orientation="horizontal" className="gap-3">
        <Item value="option-a">オプション A</Item>
        <Item value="option-b">オプション B</Item>
      </RadioGroup>
    );
  },
});
