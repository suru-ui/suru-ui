import * as theme from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Button } from "../src/button/index.js";
import { Tooltip } from "../src/tooltip/index.js";
import * as TooltipParts from "../src/tooltip/index.js";

const SIZES: readonly Tooltip.Size[] = theme.SIZES;
const RADII: readonly Tooltip.Radius[] = ["none", ...theme.SIZES];
const TRACK_CURSOR_AXIS = ["none", "x", "y", "both"] as const;

const meta = preview.meta({
  title: "Tooltip",
  component: Tooltip,
});

export default meta;

const ctrl = controls(Tooltip, {
  closeDelay: {
    control: "number",
  },
  delay: {
    control: "number",
  },
  disabled: {
    control: "boolean",
  },
  disableHoverablePopup: {
    control: "boolean",
  },
  keepOpenOnClick: {
    control: "boolean",
  },
  outlined: {
    control: "boolean",
  },
  radius: {
    control: "select",
    options: RADII,
  },
  showArrow: {
    control: "boolean",
  },
  size: {
    options: SIZES,
    control: "select",
  },
  trackCursorAxis: {
    control: "select",
    options: TRACK_CURSOR_AXIS,
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    size: "md",
    radius: undefined,
    outlined: false,
    delay: 0,
    closeDelay: 0,
    showArrow: false,
    disabled: false,
    trackCursorAxis: "none",
    disableHoverablePopup: false,
    keepOpenOnClick: false,
  }),
  render(props) {
    return (
      <div className="flex gap-3">
        <Tooltip {...props} trigger={<Button>保存</Button>}>
          保存します
        </Tooltip>
        <Tooltip {...props} trigger={<Button>共有</Button>}>
          リンクを共有します
        </Tooltip>
      </div>
    );
  },
});

export const DetachedTrigger = meta.story({
  name: "分離したトリガー",
  ...ctrl({
    size: "md",
    radius: undefined,
    outlined: false,
    delay: 0,
    closeDelay: 0,
    showArrow: false,
    disabled: false,
    trackCursorAxis: "none",
    disableHoverablePopup: false,
    keepOpenOnClick: false,
  }),
  render(props) {
    const handle = TooltipParts.createHandle();

    return (
      <>
        <Tooltip.Trigger
          delay={props.delay}
          handle={handle}
          closeDelay={props.closeDelay}
          keepOpenOnClick={props.keepOpenOnClick}
        >
          <Button>削除</Button>
        </Tooltip.Trigger>
        <Tooltip {...props} handle={handle}>
          削除します
        </Tooltip>
      </>
    );
  },
});

export const Positions = meta.story({
  name: "配置",
  ...ctrl({
    size: "md",
    radius: undefined,
    outlined: false,
    delay: 0,
    closeDelay: 0,
    showArrow: false,
    disabled: false,
    trackCursorAxis: "none",
    disableHoverablePopup: false,
    keepOpenOnClick: false,
  }),
  render(props) {
    const sides = ["top", "bottom", "left", "right"] as const;

    return (
      <div className="flex flex-wrap items-center gap-4">
        {sides.map((side) => (
          <Tooltip
            key={side}
            {...props}
            side={side}
            trigger={<Button variant="liquid">{side}</Button>}
          >
            {side} に表示されます。
          </Tooltip>
        ))}
      </div>
    );
  },
});

export const WithArrow = meta.story({
  name: "矢印付き",
  ...ctrl({
    size: "md",
    radius: undefined,
    outlined: false,
    delay: 0,
    closeDelay: 0,
    disabled: false,
    trackCursorAxis: "none",
    disableHoverablePopup: false,
    keepOpenOnClick: false,
  }),
  render(props) {
    return (
      <div className="flex items-center gap-4">
        <Tooltip {...props} trigger={<Button>矢印あり</Button>} showArrow>
          矢印付きのツールチップです。
        </Tooltip>
        <Tooltip {...props} trigger={<Button variant="liquid">矢印なし</Button>}>
          矢印なしのツールチップです。
        </Tooltip>
      </div>
    );
  },
});
