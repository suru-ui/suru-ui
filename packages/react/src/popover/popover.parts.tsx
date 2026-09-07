import { Popover } from "@base-ui/react/popover";
import * as React from "react";

import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./popover.css";

// Handle
// ------

/**
 * ポップオーバーを制御するハンドルです。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export interface PopoverHandle<TPayload = any> extends Popover.Handle<TPayload> {}

interface ICreatePopoverHandle {
  /**
   * @template TPayload トリガーが送信するデータの型です。
   * @returns ポップオーバーを制御するハンドルです。
   */
  <TPayload = any>(): PopoverHandle<TPayload>;
}

/**
 * {@link PopoverHandle} を作成する関数です。
 */
export const createPopoverHandle: ICreatePopoverHandle = function createSuiPopoverHandle() {
  return Popover.createHandle();
};

export { type PopoverHandle as Handle, createPopoverHandle as createHandle };

// Root
// ----

/**
 * {@link PopoverRoot} を命令的に操作するためのオブジェクトです。
 */
export type PopoverRootActions = Popover.Root.Actions;

/**
 * {@link PopoverRoot} の開閉状態を変更するイベントの詳細です。
 */
export type PopoverRootChangeEventDetails = Popover.Root.ChangeEventDetails;

/**
 * {@link PopoverRoot} の開閉状態を変更する理由です。
 */
export type PopoverRootChangeEventReason = Popover.Root.ChangeEventReason;

/**
 * {@link PopoverRoot} が持つ状態です。
 */
export type PopoverRootState = Popover.Root.State;

/**
 * {@link PopoverRoot} に渡す props です。
 *
 * @template TPayload トリガーから受け取るデータの型です。
 */
export type PopoverRootProps<TPayload = unknown> = Omit<Popover.Root.Props<TPayload>, "handle"> & {
  /**
   * ポップオーバーとトリガー ({@link Trigger}) を関連付けるハンドルです。
   *
   * {@link createHandle} で作成します。Root 内に {@link Trigger} を配置する場合は省略できます。
   */
  handle?: PopoverHandle<TPayload> | undefined;
};

/**
 * {@link PopoverRoot} のコンポーネント型です。
 */
export interface PopoverRootComponent extends IComponent<PopoverRootProps> {
  <TPayload = unknown>(props: PopoverRootProps<TPayload>): React.ReactElement | null;
}

/**
 * ポップオーバーのルートです。
 *
 * ポップオーバーの開閉状態を管理し、各パーツをグループ化します。
 * それ自身は HTML 要素をレンダリングしません。
 */
export const PopoverRoot: PopoverRootComponent = function SuiPopoverRoot<TPayload>(
  props: PopoverRootProps<TPayload>,
) {
  return <Popover.Root {...props} />;
};

export { PopoverRoot as Root };

export namespace Root {
  /**
   * {@link PopoverRootState}
   */
  export type State = PopoverRootState;

  /**
   * {@link PopoverRootProps}
   */
  export type Props<TPayload = unknown> = PopoverRootProps<TPayload>;

  /**
   * {@link PopoverRootActions}
   */
  export type Actions = PopoverRootActions;

  /**
   * {@link PopoverRootChangeEventDetails}
   */
  export type ChangeEventDetails = PopoverRootChangeEventDetails;

  /**
   * {@link PopoverRootChangeEventReason}
   */
  export type ChangeEventReason = PopoverRootChangeEventReason;
}

// Trigger
// -------

/**
 * {@link PopoverTrigger} が持つ状態です。
 *
 * @template TPayload トリガーから渡すデータの型です。
 */
export type PopoverTriggerState = Popover.Trigger.State;

/**
 * {@link PopoverTrigger} に渡す props です。
 *
 * @template TPayload トリガーから渡すデータの型です。
 */
export type PopoverTriggerProps<TPayload = unknown> = Omit<
  Popover.Trigger.Props<TPayload>,
  "handle" | "children" | "render"
> & {
  /**
   * ボタンとしてレンダリングする要素です。
   *
   * {@link Popover.Trigger} の `render` プロパティーと同じ型で、そのまま `render` に渡されます。
   */
  children: NonNullable<Popover.Trigger.Props<TPayload>["render"]>;

  /**
   * ポップオーバー ({@link Root}) を関連付けるハンドルです。
   *
   * {@link createHandle} で作成し、{@link Root} と共有します。Root 内に配置する場合は省略できます。
   */
  handle?: PopoverHandle<TPayload> | undefined;
};

/**
 * {@link PopoverTrigger} のコンポーネント型です。
 */
export interface PopoverTriggerComponent extends IComponent<PopoverTriggerProps> {
  <TPayload = unknown>(props: PopoverTriggerProps<TPayload>): React.ReactElement | null;
}

