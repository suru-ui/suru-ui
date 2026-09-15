import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * Tabs のパネルのメタデータです。
 */
export type TabsPanelMetadata = BaseTabs.Panel.Metadata;

/**
 * {@link TabsPanel} が持つ状態です。
 */
export type TabsPanelState = BaseTabs.Panel.State;

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

/**
 * アクティブな Tab に対応するコンテンツを表示するパネル要素です。
 */
export const TabsPanel: IComponent<TabsPanelProps> = function SuiTabsPanel(props) {
  const { className, ...otherProps } = props;

  return <BaseTabs.Panel {...otherProps} className={cn(className, "sui_tabs_panel")} />;
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
