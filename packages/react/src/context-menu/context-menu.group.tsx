import { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ContextMenuGroup} が持つ状態です。
 */
export type ContextMenuGroupState = ContextMenu.Group.State;

export namespace ContextMenuGroupProps {
  export type Render = RenderProps<ContextMenuGroupState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof ContextMenu.Group>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuGroupProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof ContextMenu.Group>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ContextMenuGroup} に渡す props です。
 */
export type ContextMenuGroupProps = ContextMenuGroupProps.Render &
  ContextMenuGroupProps.SuruUI &
  ContextMenuGroupProps.BaseUI &
  ContextMenuGroupProps.HTML;

/**
 * 関連するコンテキストメニュー項目をまとめるグループ要素です。
 */
export const ContextMenuGroup: IComponent<ContextMenuGroupProps> = function SuiContextMenuGroup(
  props,
) {
  const { className, ...otherProps } = props;

  return <ContextMenu.Group {...otherProps} className={cn(className, "sui_context_menu_group")} />;
};

export { ContextMenuGroup as Group };

export namespace Group {
  export type State = ContextMenuGroupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ContextMenuGroupProps.Render;

    export type SuruUI = ContextMenuGroupProps.SuruUI;

    export type BaseUI = ContextMenuGroupProps.BaseUI;

    export type HTML = ContextMenuGroupProps.HTML;
  }
}
