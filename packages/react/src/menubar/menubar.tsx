import type { IComponent } from "../types.js";
import { type MenubarRootProps, type MenubarRootState, MenubarRoot } from "./menubar.parts.jsx";

/**
 * {@link Menubar} の状態です。
 */
export type MenubarState = MenubarRootState;

/**
 * {@link Menubar} コンポーネントのプロパティーです。
 */
export type MenubarProps = MenubarRootProps;

/**
 * メニューを横または縦に並べるコンポーネントです。
 *
 * メニュー項目の構成を細かく制御する場合は、{@link MenubarRoot|Root} と `MenuParts` を直接組み立てます。
 */
export const Menubar: IComponent<MenubarProps> = function SuiMenubar(props) {
  return <MenubarRoot {...props} />;
};

/**
 * {@link Menubar} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Menubar {
  /**
   * {@link MenubarState} です。
   */
  export type State = MenubarState;

  /**
   * {@link MenubarProps} です。
   */
  export type Props = MenubarProps;
}
