import { Menubar as BaseMenubar } from "@base-ui/react/menubar";
import * as React from "react";

import cn from "../../cn.js";
import type { Component } from "../../types.js";

import "./menubar.css";

// Root
// ----

/**
 * {@link Root} の状態です。
 */
export type MenubarRootState = BaseMenubar.State;

/**
 * {@link Root} に渡すプロパティーです。
 */
export type MenubarRootProps = React.ComponentProps<typeof BaseMenubar>;

/**
 * メニューを横または縦に並べるルート要素です。
 *
 * 子要素には `Menu` または `MenuParts.Root` を配置します。
 *
 * @example
 * ```tsx
 * import { Button } from "@suru-ui/react/button";
 * import { Menu } from "@suru-ui/react/menu";
 * import * as MenuParts from "@suru-ui/react/menu";
 * import * as MenubarParts from "@suru-ui/react/menubar";
 *
 * <MenubarParts.Root>
 *   <Menu trigger={<Button>ファイル</Button>}>
 *     <MenuParts.Item>新規作成</MenuParts.Item>
 *   </Menu>
 * </MenubarParts.Root>
 * ```
 */
export const MenubarRoot: Component<MenubarRootProps> = function SuiMenubarRoot(props) {
  const { className, orientation = "horizontal", ...otherProps } = props;

  return (
    <BaseMenubar
      {...otherProps}
      orientation={orientation}
      className={cn(className, "sui_menubar", `sui_menubar-orientation_${orientation}`)}
    />
  );
};

/**
 * {@link MenubarRoot} の型をまとめた名前空間です。
 */
export namespace Root {
  export type State = MenubarRootState;
  export type Props = MenubarRootProps;
}

/**
 * {@link MenubarRoot} の短縮名です。
 */
export const Root: Component<Root.Props> = MenubarRoot;
