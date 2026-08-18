import type * as React from "react";

import type { IComponent } from "../../types.js";
import {
  type MenuRootProps,
  type MenuRootState,
  type MenuPopupProps,
  type MenuPortalProps,
  type MenuTriggerProps,
  type MenuBackdropProps,
  type MenuPositionerProps,
  MenuRoot,
  MenuPopup,
  MenuPortal,
  MenuTrigger,
  createHandle,
  MenuBackdrop,
  MenuPositioner,
} from "./menu.parts.jsx";

/**
 * {@link Menu} の各パーツに渡すプロパティーです。
 */
export type MenuSlotProps = {
  /**
   * {@link MenuTrigger} に渡すプロパティーです。
   */
  readonly trigger?: Omit<MenuTriggerProps, "handle" | "children"> | undefined;

  /**
   * {@link MenuPortal} に渡すプロパティーです。
   */
  readonly portal?: MenuPortalProps | undefined;

  /**
   * {@link MenuBackdrop} に渡すプロパティーです。
   */
  readonly backdrop?: MenuBackdropProps | undefined;

  /**
   * {@link MenuPositioner} に渡すプロパティーです。
   */
  readonly positioner?: MenuPositionerProps | undefined;

  /**
   * {@link MenuPopup} に渡すプロパティーです。
   */
  readonly popup?: MenuPopupProps | undefined;
};

/**
 * {@link Menu} の状態です。
 */
export type MenuState = MenuRootState;

/**
 * {@link Menu} コンポーネントのプロパティーです。
 */
export type MenuProps = Omit<MenuRootProps, "children" | "handle"> & {
  /**
   * メニューを開くトリガーに表示する要素です。
   *
   * {@link MenuTrigger|Trigger} の子要素として直接渡されます。
   * 省略した場合、トリガーはレンダリングされません。
   */
  trigger?: MenuTriggerProps["children"] | undefined;

  /**
   * ポップアップに表示するメニュー項目です。
   */
  children?: React.ReactNode | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   */
  slotProps?: MenuSlotProps | undefined;
};

interface MenuComponentType extends IComponent<MenuProps> {
  /**
   * メニューを制御するハンドルを新しく作成します。
   *
   * 作成したハンドルは {@link MenuRoot} と {@link MenuTrigger} の `handle` プロパティーに渡します。
   */
  readonly createHandle: typeof createHandle;
}

/**
 * メニューを表示するコンポーネントです。
 *
 * トリガーとポップアップを組み立てます。項目の種類や構成を細かく制御する場合は、
 * {@link MenuRoot|Root} を直接組み立てます。
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
      <MenuRoot {...rootProps}>
        {trigger !== undefined && <MenuTrigger {...triggerProps}>{trigger}</MenuTrigger>}
        <MenuPortal {...portalProps}>
          <MenuBackdrop {...backdropProps} />
          <MenuPositioner
            {...otherPositionerProps}
            side={side}
            align={align}
            sideOffset={sideOffset}
          >
            <MenuPopup {...popupProps}>{children}</MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>
    );
  },
  { createHandle },
);

/**
 * {@link Menu} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Menu {
  /**
   * {@link MenuState} です。
   */
  export type State = MenuState;

  /**
   * {@link MenuProps} です。
   */
  export type Props = MenuProps;

  /**
   * {@link MenuSlotProps} です。
   */
  export type SlotProps = MenuSlotProps;
}
