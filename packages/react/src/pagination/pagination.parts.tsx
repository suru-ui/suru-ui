import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import { MoreIcon, ChevronLeftIcon, ChevronRightIcon } from "../_icons.jsx";
import useRender, { type RenderProps } from "../_use-render.js";
import { type ButtonRootProps, ButtonRoot } from "../button/button.parts.jsx";
import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import type { IComponent, IUseContext } from "../types.js";

import "./pagination.css";

// Context
// -------

/**
 * {@link PaginationRoot} のページが変更された理由です。
 *
 * - `"item"`: ページ番号ボタンの押下
 * - `"ellipsis"`: 省略記号からのページ指定
 * - `"previous"`: 前へボタンの押下
 * - `"next"`: 次へボタンの押下
 */
export type PaginationRootChangeEventReason = "ellipsis" | "item" | "next" | "previous";

/**
 * {@link PaginationRoot} のページが変更されたイベントの詳細です。
 */
export type PaginationRootChangeEventDetails = {
  /**
   * きっかけとなったイベントです。
   */
  readonly event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;

  /**
   * ページが変更された理由です。
   */
  readonly reason: PaginationRootChangeEventReason;
};

/**
 * 指定したページへ移動する関数です。
 *
 * @param page 移動先のページ番号です。
 * @param details ページが変更されたイベントの詳細です。
 */
export type PaginationGoToPage = (page: number, details: PaginationRootChangeEventDetails) => void;

/**
 * ページネーションの配色です。
 */
export type PaginationContextColor = Color;

/**
 * ページネーションの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type PaginationContextRadius = "none" | Size | "full";

/**
 * ページネーションの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type PaginationContextSize = Size;

/**
 * {@link PaginationRoot} が子パーツへ提供するコンテキストです。
 */
export type PaginationContext = {
  /**
   * ページネーションの配色です。
   */
  readonly color: PaginationContextColor;

  /**
   * ページネーションが無効かどうかです。
   */
  readonly disabled: boolean;

  /**
   * 指定したページへ移動する関数です。
   */
  readonly goToPage: PaginationGoToPage;

  /**
   * 現在のページです。
   */
  readonly page: number;

  /**
   * ページネーションの角丸です。
   */
  readonly radius: PaginationContextRadius;

  /**
   * ページネーションの大きさです。
   */
  readonly size: PaginationContextSize;

  /**
   * 総ページ数です。
   */
  readonly totalPages: number;
};

/**
 * {@link PaginationRoot} が子パーツへ提供するコンテキストです。
 */
export const PaginationContext: React.Context<PaginationContext | null> =
  React.createContext<PaginationContext | null>(null);

function useSuiPaginationContext(optional?: false): PaginationContext;
function useSuiPaginationContext(optional?: boolean): PaginationContext | null;
function useSuiPaginationContext(optional?: boolean): PaginationContext | null {
  const ctx = React.use(PaginationContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "PaginationContext",
      providerName: "PaginationRoot",
    });
  }

  return ctx;
}

/**
 * {@link PaginationContext} を読み取るフックです。
 */
export const usePaginationContext: IUseContext<PaginationContext> = useSuiPaginationContext;

export { PaginationContext as Context, usePaginationContext as useContext };

export namespace Context {
  /**
   * {@link PaginationContextColor}
   */
  export type Color = PaginationContextColor;

  /**
   * {@link PaginationContextRadius}
   */
  export type Radius = PaginationContextRadius;

  /**
   * {@link PaginationContextSize}
   */
  export type Size = PaginationContextSize;
}

// Root
// ----

/**
 * ページネーションの配色です。
 */
export type PaginationRootColor = Color;

/**
 * ページネーションの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type PaginationRootRadius = "none" | Size | "full";

/**
 * ページネーションの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type PaginationRootSize = Size;

/**
 * {@link PaginationRoot} が持つ状態です。
 */
export type PaginationRootState = {};

/**
 * {@link PaginationRoot} に渡す props です。
 */
export type PaginationRootProps = Omit<React.ComponentProps<"nav">, keyof RenderProps> &
  RenderProps<PaginationRootState> & {
    /**
     * ページネーションの配色を指定します。
     *
     * 配色は現在のページのボタンに適用されます。
     *
     * @default "grey"
     */
    color?: PaginationRootColor | undefined;

    /**
     * 初期表示のページを指定します。
     *
     * `page` を指定しない場合にのみ使われます。
     *
     * @default 1
     */
    defaultPage?: number | undefined;

    /**
     * ページネーションを無効にするかどうかを指定します。
     *
     * @default false
     */
    disabled?: boolean | undefined;

    /**
     * ページが変更されたときに呼び出されるコールバックです。
     *
     * @param page 移動先のページ番号です。
     * @param details ページが変更されたイベントの詳細です。
     */
    onPageChange?: ((page: number, details: PaginationRootChangeEventDetails) => void) | undefined;

    /**
     * 現在のページを指定します。
     *
     * 指定しない場合、{@link PaginationRootProps.defaultPage|defaultPage} から内部状態で管理します。
     */
    page?: number | undefined;

    /**
     * ページネーションの角丸を指定します。
     *
     * 既定値は {@link PaginationRootProps.size|size} です。
     */
    radius?: PaginationRootRadius | undefined;

    /**
     * ページネーションの大きさを指定します。
     *
     * @default "md"
     */
    size?: PaginationRootSize | undefined;

    /**
     * 総ページ数を指定します。
     */
    totalPages: number;
  };

