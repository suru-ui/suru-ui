import type { Component } from "../../types.js";
import * as MenubarParts from "./menubar.parts.jsx";

/**
 * {@link Menubar} コンポーネントのプロパティーです。
 */
export type MenubarProps = MenubarParts.Root.Props;

/**
 * メニューを横または縦に並べるコンポーネントです。
 *
 * メニュー項目の構成を細かく制御する場合は、{@link MenubarParts.Root|Root} と
 * `MenuParts` を直接組み立てます。
 *
 * @example 基本
 * ```tsx
 * import { Button } from "@suru-ui/react/button";
 * import { Menu } from "@suru-ui/react/menu";
 * import * as MenuParts from "@suru-ui/react/menu";
 *
 * <Menubar>
 *   <Menu trigger={<Button>ファイル</Button>}>
 *     <MenuParts.Item>新規作成</MenuParts.Item>
 *     <MenuParts.Item>開く</MenuParts.Item>
 *   </Menu>
 * </Menubar>
 * ```
 */
export const Menubar: Component<MenubarProps> = function SuiMenubar(props) {
  return <MenubarParts.Root {...props} />;
};
