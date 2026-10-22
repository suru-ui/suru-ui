import * as theme from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Checkbox } from "./index.js";

const COLORS: readonly Checkbox.Color[] = theme.COLORS;
const RADII: readonly Checkbox.Radius[] = ["none", ...theme.SIZES, "full", "circle"];
const SIZES: readonly Checkbox.Size[] = theme.SIZES;
const VARIANTS: readonly Checkbox.Variant[] = ["naked", "liquid"];

const meta = preview.meta({
  title: "Checkbox",
  component: Checkbox,
});

export default meta;

const ctrl = controls(Checkbox, {
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
    radius: undefined,
    variant: "naked",
    disabled: false,
    outlined: true,
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
    size: "md",
    color: "grey",
    radius: undefined,
    disabled: false,
    outlined: true,
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

export const WithoutOutline = meta.story({
  name: "枠線なし",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2">
          <Checkbox {...props} variant="naked" outlined={false} />
          naked + 枠線なし
        </label>
        <label className="flex items-center gap-2">
          <Checkbox {...props} variant="liquid" outlined={false} />
          liquid + 枠線なし
        </label>
      </div>
    );
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    size: "md",
    radius: undefined,
    variant: "naked",
    disabled: false,
    outlined: true,
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
    color: "grey",
    radius: undefined,
    variant: "naked",
    disabled: false,
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {SIZES.map((size) => (
          <label key={size} className="flex items-center gap-2">
            <Checkbox {...props} size={size} defaultChecked />
            {
              {
                lg: "Large",
                md: "Medium",
                sm: "Small",
              }[size]
            }
          </label>
        ))}
      </div>
    );
  },
});

export const Radii = meta.story({
  name: "角丸",
  ...ctrl({
    size: "md",
    color: "grey",
    variant: "naked",
    disabled: false,
    outlined: true,
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
    size: "md",
    color: "grey",
    radius: undefined,
    variant: "naked",
    disabled: false,
    outlined: true,
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
    size: "md",
    color: "grey",
    radius: undefined,
    variant: "naked",
    disabled: false,
    outlined: true,
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
    size: "md",
    color: "grey",
    radius: undefined,
    variant: "naked",
    disabled: false,
    outlined: true,
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
    size: "md",
    color: "grey",
    radius: undefined,
    variant: "naked",
    outlined: true,
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
