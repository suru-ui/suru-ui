import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { BreadcrumbContext } from "./breadcrumb.context.js";

/**
 * パンくずリストの配色です。
 */
export type BreadcrumbRootColor = Color;

/**
 * {@link BreadcrumbRoot} の各項目です。
 */
export type BreadcrumbRootItemObject = {
  /**
   * 項目のラベルです。
   */
  readonly label: React.ReactNode;

  /**
   * 現在のページかどうかを指定します。
   *
   * 最後の項目は、指定しない場合に現在位置として描画します。
   */
  readonly current?: boolean | undefined;

  /**
   * 項目を無効にするかどうかを指定します。
   *
   * `true` の場合、リンク先へ遷移できなくなります。
   *
   * @default false
   */
  readonly disabled?: boolean | undefined;

  /**
   * リンク先の URL です。
   *
   * 未指定の場合、リンクにならない要素として描画します。
   */
  readonly href?: string | undefined;
};

/**
 * パンくずリストの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type BreadcrumbRootSize = Size;

/**
 * {@link BreadcrumbRoot} が持つ状態です。
 */
export type BreadcrumbRootState = {};

export namespace BreadcrumbRootProps {
  export type Render = RenderProps<BreadcrumbRootState>;

  export type SuruUI = {
    /**
     * パンくずリストの配色を指定します。
     *
     * 配色はリンクに適用されます。
     *
     * @default "grey"
     */
    color?: BreadcrumbRootColor | undefined;

    /**
     * パンくずリストの項目です。
     */
    items?: readonly BreadcrumbRootItemObject[] | undefined;

    /**
     * パンくずリストの大きさを指定します。
     *
     * @default "md"
     */
    size?: BreadcrumbRootSize | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"nav", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link BreadcrumbRoot} に渡す props です。
 */
export type BreadcrumbRootProps = BreadcrumbRootProps.Render &
  BreadcrumbRootProps.SuruUI &
  BreadcrumbRootProps.BaseUI &
  BreadcrumbRootProps.HTML;

/**
 * パンくずリストのルートコンポーネントです。
 */
export const BreadcrumbRoot: IComponent<BreadcrumbRootProps> = function SuiBreadcrumbRoot(props) {
  const {
    size = "md",
    color = "grey",
    items = [],
    "aria-label": ariaLabel = "パンくずリスト",
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherNavProps
  } = props;
  const ctx = React.useMemo<BreadcrumbContext>(
    () => ({ size, color, items }),
    [size, color, items],
  );
  const element = useRender({
    props: [
      otherNavProps,
      {
        className: cn(
          "sui_breadcrumb",
          `sui_breadcrumb-size_${size}`,
          `sui_breadcrumb-color_${color}`,
        ),
        "aria-label": ariaLabel,
        "data-scope": dataScope,
      },
    ],
    defaultTagName: "nav",
  });

  return <BreadcrumbContext value={ctx}>{element}</BreadcrumbContext>;
};

export { BreadcrumbRoot as Root };

export namespace Root {
  export type State = BreadcrumbRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = BreadcrumbRootProps.Render;

    export type SuruUI = BreadcrumbRootProps.SuruUI;

    export type BaseUI = BreadcrumbRootProps.BaseUI;

    export type HTML = BreadcrumbRootProps.HTML;
  }

  export type Color = BreadcrumbRootColor;

  export type ItemObject = BreadcrumbRootItemObject;

  export type Size = BreadcrumbRootSize;
}
