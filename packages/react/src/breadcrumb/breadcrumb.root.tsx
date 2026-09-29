import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { BreadcrumbContext } from "./breadcrumb.context.js";
import type { BreadcrumbLinkProps } from "./breadcrumb.link.jsx";

/**
 * パンくずリストの配色です。
 */
export type BreadcrumbRootColor = Color;

/**
 * {@link BreadcrumbRoot} の各項目です。
 *
 * `label` を表示内容として扱い、その他のプロパティーは {@link BreadcrumbLink} に渡されます。
 */
export type BreadcrumbRootItemObject = Override<
  Omit<BreadcrumbLinkProps, "children">,
  {
    /**
     * 項目の表示内容です。
     */
    readonly label: React.ReactNode;
  }
>;

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

  export type SuruUI<TItem = any> = {
    /**
     * パンくずリストの配色を指定します。
     *
     * 配色は現在のページのリンクに適用されます。
     *
     * @default "grey"
     */
    color?: BreadcrumbRootColor | undefined;

    /**
     * パンくずリストの項目です。
     *
     * `children` を省略した {@link BreadcrumbList} は、この項目を順に並べて表示します。
     */
    items?: readonly TItem[] | undefined;

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
 *
 * @template TItem 項目の型です。
 */
export type BreadcrumbRootProps<TItem = any> = BreadcrumbRootProps.Render &
  BreadcrumbRootProps.SuruUI<TItem> &
  BreadcrumbRootProps.BaseUI &
  BreadcrumbRootProps.HTML;

export interface IBreadcrumbRoot extends IComponent<BreadcrumbRootProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: BreadcrumbRootProps<TItem>): IComponent.Return;
}

/**
 * パンくずリストのルート要素です。
 *
 * 大きさと配色を子パーツへ伝播し、`items` を {@link BreadcrumbList} の既定の並びで表示するためのデータ源になります。
 */
export const BreadcrumbRoot: IBreadcrumbRoot = function SuiBreadcrumbRoot(
  props: BreadcrumbRootProps,
) {
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

  export type Props<TItem = any> = Props.Render & Props.SuruUI<TItem> & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = BreadcrumbRootProps.Render;

    export type SuruUI<TItem = any> = BreadcrumbRootProps.SuruUI<TItem>;

    export type BaseUI = BreadcrumbRootProps.BaseUI;

    export type HTML = BreadcrumbRootProps.HTML;
  }

  export type Color = BreadcrumbRootColor;

  export type ItemObject = BreadcrumbRootItemObject;

  export type Size = BreadcrumbRootSize;
}
