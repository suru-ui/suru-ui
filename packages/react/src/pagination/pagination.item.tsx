import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import * as Button from "../button/button.parts.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { usePaginationContext } from "./pagination.context.js";

/**
 * {@link PaginationItem} が持つ状態です。
 */
export type PaginationItemState = {};

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
    Button.ButtonRootProps,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PaginationItemProps: context が制御するため除きます。
      keyof Button.ButtonRootProps,
      keyof Render | keyof SuruUI | "color" | "radius" | "size" | "squared" | "variant"
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<"button">,
    keyof Render | keyof SuruUI | keyof Omit<Button.ButtonRootProps, "color" | "variant">
  >;
}

/**
 * {@link PaginationItem} に渡す props です。
 */
export type PaginationItemProps = PaginationItemProps.Render &
  PaginationItemProps.SuruUI &
  PaginationItemProps.BaseUI &
  PaginationItemProps.HTML;

/**
 * ページ番号のボタンコンポーネントです。
 *
 * 子要素を指定しない場合、{@link PaginationItemProps.page|page} をラベルとして表示します。現在のページは `aria-current="page"` で示します。
 */
export const PaginationItem: IComponent<PaginationItemProps> = function SuiPaginationItem(props) {
  const ctx = usePaginationContext(true);
  const {
    page,
    onClick,
    children = page,
    disabled = false,
    selected = false,
    className,
    ...otherProps
  } = props;
  const isDisabled = ctx?.disabled || disabled;
  const handleClick: NonNullable<Button.ButtonRootProps["onClick"]> = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented && !isDisabled && ctx !== null) {
      ctx.goToPage(page, { event, reason: "item" });
    }
  };

  return (
    <Button.Root
      {...otherProps}
      size={ctx?.size ?? "md"}
      color={selected ? (ctx?.color ?? "grey") : "grey"}
      radius={ctx?.radius}
      onClick={handleClick}
      squared
      variant={selected ? "solid" : "naked"}
      disabled={isDisabled}
      className={cn(className, "sui_pagination_item", selected && "sui_pagination_item-selected")}
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
