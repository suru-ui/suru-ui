import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import {
  type PaginationGoToPage,
  type PaginationRootChangeEventReason,
  type PaginationRootChangeEventDetails,
  PaginationContext,
} from "./pagination.context.js";

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
     * 総ページ数を指定します。
     */
    totalPages: number;

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
