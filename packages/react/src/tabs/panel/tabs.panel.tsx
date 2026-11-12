import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useTabsContext } from "../root/tabs.root.context.js";
import { TabsPanelContext } from "./tabs.panel.context.js";

/** Tabs のパネルのメタデータです。 */
export type TabsPanelMetadata = BaseTabs.Panel.Metadata;

/**
 * {@link TabsPanel} が持つ状態です。
 *
 * @template TItem 項目の型です。
 */
export type TabsPanelState<TItem = any> = TabsPanelContext<TItem>;

export namespace TabsPanelProps {
  export type Render<TItem = any> = RenderProps<TabsPanelState<TItem>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof BaseTabs.Panel>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // TabsPanelProps より :
      "value" | "keepMounted"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseTabs.Panel>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link TabsPanel} に渡す props です。
 */
export type TabsPanelProps = TabsPanelProps.Render &
  TabsPanelProps.SuruUI &
  TabsPanelProps.BaseUI &
  TabsPanelProps.HTML;

export type ITabsPanel = IComponent<TabsPanelProps>;

/** アクティブな Tab に対応するコンテンツを表示するパネル要素です。 */
export const TabsPanel: ITabsPanel = (props) => {
  const ctx = useTabsContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <BaseTabs.Panel
      {...otherProps}
      {...proxyRenderProps<BaseTabs.Panel.State, TabsPanelState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <TabsPanelContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </TabsPanelContext>
          ),
          className: cn<TabsPanelState>(
            className,
            "sui_tabs_panel",
            (state) => `sui_tabs_panel-size_${state.size}`,
            (state) => `sui_tabs_panel-radius_${state.radius}`,
            (state) => `sui_tabs_panel-variant_${state.variant}`,
            (state) => state.outlined && "sui_tabs_panel-outlined",
            (state) => `sui_tabs_panel-active_variant_${state.activeVariant}`,
            (state) => state.hidden && "sui_tabs_panel-hidden",
            (state) => `sui_tabs_panel-orientation_${state.orientation}`,
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_tabs_panel-transition_status_${state.transitionStatus}`,
            (state) => `sui_tabs_panel-tab_activation_direction_${state.tabActivationDirection}`,
          ),
        },
      )}
    />
  );
};

export { TabsPanel as Panel };
export namespace Panel {
  export type State<TItem = any> = TabsPanelState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = TabsPanelProps.Render<TItem>;

    export type SuruUI = TabsPanelProps.SuruUI;

    export type BaseUI = TabsPanelProps.BaseUI;

    export type HTML = TabsPanelProps.HTML;
  }

  export type Metadata = TabsPanelMetadata;
}
