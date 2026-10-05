import * as React from "react";

import { ChevronLeftIcon } from "../../_icons.jsx";
import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import * as Button from "../../button/button.parts.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { type PaginationContext, usePaginationContext } from "../root/pagination.root.context.js";
import { PaginationPreviousButtonContext } from "./pagination.previous-button.context.js";

/**
 * {@link PaginationPreviousButton} が持つ状態です。
 */
export type PaginationPreviousButtonState = Override<PaginationContext, Button.Root.State>;

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
 * 最初のページでは無効になります。大きさ・配色・角丸は {@link PaginationRoot} から引き継ぎます。
 */
export const PaginationPreviousButton: IPaginationPreviousButton =
  function SuiPaginationPreviousButton(props) {
    const ctx = usePaginationContext();
    const {
      style,
      render,
      onClick,
      disabled = false,
      className,
      "aria-label": ariaLabel = "前のページへ",
      ...otherProps
    } = props;
    const isDisabled = disabled || ctx.disabled || ctx.page <= 1;
    const handleClick: NonNullable<Button.ButtonRootProps["onClick"]> = (event) => {
      onClick?.(event);
      if (!event.defaultPrevented && !isDisabled) {
        ctx.goToPage(ctx.page - 1, { event, reason: "previous" });
      }
    };

    return (
      <Button.Root
        {...otherProps}
        {...proxyRenderProps<Button.Root.State, PaginationPreviousButtonState>(
          (state) => ({ ...ctx, ...state }),
          {
            style,
            render: (htmlProps, state) => (
              <PaginationPreviousButtonContext value={state}>
                <RenderElement
                  state={state}
                  render={render}
                  htmlProps={htmlProps}
                  defaultTagName="button"
                />
              </PaginationPreviousButtonContext>
            ),
            className: cn<PaginationPreviousButtonState>(
              className,
              "sui_pagination_previous",
              (state) => `sui_pagination_previous-size_${state.size}`,
              (state) => `sui_pagination_previous-color_${state.color}`,
              (state) => `sui_pagination_previous-radius_${state.radius}`,
              (state) => state.disabled && "sui_pagination_previous-disabled",
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
