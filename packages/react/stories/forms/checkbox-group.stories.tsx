import { COLORS, SIZES } from "@suru-ui/theme";
import { CheckIcon, MinusIcon } from "lucide-react";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { CheckboxGroup } from "../../src/forms/checkbox-group/index.js";
import { Checkbox } from "../../src/forms/checkbox/index.js";

const RADII = ["none", ...SIZES, "full"] as const;

const meta = preview.meta({
  title: "Forms / Checkbox Group",
  component: CheckboxGroup,
});

export default meta;

const ctrl = controls(CheckboxGroup, {
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
    <Checkbox value={value}>
      <CheckIcon />
    </Checkbox>
    {children}
  </label>
);

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    variant: "naked",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: undefined,
    disabled: false,
    orientation: "vertical",
  }),
  render(props) {
    return (
      <CheckboxGroup defaultValue={["option-a"]} {...props}>
        <Item value="option-a">オプション A</Item>
        <Item value="option-b">オプション B</Item>
        <Item value="option-c">オプション C</Item>
      </CheckboxGroup>
    );
  },
});

const fruits = ["fuji-apple", "gala-apple", "granny-smith-apple"];

export const Parent = meta.story({
  name: "親チェックボックス",
  ...ctrl({
    variant: "naked",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: undefined,
    disabled: false,
    orientation: "vertical",
  }),
  render(props) {
    return (
      <CheckboxGroup allValues={fruits} {...props} className="gap-1">
        <label className="flex items-center gap-2">
          <Checkbox
            parent
            slotProps={{
              indicator: {
                render: (indicatorProps, state) => (
                  <span {...indicatorProps}>
                    {state.indeterminate ? <MinusIcon /> : <CheckIcon />}
                  </span>
                ),
              },
            }}
          />
          すべて選択
        </label>
        <Item value="fuji-apple">ふじ</Item>
        <Item value="gala-apple">ガラ</Item>
        <Item value="granny-smith-apple">グラニースミス</Item>
      </CheckboxGroup>
    );
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    variant: "naked",
    size: "md",
    radius: undefined,
    outlined: undefined,
    disabled: false,
    orientation: "vertical",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {COLORS.map((color) => (
          <CheckboxGroup key={color} defaultValue={[color]} {...props} color={color}>
            <Item value={color}>{color}</Item>
          </CheckboxGroup>
        ))}
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    variant: "naked",
    color: "grey",
    radius: undefined,
    outlined: undefined,
    disabled: false,
    orientation: "vertical",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {SIZES.map((size) => (
          <CheckboxGroup key={size} defaultValue={[size]} {...props} size={size}>
            <Item value={size}>
              {
                {
                  sm: "Small",
                  md: "Medium",
                  lg: "Large",
                }[size]
              }
            </Item>
          </CheckboxGroup>
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
    radius: undefined,
    outlined: undefined,
    orientation: "vertical",
  }),
  render(props) {
    return (
      <CheckboxGroup defaultValue={["option-a"]} {...props} disabled>
        <Item value="option-a">無効（選択済み）</Item>
        <Item value="option-b">無効（未選択）</Item>
      </CheckboxGroup>
    );
  },
});

export const Horizontal = meta.story({
  name: "横並び",
  ...ctrl({
    variant: "naked",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: undefined,
    disabled: false,
  }),
  render(props) {
    return (
      <CheckboxGroup
        defaultValue={["option-a"]}
        {...props}
        orientation="horizontal"
        className="gap-3"
      >
        <Item value="option-a">オプション A</Item>
        <Item value="option-b">オプション B</Item>
      </CheckboxGroup>
    );
  },
});

export const Radius = meta.story({
  name: "角丸",
  ...ctrl({
    variant: "naked",
    color: "grey",
    size: "md",
    outlined: false,
    disabled: false,
    orientation: "vertical",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {RADII.map((radius) => (
          <CheckboxGroup key={radius} defaultValue={[radius]} {...props} radius={radius}>
            <Item value={radius}>{radius}</Item>
          </CheckboxGroup>
        ))}
      </div>
    );
  },
});