/**
 * ページネーションのルートコンポーネントです。
 *
 * 現在のページを内部状態で管理し、子パーツへ配色や大きさとともに提供します。前後の移動ボタンやページ番号ボタンは利用者が組み立てます。一括で組み立てる場合は {@link Pagination} を使います。
 */
export const PaginationRoot: IComponent<PaginationRootProps> = function SuiPaginationRoot(props) {
  const {
    page: pageProp,
    size = "md",
    color = "grey",
    radius = size,
    disabled = false,
    totalPages,
    defaultPage = 1,
    onPageChange,
    "aria-label": ariaLabel = "ページネーション",
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherNavProps
  } = props;
  const maxPage = Math.max(totalPages, 1);
  const [innerPage, setInnerPage] = React.useState(() =>
    Math.min(Math.max(Math.trunc(defaultPage), 1), maxPage),
  );
  const page = Math.min(Math.max(pageProp ?? innerPage, 1), maxPage);
  const goToPage = React.useCallback<PaginationGoToPage>(
    (nextPage, details) => {
      if (disabled || totalPages < 1) {
        return;
      }

      const target = Math.min(Math.max(Math.trunc(nextPage), 1), maxPage);
      if (target === page) {
        return;
      }

      if (pageProp === undefined) {
        setInnerPage(target);
      }

      onPageChange?.(target, details);
    },
    [disabled, maxPage, onPageChange, page, pageProp, totalPages],
  );
  const ctx = React.useMemo<PaginationContext>(
    () => ({ color, disabled, goToPage, page, radius, size, totalPages }),
    [color, disabled, goToPage, page, radius, size, totalPages],
  );
  const element = useRender({
    defaultTagName: "nav",
    props: [
      otherNavProps,
      {
        "aria-label": ariaLabel,
        className: cn<PaginationRootState>(
          "sui_pagination",
          `sui_pagination-size_${size}`,
          `sui_pagination-radius_${radius}`,
          `sui_pagination-color_${color}`,
          disabled && "sui_pagination-disabled",
        ),
        "data-scope": dataScope,
      },
    ],
  });

  return <PaginationContext value={ctx}>{element}</PaginationContext>;
};

export { PaginationRoot as Root };

export namespace Root {
  /**
   * {@link PaginationRootState}
   */
  export type State = PaginationRootState;

  /**
   * {@link PaginationRootProps}
   */
  export type Props = PaginationRootProps;

  /**
   * {@link PaginationRootChangeEventDetails}
   */
  export type ChangeEventDetails = PaginationRootChangeEventDetails;

  /**
   * {@link PaginationRootChangeEventReason}
   */
  export type ChangeEventReason = PaginationRootChangeEventReason;

  /**
   * {@link PaginationRootColor}
   */
  export type Color = PaginationRootColor;

  /**
   * {@link PaginationRootRadius}
   */
  export type Radius = PaginationRootRadius;

  /**
   * {@link PaginationRootSize}
   */
  export type Size = PaginationRootSize;
}

// PreviousButton
// --------------

/**
 * {@link PaginationPreviousButton} が持つ状態です。
 */
export type PaginationPreviousButtonState = {};

/**
 * {@link PaginationPreviousButton} に渡す props です。
 */
export type PaginationPreviousButtonProps = Omit<ButtonRootProps, "children">;

/**
 * 前のページへ移動するボタンコンポーネントです。
 *
 * 最初のページでは無効になります。
 */
export const PaginationPreviousButton: IComponent<PaginationPreviousButtonProps> =
  function SuiPaginationPreviousButton(props) {
    const ctx = usePaginationContext(true);
    const {
      onClick,
      disabled = false,
      className,
      "aria-label": ariaLabel = "前のページへ",
      ...otherProps
    } = props;
    const isDisabled = ctx?.disabled || disabled || (ctx?.page ?? 1) <= 1;
    const handleClick: NonNullable<ButtonRootProps["onClick"]> = (event) => {
      onClick?.(event);
      if (!event.defaultPrevented && !isDisabled && ctx !== null) {
        ctx.goToPage(ctx.page - 1, { reason: "previous", event });
      }
    };

    return (
      <ButtonRoot
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
      </ButtonRoot>
    );
  };

export { PaginationPreviousButton as PreviousButton };

export namespace PreviousButton {
  /**
   * {@link PaginationPreviousButtonState}
   */
  export type State = PaginationPreviousButtonState;

  /**
   * {@link PaginationPreviousButtonProps}
   */
  export type Props = PaginationPreviousButtonProps;
}

// NextButton
// ----------

/**
 * {@link PaginationNextButton} が持つ状態です。
 */
