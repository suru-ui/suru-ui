import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link TabsList} が持つ状態です。
 */
export type TabsListState = BaseTabs.List.State;

export namespace TabsListProps {
  export type Render = RenderProps<TabsListState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseTabs.List>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // TabsListProps:
      "activateOnFocus" | "loopFocus",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseTabs.List>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link TabsList} に渡す props です。
 */
export type TabsListProps = TabsListProps.Render &
  TabsListProps.SuruUI &
  TabsListProps.BaseUI &
  TabsListProps.HTML;

/**
 * 個々の Tab ボタンをまとめるリスト要素です。
 *
 * 矢印キーによるフォーカス移動の起点になります。
 */
export const TabsList: IComponent<TabsListProps> = function SuiTabsList(props) {
  const { className, "aria-label": ariaLabel = "タブ", ...otherProps } = props;

  return (
    <BaseTabs.List
      {...otherProps}
      className={cn(className, "sui_tabs_list")}
      aria-label={ariaLabel}
    />
  );
};

export { TabsList as List };

export namespace List {
  export type State = TabsListState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = TabsListProps.Render;

    export type SuruUI = TabsListProps.SuruUI;

    export type BaseUI = TabsListProps.BaseUI;

    export type HTML = TabsListProps.HTML;
  }
}
