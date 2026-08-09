import type * as React from "react";

import type { Component } from "../../types.js";
import * as MenuParts from "./menu.parts.jsx";

/**
 * {@link Menu} コンポーネントのプロパティーです。
 */
export type MenuProps = Omit<MenuParts.Root.Props, "children" | "handle"> & {
  /**
   * メニューを開くトリガーに表示する要素です。
   *
   * {@link MenuParts.Trigger|Trigger} の子要素として直接渡されます。
   * 省略した場合、トリガーはレンダリングされません。
   */
  trigger?: MenuParts.Trigger.Props["children"] | undefined;

  /**
   * ポップアップに表示するメニュー項目です。
   */
  children?: React.ReactNode | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   */
  slotProps?:
    | {
        /**
         * {@link MenuParts.Trigger|Trigger} に渡すプロパティーです。
         */
        readonly trigger?: Omit<MenuParts.Trigger.Props, "handle" | "children"> | undefined;

        /**
         * {@link MenuParts.Portal|Portal} に渡すプロパティーです。
         */
        readonly portal?: MenuParts.Portal.Props | undefined;

        /**
         * {@link MenuParts.Backdrop|Backdrop} に渡すプロパティーです。
         */
        readonly backdrop?: MenuParts.Backdrop.Props | undefined;

        /**
         * {@link MenuParts.Positioner|Positioner} に渡すプロパティーです。
         */
        readonly positioner?: MenuParts.Positioner.Props | undefined;

        /**
         * {@link MenuParts.Popup|Popup} に渡すプロパティーです。
         */
        readonly popup?: MenuParts.Popup.Props | undefined;
      }
    | undefined;
};

interface MenuComponentType extends Component<MenuProps> {
  /**
   * メニューを制御するハンドルを新しく作成します。
   *
   * 作成したハンドルは {@link MenuParts.Root} と {@link MenuParts.Trigger} の `handle` プロパティーに渡します。
   */
  readonly createHandle: typeof MenuParts.createHandle;
}

/**
 * メニューを表示するコンポーネントです。
 *
 * トリガーとポップアップを組み立てます。項目の種類や構成を細かく制御する場合は、
 * {@link MenuParts.Root|Root} を直接組み立てます。
 *
 * @example 基本
 * ```tsx
 * import { Button } from "@suru-ui/react/button";
 * import { Menu } from "@suru-ui/react/menu";
 * import * as MenuParts from "@suru-ui/react/menu";
 *
 * <Menu
 *   trigger={<Button>ファイル</Button>}
 * >
 *   <MenuParts.Item>新規作成</MenuParts.Item>
 *   <MenuParts.Item>開く</MenuParts.Item>
 *   <MenuParts.Separator />
 *   <MenuParts.Item>閉じる</MenuParts.Item>
 * </Menu>
 * ```
 */
export const Menu: MenuComponentType = /*#__PURE__*/ Object.assign(
  function SuiMenu(props: MenuProps) {
    const {
      trigger,
      children,
      slotProps: {
        trigger: triggerProps,
        portal: portalProps,
        backdrop: backdropProps,
        positioner: positionerProps,
        popup: popupProps,
      } = {},
      ...rootProps
    } = props;
    const {
      align = "start",
      side = "bottom",
      sideOffset = 8,
      ...otherPositionerProps
    } = positionerProps ?? {};

    return (
      <MenuParts.Root {...rootProps}>
        {trigger !== undefined && (
          <MenuParts.Trigger {...triggerProps}>{trigger}</MenuParts.Trigger>
        )}
        <MenuParts.Portal {...portalProps}>
          <MenuParts.Backdrop {...backdropProps} />
          <MenuParts.Positioner
            {...otherPositionerProps}
            side={side}
            align={align}
            sideOffset={sideOffset}
          >
            <MenuParts.Popup {...popupProps}>{children}</MenuParts.Popup>
          </MenuParts.Positioner>
        </MenuParts.Portal>
      </MenuParts.Root>
    );
  },
  { createHandle: MenuParts.createHandle },
);
