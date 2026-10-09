import { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useContextMenuContext } from "../root/context-menu.root.context.js";
import { ContextMenuSeparatorContext } from "./context-menu.separator.context.js";

/**
 * {@link ContextMenuSeparator} が持つ状態です。
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuSeparatorState<TItem = any> = ContextMenuSeparatorContext<TItem>;

export namespace ContextMenuSeparatorProps {
  export type Render<TItem = any> = RenderProps<ContextMenuSeparatorState<TItem>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof ContextMenu.Separator>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // SeparatorProps より:
      "orientation"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof ContextMenu.Separator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ContextMenuSeparator} に渡す props です。
 */
export type ContextMenuSeparatorProps = ContextMenuSeparatorProps.Render &
  ContextMenuSeparatorProps.SuruUI &
  ContextMenuSeparatorProps.BaseUI &
  ContextMenuSeparatorProps.HTML;

export type IContextMenuSeparator = IComponent<ContextMenuSeparatorProps>;

/**
 * コンテキストメニュー項目を区切る要素です。
 */
export const ContextMenuSeparator: IContextMenuSeparator = function SuiContextMenuSeparator(props) {
  const ctx = useContextMenuContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <ContextMenu.Separator
      {...otherProps}
      {...proxyRenderProps<ContextMenu.Separator.State, ContextMenuSeparatorState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <ContextMenuSeparatorContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </ContextMenuSeparatorContext>
          ),
          className: cn<ContextMenuSeparatorState>(
            className,
            "sui_context_menu_separator",
            (state) => `sui_context_menu_separator-size_${state.size}`,
            (state) => `sui_context_menu_separator-radius_${state.radius}`,
            (state) => `sui_context_menu_separator-variant_${state.variant}`,
            (state) => state.outlined && "sui_context_menu_separator-outlined",
            (state) => `sui_context_menu_separator-orientation_${state.orientation}`,
          ),
        },
      )}
    />
  );
};

export { ContextMenuSeparator as Separator };

export namespace Separator {
  export type State<TItem = any> = ContextMenuSeparatorState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = ContextMenuSeparatorProps.Render<TItem>;

    export type SuruUI = ContextMenuSeparatorProps.SuruUI;

    export type BaseUI = ContextMenuSeparatorProps.BaseUI;

    export type HTML = ContextMenuSeparatorProps.HTML;
  }
}
