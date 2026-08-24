import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import { ContextMissingError } from "../../errors.js";
import type { IComponent, IUseContext } from "../../types.js";

import "./breadcrumb.css";

// Context
// -------

/**
 * パンくずリストの色です。
 */
type BreadcrumbContextColor = Color;

/**
 * パンくずリストの大きさです。
 */
type BreadcrumbContextSize = Size;

/**
 * {@link BreadcrumbRoot} が子パーツへ提供するコンテキストです。
 */
export type BreadcrumbContext = {
  /**
   * パンくずリストの色です。
   *
   * 色はリンクに適用されます。
   */
  readonly color: BreadcrumbContextColor;

  /**
   * パンくずリストの大きさです。
   */
  readonly size: BreadcrumbContextSize;
};

/**
 * {@link BreadcrumbRoot} が子パーツへ提供するコンテキストです。
 */
export const BreadcrumbContext: React.Context<BreadcrumbContext | null> =
  React.createContext<BreadcrumbContext | null>(null);

function useSuiBreadcrumbContext(optional?: false): BreadcrumbContext;
function useSuiBreadcrumbContext(optional?: boolean): BreadcrumbContext | null;
function useSuiBreadcrumbContext(optional?: boolean): BreadcrumbContext | null {
  const context = React.use(BreadcrumbContext);
  if (context === null && !optional) {
    throw new ContextMissingError({
      contextName: "BreadcrumbContext",
      providerName: "BreadcrumbRoot",
    });
  }

  return context;
}

/**
 * {@link BreadcrumbContext} を読み取るフックです。
 */
export const useBreadcrumbContext: IUseContext<BreadcrumbContext> = useSuiBreadcrumbContext;

/**
 * {@link BreadcrumbContext} です。
 */
export type Context = BreadcrumbContext;

/**
 * {@link BreadcrumbContext} です。
 */
export const Context: React.Context<Context | null> = BreadcrumbContext;

/**
 * {@link Context} の型名前空間です。
 */
export namespace Context {
  /**
   * {@link BreadcrumbContextColor} です。
   */
  export type Color = BreadcrumbContextColor;

  /**
   * {@link BreadcrumbContextSize} です。
   */
  export type Size = BreadcrumbContextSize;
}

/**
 * {@link useBreadcrumbContext} です。
 */
export const useContext: IUseContext<Context> = useBreadcrumbContext;

// Root
// ----

/**
 * パンくずリストの色です。
 */
export type BreadcrumbRootColor = Color;

/**
 * パンくずリストの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type BreadcrumbRootSize = Size;

/**
 * {@link BreadcrumbRoot} の状態です。
 */
export type BreadcrumbRootState = {};

/**
 * {@link BreadcrumbRoot} に渡すプロパティーです。
 */
export type BreadcrumbRootProps = Omit<React.ComponentProps<"nav">, keyof RenderProps> &
  RenderProps<BreadcrumbRootState> & {
    /**
     * パンくずリストの色を指定します。
     *
     * 色はリンクに適用されます。
     *
     * @default "grey"
     */
    color?: BreadcrumbRootColor | undefined;

    /**
     * パンくずリストの大きさを指定します。
     *
     * @default "md"
     */
    size?: BreadcrumbRootSize | undefined;
  };

/**
 * パンくずリストのルートコンポーネントです。
 */
export const BreadcrumbRoot: IComponent<BreadcrumbRootProps> = function SuiBreadcrumbRoot(props) {
  const {
    size = "md",
    color = "grey",
    className,
    "aria-label": ariaLabel = "パンくずリスト",
    ...otherProps
  } = props;
  const context = React.useMemo<BreadcrumbContext>(() => ({ color, size }), [color, size]);
  const element = useRender({
    defaultTagName: "nav",
    props: [
      otherProps,
      {
        "aria-label": ariaLabel,
        className: cn(
          className,
          "sui_breadcrumb",
          `sui_breadcrumb-size_${size}`,
          `sui_breadcrumb-color_${color}`,
        ),
      },
    ],
  });

  return <Context value={context}>{element}</Context>;
};

/**
 * {@link BreadcrumbRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link BreadcrumbRootState} です。
   */
  export type State = BreadcrumbRootState;

  /**
   * {@link BreadcrumbRootProps} です。
   */
  export type Props = BreadcrumbRootProps;

  /**
   * {@link BreadcrumbRootColor} です。
   */
  export type Color = BreadcrumbRootColor;

  /**
   * {@link BreadcrumbRootSize} です。
   */
  export type Size = BreadcrumbRootSize;
}

/**
 * {@link BreadcrumbRoot} です。
 */
export const Root: IComponent<Root.Props> = BreadcrumbRoot;

// List
// ----

/**
 * {@link BreadcrumbList} の状態です。
 */
export type BreadcrumbListState = {};

/**
 * {@link BreadcrumbList} に渡すプロパティーです。
 */
export type BreadcrumbListProps = Omit<React.ComponentProps<"ol">, keyof RenderProps> &
  RenderProps<BreadcrumbListState> & {};

