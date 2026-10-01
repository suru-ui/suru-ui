import * as React from "react";

import { ChevronRightIcon } from "../_icons.jsx";
import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import * as Button from "../button/button.parts.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type PaginationContext, usePaginationContext } from "./pagination.context.js";

/**
 * {@link PaginationNextButton} が持つ状態です。
 */
export type PaginationNextButtonState = Override<PaginationContext, Button.Root.State>;

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
 * 最後のページでは無効になります。大きさ・配色・角丸は {@link PaginationRoot} から引き継ぎます。
 */
export const PaginationNextButton: IPaginationNextButton = function SuiPaginationNextButton(props) {
  const ctx = usePaginationContext();
  const {
    style,
    render,
    onClick,
    disabled = false,
    className,
    "aria-label": ariaLabel = "次のページへ",
    ...otherProps
  } = props;
  const isDisabled = disabled || ctx.disabled || ctx.page >= ctx.totalPages;
  const handleClick: NonNullable<Button.ButtonRootProps["onClick"]> = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented && !isDisabled) {
      ctx.goToPage(ctx.page + 1, { event, reason: "next" });
    }
  };

  return (
    <Button.Root
      {...otherProps}
      {...proxyRenderProps<Button.Root.State, PaginationNextButtonState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<PaginationNextButtonState>(
            className,
            "sui_pagination_next",
            (state) => `sui_pagination_next-size_${state.size}`,
            (state) => `sui_pagination_next-color_${state.color}`,
            (state) => `sui_pagination_next-radius_${state.radius}`,
            (state) => state.disabled && "sui_pagination_next-disabled",
          ),
        },
      )}
      size={ctx.size}
      color={ctx.color}
      radius={ctx.radius}
      onClick={handleClick}
      squared
      variant="naked"
      disabled={isDisabled}
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
