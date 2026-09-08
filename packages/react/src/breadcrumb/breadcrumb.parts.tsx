import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import { ChevronRightIcon } from "../_icons.jsx";
import toReactNode from "../_to-react-node.js";
import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import type { IComponent, IUseContext } from "../types.js";

import "./breadcrumb.css";

// Context
// -------

/**
 * パンくずリストの配色です。
 */
export type BreadcrumbContextColor = Color;

/**
 * パンくずリストの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type BreadcrumbContextSize = Size;

/**
 * {@link BreadcrumbRoot} が子パーツへ提供するコンテキストです。
 */
export type BreadcrumbContext = {
  /**
   * パンくずリストの配色です。
   *
   * 配色は現在のページのリンクに適用されます。
   */
  readonly color: BreadcrumbContextColor;

  /**
   * パンくずリストの項目です。
   */
  readonly items: readonly BreadcrumbRootItemObject[];

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
  const ctx = React.use(BreadcrumbContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "BreadcrumbContext",
      providerName: "BreadcrumbRoot",
    });
  }

  return ctx;
}

/**
 * {@link BreadcrumbContext} を読み取るフックです。
 */
export const useBreadcrumbContext: IUseContext<BreadcrumbContext> = useSuiBreadcrumbContext;

export { BreadcrumbContext as Context, useBreadcrumbContext as useContext };

export namespace Context {
  /**
   * {@link BreadcrumbContextColor}
   */
  export type Color = BreadcrumbContextColor;

  /**
   * {@link BreadcrumbContextSize}
   */
  export type Size = BreadcrumbContextSize;
}

// Root
// ----

/**
 * パンくずリストの配色です。
 */
export type BreadcrumbRootColor = Color;

/**
 * {@link BreadcrumbRoot} の各項目です。
 */
export type BreadcrumbRootItemObject = {
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

  /**
   * 項目のラベルです。
   */
  readonly label: React.ReactNode;
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

/**
 * {@link BreadcrumbRoot} に渡す props です。
 */
export type BreadcrumbRootProps = Omit<React.ComponentProps<"nav">, keyof RenderProps> &
  RenderProps<BreadcrumbRootState> & {
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

/**
 * パンくずリストのルートコンポーネントです。
 */
export const BreadcrumbRoot: IComponent<BreadcrumbRootProps> = function SuiBreadcrumbRoot(props) {
  const {
    size = "md",
    color = "grey",
    items = [],
    className,
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
          className,
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
  /**
   * {@link BreadcrumbRootState}
   */
  export type State = BreadcrumbRootState;

  /**
   * {@link BreadcrumbRootProps}
   */
  export type Props = BreadcrumbRootProps;

  /**
   * {@link BreadcrumbRootColor}
   */
  export type Color = BreadcrumbRootColor;

  /**
   * {@link BreadcrumbRootItemObject}
   */
  export type ItemObject = BreadcrumbRootItemObject;

  /**
   * {@link BreadcrumbRootSize}
   */
  export type Size = BreadcrumbRootSize;
}

// List
// ----

/**
 * パンくずリストの各項目をレンダリングする関数のインターフェイスです。
 */
export interface IBreadcrumbListItemRenderer {
  /**
   * 項目をレンダリングします。
   *
   * @param item 現在の項目です。
   * @param index 項目のインデックスです。
   * @param items すべての項目です。
   * @returns レンダリングする内容です。
   */
  (
    item: BreadcrumbRootItemObject,
    index: number,
    items: readonly BreadcrumbRootItemObject[],
  ): React.ReactNode;
}

/**
 * {@link BreadcrumbList} が持つ状態です。
 */
export type BreadcrumbListState = {};

/**
 * {@link BreadcrumbList} に渡す props です。
 */
export type BreadcrumbListProps = Omit<React.ComponentProps<"ol">, keyof RenderProps | "children"> &
  RenderProps<BreadcrumbListState> & {
    /**
     * パンくずリストの内容、または各項目をレンダリングする関数です。
     *
     * 関数を指定した場合は {@link BreadcrumbRootProps.items|items} の各項目が引数として渡されます。
     */
    children?: React.ReactNode | IBreadcrumbListItemRenderer;
  };

/**
 * パンくずの項目を並べるリストコンポーネントです。
 */
export const BreadcrumbList: IComponent<BreadcrumbListProps> = function SuiBreadcrumbList(props) {
  const ctx = useSuiBreadcrumbContext(true);
  const { children = defaultListItemRenderer, ...otherOlProps } = props;
  const items = ctx?.items ?? [];

  return useRender({
    props: [
      otherOlProps,
      {
        children: typeof children === "function" ? items.map(children) : children,
        className: "sui_breadcrumb_list",
      },
    ],
    defaultTagName: "ol",
  });
};

const defaultListItemRenderer: IBreadcrumbListItemRenderer = (item, index, items) => {
  if (!isListItemObject(item)) {
    return toReactNode(item);
  }

  const { href, label, current: currentProp, disabled } = item;
  const current = currentProp ?? index === items.length - 1;

  return (
    <React.Fragment key={index}>
      {index > 0 && <BreadcrumbSeparator />}
      <BreadcrumbItem>
        <BreadcrumbLink href={current ? undefined : href} current={current} disabled={disabled}>
          {toReactNode(label)}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </React.Fragment>
  );
};

function isListItemObject(item: unknown): item is BreadcrumbRootItemObject {
  return typeof item === "object" && item !== null && "label" in item;
}

export { BreadcrumbList as List };

export namespace List {
  /**
   * {@link BreadcrumbListState}
   */
  export type State = BreadcrumbListState;

  /**
   * {@link BreadcrumbListProps}
   */
  export type Props = BreadcrumbListProps;

  /**
   * {@link BreadcrumbRootItemObject}
   */
  export type ItemObject = BreadcrumbRootItemObject;

  /**
   * {@link IBreadcrumbListItemRenderer}
   */
  export interface IItemRenderer extends IBreadcrumbListItemRenderer {}
}

// Item
// ----

/**
 * {@link BreadcrumbItem} が持つ状態です。
 */
export type BreadcrumbItemState = {};

/**
 * {@link BreadcrumbItem} に渡す props です。
 */
export type BreadcrumbItemProps = Omit<React.ComponentProps<"li">, keyof RenderProps> &
  RenderProps<BreadcrumbItemState>;

/**
 * パンくずの項目コンポーネントです。
 */
export const BreadcrumbItem: IComponent<BreadcrumbItemProps> = function SuiBreadcrumbItem(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_breadcrumb_item",
      },
    ],
    defaultTagName: "li",
  });
};

