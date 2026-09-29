import * as React from "react";

import { ChevronRightIcon } from "../_icons.jsx";
import type { RenderProps } from "../_use-render.js";
import * as Button from "../button/button.parts.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { usePaginationContext } from "./pagination.context.js";

/**
 * {@link PaginationNextButton} が持つ状態です。
 */
export type PaginationNextButtonState = {};

export namespace PaginationNextButtonProps {
  export type Render = RenderProps<PaginationNextButtonState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    Button.ButtonRootProps.BaseUI,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PaginationNextButtonProps:
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
 * {@link PaginationNextButton} に渡す props です。
 */
export type PaginationNextButtonProps = PaginationNextButtonProps.Render &
  PaginationNextButtonProps.SuruUI &
  PaginationNextButtonProps.BaseUI &
  PaginationNextButtonProps.HTML;

export type IPaginationNextButton = IComponent<PaginationNextButtonProps>;

/**
 * 次のページへ移動するボタンコンポーネントです。
 *
 * 最後のページでは無効になります。
 */
export const PaginationNextButton: IPaginationNextButton = function SuiPaginationNextButton(props) {
  const ctx = usePaginationContext(true);
  const {
    onClick,
    disabled = false,
    className,
    "aria-label": ariaLabel = "次のページへ",
    ...otherProps
  } = props;
  const isDisabled = disabled || (ctx !== null && (ctx.disabled || ctx.page >= ctx.totalPages));
  const handleClick: NonNullable<Button.ButtonRootProps["onClick"]> = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented && !isDisabled && ctx !== null) {
      ctx.goToPage(ctx.page + 1, { event, reason: "next" });
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
      className={cn(className, "sui_pagination_next")}
      aria-label={ariaLabel}
    >
      <ChevronRightIcon />
    </Button.Root>
  );
};

export { PaginationNextButton as NextButton };

export namespace NextButton {
  export type State = PaginationNextButtonState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PaginationNextButtonProps.Render;

    export type SuruUI = PaginationNextButtonProps.SuruUI;

    export type BaseUI = PaginationNextButtonProps.BaseUI;

    export type HTML = PaginationNextButtonProps.HTML;
  }
}
