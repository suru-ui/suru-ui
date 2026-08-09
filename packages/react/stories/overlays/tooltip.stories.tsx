import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Button } from "../../src/buttons/button/index.jsx";
import { Tooltip } from "../../src/overlays/tooltip/index.js";
import * as TooltipParts from "../../src/overlays/tooltip/index.js";

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
            trigger={<Button>保存</Button>}
            slotProps={{
              trigger: {
                "aria-label": "保存",
                delay: 0,
              },
            }}
          >
            保存します
          </Tooltip>
          <Tooltip
            {...props}
            trigger={<Button>共有</Button>}
            slotProps={{
              trigger: {
                "aria-label": "共有",
                delay: 0,
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
        <TooltipParts.Trigger aria-label="保存" delay={0}>
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
        <TooltipParts.Trigger handle={handle} aria-label="削除" delay={0}>
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
        onOpenChange={setOpen}
        trigger={<Button>詳細</Button>}
        slotProps={{
          trigger: {
            "aria-label": "詳細",
            delay: 0,
          },
        }}
      >
        詳細を表示します
      </Tooltip>
    );
  },
});
