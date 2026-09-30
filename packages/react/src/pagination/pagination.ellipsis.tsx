import * as React from "react";

import { MoreIcon } from "../_icons.jsx";
import proxyRenderProps from "../_proxy-render-props.js";
import useRender, { type RenderProps } from "../_use-render.js";
import * as Button from "../button/button.parts.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type PaginationContext, usePaginationContext } from "./pagination.context.js";

/**
 * {@link PaginationEllipsis} が持つ状態です。
 */
export type PaginationEllipsisState = Override<PaginationContext, Button.Root.State>;

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

  export type BaseUI = Pick<
    Button.ButtonRootProps.BaseUI,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PaginationEllipsisProps:
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
 * 押下すると入力欄が表示され、範囲内のページ番号を入力してそのページへ移動できます。`Enter` で決定、`Escape` で取り消します。大きさ・角丸は {@link PaginationRoot} から引き継ぎます。
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
  const [editing, setEditing] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const isDisabled = ctx.disabled || disabled;

  React.useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const inputElement = useRender<HTMLInputElement, {}, boolean>({
    props: {
      ref: inputRef,
      type: "text",
      onBlur() {
        setEditing(false);
      },
      pattern: "[0-9]*",
      disabled: isDisabled,
      className: cn(
        "sui_pagination_ellipsis_input",
        isDisabled && "sui_pagination_ellipsis_input-disabled",
      ),
      inputMode: "numeric",
      onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Escape") {
          setEditing(false);

          return;
        }

        if (event.key !== "Enter") {
          return;
        }

        const value = Number.parseInt(event.currentTarget.value, 10);
        setEditing(false);
        if (Number.isNaN(value)) {
          return;
        }

        ctx.goToPage(Math.min(Math.max(value, resolvedStart), resolvedEnd), {
          event,
          reason: "ellipsis",
        });
      },
      placeholder: String(resolvedStart),
      defaultValue: "",
      "aria-label": label,
    },
    enabled: editing,
    defaultTagName: "input",
  });

  if (editing) {
    return inputElement;
  }

  const handleClick: NonNullable<Button.ButtonRootProps["onClick"]> = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented && !isDisabled) {
      setEditing(true);
    }
  };

  return (
    <Button.Root
      {...otherButtonProps}
      {...proxyRenderProps<Button.Root.State, PaginationEllipsisState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn(className, "sui_pagination_ellipsis"),
        },
      )}
      size={ctx.size}
      color="grey"
      radius={ctx.radius}
      onClick={handleClick}
      squared
      variant="naked"
      disabled={isDisabled}
      aria-label={label}
    >
      <MoreIcon />
    </Button.Root>
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