export type PaginationNextButtonState = {};

/**
 * {@link PaginationNextButton} に渡す props です。
 */
export type PaginationNextButtonProps = Omit<ButtonRootProps, "children">;

/**
 * 次のページへ移動するボタンコンポーネントです。
 *
 * 最後のページでは無効になります。
 */
export const PaginationNextButton: IComponent<PaginationNextButtonProps> =
  function SuiPaginationNextButton(props) {
    const ctx = usePaginationContext(true);
    const {
      onClick,
      disabled = false,
      className,
      "aria-label": ariaLabel = "次のページへ",
      ...otherProps
    } = props;
    const isDisabled =
      ctx?.disabled ||
      disabled ||
      (ctx?.page ?? 1) >= (ctx?.totalPages ?? Number.POSITIVE_INFINITY);
    const handleClick: NonNullable<ButtonRootProps["onClick"]> = (event) => {
      onClick?.(event);
      if (!event.defaultPrevented && !isDisabled && ctx !== null) {
        ctx.goToPage(ctx.page + 1, { reason: "next", event });
      }
    };

    return (
      <ButtonRoot
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
      </ButtonRoot>
    );
  };

export { PaginationNextButton as NextButton };

export namespace NextButton {
  /**
   * {@link PaginationNextButtonState}
   */
  export type State = PaginationNextButtonState;

  /**
   * {@link PaginationNextButtonProps}
   */
  export type Props = PaginationNextButtonProps;
}

// Item
// ----

/**
 * {@link PaginationItem} が持つ状態です。
 */
export type PaginationItemState = {};

/**
 * {@link PaginationItem} に渡す props です。
 */
export type PaginationItemProps = Omit<ButtonRootProps, "color" | "variant"> & {
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
  const handleClick: NonNullable<ButtonRootProps["onClick"]> = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented && !isDisabled && ctx !== null) {
      ctx.goToPage(page, { reason: "item", event });
    }
  };

  return (
    <ButtonRoot
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
    </ButtonRoot>
  );
};

export { PaginationItem as Item };

export namespace Item {
  /**
   * {@link PaginationItemState}
   */
  export type State = PaginationItemState;

  /**
   * {@link PaginationItemProps}
   */
  export type Props = PaginationItemProps;
}

// Ellipsis
// --------

/**
 * {@link PaginationEllipsis} が持つ状態です。
 */
export type PaginationEllipsisState = {};

/**
 * {@link PaginationEllipsis} に渡す props です。
 */
export type PaginationEllipsisProps = Omit<ButtonRootProps, "children"> & {
  /**
   * 飛び先のページ範囲の終了ページを指定します。
   */
  end?: number | undefined;

  /**
   * 飛び先のページ範囲の開始ページを指定します。
   */
  start?: number | undefined;
};

/**
 * 飛ばされたページ範囲を表す省略記号コンポーネントです。
 *
 * 押下すると入力欄が表示され、範囲内のページ番号を入力してそのページへ移動できます。`Enter` で決定、`Escape` で取り消します。
 */
export const PaginationEllipsis: IComponent<PaginationEllipsisProps> =
  function SuiPaginationEllipsis(props) {
    const ctx = usePaginationContext(true);
    const {
      start = 2,
      end = start,
      onClick,
      disabled = false,
      className,
      "aria-label": ariaLabel,
      ...otherButtonProps
    } = props;
    const label = ariaLabel ?? `${start}〜${end}ページへ移動`;
    const [editing, setEditing] = React.useState(false);
    const inputElement = useRender<HTMLInputElement, {}, boolean>({
      defaultTagName: "input",
      enabled: editing,
      props: {
        "aria-label": label,
        autoFocus: true,
        className: "sui_pagination_ellipsis_input",
        defaultValue: "",
        inputMode: "numeric",
        pattern: "[0-9]*",
        placeholder: String(start),
        type: "text",
        onBlur() {
          setEditing(false);
        },
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

          ctx?.goToPage(Math.min(Math.max(value, start), end), {
            reason: "ellipsis",
            event,
          });
        },
      },
    });

    if (editing) {
      return inputElement;
    }

    const isDisabled = ctx?.disabled || disabled;
    const handleClick: NonNullable<ButtonRootProps["onClick"]> = (event) => {
      onClick?.(event);
      if (!event.defaultPrevented && !isDisabled) {
        setEditing(true);
      }
    };

    return (
      <ButtonRoot
        {...otherButtonProps}
        size={ctx?.size ?? "md"}
        color="grey"
        radius={ctx?.radius}
        onClick={handleClick}
        squared
        variant="naked"
        disabled={isDisabled}
        className={cn(className, "sui_pagination_ellipsis")}
        aria-label={label}
      >
        <MoreIcon />
      </ButtonRoot>
    );
  };

export { PaginationEllipsis as Ellipsis };

export namespace Ellipsis {
  /**
   * {@link PaginationEllipsisState}
   */
  export type State = PaginationEllipsisState;

  /**
   * {@link PaginationEllipsisProps}
   */
  export type Props = PaginationEllipsisProps;
}