/**
 * ポップオーバーを開くトリガー要素です。
 *
 * 子要素は何にもラップされず、そのまま {@link Popover.Trigger} の `render` プロパティーに渡されます。
 */
export const PopoverTrigger: PopoverTriggerComponent = function SuiPopoverTrigger<TPayload>(
  props: PopoverTriggerProps<TPayload>,
) {
  const { handle, children, className, ...otherProps } = props;

  return (
    <Popover.Trigger
      {...otherProps}
      handle={handle}
      render={children}
      className={cn(className, "sui_popover_trigger")}
    />
  );
};

export { PopoverTrigger as Trigger };

export namespace Trigger {
  /**
   * {@link PopoverTriggerState}
   */
  export type State = PopoverTriggerState;

  /**
   * {@link PopoverTriggerProps}
   */
  export type Props<TPayload = unknown> = PopoverTriggerProps<TPayload>;
}

// Portal
// ------

/**
 * {@link PopoverPortal} が持つ状態です。
 */
export type PopoverPortalState = Popover.Portal.State;

/**
 * {@link PopoverPortal} に渡す props です。
 */
export type PopoverPortalProps = React.ComponentProps<typeof Popover.Portal>;

/**
 * ポップオーバーを DOM の別の場所へ移動する要素です。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const PopoverPortal: IComponent<PopoverPortalProps> = function SuiPopoverPortal(props) {
  const { className, ...otherProps } = props;

  return (
    <Popover.Portal {...otherProps} className={cn(className, "sui_popover_portal")} data-scope="" />
  );
};

export { PopoverPortal as Portal };

export namespace Portal {
  /**
   * {@link PopoverPortalState}
   */
  export type State = PopoverPortalState;

  /**
   * {@link PopoverPortalProps}
   */
  export type Props = PopoverPortalProps;
}

// Backdrop
// --------

/**
 * {@link PopoverBackdrop} が持つ状態です。
 */
export type PopoverBackdropState = Popover.Backdrop.State;

/**
 * {@link PopoverBackdrop} に渡す props です。
 */
export type PopoverBackdropProps = React.ComponentProps<typeof Popover.Backdrop>;

/**
 * ポップアップの背後に表示されるオーバーレイ要素です。
 */
export const PopoverBackdrop: IComponent<PopoverBackdropProps> = function SuiPopoverBackdrop(
  props,
) {
  const { className, ...otherProps } = props;

  return <Popover.Backdrop {...otherProps} className={cn(className, "sui_popover_backdrop")} />;
};

export { PopoverBackdrop as Backdrop };

export namespace Backdrop {
  /**
   * {@link PopoverBackdropState}
   */
  export type State = PopoverBackdropState;

  /**
   * {@link PopoverBackdropProps}
   */
  export type Props = PopoverBackdropProps;
}

// Positioner
// ----------

/**
 * {@link PopoverPositioner} が持つ状態です。
 */
export type PopoverPositionerState = Popover.Positioner.State;

/**
 * {@link PopoverPositioner} に渡す props です。
 */
export type PopoverPositionerProps = React.ComponentProps<typeof Popover.Positioner>;

/**
 * トリガーを基準にポップアップを配置する要素です。
 */
export const PopoverPositioner: IComponent<PopoverPositionerProps> = function SuiPopoverPositioner(
  props,
) {
  const { className, ...otherProps } = props;

  return <Popover.Positioner {...otherProps} className={cn(className, "sui_popover_positioner")} />;
};

export { PopoverPositioner as Positioner };

export namespace Positioner {
  /**
   * {@link PopoverPositionerState}
   */
  export type State = PopoverPositionerState;

  /**
   * {@link PopoverPositionerProps}
   */
  export type Props = PopoverPositionerProps;
}

// Popup
// -----

/**
 * {@link PopoverPopup} が持つ状態です。
 */
export type PopoverPopupState = Popover.Popup.State;

/**
 * {@link PopoverPopup} に渡す props です。
 */
export type PopoverPopupProps = React.ComponentProps<typeof Popover.Popup>;

/**
 * ポップオーバーの内容を表示するポップアップ要素です。
 */
export const PopoverPopup: IComponent<PopoverPopupProps> = function SuiPopoverPopup(props) {
  const { className, ...otherProps } = props;

  return <Popover.Popup {...otherProps} className={cn(className, "sui_popover_popup")} />;
};

export { PopoverPopup as Popup };

export namespace Popup {
  /**
   * {@link PopoverPopupState}
   */
  export type State = PopoverPopupState;

  /**
   * {@link PopoverPopupProps}
   */
  export type Props = PopoverPopupProps;
}

// Arrow
// -----

/**
 * {@link PopoverArrow} が持つ状態です。
 */
export type PopoverArrowState = Popover.Arrow.State;

/**
 * {@link PopoverArrow} に渡す props です。
 */
export type PopoverArrowProps = React.ComponentProps<typeof Popover.Arrow>;

