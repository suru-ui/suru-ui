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
  MenuBackdrop,
  createHandle,
  MenuPositioner,
} from "./menu.parts.jsx";

/**
 * {@link Menu} の各パーツに渡すプロパティーです。
 */
export type MenuSlotProps = {
  /**
   * {@link MenuBackdrop} に渡すプロパティーです。
   */
  readonly backdrop?: MenuBackdropProps | undefined;

  /**
   * {@link MenuPopup} に渡すプロパティーです。
   */
  readonly popup?: MenuPopupProps | undefined;

  /**
   * {@link MenuPortal} に渡すプロパティーです。
   */
  readonly portal?: MenuPortalProps | undefined;

  /**
   * {@link MenuPositioner} に渡すプロパティーです。
   */
  readonly positioner?: MenuPositionerProps | undefined;

  /**
   * {@link MenuTrigger} に渡すプロパティーです。
   */
  readonly trigger?: Omit<MenuTriggerProps, "handle"> | undefined;
};

/**
 * {@link Menu} の状態です。
 */
export type MenuState = MenuRootState;

/**
 * {@link Menu} コンポーネントのプロパティーです。
 */
export type MenuProps = Omit<MenuRootProps, "children" | "handle"> &
  Pick<MenuPopupProps, "children"> & {
    /**
     * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
     *
     * 各パーツのプロパティーが優先されます。
     */
    slotProps?: MenuSlotProps | undefined;

    /**
     * メニューを開くトリガーに表示する要素です。
     */
    trigger?: MenuTriggerProps["children"] | undefined;
  };

/**
 * {@link Menu} の各パーツに渡すプロパティーです。
 */
export type MenuPartsProps = {
  /**
   * {@link MenuRoot} に渡すプロパティーです。
   */
  readonly root: MenuRootProps;

  /**
   * {@link MenuTrigger} に渡すプロパティーです。
   *
   * トリガーを表示しないときは null になります。
   */
  readonly trigger: Omit<MenuTriggerProps, "handle"> | null;

  /**
   * {@link MenuPortal} に渡すプロパティーです。
   */
  readonly portal: MenuPortalProps | undefined;

  /**
   * {@link MenuBackdrop} に渡すプロパティーです。
   */
  readonly backdrop: MenuBackdropProps | undefined;

  /**
   * {@link MenuPositioner} に渡すプロパティーです。
   */
  readonly positioner: MenuPositionerProps;

  /**
   * {@link MenuPopup} に渡すプロパティーです。
   */
  readonly popup: MenuPopupProps;
};

/**
 * {@link Menu} の各パーツに渡すプロパティーを作るフックです。
 */
export function useMenu(props: MenuProps): MenuPartsProps {
  const {
    trigger,
    children,
    slotProps: {
      popup: popupProps,
      portal: portalProps,
      trigger: triggerProps,
      backdrop: backdropProps,
      positioner: positionerProps,
    } = {},
    ...rootProps
  } = props;
  const {
    side = "bottom",
    align = "start",
    sideOffset = 8,
    ...otherPositionerProps
  } = positionerProps ?? {};

  return {
    root: rootProps,
    trigger:
      !!trigger || !!triggerProps
        ? {
            children: trigger!,
            ...triggerProps,
          }
        : null,
    portal: portalProps,
    backdrop: backdropProps,
    positioner: {
      ...otherPositionerProps,
      side,
      align,
      sideOffset,
    },
    popup: {
      ...popupProps,
      children,
    },
  };
}

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
 * トリガーとポップアップを組み立てます。項目の種類や構成を細かく制御する場合は、{@link MenuRoot|Root} を直接組み立てます。
 */
export const Menu: MenuComponentType = /*#__PURE__*/ Object.assign(
  function SuiMenu(props: MenuProps) {
    const partsProps = useMenu(props);

    return (
      <MenuRoot {...partsProps.root}>
        {partsProps.trigger && <MenuTrigger {...partsProps.trigger} />}
        <MenuPortal {...partsProps.portal}>
          <MenuBackdrop {...partsProps.backdrop} />
          <MenuPositioner {...partsProps.positioner}>
            <MenuPopup {...partsProps.popup} />
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
