import * as React from "react";

import type { IComponent } from "../../types.js";
import {
  type ContextMenuRootProps,
  type ContextMenuRootState,
  type ContextMenuPopupProps,
  type ContextMenuPortalProps,
  type ContextMenuTriggerProps,
  type ContextMenuPositionerProps,
  ContextMenuRoot,
  ContextMenuPopup,
  ContextMenuPortal,
  ContextMenuTrigger,
  ContextMenuPositioner,
} from "./context-menu.parts.jsx";

/**
 * {@link ContextMenu} の各パーツに渡すプロパティーです。
 */
export type ContextMenuSlotProps = {
  /**
   * {@link ContextMenuTrigger|Trigger} に渡すプロパティーです。
   */
  readonly trigger?: ContextMenuTriggerProps | undefined;

  /**
   * {@link ContextMenuPortal|Portal} に渡すプロパティーです。
   */
  readonly portal?: ContextMenuPortalProps | undefined;

  /**
   * {@link ContextMenuPositioner|Positioner} に渡すプロパティーです。
   */
  readonly positioner?: ContextMenuPositionerProps | undefined;

  /**
   * {@link ContextMenuPopup|Popup} に渡すプロパティーです。
   */
  readonly popup?: ContextMenuPopupProps | undefined;
};

/**
 * {@link ContextMenu} の状態です。
 */
export type ContextMenuState = ContextMenuRootState;

/**
 * {@link ContextMenu} コンポーネントのプロパティーです。
 */
export type ContextMenuProps = Omit<ContextMenuRootProps, "children"> & {
  /**
   * コンテキストメニューを開く対象のコンテンツです。
   *
   * {@link ContextMenuTrigger|Trigger} の子要素として直接渡されます。
   */
  trigger?: ContextMenuTriggerProps["children"] | undefined;

  /**
   * ポップアップに表示するメニュー項目です。
   */
  children?: React.ReactNode | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   *
   * 各パーツのプロパティーが優先されます。
   */
  slotProps?: ContextMenuSlotProps | undefined;
};

/**
 * コンテキストメニューを表示するコンポーネントです。
 *
 * 右クリックまたは長押しの対象とポップアップを組み立てます。
 * 項目の種類や構成を細かく制御する場合は、{@link ContextMenuRoot|Root} を直接組み立てます。
 */
export const ContextMenu: IComponent<ContextMenuProps> = function SuiContextMenu(props) {
  const {
    trigger,
    children,
    slotProps: {
      trigger: triggerProps,
      portal: portalProps,
      positioner: positionerProps,
      popup: popupProps,
    } = {},
    ...rootProps
  } = props;

  return (
    <ContextMenuRoot {...rootProps}>
      {("trigger" in props || !!triggerProps) && (
        <ContextMenuTrigger children={trigger} {...triggerProps} />
      )}
      <ContextMenuPortal {...portalProps}>
        <ContextMenuPositioner {...positionerProps}>
          <ContextMenuPopup {...popupProps}>{children}</ContextMenuPopup>
        </ContextMenuPositioner>
      </ContextMenuPortal>
    </ContextMenuRoot>
  );
};

/**
 * {@link ContextMenu} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace ContextMenu {
  /**
   * {@link ContextMenuState} です。
   */
  export type State = ContextMenuState;

  /**
   * {@link ContextMenuProps} です。
   */
  export type Props = ContextMenuProps;

  /**
   * {@link ContextMenuSlotProps} です。
   */
  export type SlotProps = ContextMenuSlotProps;
}
