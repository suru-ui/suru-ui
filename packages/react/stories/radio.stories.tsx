import * as theme from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { RadioGroup } from "../src/radio-group/index.js";
import { Radio } from "../src/radio/index.js";

const COLORS: readonly Radio.Color[] = theme.COLORS;
const RADII: readonly Radio.Radius[] = ["none", ...theme.SIZES, "full"];
const SIZES: readonly Radio.Size[] = theme.SIZES;
const VARIANTS: readonly Radio.Variant[] = ["naked", "liquid"];

const meta = preview.meta({
  title: "Radio",
  component: Radio,
});

export default meta;

const ctrl = controls(Radio, {
  color: {
    control: "select",
    options: COLORS,
  },
  disabled: {
    control: "boolean",
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

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    variant: "naked",
    color: "grey",
    size: "md",
    radius: "full",
    outlined: undefined,
    disabled: false,
    value: "",
  }),
  render(props) {
    return (
      <RadioGroup className="flex flex-col gap-3" defaultValue="option-a">
        <label className="flex items-center gap-2">
          <Radio {...props} value="option-a" />
          オプション A
        </label>
        <label className="flex items-center gap-2">
          <Radio {...props} value="option-b" />
          オプション B
        </label>
      </RadioGroup>
    );
  },
});

export const Variants = meta.story({
  name: "主な外観",
  ...ctrl({
    color: "grey",
    size: "md",
    radius: "full",
    outlined: undefined,
    disabled: false,
    value: "",
  }),
  render(props) {
    return (
      <RadioGroup className="flex flex-col gap-3" defaultValue="naked">
        <label className="flex items-center gap-2">
          <Radio {...props} value="naked" variant="naked" />
          naked
        </label>
        <label className="flex items-center gap-2">
          <Radio {...props} value="liquid" variant="liquid" />
          liquid
        </label>
      </RadioGroup>
    );
  },
});

export const Outlined = meta.story({
  name: "枠線",
  ...ctrl({
    color: "grey",
    size: "md",
    radius: "full",
    disabled: false,
    value: "",
  }),
  render(props) {
    return (
      <RadioGroup className="flex flex-col gap-3" defaultValue="naked-outlined">
        <label className="flex items-center gap-2">
          <Radio {...props} value="naked-outlined" variant="naked" outlined />
          naked + outlined
        </label>
        <label className="flex items-center gap-2">
          <Radio {...props} value="liquid-outlined" variant="liquid" outlined />
          liquid + outlined
        </label>
      </RadioGroup>
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
    value: "",
  }),
  render(props) {
    return (
      <RadioGroup className="flex flex-col gap-3" defaultValue="grey">
        {COLORS.map((color) => (
          <label key={color} className="flex items-center gap-2">
            <Radio {...props} color={color} value={color} />
            {color}
          </label>
        ))}
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
    value: "",
  }),
  render(props) {
    return (
      <RadioGroup className="flex flex-col gap-3" defaultValue="md">
        {SIZES.map((size) => (
          <label key={size} className="flex items-center gap-2">
            <Radio {...props} size={size} value={size} />
            {
              {
                sm: "Small",
                md: "Medium",
                lg: "Large",
              }[size]
            }
          </label>
        ))}
      </RadioGroup>
    );
  },
});

export const Radii = meta.story({
  name: "角丸",
  ...ctrl({
    variant: "naked",
    color: "grey",
    size: "md",
    outlined: undefined,
    disabled: false,
    value: "",
  }),
  render(props) {
    return (
      <RadioGroup className="flex flex-col gap-3" defaultValue="full">
        {RADII.map((radius) => (
          <label key={radius} className="flex items-center gap-2">
            <Radio {...props} value={radius} radius={radius} />
            {radius}
          </label>
        ))}
      </RadioGroup>
    );
  },
});

export const Controlled = meta.story({
  name: "制御",
  ...ctrl({
    variant: "naked",
    color: "grey",
    size: "md",
    radius: "full",
    outlined: undefined,
    disabled: false,
    value: "",
  }),
  render(props) {
    const [value, setValue] = React.useState("option-a");

    return (
      <RadioGroup
        value={value}
        className="flex flex-col gap-3"
        onValueChange={(nextValue) => setValue(String(nextValue))}
      >
        <label className="flex items-center gap-2">
          <Radio {...props} value="option-a" />
          選択肢 A
        </label>
        <label className="flex items-center gap-2">
          <Radio {...props} value="option-b" />
          選択肢 B
        </label>
      </RadioGroup>
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
    value: "",
  }),
  render(props) {
    return (
      <RadioGroup className="flex flex-col gap-3" defaultValue="checked">
        <label className="flex items-center gap-2">
          <Radio {...props} value="unchecked" disabled />
          無効（未チェック）
        </label>
        <label className="flex items-center gap-2">
          <Radio {...props} value="checked" disabled />
          無効（チェック済み）
        </label>
      </RadioGroup>
    );
  },
});

export const GroupDisabled = meta.story({
  name: "グループ無効",
  ...ctrl({
    variant: "naked",
    color: "grey",
    size: "md",
    radius: "full",
    outlined: undefined,
    value: "",
  }),
  render(props) {
    return (
      <RadioGroup disabled className="flex flex-col gap-3" defaultValue="option-a">
        <label className="flex items-center gap-2">
          <Radio {...props} value="option-a" />
          選択肢 A
        </label>
        <label className="flex items-center gap-2">
          <Radio {...props} value="option-b" />
          選択肢 B
        </label>
      </RadioGroup>
    );
  },
});
