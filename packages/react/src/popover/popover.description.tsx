import { Popover } from "@base-ui/react/popover";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type PopoverContext, usePopoverContext } from "./popover.context.js";

/**
 * {@link PopoverDescription} が持つ状態です。
 */
export type PopoverDescriptionState = Override<PopoverContext, Popover.Description.State>;

export namespace PopoverDescriptionProps {
  export type Render = RenderProps<PopoverDescriptionState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Popover.Description>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PopoverDescriptionProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Popover.Description>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link PopoverDescription} に渡す props です。
 */
export type PopoverDescriptionProps = PopoverDescriptionProps.Render &
  PopoverDescriptionProps.SuruUI &
  PopoverDescriptionProps.BaseUI &
  PopoverDescriptionProps.HTML;

export type IPopoverDescription = IComponent<PopoverDescriptionProps>;

/**
 * ポップオーバーの説明文を表示する段落要素です。
 */
export const PopoverDescription: IPopoverDescription = function SuiPopoverDescription(props) {
  const ctx = usePopoverContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Popover.Description
      {...otherProps}
      {...proxyRenderProps<Popover.Description.State, PopoverDescriptionState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn(className, "sui_popover_description"),
        },
      )}
    />
  );
};

export { PopoverDescription as Description };

export namespace Description {
  export type State = PopoverDescriptionState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PopoverDescriptionProps.Render;

    export type SuruUI = PopoverDescriptionProps.SuruUI;

    export type BaseUI = PopoverDescriptionProps.BaseUI;

    export type HTML = PopoverDescriptionProps.HTML;
  }
}
