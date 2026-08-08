import { COLOR_TEMPLATES, COLORS, SIZES } from "@suru-ui/theme";
import { CogIcon, DeleteIcon, EllipsisIcon, GlobeIcon, Trash2Icon } from "lucide-react";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { ToggleButton } from "../../src/buttons/toggle-button/index.js";

const VALIANTS = COLOR_TEMPLATES.filter((variant) => variant !== "solid");

const meta = preview.meta({
  title: "Buttons / ToggleButton",
  component: ToggleButton,
});

export default meta;

const ctrl = controls(ToggleButton, {
  color: {
    options: COLORS,
    control: "select",
  },
  defaultPressed: {
    control: "boolean",
  },
  disabled: {
    control: "boolean",
  },
  outlined: {
    control: "boolean",
  },
  pending: {
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
  squared: {
    control: "boolean",
  },
  variant: {
    options: VALIANTS,
    control: "select",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    children: "切り替え",
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: "rounded",
    outlined: false,
    pending: false,
    disabled: false,
    squared: false,
    defaultPressed: false,
  }),
});

export const Variants = meta.story({
  name: "バリエーション",
  ...ctrl({
    color: "grey",
    size: "md",
    radius: "rounded",
    outlined: false,
    pending: false,
    disabled: false,
    squared: false,
    defaultPressed: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        <ToggleButton {...props} variant="liquid">
          リキッド
        </ToggleButton>
        <ToggleButton {...props} variant="naked">
          ネイキッド
        </ToggleButton>
        <ToggleButton {...props} variant="liquid" defaultPressed>
          押下（solid）
        </ToggleButton>
        <ToggleButton {...props} variant="naked" defaultPressed>
          押下（solid）
        </ToggleButton>
      </div>
    );
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    variant: "liquid",
    size: "md",
    radius: "rounded",
    outlined: false,
    pending: false,
    disabled: false,
    squared: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        {COLORS.map((color) => (
          <ToggleButton {...props} key={color} defaultPressed color={color}>
            ボタン
          </ToggleButton>
        ))}
      </div>
    );
  },
});

export const Active = meta.story({
  name: "押下状態",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: "rounded",
    outlined: false,
    pending: false,
    disabled: false,
    squared: false,
    defaultPressed: false,
  }),
  render(props) {
    const [pressed, setPressed] = React.useState(false);

    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-center gap-3">
          <ToggleButton {...props} defaultPressed>
            初期押下
          </ToggleButton>
          <ToggleButton {...props}>初期非押下</ToggleButton>
        </div>
        <div className="flex items-center justify-center gap-3">
          <ToggleButton {...props} pressed={pressed} onPressedChange={setPressed}>
            制御: {pressed ? "ON" : "OFF"}
          </ToggleButton>
          <ToggleButton {...props} pressed>
            強制押下
          </ToggleButton>
        </div>
      </div>
    );
  },
});

export const WithIcons = meta.story({
  name: "アイコン付き",
  ...ctrl({
    variant: "liquid",
    size: "md",
    radius: "rounded",
    outlined: false,
    pending: false,
    disabled: false,
    squared: false,
    defaultPressed: false,
  }),
  render(props) {
    const [pressed, setPressed] = React.useState(true);

    return (
      <div className="flex flex-col gap-3">
        <div className="flex justify-center gap-3">
          <ToggleButton {...props} defaultPressed>
            <GlobeIcon />
            公開
          </ToggleButton>
          <ToggleButton {...props} defaultPressed>
            削除
            <DeleteIcon />
          </ToggleButton>
        </div>
        <div className="flex justify-center gap-3">
          <ToggleButton
            {...props}
            pressed={pressed}
            onPressedChange={setPressed}
            slotProps={{
              content: {
                className: "flex-col",
              },
            }}
          >
            <GlobeIcon />
            {pressed ? "公開中" : "非公開"}
          </ToggleButton>
          <ToggleButton
            {...props}
            defaultPressed
            slotProps={{
              content: {
                className: "flex-col",
              },
            }}
          >
            <DeleteIcon />
            削除
          </ToggleButton>
        </div>
      </div>
    );
  },
});

export const Squared = meta.story({
  name: "正方形",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: "rounded",
    outlined: false,
    pending: false,
    disabled: false,
    defaultPressed: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        <ToggleButton {...props} squared defaultPressed>
          <EllipsisIcon />
        </ToggleButton>
        <ToggleButton {...props} squared>
          <CogIcon />
        </ToggleButton>
        <ToggleButton {...props} squared defaultPressed>
          <Trash2Icon />
        </ToggleButton>
      </div>
    );
  },
});

