import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Button } from "../src/button/index.js";
import { Tooltip } from "../src/tooltip/index.js";
import * as TooltipParts from "../src/tooltip/index.js";

const meta = preview.meta({
  title: "Tooltip",
  component: Tooltip,
});

export default meta;

const ctrl = controls(Tooltip, {
  disabled: {
    control: "boolean",
  },
  disableHoverablePopup: {
    control: "boolean",
  },
  trackCursorAxis: {
    options: ["none", "x", "y", "both"],
    control: "select",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    disabled: false,
    disableHoverablePopup: false,
    trackCursorAxis: "none",
  }),
  render(props) {
    return (
      <TooltipParts.Provider>
        <div className="flex gap-3">
          <Tooltip
            {...props}
            trigger={<Button>保存</Button>}
            slotProps={{
              trigger: { delay: 0, "aria-label": "保存" },
            }}
          >
            保存します
          </Tooltip>
          <Tooltip
            {...props}
            trigger={<Button>共有</Button>}
            slotProps={{
              trigger: { delay: 0, "aria-label": "共有" },
            }}
          >
            リンクを共有します
          </Tooltip>
        </div>
      </TooltipParts.Provider>
    );
  },
});

export const Parts = meta.story({
  name: "パーツ",
  ...ctrl({}),
  render() {
    return (
      <TooltipParts.Root>
        <TooltipParts.Trigger delay={0} aria-label="保存">
          <Button>保存</Button>
        </TooltipParts.Trigger>
        <TooltipParts.Portal>
          <TooltipParts.Positioner sideOffset={8}>
            <TooltipParts.Popup>
              <TooltipParts.Arrow />
              保存します
            </TooltipParts.Popup>
          </TooltipParts.Positioner>
        </TooltipParts.Portal>
      </TooltipParts.Root>
    );
  },
});

export const DetachedTrigger = meta.story({
  name: "分離したトリガー",
  ...ctrl({}),
  render() {
    const handle = TooltipParts.createHandle();

    return (
      <TooltipParts.Provider>
        <TooltipParts.Trigger delay={0} handle={handle} aria-label="削除">
          <Button>削除</Button>
        </TooltipParts.Trigger>
        <TooltipParts.Root handle={handle}>
          <TooltipParts.Portal>
            <TooltipParts.Positioner sideOffset={8}>
              <TooltipParts.Popup>
                <TooltipParts.Arrow />
                削除します
              </TooltipParts.Popup>
            </TooltipParts.Positioner>
          </TooltipParts.Portal>
        </TooltipParts.Root>
      </TooltipParts.Provider>
    );
  },
});

export const Controlled = meta.story({
  name: "制御",
  ...ctrl({}),
  render() {
    const [open, setOpen] = React.useState(false);

    return (
      <Tooltip
        open={open}
        trigger={<Button>詳細</Button>}
        slotProps={{
          trigger: { delay: 0, "aria-label": "詳細" },
        }}
        onOpenChange={setOpen}
      >
        詳細を表示します
      </Tooltip>
    );
  },
});

export const Positions = meta.story({
  name: "配置",
  ...ctrl({
    disabled: false,
    disableHoverablePopup: false,
    trackCursorAxis: "none",
  }),
  render(props) {
    const sides = ["top", "bottom", "left", "right"] as const;

    return (
      <div className="flex flex-wrap items-center gap-4">
        {sides.map((side) => (
          <Tooltip
            key={side}
            {...props}
            trigger={<Button variant="liquid">{side}</Button>}
            slotProps={{
              trigger: { delay: 0, "aria-label": `${side}のヒント` },
              positioner: { side, sideOffset: 8 },
              arrow: {},
            }}
          >
            {side} に表示されます。
          </Tooltip>
        ))}
      </div>
    );
  },
});

export const WithArrow = meta.story({
  name: "矢印",
  ...ctrl({
    disabled: false,
    disableHoverablePopup: false,
    trackCursorAxis: "none",
  }),
  render(props) {
    return (
      <div className="flex items-center gap-4">
        <Tooltip
          {...props}
          trigger={<Button>矢印あり</Button>}
          slotProps={{
            trigger: { delay: 0, "aria-label": "矢印あり" },
            arrow: {},
          }}
        >
          矢印付きのツールチップです。
        </Tooltip>
        <Tooltip
          {...props}
          trigger={<Button variant="liquid">矢印なし</Button>}
          slotProps={{
            trigger: { delay: 0, "aria-label": "矢印なし" },
          }}
        >
          矢印なしのツールチップです。
        </Tooltip>
      </div>
    );
  },
});

export const Keyboard = meta.story({
  name: "キーボード操作",
  ...ctrl({
    disabled: false,
    disableHoverablePopup: false,
    trackCursorAxis: "none",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-2 text-sm">
        <p>Tab でトリガーに移動し、フォーカスで開きます。Escape で閉じます。</p>
        <div>
          <Tooltip
            {...props}
            trigger={<Button>キーボードで開く</Button>}
            slotProps={{
              trigger: { delay: 0, "aria-label": "キーボードで開く" },
            }}
          >
            キーボードフォーカスでも表示されます。
          </Tooltip>
        </div>
      </div>
    );
  },
});
