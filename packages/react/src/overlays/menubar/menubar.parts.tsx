import { Menubar as BaseMenubar } from "@base-ui/react/menubar";
import * as React from "react";

import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

import "./menubar.css";

// Root
// ----

/**
 * {@link MenubarRoot} の状態です。
 */
export type MenubarRootState = BaseMenubar.State;

/**
 * {@link MenubarRoot} に渡すプロパティーです。
 */
export type MenubarRootProps = React.ComponentProps<typeof BaseMenubar>;

/**
 * メニューを横または縦に並べるルート要素です。
 *
 * 子要素には `Menu` または `MenuParts.Root` を配置します。
 */
export const MenubarRoot: IComponent<MenubarRootProps> = function SuiMenubarRoot(props) {
  const { className, orientation = "horizontal", ...otherProps } = props;

  return (
    <BaseMenubar
      {...otherProps}
      className={cn(className, "sui_menubar", `sui_menubar-orientation_${orientation}`)}
      orientation={orientation}
    />
  );
};

/**
 * {@link MenubarRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link MenubarRootState} です。
   */
  export type State = MenubarRootState;

  /**
   * {@link MenubarRootProps} です。
   */
  export type Props = MenubarRootProps;
}

/**
 * {@link MenubarRoot} です。
 */
export const Root: IComponent<Root.Props> = MenubarRoot;
