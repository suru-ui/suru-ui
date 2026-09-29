import { Popover } from "@base-ui/react/popover";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link PopoverViewport} が持つ状態です。
 */
export type PopoverViewportState = Popover.Viewport.State;

export namespace PopoverViewportProps {
  export type Render = RenderProps<PopoverViewportState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Popover.Viewport>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PopoverViewportProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Popover.Viewport>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link PopoverViewport} に渡す props です。
 */
export type PopoverViewportProps = PopoverViewportProps.Render &
  PopoverViewportProps.SuruUI &
  PopoverViewportProps.BaseUI &
  PopoverViewportProps.HTML;

export type IPopoverViewport = IComponent<PopoverViewportProps>;

/**
 * 複数のトリガー間で内容を切り替えるときのアニメーション領域です。
 *
 * 1 つのポップオーバーを複数のトリガーで共有し、内容をトリガーごとに変える場合に使います。
 */
export const PopoverViewport: IPopoverViewport = function SuiPopoverViewport(props) {
  const { className, ...otherProps } = props;

  return <Popover.Viewport {...otherProps} className={cn(className, "sui_popover_viewport")} />;
};

export { PopoverViewport as Viewport };

export namespace Viewport {
  export type State = PopoverViewportState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PopoverViewportProps.Render;

    export type SuruUI = PopoverViewportProps.SuruUI;

    export type BaseUI = PopoverViewportProps.BaseUI;

    export type HTML = PopoverViewportProps.HTML;
  }
}
