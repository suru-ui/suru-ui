import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import { MoreIcon, ChevronLeftIcon, ChevronRightIcon } from "../_icons.jsx";
import useRender, { type RenderProps } from "../_use-render.js";
import * as Button from "../button/button.parts.jsx";
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
  export type Color = PaginationContextColor;

  export type Radius = PaginationContextRadius;

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

export namespace PaginationRootProps {
  export type Render = RenderProps<PaginationRootState>;

  export type SuruUI = {
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

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"nav", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link PaginationRoot} に渡す props です。
 */
export type PaginationRootProps = PaginationRootProps.Render &
  PaginationRootProps.SuruUI &
  PaginationRootProps.BaseUI &
  PaginationRootProps.HTML;

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
    () => ({ page, size, color, radius, disabled, goToPage, totalPages }),
    [color, disabled, goToPage, page, radius, size, totalPages],
  );
  const element = useRender({
    props: [
      otherNavProps,
      {
        className: cn<PaginationRootState>(
          "sui_pagination",
          `sui_pagination-size_${size}`,
          `sui_pagination-radius_${radius}`,
          `sui_pagination-color_${color}`,
          disabled && "sui_pagination-disabled",
        ),
        "aria-label": ariaLabel,
        "data-scope": dataScope,
      },
    ],
    defaultTagName: "nav",
  });

  return <PaginationContext value={ctx}>{element}</PaginationContext>;
};

export { PaginationRoot as Root };

export namespace Root {
  export type State = PaginationRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PaginationRootProps.Render;

    export type SuruUI = PaginationRootProps.SuruUI;

    export type BaseUI = PaginationRootProps.BaseUI;

    export type HTML = PaginationRootProps.HTML;
  }

  export type ChangeEventDetails = PaginationRootChangeEventDetails;

  export type ChangeEventReason = PaginationRootChangeEventReason;

  export type Color = PaginationRootColor;

  export type Radius = PaginationRootRadius;

  export type Size = PaginationRootSize;
}

// PreviousButton
// --------------

/**
 * {@link PaginationPreviousButton} が持つ状態です。
 */
export type PaginationPreviousButtonState = {};

export namespace PaginationPreviousButtonProps {
  export type Render = RenderProps<PaginationPreviousButtonState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    Button.ButtonRootProps,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PaginationPreviousButtonProps: context が制御するため除きます。
      keyof Button.ButtonRootProps,
      keyof Render | keyof SuruUI | "children" | "color" | "radius" | "size" | "squared" | "variant"
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<"button">,
    keyof Render | keyof SuruUI | keyof Omit<Button.ButtonRootProps, "children"> | "children"
  >;
}

/**
 * {@link PaginationPreviousButton} に渡す props です。
 */
export type PaginationPreviousButtonProps = PaginationPreviousButtonProps.Render &
  PaginationPreviousButtonProps.SuruUI &
  PaginationPreviousButtonProps.BaseUI &
  PaginationPreviousButtonProps.HTML;

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

// NextButton
// ----------

/**
 * {@link PaginationNextButton} が持つ状態です。
 */
export type PaginationNextButtonState = {};

export namespace PaginationNextButtonProps {
  export type Render = RenderProps<PaginationNextButtonState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    Button.ButtonRootProps,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PaginationNextButtonProps: context が制御するため除きます。
      keyof Button.ButtonRootProps,
      keyof Render | keyof SuruUI | "children" | "color" | "radius" | "size" | "squared" | "variant"
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<"button">,
    keyof Render | keyof SuruUI | keyof Omit<Button.ButtonRootProps, "children"> | "children"
  >;
}

/**
 * {@link PaginationNextButton} に渡す props です。
 */
export type PaginationNextButtonProps = PaginationNextButtonProps.Render &
  PaginationNextButtonProps.SuruUI &
  PaginationNextButtonProps.BaseUI &
  PaginationNextButtonProps.HTML;

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

// Item
// ----

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

// Ellipsis
// --------

/**
 * {@link PaginationEllipsis} が持つ状態です。
 */
export type PaginationEllipsisState = {};

export namespace PaginationEllipsisProps {
  export type Render = RenderProps<PaginationEllipsisState>;

  export type SuruUI = {
    /**
     * 飛び先のページ範囲の終了ページを指定します。
     */
    end?: number | undefined;

    /**
     * 飛び先のページ範囲の開始ページを指定します。
     */
    start?: number | undefined;
  };

  export type BaseUI = Pick<
    Button.ButtonRootProps,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PaginationEllipsisProps: context が制御するため除きます。
      keyof Button.ButtonRootProps,
      keyof Render | keyof SuruUI | "children" | "color" | "radius" | "size" | "squared" | "variant"
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<"button">,
    keyof Render | keyof SuruUI | keyof Omit<Button.ButtonRootProps, "children"> | "children"
  >;
}

/**
 * {@link PaginationEllipsis} に渡す props です。
 */
export type PaginationEllipsisProps = PaginationEllipsisProps.Render &
  PaginationEllipsisProps.SuruUI &
  PaginationEllipsisProps.BaseUI &
  PaginationEllipsisProps.HTML;

/**
 * 飛ばされたページ範囲を表す省略記号コンポーネントです。
 *
 * 押下すると入力欄が表示され、範囲内のページ番号を入力してそのページへ移動できます。`Enter` で決定、`Escape` で取り消します。
 */
export const PaginationEllipsis: IComponent<PaginationEllipsisProps> =
  function SuiPaginationEllipsis(props) {
    const ctx = usePaginationContext(true);
    const {
      end,
      start = 2,
      onClick,
      disabled = false,
      className,
      "aria-label": ariaLabel,
      ...otherButtonProps
    } = props;
    const resolvedEnd = end ?? start;
    const label = ariaLabel ?? `${start}〜${resolvedEnd}ページへ移動`;
    const [editing, setEditing] = React.useState(false);
    const isDisabled = ctx?.disabled || disabled;
    const inputElement = useRender<HTMLInputElement, {}, boolean>({
      props: {
        type: "text",
        onBlur() {
          setEditing(false);
        },
        pattern: "[0-9]*",
        disabled: isDisabled,
        autoFocus: true,
        className: "sui_pagination_ellipsis_input",
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

          ctx?.goToPage(Math.min(Math.max(value, start), resolvedEnd), {
            event,
            reason: "ellipsis",
          });
        },
        placeholder: String(start),
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
