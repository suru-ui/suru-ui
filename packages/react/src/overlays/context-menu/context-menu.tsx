import * as React from "react";

import type { Component } from "../../types.js";
import * as ContextMenuParts from "./context-menu.parts.jsx";

/**
 * {@link ContextMenu} コンポーネントのプロパティーです。
 */
export type ContextMenuProps = Omit<ContextMenuParts.Root.Props, "children"> & {
  /**
   * コンテキストメニューを開く対象のコンテンツです。
   *
   * {@link ContextMenuParts.Trigger|Trigger} の子要素として直接渡されます。
   */
  trigger?: ContextMenuParts.Trigger.Props["children"] | undefined;

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
         * {@link ContextMenuParts.Trigger|Trigger} に渡すプロパティーです。
         */
        readonly trigger?: Omit<ContextMenuParts.Trigger.Props, "children"> | undefined;

        /**
         * {@link ContextMenuParts.Portal|Portal} に渡すプロパティーです。
         */
        readonly portal?: ContextMenuParts.Portal.Props | undefined;

        /**
         * {@link ContextMenuParts.Positioner|Positioner} に渡すプロパティーです。
         */
        readonly positioner?: ContextMenuParts.Positioner.Props | undefined;

        /**
         * {@link ContextMenuParts.Popup|Popup} に渡すプロパティーです。
         */
        readonly popup?: ContextMenuParts.Popup.Props | undefined;
      }
    | undefined;
};

/**
 * コンテキストメニューを表示するコンポーネントです。
 *
 * 右クリックまたは長押しの対象とポップアップを組み立てます。
 * 項目の種類や構成を細かく制御する場合は、{@link ContextMenuParts.Root|Root} を直接組み立てます。
 *
 * @example 基本
 * ```tsx
 * import { ContextMenu } from "@suru-ui/react/context-menu";
 * import * as ContextMenuParts from "@suru-ui/react/context-menu";
 *
 * <ContextMenu trigger={<div>右クリックしてください</div>}>
 *   <ContextMenuParts.Item>編集</ContextMenuParts.Item>
 *   <ContextMenuParts.Item>複製</ContextMenuParts.Item>
 *   <ContextMenuParts.Separator />
 *   <ContextMenuParts.Item>削除</ContextMenuParts.Item>
 * </ContextMenu>
 * ```
 */
export const ContextMenu: Component<ContextMenuProps> = function SuiContextMenu(props) {
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
    <ContextMenuParts.Root {...rootProps}>
      {trigger !== undefined && (
        <ContextMenuParts.Trigger {...triggerProps}>{trigger}</ContextMenuParts.Trigger>
      )}
      <ContextMenuParts.Portal {...portalProps}>
        <ContextMenuParts.Positioner {...positionerProps}>
          <ContextMenuParts.Popup {...popupProps}>{children}</ContextMenuParts.Popup>
        </ContextMenuParts.Positioner>
      </ContextMenuParts.Portal>
    </ContextMenuParts.Root>
  );
};
