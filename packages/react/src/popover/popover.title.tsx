import { Popover } from "@base-ui/react/popover";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type PopoverContext, usePopoverContext } from "./popover.context.js";

/**
 * {@link PopoverTitle} が持つ状態です。
 */
export type PopoverTitleState = Override<PopoverContext, Popover.Title.State>;

export namespace PopoverTitleProps {
  export type Render = RenderProps<PopoverTitleState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Popover.Title>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PopoverTitleProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Popover.Title>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link PopoverTitle} に渡す props です。
 */
export type PopoverTitleProps = PopoverTitleProps.Render &
  PopoverTitleProps.SuruUI &
  PopoverTitleProps.BaseUI &
  PopoverTitleProps.HTML;

export type IPopoverTitle = IComponent<PopoverTitleProps>;

/**
 * ポップオーバーのタイトルを表示する見出し要素です。
 */
export const PopoverTitle: IPopoverTitle = function SuiPopoverTitle(props) {
  const ctx = usePopoverContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Popover.Title
      {...otherProps}
      {...proxyRenderProps<Popover.Title.State, PopoverTitleState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<PopoverTitleState>(
            className,
            "sui_popover_title",
            (state) => `sui_popover_title-size_${state.size}`,
            (state) => `sui_popover_title-radius_${state.radius}`,
            (state) => state.outlined && "sui_popover_title-outlined",
          ),
        },
      )}
    />
  );
};

export { PopoverTitle as Title };

export namespace Title {
  export type State = PopoverTitleState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PopoverTitleProps.Render;

    export type SuruUI = PopoverTitleProps.SuruUI;

    export type BaseUI = PopoverTitleProps.BaseUI;

    export type HTML = PopoverTitleProps.HTML;
  }
}
