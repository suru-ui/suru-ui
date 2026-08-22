import * as React from "react";

import type { IComponent } from "../../types.js";
import {
  type ContextMenuRootProps,
  type ContextMenuRootState,
  type ContextMenuPopupProps,
  type ContextMenuPortalProps,
  type ContextMenuTriggerProps,
  type ContextMenuPositionerProps,
  createHandle,
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
   * {@link ContextMenuPopup|Popup} に渡すプロパティーです。
   */
  readonly popup?: ContextMenuPopupProps | undefined;

  /**
   * {@link ContextMenuPortal|Portal} に渡すプロパティーです。
   */
  readonly portal?: ContextMenuPortalProps | undefined;

  /**
   * {@link ContextMenuPositioner|Positioner} に渡すプロパティーです。
   */
  readonly positioner?: ContextMenuPositionerProps | undefined;

  /**
   * {@link ContextMenuTrigger|Trigger} に渡すプロパティーです。
   */
  readonly trigger?: ContextMenuTriggerProps | undefined;
};

/**
 * {@link ContextMenu} の状態です。
 */
export type ContextMenuState = ContextMenuRootState;

/**
 * {@link ContextMenu} コンポーネントのプロパティーです。
 */
export type ContextMenuProps = Omit<ContextMenuRootProps, "children" | "handle"> & {
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

  /**
   * コンテキストメニューを開く対象のコンテンツです。
   *
   * {@link ContextMenuTrigger|Trigger} の子要素として直接渡されます。
   * `trigger` 未指定で `slotProps.trigger` のみ指定した場合は、トリガーは描画されません。
   */
  trigger?: ContextMenuTriggerProps["children"] | undefined;
};

/**
 * {@link ContextMenu} の各パーツに渡すプロパティーです。
 */
export type ContextMenuPartsProps = {
  /**
   * {@link ContextMenuPopup} に渡すプロパティーです。
   */
  readonly popup: ContextMenuPopupProps;

  /**
   * {@link ContextMenuPortal} に渡すプロパティーです。
   */
  readonly portal: ContextMenuPortalProps | undefined;

  /**
   * {@link ContextMenuPositioner} に渡すプロパティーです。
   */
  readonly positioner: ContextMenuPositionerProps | undefined;

  /**
   * {@link ContextMenuRoot} に渡すプロパティーです。
   */
  readonly root: ContextMenuRootProps;

  /**
   * {@link ContextMenuTrigger} に渡すプロパティーです。
   *
   * トリガーを表示しないときは null になります。
   */
  readonly trigger: ContextMenuTriggerProps | null;
};

/**
 * {@link ContextMenu} の各パーツに渡すプロパティーを作るフックです。
 */
export function useContextMenu(props: ContextMenuProps): ContextMenuPartsProps {
  // const [handle] = React.useState(createHandle);
  const {
    trigger,
    children,
    slotProps: {
      popup: popupProps,
      portal: portalProps,
      trigger: triggerProps,
      positioner: positionerProps,
    } = {},
    ...rootProps
  } = props;

  return {
    root: {
      ...rootProps,
      // handle,
    },
    trigger:
      !!trigger || !!triggerProps
        ? {
            children: trigger!,
            ...triggerProps,
          }
        : null,
    portal: portalProps,
    positioner: positionerProps,
    popup: {
      ...popupProps,
      children,
    },
  };
}

interface ContextMenuComponentType extends IComponent<ContextMenuProps> {
  /**
   * コンテキストメニューを制御するハンドルを新しく作成します。
   *
   * 作成したハンドルは {@link ContextMenuRoot} の `handle` プロパティーに渡します。
   */
  readonly createHandle: typeof createHandle;
}

/**
 * コンテキストメニューを表示するコンポーネントです。
 *
 * 右クリックまたは長押しの対象とポップアップを組み立てます。
 * 項目の種類や構成を細かく制御する場合は、{@link ContextMenuRoot|Root} を直接組み立てます。
 */
export const ContextMenu: ContextMenuComponentType = /*#__PURE__*/ Object.assign(
  function SuiContextMenu(props: ContextMenuProps) {
    const partsProps = useContextMenu(props);

    return (
      <ContextMenuRoot {...partsProps.root}>
        {partsProps.trigger && <ContextMenuTrigger {...partsProps.trigger} />}
        <ContextMenuPortal {...partsProps.portal}>
          <ContextMenuPositioner {...partsProps.positioner}>
            <ContextMenuPopup {...partsProps.popup} />
          </ContextMenuPositioner>
        </ContextMenuPortal>
      </ContextMenuRoot>
    );
  },
  { createHandle },
);

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
