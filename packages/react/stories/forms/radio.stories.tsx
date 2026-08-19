import { COLORS, SIZES } from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { RadioGroup } from "../../src/forms/radio-group/index.js";
import { Radio } from "../../src/forms/radio/index.js";

const RADII = ["none", ...SIZES, "full"] as const;

const meta = preview.meta({
  title: "Forms / Radio",
  component: Radio,
});

export default meta;

const ctrl = controls(Radio, {
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
      <RadioGroup defaultValue="option-a" className="flex flex-col gap-3">
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
  name: "バリエーション",
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
      <RadioGroup defaultValue="naked" className="flex flex-col gap-3">
        <label className="flex items-center gap-2">
          <Radio {...props} variant="naked" value="naked" />
          naked
        </label>
        <label className="flex items-center gap-2">
          <Radio {...props} variant="liquid" value="liquid" />
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
      <RadioGroup defaultValue="naked-outlined" className="flex flex-col gap-3">
        <label className="flex items-center gap-2">
          <Radio {...props} variant="naked" outlined value="naked-outlined" />
          naked + outlined
        </label>
        <label className="flex items-center gap-2">
          <Radio {...props} variant="liquid" outlined value="liquid-outlined" />
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
      <RadioGroup defaultValue="grey" className="flex flex-col gap-3">
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
      <RadioGroup defaultValue="md" className="flex flex-col gap-3">
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

export const Radius = meta.story({
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
      <RadioGroup defaultValue="full" className="flex flex-col gap-3">
        {RADII.map((radius) => (
          <label key={radius} className="flex items-center gap-2">
            <Radio {...props} radius={radius} value={radius} />
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
        onValueChange={(nextValue) => setValue(String(nextValue))}
        className="flex flex-col gap-3"
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
      <RadioGroup defaultValue="checked" className="flex flex-col gap-3">
        <label className="flex items-center gap-2">
          <Radio {...props} disabled value="unchecked" />
          無効（未チェック）
        </label>
        <label className="flex items-center gap-2">
          <Radio {...props} disabled value="checked" />
          無効（チェック済み）
        </label>
      </RadioGroup>
    );
  },
});
