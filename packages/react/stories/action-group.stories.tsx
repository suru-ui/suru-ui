import * as theme from "@suru-ui/theme";
import { Trash2Icon, SettingsIcon } from "lucide-react";

import { preview, controls } from "../.config/storybook/preview.js";
import { ActionGroup, ActionGroupRoot, ActionGroupSeparator } from "../src/action-group/index.js";
import { Button } from "../src/button/index.js";
import { Input } from "../src/input/index.js";

const COLORS: readonly ActionGroup.Color[] = theme.COLORS;
const ORIENTATIONS: readonly ActionGroup.Orientation[] = ["horizontal", "vertical"];
const RADII: readonly ActionGroup.Radius[] = ["none", ...theme.SIZES, "full"];
const SIZES: readonly ActionGroup.Size[] = theme.SIZES;
const VARIANTS: readonly ActionGroup.Variant[] = theme.COLOR_TEMPLATES;

const meta = preview.meta({
  title: "ActionGroup",
  component: ActionGroupRoot,
});

export default meta;

const ctrl = controls(ActionGroupRoot, {
  color: {
    control: "select",
    options: COLORS,
  },
  orientation: {
    control: "select",
    options: ORIENTATIONS,
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
    variant: "solid",
    color: "grey",
    size: "md",
    radius: "md",
    outlined: false,
    orientation: "horizontal",
  }),
  render(props) {
    return (
      <ActionGroupRoot {...props}>
        <Button>
          <SettingsIcon />
          設定
        </Button>
        <Input placeholder="検索" aria-label="検索" />
        <Button>
          <Trash2Icon />
          削除
        </Button>
      </ActionGroupRoot>
    );
  },
});

export const WithSeparator = meta.story({
  name: "区切り線",
  ...ctrl({
    variant: "solid",
    color: "grey",
    size: "md",
    radius: "md",
    outlined: true,
    orientation: "horizontal",
  }),
  render(props) {
    return (
      <ActionGroupRoot {...props}>
        <Button>戻る</Button>
        <ActionGroupSeparator />
        <Button>進む</Button>
      </ActionGroupRoot>
    );
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    variant: "solid",
    size: "md",
    radius: "md",
    outlined: false,
    orientation: "horizontal",
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-4">
        {COLORS.map((color) => (
          <ActionGroupRoot {...props} key={color} color={color}>
            <Button>{color}</Button>
            <Button>実行</Button>
          </ActionGroupRoot>
        ))}
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    variant: "solid",
    color: "blue",
    radius: "md",
    outlined: false,
    orientation: "horizontal",
  }),
  render(props) {
    return (
      <div className="flex flex-col items-start gap-4">
        {SIZES.map((size) => (
          <ActionGroupRoot {...props} key={size} size={size}>
            <Button>{size}</Button>
            <Button>保存</Button>
          </ActionGroupRoot>
        ))}
      </div>
    );
  },
});

export const Radius = meta.story({
  name: "角丸",
  ...ctrl({
    variant: "solid",
    color: "blue",
    size: "md",
    outlined: false,
    orientation: "horizontal",
  }),
  render(props) {
    return (
      <div className="flex flex-wrap items-end gap-4">
        {RADII.map((radius) => (
          <div key={radius} className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-500">{radius}</span>
            <ActionGroupRoot {...props} radius={radius}>
              <Button>A</Button>
              <Button>B</Button>
            </ActionGroupRoot>
          </div>
        ))}
      </div>
    );
  },
});
