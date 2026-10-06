import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useTabsContext } from "../root/tabs.root.context.js";
import { TabsIndicatorContext } from "./tabs.indicator.context.js";

/**
 * {@link TabsIndicator} が持つ状態です。
 */
export type TabsIndicatorState = TabsIndicatorContext;

export namespace TabsIndicatorProps {
  export type Render = RenderProps<TabsIndicatorState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof BaseTabs.Indicator>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // TabsIndicatorProps より:
      "renderBeforeHydration"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseTabs.Indicator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link TabsIndicator} に渡す props です。
 */
export type TabsIndicatorProps = TabsIndicatorProps.Render &
  TabsIndicatorProps.SuruUI &
  TabsIndicatorProps.BaseUI &
  TabsIndicatorProps.HTML;

export type ITabsIndicator = IComponent<TabsIndicatorProps>;

/**
 * アクティブな Tab の位置に追従するインジケーター要素です。
 *
 * {@link TabsList} の子要素として配置します。
 */
export const TabsIndicator: ITabsIndicator = function SuiTabsIndicator(props) {
  const ctx = useTabsContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <BaseTabs.Indicator
      {...otherProps}
      {...proxyRenderProps<BaseTabs.Indicator.State, TabsIndicatorState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <TabsIndicatorContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="span"
              />
            </TabsIndicatorContext>
          ),
          className: cn<TabsIndicatorState>(
            className,
            "sui_tabs_indicator",
            (state) => `sui_tabs_indicator-size_${state.size}`,
            (state) => `sui_tabs_indicator-radius_${state.radius}`,
            (state) => `sui_tabs_indicator-variant_${state.variant}`,
            (state) => state.outlined && "sui_tabs_indicator-outlined",
            (state) => `sui_tabs_indicator-active_variant_${state.activeVariant}`,
            (state) => `sui_tabs_indicator-orientation_${state.orientation}`,
            (state) =>
              `sui_tabs_indicator-tab_activation_direction_${state.tabActivationDirection}`,
          ),
        },
      )}
    />
  );
};

export { TabsIndicator as Indicator };

export namespace Indicator {
  export type State = TabsIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = TabsIndicatorProps.Render;

    export type SuruUI = TabsIndicatorProps.SuruUI;

    export type BaseUI = TabsIndicatorProps.BaseUI;

    export type HTML = TabsIndicatorProps.HTML;
  }
}
