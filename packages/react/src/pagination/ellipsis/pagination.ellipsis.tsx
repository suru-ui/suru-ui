import * as React from "react";

import { MoreIcon } from "../../_icons.jsx";
import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import * as Button from "../../button/button.parts.js";
import cn from "../../cn.js";
import { useComboboxAPI } from "../../combobox/combobox.jsx";
import {
  ComboboxItem,
  ComboboxList,
  ComboboxRoot,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxStatus,
  ComboboxTrigger,
  ComboboxInputGroup,
  ComboboxPositioner,
} from "../../combobox/combobox.parts.js";
import {
  ScrollAreaRoot,
  ScrollAreaThumb,
  ScrollAreaCorner,
  ScrollAreaContent,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
} from "../../scroll-area/scroll-area.parts.js";
import type { IComponent } from "../../types.js";
import { usePaginationContext } from "../root/pagination.root.context.js";
import { PaginationEllipsisContext } from "./pagination.ellipsis.context.js";

/**
 * {@link PaginationEllipsis} が持つ状態です。
 */
export type PaginationEllipsisState = PaginationEllipsisContext;

export namespace PaginationEllipsisProps {
  export type Render = RenderProps<PaginationEllipsisState>;

  export type SuruUI = {
    /**
     * 飛び先のページ範囲の終了ページを指定します。
     *
     * 省略した場合は開始ページと同じ値が使われます。開始ページより小さい値を指定した場合は入れ替えて扱います。
     */
    end?: number | undefined;

    /**
     * 飛び先のページ範囲の開始ページを指定します。
     *
     * 終了ページより大きい値を指定した場合は入れ替えて扱います。
     *
     * @default 2
     */
    start?: number | undefined;
  };

  export type BaseUI = Omit<
    Pick<
      Button.ButtonRootProps.BaseUI,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // PaginationEllipsisProps より:
      keyof Button.ButtonRootProps.BaseUI
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    Button.ButtonRootProps.HTML,
    keyof Render | keyof SuruUI | keyof BaseUI | "children"
  >;
}

/**
 * {@link PaginationEllipsis} に渡す props です。
 */
export type PaginationEllipsisProps = PaginationEllipsisProps.Render &
  PaginationEllipsisProps.SuruUI &
  PaginationEllipsisProps.BaseUI &
  PaginationEllipsisProps.HTML;

export type IPaginationEllipsis = IComponent<PaginationEllipsisProps>;

/**
 * 飛ばされたページ範囲を表す省略記号コンポーネントです。
 *
 * 押下するとポップアップが開き、入力欄でページを絞り込み、選択肢から移動先のページを選べます。大きさ・角丸は {@link PaginationRoot} から引き継ぎます。
 */
export const PaginationEllipsis: IPaginationEllipsis = function SuiPaginationEllipsis(props) {
  const ctx = usePaginationContext();
  const {
    end,
    start = 2,
    style,
    render,
    onClick,
    disabled = false,
    className,
    "aria-label": ariaLabel,
    ...otherButtonProps
  } = props;
  const resolvedStart = Math.min(
    Math.max(1, Math.trunc(start)),
    Math.max(1, Math.trunc(end ?? start)),
  );
  const resolvedEnd = Math.max(
    Math.max(1, Math.trunc(start)),
    Math.max(1, Math.trunc(end ?? start)),
  );
  const label = ariaLabel ?? `${resolvedStart}〜${resolvedEnd}ページへ移動`;
  const isDisabled = ctx.disabled || disabled;
  const items = React.useMemo(
    () =>
      Array.from(
        { length: resolvedEnd - resolvedStart + 1 },
        (_, index): number => resolvedStart + index,
      ),
    [resolvedEnd, resolvedStart],
  );
  const api = useComboboxAPI<number>({
    size: ctx.size,
    color: "grey",
    items,
    radius: ctx.radius,
    disabled: isDisabled,
    slotProps: {
      list: {
        children: (page) => (
          <ComboboxItem
            key={page}
            value={page}
            onClick={(event) => {
              ctx.goToPage(page, { event, reason: "ellipsis" });
            }}
          >
            {page}
          </ComboboxItem>
        ),
      },
      input: {
        "aria-label": "ページを検索",
      },
      popup: {
        style: {
          minWidth: "min(14rem, var(--available-width))",
        },
      },
    },
    placeholder: "ページを検索",
    inputInPopup: true,
    itemToStringLabel: (page) => String(page),
  });

  return (
    <ComboboxRoot {...api.getRootProps()}>
      <ComboboxTrigger
        {...api.getTriggerProps()}
        onClick={onClick}
        disabled={isDisabled}
        nativeButton
        aria-label={label}
      >
        {(htmlProps) => (
          <Button.Root
            {...htmlProps}
            {...otherButtonProps}
            {...proxyRenderProps<Button.Root.State, PaginationEllipsisState>(
              (buttonState) => ({ ...ctx, ...buttonState }),
              {
                style,
                render: (buttonProps, state) => (
                  <PaginationEllipsisContext value={state}>
                    <RenderElement
                      state={state}
                      render={render}
                      htmlProps={buttonProps}
                      defaultTagName="button"
                    />
                  </PaginationEllipsisContext>
                ),
                className: (state) =>
                  cn(
                    htmlProps.className,
                    typeof className === "function" ? className(state) : className,
                    "sui_pagination_ellipsis",
                    `sui_pagination_ellipsis-size_${state.size}`,
                    `sui_pagination_ellipsis-radius_${state.radius}`,
                    state.disabled && "sui_pagination_ellipsis-disabled",
                  ),
              },
            )}
            size={ctx.size}
            color="grey"
            radius={ctx.radius}
            squared
            variant="naked"
            disabled={isDisabled}
          >
            <MoreIcon />
          </Button.Root>
        )}
      </ComboboxTrigger>
      <ComboboxPortal {...api.getPortalProps()}>
        <ComboboxPositioner {...api.getPositionerProps()}>
          <ComboboxPopup {...api.getPopupProps()}>
            <ComboboxInputGroup {...api.getInputGroupInPopupProps()}>
              <ComboboxInput {...api.getInputProps()} />
            </ComboboxInputGroup>
            <ScrollAreaRoot {...api.getScrollAreaProps()}>
              <ScrollAreaViewport {...api.getViewportProps()}>
                <ScrollAreaContent {...api.getContentProps()}>
                  <ComboboxStatus {...api.getStatusProps()} />
                  <ComboboxEmpty {...api.getEmptyProps()} />
                  <ComboboxList {...api.getListProps()} />
                </ScrollAreaContent>
              </ScrollAreaViewport>
              <ScrollAreaScrollbar {...api.getScrollbarProps()}>
                <ScrollAreaThumb {...api.getThumbProps()} />
              </ScrollAreaScrollbar>
              <ScrollAreaCorner {...api.getCornerProps()} />
            </ScrollAreaRoot>
          </ComboboxPopup>
        </ComboboxPositioner>
      </ComboboxPortal>
    </ComboboxRoot>
  );
};

export { PaginationEllipsis as Ellipsis };

export namespace Ellipsis {
  export type State = PaginationEllipsisState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PaginationEllipsisProps.Render;

    export type SuruUI = PaginationEllipsisProps.SuruUI;

    export type BaseUI = PaginationEllipsisProps.BaseUI;

    export type HTML = PaginationEllipsisProps.HTML;
  }
}
