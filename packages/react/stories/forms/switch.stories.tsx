import { COLORS, SIZES } from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Switch } from "../../src/forms/switch/index.js";

const RADII = ["none", ...SIZES, "full"] as const;

const meta = preview.meta({
  title: "Forms / Switch",
  component: Switch,
});

export default meta;

const ctrl = controls(Switch, {
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
  name: "バリエーション",
  ...ctrl({
    color: "grey",
    size: "md",
    radius: "full",
    outlined: undefined,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2">
          <Switch {...props} variant="naked" defaultChecked />
          naked
        </label>
        <label className="flex items-center gap-2">
          <Switch {...props} variant="liquid" defaultChecked />
          liquid
        </label>
      </div>
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
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2">
          <Switch {...props} variant="naked" outlined defaultChecked />
          naked + outlined
        </label>
        <label className="flex items-center gap-2">
          <Switch {...props} variant="liquid" outlined defaultChecked />
          liquid + outlined
        </label>
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
    variant: "naked",
    color: "grey",
    radius: "full",
    outlined: undefined,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {SIZES.map((size) => (
          <label key={size} className="flex items-center gap-2">
            <Switch {...props} size={size} defaultChecked />
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
    variant: "naked",
    color: "grey",
    size: "md",
    outlined: undefined,
    disabled: false,
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
    variant: "naked",
    color: "grey",
    size: "md",
    radius: "full",
    outlined: undefined,
    disabled: false,
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

export const Controlled = meta.story({
  name: "制御",
  ...ctrl({
    variant: "naked",
    color: "grey",
    size: "md",
    radius: "full",
    outlined: undefined,
    disabled: false,
  }),
  render(props) {
    const [checked, setChecked] = React.useState(true);

    return (
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2">
          <Switch {...props} checked={checked} onCheckedChange={(next) => setChecked(next)} />
          クリックで切り替え: {checked ? "ON" : "OFF"}
        </label>
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
