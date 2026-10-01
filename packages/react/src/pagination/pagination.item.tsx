import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import * as Button from "../button/button.parts.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type PaginationContext, usePaginationContext } from "./pagination.context.js";

/**
 * {@link PaginationItem} が持つ状態です。
 */
export type PaginationItemState = Override<
  Override<PaginationContext, Button.Root.State>,
  {
    /**
     * 現在のページかどうかです。
     */
    readonly selected: boolean;
  }
>;

export namespace PaginationItemProps {
  export type Render = RenderProps<PaginationItemState>;

  export type SuruUI = {
    /**
     * 表示するページ番号を指定します。
     */
    page: number;

    /**
     * 現在のページかどうかを指定します。
     *
     * `true` の場合、現在のページとして強調表示されます。
     *
     * @default false
     */
    selected?: boolean | undefined;
  };

  export type BaseUI = Pick<
    Button.ButtonRootProps.BaseUI,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PaginationItemProps:
      keyof Button.ButtonRootProps.BaseUI,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<Button.ButtonRootProps.HTML, keyof Render | keyof SuruUI | keyof BaseUI>;
}

/**
 * {@link PaginationItem} に渡す props です。
 */
export type PaginationItemProps = PaginationItemProps.Render &
  PaginationItemProps.SuruUI &
  PaginationItemProps.BaseUI &
  PaginationItemProps.HTML;

export type IPaginationItem = IComponent<PaginationItemProps>;

/**
 * ページ番号のボタンコンポーネントです。
 *
 * 子要素を指定しない場合、{@link PaginationItemProps.page|page} をラベルとして表示します。現在のページは `aria-current="page"` で示します。大きさ・角丸は {@link PaginationRoot} から引き継ぎ、選択中は配色も引き継ぎます。
 */
export const PaginationItem: IPaginationItem = function SuiPaginationItem(props) {
  const ctx = usePaginationContext();
  const {
    page,
    style,
    render,
    onClick,
    children = page,
    disabled = false,
    selected = false,
    className,
    ...otherProps
  } = props;
  const isDisabled = ctx.disabled || disabled;
  const handleClick: NonNullable<Button.ButtonRootProps["onClick"]> = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented && !isDisabled) {
      ctx.goToPage(page, { event, reason: "item" });
    }
  };

  return (
    <Button.Root
      {...otherProps}
      {...proxyRenderProps<Button.Root.State, PaginationItemState>(
        (state) => ({ ...ctx, ...state, selected }),
        {
          style,
          render,
          className: cn<PaginationItemState>(
            className,
            "sui_pagination_item",
            (state) => state.selected && "sui_pagination_item-selected",
            (state) => `sui_pagination_item-size_${state.size}`,
            (state) => `sui_pagination_item-color_${state.color}`,
            (state) => `sui_pagination_item-radius_${state.radius}`,
            (state) => state.disabled && "sui_pagination_item-disabled",
          ),
        },
      )}
      size={ctx.size}
      color={selected ? ctx.color : "grey"}
      radius={ctx.radius}
      onClick={handleClick}
      squared
      variant={selected ? "solid" : "naked"}
      disabled={isDisabled}
      aria-current={selected ? "page" : undefined}
    >
      {children}
    </Button.Root>
  );
};

export { PaginationItem as Item };

export namespace Item {
  export type State = PaginationItemState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PaginationItemProps.Render;

    export type SuruUI = PaginationItemProps.SuruUI;

    export type BaseUI = PaginationItemProps.BaseUI;

    export type HTML = PaginationItemProps.HTML;
  }
}
