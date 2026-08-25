import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Button } from "../src/button/index.js";
import { Tooltip } from "../src/tooltip/index.js";
import * as TooltipParts from "../src/tooltip/index.js";

const meta = preview.meta({
  title: "Overlays / Tooltip",
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
            slotProps={{
              trigger: {
                children: <Button>保存</Button>,
                delay: 0,
                "aria-label": "保存",
              },
            }}
          >
            保存します
          </Tooltip>
          <Tooltip
            {...props}
            slotProps={{
              trigger: {
                children: <Button>共有</Button>,
                delay: 0,
                "aria-label": "共有",
              },
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
        slotProps={{
          trigger: {
            children: <Button>詳細</Button>,
            delay: 0,
            "aria-label": "詳細",
          },
        }}
        onOpenChange={setOpen}
      >
        詳細を表示します
      </Tooltip>
    );
  },
});