function useToggleFeature() {
  const [flag, setFlag] = React.useState(false);
  const [pending, startTransition] = React.useTransition();
  const clickHandler = () => {
    startTransition(async () => {
      const sleep = (t: number) => new Promise((r) => setTimeout(r, t));

      await sleep(1e3);
      setFlag((f) => !f);
    });
  };

  return {
    flag,
    pending,
    clickHandler,
  };
}

export const Pending = meta.story({
  name: "保留",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: "rounded",
    outlined: false,
    disabled: false,
    squared: false,
    defaultPressed: false,
  }),
  render(props) {
    const feature = useToggleFeature();

    return (
      <div className="flex flex-wrap gap-3">
        <ToggleButton
          {...props}
          pressed={feature.flag}
          pending={feature.pending}
          onClick={feature.clickHandler}
        >
          {feature.flag ? "有効化済み" : "有効化する"}
        </ToggleButton>
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
    pending: false,
    disabled: false,
    squared: false,
    defaultPressed: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        <ToggleButton {...props} radius="none">
          NONE
        </ToggleButton>
        <ToggleButton {...props} radius="rounded">
          ROUNDED
        </ToggleButton>
        <ToggleButton {...props} radius="full">
          FULL
        </ToggleButton>
      </div>
    );
  },
});

export const Outlined = meta.story({
  name: "枠線",
  ...ctrl({
    color: "grey",
    size: "md",
    radius: "rounded",
    pending: false,
    disabled: false,
    squared: false,
    defaultPressed: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        <ToggleButton {...props} variant="liquid" outlined>
          ソリッド
        </ToggleButton>
        <ToggleButton {...props} variant="naked" outlined>
          ネイキッド
        </ToggleButton>
        <ToggleButton {...props} variant="liquid" outlined>
          リキッド
        </ToggleButton>
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    radius: "rounded",
    outlined: false,
    pending: false,
    disabled: false,
    squared: false,
    defaultPressed: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-center gap-3">
          <ToggleButton {...props} size="sm">
            <Trash2Icon />
            Small
          </ToggleButton>
          <ToggleButton {...props} size="md">
            <Trash2Icon />
            Medium
          </ToggleButton>
          <ToggleButton {...props} size="lg">
            <Trash2Icon />
            Large
          </ToggleButton>
        </div>
        <div className="flex items-center justify-center gap-3">
          <ToggleButton {...props} size="sm" squared>
            <Trash2Icon />
          </ToggleButton>
          <ToggleButton {...props} size="md" squared>
            <Trash2Icon />
          </ToggleButton>
          <ToggleButton {...props} size="lg" squared>
            <Trash2Icon />
          </ToggleButton>
        </div>
        <div className="flex justify-center gap-3 h-[50px]">
          <ToggleButton {...props}>
            <Trash2Icon />
            ボタン
          </ToggleButton>
          <ToggleButton {...props} squared>
            <Trash2Icon />
          </ToggleButton>
        </div>
      </div>
    );
  },
});

export const FullWidth = meta.story({
  name: "最大幅",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: "rounded",
    outlined: false,
    pending: false,
    disabled: false,
    squared: false,
    defaultPressed: false,
  }),
  render(props) {
    return (
      <div className="space-y-1">
        <ToggleButton {...props} className="w-full">
          {"width: 100%"}
        </ToggleButton>
        <div className="flex w-[200px] gap-1">
          <ToggleButton {...props} className="w-full">
            {"width: 100%"}
          </ToggleButton>
          <ToggleButton {...props} squared>
            <EllipsisIcon />
          </ToggleButton>
        </div>
        <div className="flex w-[200px] gap-1">
          <ToggleButton {...props} className="flex-1">
            {"flex: 1"}
          </ToggleButton>
          <ToggleButton {...props} squared>
            <EllipsisIcon />
          </ToggleButton>
        </div>
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
    radius: "rounded",
    outlined: false,
    pending: false,
    squared: false,
    defaultPressed: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        <ToggleButton {...props} disabled variant="liquid">
          OFF
        </ToggleButton>
        <ToggleButton {...props} disabled defaultPressed variant="liquid">
          ON
        </ToggleButton>
        <ToggleButton {...props} disabled squared>
          <EllipsisIcon />
        </ToggleButton>
      </div>
    );
  },
});
