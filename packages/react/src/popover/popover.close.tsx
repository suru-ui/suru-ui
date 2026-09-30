import type { NativeButtonProps } from "@base-ui/react/internals/types";
import { Popover } from "@base-ui/react/popover";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type PopoverContext, usePopoverContext } from "./popover.context.js";

/**
 * {@link PopoverClose} が持つ状態です。
 */
export type PopoverCloseState = Override<PopoverContext, Popover.Close.State>;

export namespace PopoverCloseProps {
  export type Render = Omit<RenderProps<PopoverCloseState>, "render">;

  export type SuruUI = {
    /**
     * ボタンとしてレンダリングする要素です。
     *
     * Base UI の `render` プロパティーと同じ型で、そのまま `render` に渡されます。
     */
    children: NonNullable<RenderProps<PopoverCloseState>["render"]>;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof Popover.Close>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // PopoverCloseProps:
      | never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Popover.Close>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link PopoverClose} に渡す props です。
 */
export type PopoverCloseProps = PopoverCloseProps.Render &
  PopoverCloseProps.SuruUI &
  PopoverCloseProps.BaseUI &
  PopoverCloseProps.HTML;

export type IPopoverClose = IComponent<PopoverCloseProps>;

/**
 * ポップオーバーを閉じるボタン要素です。
 *
 * 子要素は何にもラップされず、そのまま Base UI の `render` プロパティーに渡されます。
 */
export const PopoverClose: IPopoverClose = function SuiPopoverClose(props) {
  const ctx = usePopoverContext();
  const { style, children, className, ...otherProps } = props;

  return (
    <Popover.Close
      {...otherProps}
      {...proxyRenderProps<Popover.Close.State, PopoverCloseState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: children,
          className: cn(className, "sui_popover_close"),
        },
      )}
    />
  );
};

export { PopoverClose as Close };

export namespace Close {
  export type State = PopoverCloseState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PopoverCloseProps.Render;

    export type SuruUI = PopoverCloseProps.SuruUI;

    export type BaseUI = PopoverCloseProps.BaseUI;

    export type HTML = PopoverCloseProps.HTML;
  }
}
