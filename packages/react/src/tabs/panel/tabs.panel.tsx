import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { type TabsContext, useTabsContext } from "../root/tabs.root.context.js";

/**
 * Tabs のパネルのメタデータです。
 */
export type TabsPanelMetadata = BaseTabs.Panel.Metadata;

/**
 * {@link TabsPanel} が持つ状態です。
 */
export type TabsPanelState = Override<TabsContext, BaseTabs.Panel.State>;

export namespace TabsPanelProps {
  export type Render = RenderProps<TabsPanelState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseTabs.Panel>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // TabsPanelProps:
      "value" | "keepMounted",
      keyof Render | keyof SuruUI
    >
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

/**
 * アクティブな Tab に対応するコンテンツを表示するパネル要素です。
 */
export const TabsPanel: ITabsPanel = function SuiTabsPanel(props) {
  const ctx = useTabsContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <BaseTabs.Panel
      {...otherProps}
      {...proxyRenderProps<BaseTabs.Panel.State, TabsPanelState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
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
  export type State = TabsPanelState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = TabsPanelProps.Render;

    export type SuruUI = TabsPanelProps.SuruUI;

    export type BaseUI = TabsPanelProps.BaseUI;

    export type HTML = TabsPanelProps.HTML;
  }

  export type Metadata = TabsPanelMetadata;
}
