import { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { usePopupContext } from "../popup/context-menu.popup.context.js";
import { ContextMenuArrowContext } from "./context-menu.arrow.context.js";

/**
 * {@link ContextMenuArrow} が持つ状態です。
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuArrowState<TItem = any> = ContextMenuArrowContext<TItem>;

export namespace ContextMenuArrowProps {
  export type Render<TItem = any> = RenderProps<ContextMenuArrowState<TItem>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof ContextMenu.Arrow>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // MenuArrowProps より:
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof ContextMenu.Arrow>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ContextMenuArrow} に渡す props です。
 */
export type ContextMenuArrowProps = ContextMenuArrowProps.Render &
  ContextMenuArrowProps.SuruUI &
  ContextMenuArrowProps.BaseUI &
  ContextMenuArrowProps.HTML;

export type IContextMenuArrow = IComponent<ContextMenuArrowProps>;

/**
 * ポップアップとトリガーをつなぐ矢印要素です。
 */
export const ContextMenuArrow: IContextMenuArrow = function SuiContextMenuArrow(props) {
  const ctx = usePopupContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <ContextMenu.Arrow
      {...otherProps}
      {...proxyRenderProps<ContextMenu.Arrow.State, ContextMenuArrowState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <ContextMenuArrowContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </ContextMenuArrowContext>
          ),
          className: cn<ContextMenuArrowState>(
            className,
            "sui_context_menu_arrow",
            (state) => `sui_context_menu_arrow-size_${state.size}`,
            (state) => `sui_context_menu_arrow-radius_${state.radius}`,
            (state) => `sui_context_menu_arrow-variant_${state.variant}`,
            (state) => state.outlined && "sui_context_menu_arrow-outlined",
            (state) => state.open && "sui_context_menu_arrow-open",
            (state) => state.anchorHidden && "sui_context_menu_arrow-anchor_hidden",
            (state) => state.nested && "sui_context_menu_arrow-nested",
            (state) => state.instant && "sui_context_menu_arrow-instant",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_context_menu_arrow-transition_status_${state.transitionStatus}`,
            (state) => state.uncentered && "sui_context_menu_arrow-uncentered",
            (state) => `sui_context_menu_arrow-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_context_menu_arrow-align_${state.align}`,
          ),
        },
      )}
    />
  );
};

export { ContextMenuArrow as Arrow };

export namespace Arrow {
  export type State<TItem = any> = ContextMenuArrowState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = ContextMenuArrowProps.Render<TItem>;

    export type SuruUI = ContextMenuArrowProps.SuruUI;

    export type BaseUI = ContextMenuArrowProps.BaseUI;

    export type HTML = ContextMenuArrowProps.HTML;
  }
}
