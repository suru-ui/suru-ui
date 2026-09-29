import type { NativeButtonProps } from "@base-ui/react/internals/types";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * タブをアクティブ化する方向です。
 *
 * - `"left"`: 左方向
 * - `"right"`: 右方向
 * - `"up"`: 上方向
 * - `"down"`: 下方向
 * - `"none"`: 方向なし
 */
export type TabsTabActivationDirection = BaseTabs.Tab.ActivationDirection;

/**
 * Tabs のタブのメタデータです。
 */
export type TabsTabMetadata = BaseTabs.Tab.Metadata;

/**
 * アクティブなタブの位置です。
 */
export type TabsTabPosition = BaseTabs.Tab.Position;

/**
 * アクティブなタブの大きさです。
 */
export type TabsTabSize = BaseTabs.Tab.Size;

/**
 * Tabs のタブの値です。
 */
export type TabsTabValue = BaseTabs.Tab.Value;

/**
 * {@link TabsTab} が持つ状態です。
 */
export type TabsTabState = BaseTabs.Tab.State;

export namespace TabsTabProps {
  export type Render = RenderProps<TabsTabState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseTabs.Tab>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // TabsTabProps:
      | "value"
      | "disabled",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseTabs.Tab>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link TabsTab} に渡す props です。
 */
export type TabsTabProps = TabsTabProps.Render &
  TabsTabProps.SuruUI &
  TabsTabProps.BaseUI &
  TabsTabProps.HTML;

export type ITabsTab = IComponent<TabsTabProps>;

/**
 * 対応するパネルを切り替える Tab ボタンです。
 */
export const TabsTab: ITabsTab = function SuiTabsTab(props) {
  const { className, ...otherProps } = props;

  return (
    <BaseTabs.Tab
      {...otherProps}
      className={cn(
        className,
        "sui_tabs_tab",
        (state) => state.active && "sui_tabs_tab-active",
        (state) => state.disabled && "sui_tabs_tab-disabled",
      )}
    />
  );
};

export { TabsTab as Tab };

export namespace Tab {
  export type State = TabsTabState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = TabsTabProps.Render;

    export type SuruUI = TabsTabProps.SuruUI;

    export type BaseUI = TabsTabProps.BaseUI;

    export type HTML = TabsTabProps.HTML;
  }

  export type ActivationDirection = TabsTabActivationDirection;

  export type Metadata = TabsTabMetadata;

  export type Position = TabsTabPosition;

  export type Size = TabsTabSize;

  export type Value = TabsTabValue;
}