/**
 * パンくずの項目を並べるリストコンポーネントです。
 */
export const BreadcrumbList: IComponent<BreadcrumbListProps> = function SuiBreadcrumbList(props) {
  const { className, ...otherProps } = props;

  return useRender({
    defaultTagName: "ol",
    props: [
      otherProps,
      {
        className: cn(className, "sui_breadcrumb_list"),
      },
    ],
  });
};

/**
 * {@link BreadcrumbList} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace List {
  /**
   * {@link BreadcrumbListState} です。
   */
  export type State = BreadcrumbListState;

  /**
   * {@link BreadcrumbListProps} です。
   */
  export type Props = BreadcrumbListProps;
}

/**
 * {@link BreadcrumbList} です。
 */
export const List: IComponent<List.Props> = BreadcrumbList;

// Item
// ----

/**
 * {@link BreadcrumbItem} の状態です。
 */
export type BreadcrumbItemState = {};

/**
 * {@link BreadcrumbItem} に渡すプロパティーです。
 */
export type BreadcrumbItemProps = Omit<React.ComponentProps<"li">, keyof RenderProps> &
  RenderProps<BreadcrumbItemState> & {};

/**
 * パンくずの項目コンポーネントです。
 */
export const BreadcrumbItem: IComponent<BreadcrumbItemProps> = function SuiBreadcrumbItem(props) {
  const { className, ...otherProps } = props;

  return useRender({
    defaultTagName: "li",
    props: [
      otherProps,
      {
        className: cn(className, "sui_breadcrumb_item"),
      },
    ],
  });
};

/**
 * {@link BreadcrumbItem} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Item {
  /**
   * {@link BreadcrumbItemState} です。
   */
  export type State = BreadcrumbItemState;

  /**
   * {@link BreadcrumbItemProps} です。
   */
  export type Props = BreadcrumbItemProps;
}

/**
 * {@link BreadcrumbItem} です。
 */
export const Item: IComponent<Item.Props> = BreadcrumbItem;

// Link
// ----

/**
 * {@link BreadcrumbLink} の状態です。
 */
export type BreadcrumbLinkState = {};

/**
 * {@link BreadcrumbLink} に渡すプロパティーです。
 */
export type BreadcrumbLinkProps = Omit<React.ComponentProps<"a">, keyof RenderProps> &
  RenderProps<BreadcrumbLinkState> & {
    /**
     * 現在のページかどうかを指定します。
     *
     * `true` の場合、リンクではなく現在位置として描画します。
     *
     * @default false
     */
    current?: boolean | undefined;
  };

/**
 * パンくずのリンクコンポーネントです。
 *
 * `current` を `true` にすると、現在位置を示す要素として描画します。
 */
export const BreadcrumbLink: IComponent<BreadcrumbLinkProps> = function SuiBreadcrumbLink(props) {
  const { current = false, className, ...otherProps } = props;

  return useRender({
    defaultTagName: current ? "span" : "a",
    props: [
      otherProps,
      {
        "aria-current": current ? "page" : undefined,
        className: cn(className, "sui_breadcrumb_link", current && "sui_breadcrumb_link-current"),
      },
    ],
  });
};

/**
 * {@link BreadcrumbLink} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Link {
  /**
   * {@link BreadcrumbLinkState} です。
   */
  export type State = BreadcrumbLinkState;

  /**
   * {@link BreadcrumbLinkProps} です。
   */
  export type Props = BreadcrumbLinkProps;
}

/**
 * {@link BreadcrumbLink} です。
 */
export const Link: IComponent<Link.Props> = BreadcrumbLink;

// Separator
// ---------

/**
 * {@link BreadcrumbSeparator} の状態です。
 */
export type BreadcrumbSeparatorState = {};

/**
 * {@link BreadcrumbSeparator} に渡すプロパティーです。
 */
export type BreadcrumbSeparatorProps = Omit<React.ComponentProps<"li">, keyof RenderProps> &
  RenderProps<BreadcrumbSeparatorState> & {};

/**
 * パンくずの項目を区切るセパレーターコンポーネントです。
 */
export const BreadcrumbSeparator: IComponent<BreadcrumbSeparatorProps> =
  function SuiBreadcrumbSeparator(props) {
    const { className, children = <SuiBreadcrumbChevronRightIcon />, ...otherProps } = props;

    return useRender({
      defaultTagName: "li",
      props: [
        { ...otherProps, children },
        {
          "aria-hidden": true,
          className: cn(className, "sui_breadcrumb_separator"),
        },
      ],
    });
  };

/**
 * {@link BreadcrumbSeparator} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Separator {
  /**
   * {@link BreadcrumbSeparatorState} です。
   */
  export type State = BreadcrumbSeparatorState;

  /**
   * {@link BreadcrumbSeparatorProps} です。
   */
  export type Props = BreadcrumbSeparatorProps;
}

/**
 * {@link BreadcrumbSeparator} です。
 */
export const Separator: IComponent<Separator.Props> = BreadcrumbSeparator;

function SuiBreadcrumbChevronRightIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
