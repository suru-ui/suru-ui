import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { getTabsItemLabel, getTabsItemProps, createItemRenderer } from "./_tabs.jsx";
import { type TabsContext, useTabsContext } from "./tabs.context.js";
import type { TabsRootItemObject, ITabsRootItemRenderer } from "./tabs.root.jsx";

/**
 * {@link TabsList} が持つ状態です。
 */
export type TabsListState = Override<TabsContext, BaseTabs.List.State>;

export namespace TabsListProps {
  export type Render = RenderProps<TabsListState>;

  export type SuruUI = {};

  export type BaseUI<TItem = any> = Override<
    Pick<
      React.ComponentProps<typeof BaseTabs.List>,
      Exclude<
        // Base UI の型を確認して取り出すプロパティーを決めます。
        // TabsListProps:
        "children" | "activateOnFocus" | "loopFocus",
        keyof Render | keyof SuruUI
      >
    >,
    // Base UI の型を強化します。
    {
      children?: React.ReactNode | ITabsRootItemRenderer<TItem> | undefined;
    }
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseTabs.List>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link TabsList} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type TabsListProps<TItem = any> = TabsListProps.Render &
  TabsListProps.SuruUI &
  TabsListProps.BaseUI<TItem> &
  TabsListProps.HTML;

export interface ITabsList extends IComponent<TabsListProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: TabsListProps<TItem>): IComponent.Return;
}

/**
 * 個々の Tab ボタンをまとめるリスト要素です。
 *
 * {@link TabsRoot} の `items` を読み取り、`children` を省略した場合は既定の並びで表示します。
 */
export const TabsList: ITabsList = function SuiTabsList(props: TabsListProps) {
  const ctx = useTabsContext();
  const {
    style,
    render,
    children = defaultListItemRenderer,
    className,
    "aria-label": ariaLabel = "タブ",
    ...otherProps
  } = props;
  const items = ctx.items;

  return (
    <BaseTabs.List
      {...otherProps}
      {...proxyRenderProps<BaseTabs.List.State, TabsListState>((state) => ({ ...ctx, ...state }), {
        style,
        render,
        className: cn<TabsListState>(
          className,
          "sui_tabs_list",
          (state) => `sui_tabs_list-size_${state.size}`,
          (state) => `sui_tabs_list-radius_${state.radius}`,
          (state) => `sui_tabs_list-variant_${state.variant}`,
          (state) => state.outlined && "sui_tabs_list-outlined",
          (state) => `sui_tabs_list-active_variant_${state.activeVariant}`,
          (state) => `sui_tabs_list-orientation_${state.orientation}`,
          (state) => `sui_tabs_list-tab_activation_direction_${state.tabActivationDirection}`,
        ),
      })}
      aria-label={ariaLabel}
    >
      {typeof children === "function" ? items.map(children) : children}
    </BaseTabs.List>
  );
};

const defaultListItemRenderer: ITabsRootItemRenderer = createItemRenderer(
  getTabsItemProps,
  getTabsItemLabel,
);

export { TabsList as List };

export namespace List {
  export type State = TabsListState;

  export type Props<TItem = any> = Props.Render & Props.SuruUI & Props.BaseUI<TItem> & Props.HTML;

  export namespace Props {
    export type Render = TabsListProps.Render;

    export type SuruUI = TabsListProps.SuruUI;

    export type BaseUI<TItem = any> = TabsListProps.BaseUI<TItem>;

    export type HTML = TabsListProps.HTML;
  }

  export type IItemRenderer<TItem = any> = ITabsRootItemRenderer<TItem>;

  export type ItemObject = TabsRootItemObject;
}
