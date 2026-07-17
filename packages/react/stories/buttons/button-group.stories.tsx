import { COLOR_TEMPLATES as VALIANTS, COLORS, SIZES } from "@suru-ui/theme";
import { CogIcon, EllipsisIcon, GlobeIcon, Trash2Icon } from "lucide-react";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { ButtonGroup } from "../../src/buttons/button-group/index.js";
import { Button } from "../../src/buttons/button/index.js";

const meta = preview.meta({
  title: "Buttons / ButtonGroup",
  component: ButtonGroup,
});

export default meta;

const ctrl = controls(ButtonGroup, {
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
    options: ["none", "rounded", "full"],
    control: "select",
  },
  size: {
    options: SIZES,
    control: "select",
  },
  variant: {
    options: VALIANTS,
    control: "select",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    variant: "solid",
    color: "grey",
    size: "md",
    radius: "rounded",
    outlined: false,
    orientation: "horizontal",
  }),
  render(props) {
    return (
      <ButtonGroup {...props}>
        <Button>保存</Button>
        <Button>キャンセル</Button>
      </ButtonGroup>
    );
  },
});

export const Orientation = meta.story({
  name: "向き",
  ...ctrl({
    variant: "solid",
    color: "grey",
    size: "md",
    radius: "rounded",
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-6">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">横並び</span>
          <ButtonGroup {...props} orientation="horizontal">
            <Button>A</Button>
            <Button>B</Button>
            <Button>C</Button>
          </ButtonGroup>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">縦並び</span>
          <ButtonGroup {...props} orientation="vertical">
            <Button>A</Button>
            <Button>B</Button>
            <Button>C</Button>
          </ButtonGroup>
        </div>
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    variant: "solid",
    color: "blue",
    radius: "rounded",
    outlined: false,
    orientation: "horizontal",
  }),
  render(props) {
    return (
      <div className="flex flex-wrap items-end gap-6">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">sm</span>
          <ButtonGroup {...props} size="sm">
            <Button>保存</Button>
            <Button>キャンセル</Button>
          </ButtonGroup>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">md</span>
          <ButtonGroup {...props} size="md">
            <Button>保存</Button>
            <Button>キャンセル</Button>
          </ButtonGroup>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">lg</span>
          <ButtonGroup {...props} size="lg">
            <Button>保存</Button>
            <Button>キャンセル</Button>
          </ButtonGroup>
        </div>
      </div>
    );
  },
});

export const Variants = meta.story({
  name: "バリエーション",
  ...ctrl({
    color: "grey",
    size: "md",
    radius: "rounded",
    outlined: false,
    orientation: "horizontal",
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-6">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">solid</span>
          <ButtonGroup {...props} variant="solid">
            <Button>編集</Button>
            <Button>削除</Button>
          </ButtonGroup>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">naked</span>
          <ButtonGroup {...props} variant="naked">
            <Button>編集</Button>
            <Button>削除</Button>
          </ButtonGroup>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">liquid</span>
          <ButtonGroup {...props} variant="liquid">
            <Button>編集</Button>
            <Button>削除</Button>
          </ButtonGroup>
        </div>
      </div>
    );
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    variant: "solid",
    size: "md",
    radius: "rounded",
    outlined: false,
    orientation: "horizontal",
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-6">
        {COLORS.map((color) => (
          <ButtonGroup {...props} key={color} color={color}>
            <Button>保存</Button>
            <Button>キャンセル</Button>
          </ButtonGroup>
        ))}
      </div>
    );
  },
});

export const WithIcons = meta.story({
  name: "アイコン付き",
  ...ctrl({
    variant: "solid",
    color: "blue",
    size: "md",
    radius: "rounded",
    outlined: false,
    orientation: "horizontal",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex justify-center">
          <ButtonGroup {...props}>
            <Button>
              <GlobeIcon />
              公開
            </Button>
            <Button>
              <CogIcon />
              設定
            </Button>
            <Button color="red">
              <Trash2Icon />
              削除
            </Button>
          </ButtonGroup>
        </div>
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
      <div className="flex flex-wrap items-end gap-6">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">none</span>
          <ButtonGroup {...props} radius="none">
            <Button>保存</Button>
            <Button>キャンセル</Button>
          </ButtonGroup>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">rounded</span>
          <ButtonGroup {...props} radius="rounded">
            <Button>保存</Button>
            <Button>キャンセル</Button>
          </ButtonGroup>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">full</span>
          <ButtonGroup {...props} radius="full">
            <Button>保存</Button>
            <Button>キャンセル</Button>
          </ButtonGroup>
        </div>
      </div>
    );
  },
});

export const Outlined = meta.story({
  name: "枠線",
  ...ctrl({
    variant: "solid",
    color: "grey",
    size: "md",
    radius: "rounded",
    orientation: "horizontal",
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-6">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">outlined</span>
          <ButtonGroup {...props} outlined>
            <Button>編集</Button>
            <Button>削除</Button>
          </ButtonGroup>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">通常</span>
          <ButtonGroup {...props} outlined={false}>
            <Button>編集</Button>
            <Button>削除</Button>
          </ButtonGroup>
        </div>
      </div>
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({
    variant: "solid",
    color: "grey",
    size: "md",
    radius: "rounded",
    outlined: false,
    orientation: "horizontal",
  }),
  render(props) {
    return (
      <ButtonGroup {...props}>
        <Button disabled>送信</Button>
        <Button disabled squared>
          <EllipsisIcon />
        </Button>
      </ButtonGroup>
    );
  },
});

export const Vertical = meta.story({
  name: "縦並び",
  ...ctrl({
    variant: "solid",
    color: "grey",
    size: "md",
    radius: "rounded",
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex justify-center">
        <ButtonGroup {...props} orientation="vertical">
          <Button>
            <GlobeIcon />
            公開
          </Button>
          <Button>
            <CogIcon />
            設定
          </Button>
          <Button color="red">
            <Trash2Icon />
            削除
          </Button>
        </ButtonGroup>
      </div>
    );
  },
});
