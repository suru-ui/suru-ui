import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type TabsContext, useTabsContext } from "./tabs.context.js";

/**
 * {@link TabsIndicator} が持つ状態です。
 */
export type TabsIndicatorState = Override<TabsContext, BaseTabs.Indicator.State>;

export namespace TabsIndicatorProps {
  export type Render = RenderProps<TabsIndicatorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseTabs.Indicator>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // TabsIndicatorProps:
      "renderBeforeHydration",
      keyof Render | keyof SuruUI
    >
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
          render,
          className: cn<TabsIndicatorState>(className, "sui_tabs_indicator"),
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
