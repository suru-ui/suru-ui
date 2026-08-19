import { COLORS, SIZES } from "@suru-ui/theme";
import { CheckIcon, MinusIcon } from "lucide-react";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Checkbox } from "../../src/forms/checkbox/index.js";

const RADII = ["none", ...SIZES, "full"] as const;

const meta = preview.meta({
  title: "Forms / Checkbox",
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
    radius: undefined,
    outlined: undefined,
    disabled: false,
  }),
  render(props) {
    return (
      <label className="flex items-center gap-2">
        <Checkbox {...props}>
          <CheckIcon />
        </Checkbox>
        設定を有効にする
      </label>
    );
  },
});

export const Variants = meta.story({
  name: "バリエーション",
  ...ctrl({
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: undefined,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2">
          <Checkbox {...props} variant="naked">
            <CheckIcon />
          </Checkbox>
          naked
        </label>
        <label className="flex items-center gap-2">
          <Checkbox {...props} variant="liquid">
            <CheckIcon />
          </Checkbox>
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
    radius: undefined,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2">
          <Checkbox {...props} variant="naked" outlined>
            <CheckIcon />
          </Checkbox>
          naked + outlined
        </label>
        <label className="flex items-center gap-2">
          <Checkbox {...props} variant="liquid" outlined>
            <CheckIcon />
          </Checkbox>
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
    radius: undefined,
    outlined: undefined,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {COLORS.map((color) => (
          <label key={color} className="flex items-center gap-2">
            <Checkbox {...props} color={color} defaultChecked>
              <CheckIcon />
            </Checkbox>
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
    radius: undefined,
    outlined: undefined,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {SIZES.map((size) => (
          <label key={size} className="flex items-center gap-2">
            <Checkbox {...props} size={size} defaultChecked>
              <CheckIcon />
            </Checkbox>
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
            <Checkbox {...props} radius={radius} defaultChecked>
              <CheckIcon />
            </Checkbox>
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
    radius: undefined,
    outlined: undefined,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2">
          <Checkbox {...props} checked={false}>
            <CheckIcon />
          </Checkbox>
          未チェック
        </label>
        <label className="flex items-center gap-2">
          <Checkbox {...props} checked>
            <CheckIcon />
          </Checkbox>
          チェック済み
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
    radius: undefined,
    outlined: undefined,
    disabled: false,
  }),
  render(props) {
    const [checked, setChecked] = React.useState(false);

    return (
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2">
          <Checkbox {...props} checked={checked} onCheckedChange={(next) => setChecked(next)}>
            <CheckIcon />
          </Checkbox>
          クリックで切り替え: {checked ? "ON" : "OFF"}
        </label>
      </div>
    );
  },
});

export const Indeterminate = meta.story({
  name: "中間状態",
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
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2">
          <Checkbox {...props} indeterminate>
            <MinusIcon />
          </Checkbox>
          中間状態
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
    radius: undefined,
    outlined: undefined,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2">
          <Checkbox {...props} disabled>
            <CheckIcon />
          </Checkbox>
          無効（未チェック）
        </label>
        <label className="flex items-center gap-2">
          <Checkbox {...props} disabled defaultChecked>
            <CheckIcon />
          </Checkbox>
          無効（チェック済み）
        </label>
      </div>
    );
  },
});
