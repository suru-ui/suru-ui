import * as theme from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Checkbox } from "../checkbox/index.js";
import { CheckboxGroup } from "./index.js";

const COLORS: readonly CheckboxGroup.Color[] = theme.COLORS;
const SIZES: readonly CheckboxGroup.Size[] = theme.SIZES;
const RADII: readonly CheckboxGroup.Radius[] = ["none", ...SIZES, "full", "circle"];
const VARIANTS: readonly CheckboxGroup.Variant[] = ["naked", "liquid"];
const ORIENTATIONS: readonly CheckboxGroup.Orientation[] = ["vertical", "horizontal"];

const meta = preview.meta({
  title: "Checkbox Group",
  component: CheckboxGroup,
});

export default meta;

const ctrl = controls(CheckboxGroup, {
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
  orientation: {
    control: "select",
    options: ORIENTATIONS,
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
    orientation: "vertical",
  }),
  render(props) {
    return (
      <CheckboxGroup defaultValue={["option-a"]} {...props}>
        <label className="flex items-center gap-2">
          <Checkbox value="option-a" />
          オプション A
        </label>
        <label className="flex items-center gap-2">
          <Checkbox value="option-b" />
          オプション B
        </label>
        <label className="flex items-center gap-2">
          <Checkbox value="option-c" />
          オプション C
        </label>
      </CheckboxGroup>
    );
  },
});

const fruits = ["fuji-apple", "gala-apple", "granny-smith-apple"];

export const Parent = meta.story({
  name: "親チェックボックス",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    variant: "naked",
    disabled: false,
    outlined: true,
    orientation: "vertical",
  }),
  render(props) {
    return (
      <CheckboxGroup allValues={fruits} {...props} className="gap-1">
        <label className="flex items-center gap-2">
          <Checkbox parent />
          すべて選択
        </label>
        <label className="flex items-center gap-2 pis-6">
          <Checkbox value="fuji-apple" />
          ふじ
        </label>
        <label className="flex items-center gap-2 pis-6">
          <Checkbox value="gala-apple" />
          ガラ
        </label>
        <label className="flex items-center gap-2 pis-6">
          <Checkbox value="granny-smith-apple" />
          グラニースミス
        </label>
      </CheckboxGroup>
    );
  },
});

export const Horizontal = meta.story({
  name: "横並び",
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
      <CheckboxGroup
        className="gap-3"
        {...props}
        orientation="horizontal"
        defaultValue={["option-a"]}
      >
        <label className="flex items-center gap-2">
          <Checkbox value="option-a" />
          オプション A
        </label>
        <label className="flex items-center gap-2">
          <Checkbox value="option-b" />
          オプション B
        </label>
      </CheckboxGroup>
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
    orientation: "vertical",
  }),
  render(props) {
    return (
      <CheckboxGroup disabled {...props} defaultValue={["option-a"]}>
        <label className="flex items-center gap-2">
          <Checkbox value="option-b" />
          無効（未選択）
        </label>
        <label className="flex items-center gap-2">
          <Checkbox value="option-a" />
          無効（選択済み）
        </label>
      </CheckboxGroup>
    );
  },
});
