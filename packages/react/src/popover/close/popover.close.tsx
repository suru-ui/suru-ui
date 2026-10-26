import type { NativeButtonProps } from "@base-ui/react/internals/types";
import { Popover } from "@base-ui/react/popover";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { usePopoverPopupContext } from "../popup/popover.popup.context.js";
import { PopoverCloseContext } from "./popover.close.context.js";

/**
 * {@link PopoverClose} が持つ状態です。
 */
export type PopoverCloseState = PopoverCloseContext;

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

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Popover.Close>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // NativeButtonProps より:
      | keyof NativeButtonProps
      // PopoverCloseProps より:
      | never
    >,
    keyof Render | keyof SuruUI
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
  const ctx = usePopoverPopupContext();
  const { style, children, className, ...otherProps } = props;

  return (
    <Popover.Close
      {...otherProps}
      {...proxyRenderProps<Popover.Close.State, PopoverCloseState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <PopoverCloseContext value={state}>
              <RenderElement
                state={state}
                render={children}
                htmlProps={htmlProps}
                defaultTagName="button"
              />
            </PopoverCloseContext>
          ),
          className: cn<PopoverCloseState>(
            className,
            "sui_popover_close",
            (state) => `sui_popover_close-size_${state.size}`,
            (state) => `sui_popover_close-radius_${state.radius}`,
            (state) => state.outlined && "sui_popover_close-outlined",
            (state) => state.open && "sui_popover_close-open",
            (state) => state.anchorHidden && "sui_popover_close-anchor_hidden",
            (state) => state.instant && "sui_popover_close-instant",
            (state) => `sui_popover_close-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_popover_close-align_${state.align}`,
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_popover_close-transition_status_${state.transitionStatus}`,
          ),
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
