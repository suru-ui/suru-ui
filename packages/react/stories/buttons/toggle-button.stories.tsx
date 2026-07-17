import { COLOR_TEMPLATES as VALIANTS, COLORS, SIZES } from "@suru-ui/theme";
import { CogIcon, DeleteIcon, EllipsisIcon, GlobeIcon, Trash2Icon } from "lucide-react";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { ToggleButton } from "../../src/buttons/toggle-button/index.js";

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
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        <ToggleButton {...props} variant="solid">
          ソリッド
        </ToggleButton>
        <ToggleButton {...props} variant="naked">
          ネイキッド
        </ToggleButton>
        <ToggleButton {...props} variant="liquid">
          リキッド
        </ToggleButton>
      </div>
    );
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    size: "md",
    radius: "rounded",
    outlined: false,
    pending: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        {COLORS.map((color) => (
          <ToggleButton
            {...props}
            key={color}
            defaultActive
            variant={color !== "grey" ? "liquid" : "naked"}
            activeProps={{
              color,
              variant: color !== "grey" ? "liquid" : "solid",
            }}
          >
            ボタン
          </ToggleButton>
        ))}
      </div>
    );
  },
});

export const Active = meta.story({
  name: "アクティブ",
  ...ctrl({
    variant: "solid",
    color: "grey",
    size: "md",
    radius: "rounded",
    outlined: false,
    pending: false,
    disabled: false,
  }),
  render(props) {
    const [active, setActive] = React.useState(false);

    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-center gap-3">
          <ToggleButton {...props} defaultActive>
            初期アクティブ
          </ToggleButton>
          <ToggleButton {...props}>初期非アクティブ</ToggleButton>
        </div>
        <div className="flex items-center justify-center gap-3">
          <ToggleButton {...props} active={active} onClick={() => setActive((p) => !p)}>
            制御: {active ? "ON" : "OFF"}
          </ToggleButton>
          <ToggleButton {...props} active>
            強制アクティブ
          </ToggleButton>
        </div>
      </div>
    );
  },
});

export const ActiveProps = meta.story({
  name: "アクティブ Props",
  ...ctrl({
    size: "md",
    outlined: false,
    pending: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        <ToggleButton
          {...props}
          defaultActive
          activeProps={{
            color: "green",
          }}
        >
          色が変わる
        </ToggleButton>
        <ToggleButton
          {...props}
          defaultActive
          activeProps={{
            variant: "solid",
          }}
        >
          塗りが変わる
        </ToggleButton>
        <ToggleButton
          {...props}
          defaultActive
          activeProps={{
            radius: "full",
          }}
        >
          形が変わる
        </ToggleButton>
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
  }),
  render(props) {
    const [active, setActive] = React.useState(true);

    return (
      <div className="flex flex-col gap-3">
        <div className="flex justify-center gap-3">
          <ToggleButton {...props} defaultActive>
            <GlobeIcon />
            公開
          </ToggleButton>
          <ToggleButton
            {...props}
            defaultActive
            activeProps={{
              color: "red",
            }}
          >
            削除
            <DeleteIcon />
          </ToggleButton>
        </div>
        <div className="flex justify-center gap-3">
          <ToggleButton
            {...props}
            active={active}
            onClick={() => setActive((p) => !p)}
            slotProps={{
              content: {
                className: "flex-col",
              },
            }}
          >
            <GlobeIcon />
            {active ? "公開中" : "非公開"}
          </ToggleButton>
          <ToggleButton
            {...props}
            defaultActive
            activeProps={{
              color: "red",
            }}
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
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        <ToggleButton {...props} squared defaultActive>
          <EllipsisIcon />
        </ToggleButton>
        <ToggleButton {...props} squared>
          <CogIcon />
        </ToggleButton>
        <ToggleButton {...props} squared defaultActive>
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
    variant: "solid",
    color: "grey",
    size: "md",
    radius: "rounded",
    outlined: false,
    disabled: false,
  }),
  render(props) {
    const feature = useToggleFeature();

    return (
      <div className="flex flex-wrap gap-3">
        <ToggleButton
          {...props}
          active={feature.flag}
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
    variant: "solid",
    color: "grey",
    size: "md",
    outlined: false,
    pending: false,
    disabled: false,
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
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        <ToggleButton {...props} variant="solid" outlined>
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
    variant: "solid",
    color: "grey",
    radius: "rounded",
    outlined: false,
    pending: false,
    disabled: false,
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
    variant: "solid",
    color: "grey",
    size: "md",
    radius: "rounded",
    outlined: false,
    pending: false,
    disabled: false,
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
    variant: "solid",
    color: "grey",
    size: "md",
    radius: "rounded",
    outlined: false,
    pending: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        <ToggleButton {...props} disabled>
          送信
        </ToggleButton>
        <ToggleButton {...props} disabled defaultActive>
          ON（無効）
        </ToggleButton>
        <ToggleButton {...props} disabled squared>
          <EllipsisIcon />
        </ToggleButton>
      </div>
    );
  },
});
