import { SIZES, COLORS } from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { CheckboxGroup } from "../../src/forms/checkbox-group/index.js";
import { Checkbox } from "../../src/forms/checkbox/index.js";

const ORIENTATIONS = ["vertical", "horizontal"] as const;
const RADII = ["none", ...SIZES, "full"] as const;
const VARIANTS = ["naked", "liquid"] as const;

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
    options: ORIENTATIONS,
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
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
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
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
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
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
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
