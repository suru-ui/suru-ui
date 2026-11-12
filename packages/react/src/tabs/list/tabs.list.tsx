import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { getTabsItemLabel, getTabsItemProps, createItemRenderer } from "../_tabs.jsx";
import { useTabsContext } from "../root/tabs.root.context.js";
import type { TabsRootItemObject, ITabsRootItemRenderer } from "../root/tabs.root.jsx";
import { TabsListContext } from "./tabs.list.context.js";

/**
 * {@link TabsList} が持つ状態です。
 *
 * @template TItem 項目の型です。
 */
export type TabsListState<TItem = any> = TabsListContext<TItem>;

export namespace TabsListProps {
  export type Render<TItem = any> = RenderProps<TabsListState<TItem>>;

  export type SuruUI = {};

  export type BaseUI<TItem = any> = Override<
    Omit<
      Pick<
        React.ComponentProps<typeof BaseTabs.List>,
        // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
        // TabsListProps より :
        "children" | "activateOnFocus" | "loopFocus"
      >,
      keyof Render | keyof SuruUI
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
export type TabsListProps<TItem = any> = TabsListProps.Render<TItem> &
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
export const TabsList: ITabsList = (props: TabsListProps) => {
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
      {...proxyRenderProps<BaseTabs.List.State, TabsListState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <TabsListContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </TabsListContext>
          ),
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
        },
      )}
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
  export type State<TItem = any> = TabsListState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> &
    Props.SuruUI &
    Props.BaseUI<TItem> &
    Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = TabsListProps.Render<TItem>;

    export type SuruUI = TabsListProps.SuruUI;

    export type BaseUI<TItem = any> = TabsListProps.BaseUI<TItem>;

    export type HTML = TabsListProps.HTML;
  }

  export type IItemRenderer<TItem = any> = ITabsRootItemRenderer<TItem>;

  export type ItemObject = TabsRootItemObject;
}
