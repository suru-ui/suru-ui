import { SIZES, COLORS } from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Checkbox } from "../src/checkbox/index.js";

const RADII = ["none", ...SIZES, "full"] as const;
const VARIANTS = ["naked", "liquid"] as const;

const meta = preview.meta({
  title: "Checkbox",
  component: Checkbox,
});

export default meta;

const ctrl = controls(Checkbox, {
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
    options: VARIANTS,
    control: "select",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
  }),
  render(props) {
    return (
      <label className="flex items-center gap-2">
        <Checkbox {...props} />
        設定を有効にする
      </label>
    );
  },
});

export const Variants = meta.story({
  name: "主な外観",
  ...ctrl({
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {VARIANTS.map((variant) => (
          <label key={variant} className="flex items-center gap-2">
            <Checkbox {...props} variant={variant} />
            <span>{variant}</span>
          </label>
        ))}
      </div>
    );
  },
});

export const Outlined = meta.story({
  name: "枠線",
  ...ctrl({
    color: "grey",
    size: "md",
    radius: undefined,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2">
          <Checkbox {...props} variant="naked" outlined />
          naked + outlined
        </label>
        <label className="flex items-center gap-2">
          <Checkbox {...props} variant="liquid" outlined />
          liquid + outlined
        </label>
      </div>
    );
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    variant: "liquid",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {COLORS.map((color) => (
          <label key={color} className="flex items-center gap-2">
            <Checkbox {...props} color={color} defaultChecked />
            {color}
          </label>
        ))}
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    radius: undefined,
    outlined: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {SIZES.map((size) => (
          <label key={size} className="flex items-center gap-2">
            <Checkbox {...props} size={size} defaultChecked />
            {
              {
                sm: "Small",
                md: "Medium",
                lg: "Large",
              }[size]
            }
          </label>
        ))}
      </div>
    );
  },
});

export const Radius = meta.story({
  name: "角丸",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    outlined: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {RADII.map((radius) => (
          <label key={radius} className="flex items-center gap-2">
            <Checkbox {...props} radius={radius} defaultChecked />
            {radius}
          </label>
        ))}
      </div>
    );
  },
});

export const Checked = meta.story({
  name: "チェック状態",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2">
          <Checkbox {...props} checked={false} />
          未チェック
        </label>
        <label className="flex items-center gap-2">
          <Checkbox {...props} checked />
          チェック済み
        </label>
      </div>
    );
  },
});

export const Controlled = meta.story({
  name: "制御",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
  }),
  render(props) {
    const [checked, setChecked] = React.useState(false);

    return (
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2">
          <Checkbox {...props} checked={checked} onCheckedChange={(next) => setChecked(next)} />
          クリックで切り替え: {checked ? "ON" : "OFF"}
        </label>
      </div>
    );
  },
});

export const Indeterminate = meta.story({
  name: "中間状態",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2">
          <Checkbox {...props} indeterminate />
          中間状態
        </label>
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
    radius: undefined,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2">
          <Checkbox {...props} disabled />
          無効（未チェック）
        </label>
        <label className="flex items-center gap-2">
          <Checkbox {...props} disabled defaultChecked />
          無効（チェック済み）
        </label>
      </div>
    );
  },
});
