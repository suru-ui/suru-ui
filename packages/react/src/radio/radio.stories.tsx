import { RadioGroup } from "@base-ui/react";
import * as theme from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Radio } from "./index.js";

const COLORS: readonly Radio.Color[] = theme.COLORS;
const RADII: readonly Radio.Radius[] = ["none", ...theme.SIZES, "full", "circle"];
const SIZES: readonly Radio.Size[] = theme.SIZES;
const VARIANTS: readonly Radio.Variant[] = ["liquid", "naked"];

const meta = preview.meta({
  title: "Radio",
  component: Radio,
});

export default meta;

const ctrl = controls(Radio, {
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
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    size: "md",
    color: "grey",
    value: "",
    radius: "full",
    variant: "naked",
    disabled: false,
    outlined: true,
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
    size: "md",
    color: "grey",
    value: "",
    radius: "full",
    disabled: false,
    outlined: true,
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

export const WithoutOutline = meta.story({
  name: "枠線なし",
  ...ctrl({
    size: "md",
    color: "grey",
    value: "",
    radius: "full",
    disabled: false,
  }),
  render(props) {
    return (
      <RadioGroup className="flex flex-col gap-3" defaultValue="naked-outlined">
        <label className="flex items-center gap-2">
          <Radio {...props} value="naked-outlined" variant="naked" outlined={false} />
          naked + 枠線なし
        </label>
        <label className="flex items-center gap-2">
          <Radio {...props} value="liquid-outlined" variant="liquid" outlined={false} />
          liquid + 枠線なし
        </label>
      </RadioGroup>
    );
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    size: "md",
    value: "",
    radius: "full",
    variant: "naked",
    disabled: false,
    outlined: true,
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
    color: "grey",
    value: "",
    radius: "full",
    variant: "naked",
    disabled: false,
    outlined: true,
  }),
  render(props) {
    return (
      <RadioGroup className="flex flex-col gap-3" defaultValue="md">
        {SIZES.map((size) => (
          <label key={size} className="flex items-center gap-2">
            <Radio {...props} size={size} value={size} />
            {
              {
                lg: "Large",
                md: "Medium",
                sm: "Small",
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
    size: "md",
    color: "grey",
    value: "",
    variant: "naked",
    disabled: false,
    outlined: true,
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
    size: "md",
    color: "grey",
    value: "",
    radius: "full",
    variant: "naked",
    disabled: false,
    outlined: true,
  }),
  render(props) {
    const [value, setValue] = React.useState("option-a");

    return (
      <RadioGroup
        value={value}
        className="flex flex-col gap-3"
        onValueChange={(nextValue) => {
          setValue(nextValue);
        }}
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
    size: "md",
    color: "grey",
    value: "",
    radius: "full",
    variant: "naked",
    outlined: true,
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
    size: "md",
    color: "grey",
    value: "",
    radius: "full",
    variant: "naked",
    outlined: true,
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