/**
 * ポップアップとトリガーをつなぐ矢印要素です。
 */
export const PopoverArrow: IComponent<PopoverArrowProps> = function SuiPopoverArrow(props) {
  const { className, ...otherProps } = props;

  return <Popover.Arrow {...otherProps} className={cn(className, "sui_popover_arrow")} />;
};

export { PopoverArrow as Arrow };

export namespace Arrow {
  /**
   * {@link PopoverArrowState}
   */
  export type State = PopoverArrowState;

  /**
   * {@link PopoverArrowProps}
   */
  export type Props = PopoverArrowProps;
}

// Title
// -----

/**
 * {@link PopoverTitle} が持つ状態です。
 */
export type PopoverTitleState = Popover.Title.State;

/**
 * {@link PopoverTitle} に渡す props です。
 */
export type PopoverTitleProps = React.ComponentProps<typeof Popover.Title>;

/**
 * ポップオーバーのタイトルを表示する見出し要素です。
 */
export const PopoverTitle: IComponent<PopoverTitleProps> = function SuiPopoverTitle(props) {
  const { className, ...otherProps } = props;

  return <Popover.Title {...otherProps} className={cn(className, "sui_popover_title")} />;
};

export { PopoverTitle as Title };

export namespace Title {
  /**
   * {@link PopoverTitleState}
   */
  export type State = PopoverTitleState;

  /**
   * {@link PopoverTitleProps}
   */
  export type Props = PopoverTitleProps;
}

// Description
// -----------

/**
 * {@link PopoverDescription} が持つ状態です。
 */
export type PopoverDescriptionState = Popover.Description.State;

/**
 * {@link PopoverDescription} に渡す props です。
 */
export type PopoverDescriptionProps = React.ComponentProps<typeof Popover.Description>;

/**
 * ポップオーバーの説明文を表示する段落要素です。
 */
export const PopoverDescription: IComponent<PopoverDescriptionProps> =
  function SuiPopoverDescription(props) {
    const { className, ...otherProps } = props;

    return (
      <Popover.Description {...otherProps} className={cn(className, "sui_popover_description")} />
    );
  };

export { PopoverDescription as Description };

export namespace Description {
  /**
   * {@link PopoverDescriptionState}
   */
  export type State = PopoverDescriptionState;

  /**
   * {@link PopoverDescriptionProps}
   */
  export type Props = PopoverDescriptionProps;
}

// Close
// -----

/**
 * {@link PopoverClose} が持つ状態です。
 */
export type PopoverCloseState = Popover.Close.State;

/**
 * {@link PopoverClose} に渡す props です。
 */
export type PopoverCloseProps = Omit<
  React.ComponentProps<typeof Popover.Close>,
  "children" | "render"
> & {
  /**
   * ボタンとしてレンダリングする要素です。
   *
   * {@link Popover.Close} の `render` プロパティーと同じ型で、そのまま `render` に渡されます。
   */
  children: NonNullable<React.ComponentProps<typeof Popover.Close>["render"]>;
};

/**
 * ポップオーバーを閉じるボタン要素です。
 *
 * 子要素は何にもラップされず、そのまま {@link Popover.Close} の `render` プロパティーに渡されます。
 */
export const PopoverClose: IComponent<PopoverCloseProps> = function SuiPopoverClose(props) {
  const { children, className, ...otherProps } = props;

  return (
    <Popover.Close
      {...otherProps}
      render={children}
      className={cn(className, "sui_popover_close")}
    />
  );
};

export { PopoverClose as Close };

export namespace Close {
  /**
   * {@link PopoverCloseState}
   */
  export type State = PopoverCloseState;

  /**
   * {@link PopoverCloseProps}
   */
  export type Props = PopoverCloseProps;
}

// Viewport
// --------

/**
 * {@link PopoverViewport} が持つ状態です。
 */
export type PopoverViewportState = Popover.Viewport.State;

/**
 * {@link PopoverViewport} に渡す props です。
 */
export type PopoverViewportProps = React.ComponentProps<typeof Popover.Viewport>;

/**
 * 複数のトリガー間で内容を切り替えるときのアニメーション領域です。
 *
 * 1 つのポップオーバーを複数のトリガーで共有し、内容をトリガーごとに変える場合に使います。
 */
export const PopoverViewport: IComponent<PopoverViewportProps> = function SuiPopoverViewport(
  props,
) {
  const { className, ...otherProps } = props;

  return <Popover.Viewport {...otherProps} className={cn(className, "sui_popover_viewport")} />;
};

export { PopoverViewport as Viewport };

export namespace Viewport {
  /**
   * {@link PopoverViewportState}
   */
  export type State = PopoverViewportState;

  /**
   * {@link PopoverViewportProps}
   */
  export type Props = PopoverViewportProps;
}
