import * as theme from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Switch } from "./index.js";

const COLORS: readonly Switch.Color[] = theme.COLORS;
const RADII: readonly Switch.Radius[] = ["none", ...theme.SIZES, "full"];
const SIZES: readonly Switch.Size[] = theme.SIZES;
const VARIANTS: readonly Switch.Variant[] = ["naked", "liquid"];

const meta = preview.meta({
  title: "Switch",
  component: Switch,
});

export default meta;

const ctrl = controls(Switch, {
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
    radius: "full",
    variant: "liquid",
    disabled: false,
    outlined: true,
  }),
  render(props) {
    return (
      <label className="flex items-center gap-2">
        <Switch {...props} defaultChecked />
        通知を受け取る
      </label>
    );
  },
});

export const Variants = meta.story({
  name: "主な外観",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: "full",
    disabled: false,
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {VARIANTS.map((variant) => (
          <label key={variant} className="flex items-center gap-2">
            <Switch {...props} variant={variant} defaultChecked />
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
    radius: "full",
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2">
          <Switch {...props} variant="naked" outlined={false} defaultChecked />
          naked + 枠線なし
        </label>
        <label className="flex items-center gap-2">
          <Switch {...props} variant="liquid" outlined={false} defaultChecked />
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
    radius: "full",
    variant: "liquid",
    disabled: false,
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {COLORS.map((color) => (
          <label key={color} className="flex items-center gap-2">
            <Switch {...props} color={color} defaultChecked />
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
    radius: "full",
    variant: "liquid",
    disabled: false,
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {SIZES.map((size) => (
          <label key={size} className="flex items-center gap-2">
            <Switch {...props} size={size} defaultChecked />
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
    variant: "liquid",
    disabled: false,
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {RADII.map((radius) => (
          <label key={radius} className="flex items-center gap-2">
            <Switch {...props} radius={radius} defaultChecked />
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
    radius: "full",
    variant: "liquid",
    disabled: false,
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2">
          <Switch {...props} checked={false} />
          オフ
        </label>
        <label className="flex items-center gap-2">
          <Switch {...props} checked />
          オン
        </label>
      </div>
    );
  },
});

export const Uncontrolled = meta.story({
  name: "非制御",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: "full",
    variant: "liquid",
    disabled: false,
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2">
          <Switch {...props} defaultChecked={false} />
          初期オフ
        </label>
        <label className="flex items-center gap-2">
          <Switch {...props} defaultChecked />
          初期オン
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
    radius: "full",
    variant: "liquid",
    disabled: false,
    outlined: true,
  }),
  render(props) {
    const [checked, setChecked] = React.useState(false);

    return (
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2">
          <Switch {...props} checked={checked} onCheckedChange={setChecked} />
          クリックで切り替え: {checked ? "ON" : "OFF"}
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
    radius: "full",
    variant: "liquid",
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2">
          <Switch {...props} disabled />
          無効（オフ）
        </label>
        <label className="flex items-center gap-2">
          <Switch {...props} disabled defaultChecked />
          無効（オン）
        </label>
      </div>
    );
  },
});