export { BreadcrumbItem as Item };

export namespace Item {
  /**
   * {@link BreadcrumbItemState}
   */
  export type State = BreadcrumbItemState;

  /**
   * {@link BreadcrumbItemProps}
   */
  export type Props = BreadcrumbItemProps;
}

// Link
// ----

/**
 * {@link BreadcrumbLink} が持つ状態です。
 */
export type BreadcrumbLinkState = {};

/**
 * {@link BreadcrumbLink} に渡す props です。
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

    /**
     * リンクを無効にするかどうかを指定します。
     *
     * `true` の場合、リンク先へ遷移できなくなります。
     *
     * @default false
     */
    disabled?: boolean | undefined;
  };

/**
 * パンくずのリンクコンポーネントです。
 *
 * `current` を `true` にすると、現在位置を示す要素として描画します。
 */
export const BreadcrumbLink: IComponent<BreadcrumbLinkProps> = function SuiBreadcrumbLink(props) {
  const { current = false, onClick, disabled = false, className, ...otherAnchorProps } = props;
  const handleOnClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (disabled && !event.defaultPrevented) {
      event.preventDefault();
    }
  };

  return useRender({
    props: [
      otherAnchorProps,
      {
        href: disabled ? undefined : otherAnchorProps.href,
        onClick: handleOnClick,
        tabIndex: disabled && !current ? -1 : otherAnchorProps.tabIndex,
        className: cn(
          className,
          "sui_breadcrumb_link",
          current && "sui_breadcrumb_link-current",
          disabled && "sui_breadcrumb_link-disabled",
        ),
        "aria-current": current ? "page" : undefined,
        "aria-disabled": disabled || undefined,
      },
    ],
    defaultTagName: current ? "span" : "a",
  });
};

export { BreadcrumbLink as Link };

export namespace Link {
  /**
   * {@link BreadcrumbLinkState}
   */
  export type State = BreadcrumbLinkState;

  /**
   * {@link BreadcrumbLinkProps}
   */
  export type Props = BreadcrumbLinkProps;
}

// Separator
// ---------

/**
 * {@link BreadcrumbSeparator} が持つ状態です。
 */
export type BreadcrumbSeparatorState = {};

/**
 * {@link BreadcrumbSeparator} に渡す props です。
 */
export type BreadcrumbSeparatorProps = Omit<React.ComponentProps<"li">, keyof RenderProps> &
  RenderProps<BreadcrumbSeparatorState>;

/**
 * パンくずの項目を区切るセパレーターコンポーネントです。
 */
export const BreadcrumbSeparator: IComponent<BreadcrumbSeparatorProps> =
  function SuiBreadcrumbSeparator(props) {
    const { children = <ChevronRightIcon />, ...otherLiProps } = props;

    return useRender({
      props: [
        otherLiProps,
        {
          children,
          className: "sui_breadcrumb_separator",
          "aria-hidden": true,
        },
      ],
      defaultTagName: "li",
    });
  };

export { BreadcrumbSeparator as Separator };

export namespace Separator {
  /**
   * {@link BreadcrumbSeparatorState}
   */
  export type State = BreadcrumbSeparatorState;

  /**
   * {@link BreadcrumbSeparatorProps}
   */
  export type Props = BreadcrumbSeparatorProps;
}
