import * as theme from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Button } from "../button/index.js";
import { Tooltip } from "./index.js";
import * as TooltipParts from "./index.js";

const SIZES: readonly Tooltip.Size[] = theme.SIZES;
const RADII: readonly Tooltip.Radius[] = ["none", ...theme.SIZES];
const TRACK_CURSOR_AXIS = ["none", "x", "y", "both"] as const;

const meta = preview.meta({
  title: "Tooltip",
  component: Tooltip,
});

export default meta;

const ctrl = controls(Tooltip, {
  size: {
    control: "select",
    options: SIZES,
  },
  delay: {
    control: "number",
  },
  radius: {
    control: "select",
    options: RADII,
  },
  disabled: {
    control: "boolean",
  },
  outlined: {
    control: "boolean",
  },
  showArrow: {
    control: "boolean",
  },
  closeDelay: {
    control: "number",
  },
  keepOpenOnClick: {
    control: "boolean",
  },
  trackCursorAxis: {
    control: "select",
    options: TRACK_CURSOR_AXIS,
  },
  disableHoverablePopup: {
    control: "boolean",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    size: "md",
    delay: 0,
    radius: undefined,
    disabled: false,
    outlined: false,
    showArrow: false,
    closeDelay: 0,
    keepOpenOnClick: false,
    trackCursorAxis: "none",
    disableHoverablePopup: false,
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
    delay: 0,
    radius: undefined,
    disabled: false,
    outlined: false,
    showArrow: false,
    closeDelay: 0,
    keepOpenOnClick: false,
    trackCursorAxis: "none",
    disableHoverablePopup: false,
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
    delay: 0,
    radius: undefined,
    disabled: false,
    outlined: false,
    showArrow: false,
    closeDelay: 0,
    keepOpenOnClick: false,
    trackCursorAxis: "none",
    disableHoverablePopup: false,
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
    delay: 0,
    radius: undefined,
    disabled: false,
    outlined: false,
    closeDelay: 0,
    keepOpenOnClick: false,
    trackCursorAxis: "none",
    disableHoverablePopup: false,
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
