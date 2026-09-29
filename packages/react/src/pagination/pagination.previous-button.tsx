import * as React from "react";

import { ChevronLeftIcon } from "../_icons.jsx";
import type { RenderProps } from "../_use-render.js";
import * as Button from "../button/button.parts.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { usePaginationContext } from "./pagination.context.js";

/**
 * {@link PaginationPreviousButton} が持つ状態です。
 */
export type PaginationPreviousButtonState = {};

export namespace PaginationPreviousButtonProps {
  export type Render = RenderProps<PaginationPreviousButtonState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    Button.ButtonRootProps.BaseUI,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PaginationPreviousButtonProps:
      keyof Button.ButtonRootProps.BaseUI,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    Button.ButtonRootProps.HTML,
    keyof Render | keyof SuruUI | keyof BaseUI | "children"
  >;
}

/**
 * {@link PaginationPreviousButton} に渡す props です。
 */
export type PaginationPreviousButtonProps = PaginationPreviousButtonProps.Render &
  PaginationPreviousButtonProps.SuruUI &
  PaginationPreviousButtonProps.BaseUI &
  PaginationPreviousButtonProps.HTML;

export type IPaginationPreviousButton = IComponent<PaginationPreviousButtonProps>;

/**
 * 前のページへ移動するボタンコンポーネントです。
 *
 * 最初のページでは無効になります。
 */
export const PaginationPreviousButton: IPaginationPreviousButton =
  function SuiPaginationPreviousButton(props) {
    const ctx = usePaginationContext(true);
    const {
      onClick,
      disabled = false,
      className,
      "aria-label": ariaLabel = "前のページへ",
      ...otherProps
    } = props;
    const isDisabled = disabled || (ctx !== null && (ctx.disabled || ctx.page <= 1));
    const handleClick: NonNullable<Button.ButtonRootProps["onClick"]> = (event) => {
      onClick?.(event);
      if (!event.defaultPrevented && !isDisabled && ctx !== null) {
        ctx.goToPage(ctx.page - 1, { event, reason: "previous" });
      }
    };

    return (
      <Button.Root
        {...otherProps}
        size={ctx?.size ?? "md"}
        color={ctx?.color ?? "grey"}
        radius={ctx?.radius}
        onClick={handleClick}
        squared
        variant="naked"
        disabled={isDisabled}
        className={cn(className, "sui_pagination_previous")}
        aria-label={ariaLabel}
      >
        <ChevronLeftIcon />
      </Button.Root>
    );
  };

export { PaginationPreviousButton as PreviousButton };

export namespace PreviousButton {
  export type State = PaginationPreviousButtonState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PaginationPreviousButtonProps.Render;

    export type SuruUI = PaginationPreviousButtonProps.SuruUI;

    export type BaseUI = PaginationPreviousButtonProps.BaseUI;

    export type HTML = PaginationPreviousButtonProps.HTML;
  }
}
