import { SIZES, COLORS, COLOR_TEMPLATES } from "@suru-ui/theme";
import { Trash2Icon, SettingsIcon } from "lucide-react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Button } from "../../src/buttons/button/index.js";
import { Input } from "../../src/forms/input/index.js";
import { ActionGroupRoot, ActionGroupSeparator } from "../../src/layout/action-group/index.js";

const RADII = ["none", "sm", "md", "lg", "full"] as const;

const meta = preview.meta({
  title: "Layout / ActionGroup",
  component: ActionGroupRoot,
});

export default meta;

const ctrl = controls(ActionGroupRoot, {
  color: {
    options: COLORS,
    control: "select",
  },
  orientation: {
    options: ["horizontal", "vertical"],
    control: "select",
  },
  outlined: {
    control: "boolean",
  },
  radius: {
    options: ["none", "sm", "md", "lg", "full"],
    control: "select",
  },
  size: {
    options: SIZES,
    control: "select",
  },
  variant: {
    options: COLOR_TEMPLATES,
    control: "select",
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
        <Input aria-label="検索" placeholder="検索" />
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
          <ActionGroupRoot {...props} color={color} key={color}>
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
          <ActionGroupRoot {...props} size={size} key={size}>
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
          <div className="flex flex-col items-center gap-2" key={radius}>
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
