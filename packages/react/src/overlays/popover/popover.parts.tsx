import { Popover } from "@base-ui/react/popover";
import * as React from "react";

import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

import "./popover.css";

// Handle
// ------

/**
 * ポップオーバーを制御するハンドルです。
 */
export type PopoverHandle<TPayload = unknown> = Popover.Handle<TPayload>;

/**
 * ポップオーバーを制御するハンドルを新しく作成します。
 *
 * 作成したハンドルを {@link Root} と {@link Trigger} の `handle` プロパティーに渡すことで、トリガーとポップオーバーの内容を関連付けます。
 */
export const createHandle: typeof Popover.createHandle = Popover.createHandle;

// Root
// ----

/**
 * {@link PopoverRoot} の状態です。
 */
export type PopoverRootState = Popover.Root.State;

/**
 * {@link PopoverRoot} に渡すプロパティーです。
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

/**
 * {@link PopoverRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link PopoverRootState} です。
   */
  export type State = PopoverRootState;

  /**
   * {@link PopoverRootProps} です。
   */
  export type Props<TPayload = unknown> = PopoverRootProps<TPayload>;
}

/**
 * {@link PopoverRoot} です。
 */
export const Root: PopoverRootComponent = PopoverRoot;

// Trigger
// -------

/**
 * {@link PopoverTrigger} の状態です。
 *
 * @template TPayload トリガーから渡すデータの型です。
 */
export type PopoverTriggerState = Popover.Trigger.State;

/**
 * {@link PopoverTrigger} に渡すプロパティーです。
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

/**
 * {@link PopoverTrigger} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Trigger {
  /**
   * {@link PopoverTriggerState} です。
   */
  export type State = PopoverTriggerState;

  /**
   * {@link PopoverTriggerProps} です。
   */
  export type Props<TPayload = unknown> = PopoverTriggerProps<TPayload>;
}

/**
 * {@link PopoverTrigger} です。
 */
export const Trigger: PopoverTriggerComponent = PopoverTrigger;

// Portal
// ------

/**
 * {@link PopoverPortal} の状態です。
 */
export type PopoverPortalState = Popover.Portal.State;

/**
 * {@link PopoverPortal} に渡すプロパティーです。
 */
export type PopoverPortalProps = React.ComponentProps<typeof Popover.Portal>;

/**
 * ポップオーバーを DOM の別の場所へ移動する要素です。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const PopoverPortal: IComponent<PopoverPortalProps> = function SuiPopoverPortal(props) {
  const { className, ...otherProps } = props;

  return <Popover.Portal {...otherProps} className={cn(className, "sui_popover_portal")} />;
};

/**
 * {@link PopoverPortal} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Portal {
  /**
   * {@link PopoverPortalState} です。
   */
  export type State = PopoverPortalState;

  /**
   * {@link PopoverPortalProps} です。
   */
  export type Props = PopoverPortalProps;
}

/**
 * {@link PopoverPortal} です。
 */
export const Portal: IComponent<Portal.Props> = PopoverPortal;

// Backdrop
// --------

/**
 * {@link PopoverBackdrop} の状態です。
 */
export type PopoverBackdropState = Popover.Backdrop.State;

/**
 * {@link PopoverBackdrop} に渡すプロパティーです。
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

/**
 * {@link PopoverBackdrop} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Backdrop {
  /**
   * {@link PopoverBackdropState} です。
   */
  export type State = PopoverBackdropState;

  /**
   * {@link PopoverBackdropProps} です。
   */
  export type Props = PopoverBackdropProps;
}

/**
 * {@link PopoverBackdrop} です。
 */
export const Backdrop: IComponent<Backdrop.Props> = PopoverBackdrop;

// Positioner
// ----------

/**
 * {@link PopoverPositioner} の状態です。
 */
export type PopoverPositionerState = Popover.Positioner.State;

/**
 * {@link PopoverPositioner} に渡すプロパティーです。
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

/**
 * {@link PopoverPositioner} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Positioner {
  /**
   * {@link PopoverPositionerState} です。
   */
  export type State = PopoverPositionerState;

  /**
   * {@link PopoverPositionerProps} です。
   */
  export type Props = PopoverPositionerProps;
}

/**
 * {@link PopoverPositioner} です。
 */
export const Positioner: IComponent<Positioner.Props> = PopoverPositioner;

// Popup
// -----

/**
 * {@link PopoverPopup} の状態です。
 */
export type PopoverPopupState = Popover.Popup.State;

/**
 * {@link PopoverPopup} に渡すプロパティーです。
 */
export type PopoverPopupProps = React.ComponentProps<typeof Popover.Popup>;

/**
 * ポップオーバーの内容を表示するポップアップ要素です。
 */
export const PopoverPopup: IComponent<PopoverPopupProps> = function SuiPopoverPopup(props) {
  const { className, ...otherProps } = props;

  return <Popover.Popup {...otherProps} className={cn(className, "sui_popover_popup")} />;
};

/**
 * {@link PopoverPopup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Popup {
  /**
   * {@link PopoverPopupState} です。
   */
  export type State = PopoverPopupState;

  /**
   * {@link PopoverPopupProps} です。
   */
  export type Props = PopoverPopupProps;
}

/**
 * {@link PopoverPopup} です。
 */
export const Popup: IComponent<Popup.Props> = PopoverPopup;

// Arrow
// -----

/**
 * {@link PopoverArrow} の状態です。
 */
export type PopoverArrowState = Popover.Arrow.State;

/**
 * {@link PopoverArrow} に渡すプロパティーです。
 */
export type PopoverArrowProps = React.ComponentProps<typeof Popover.Arrow>;

/**
 * ポップアップとトリガーをつなぐ矢印要素です。
 */
export const PopoverArrow: IComponent<PopoverArrowProps> = function SuiPopoverArrow(props) {
  const { className, ...otherProps } = props;

  return <Popover.Arrow {...otherProps} className={cn(className, "sui_popover_arrow")} />;
};

/**
 * {@link PopoverArrow} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Arrow {
  /**
   * {@link PopoverArrowState} です。
   */
  export type State = PopoverArrowState;

  /**
   * {@link PopoverArrowProps} です。
   */
  export type Props = PopoverArrowProps;
}

/**
 * {@link PopoverArrow} です。
 */
export const Arrow: IComponent<Arrow.Props> = PopoverArrow;

// Title
// -----

/**
 * {@link PopoverTitle} の状態です。
 */
export type PopoverTitleState = Popover.Title.State;

/**
 * {@link PopoverTitle} に渡すプロパティーです。
 */
export type PopoverTitleProps = React.ComponentProps<typeof Popover.Title>;

/**
 * ポップオーバーのタイトルを表示する見出し要素です。
 */
export const PopoverTitle: IComponent<PopoverTitleProps> = function SuiPopoverTitle(props) {
  const { className, ...otherProps } = props;

  return <Popover.Title {...otherProps} className={cn(className, "sui_popover_title")} />;
};

/**
 * {@link PopoverTitle} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Title {
  /**
   * {@link PopoverTitleState} です。
   */
  export type State = PopoverTitleState;

  /**
   * {@link PopoverTitleProps} です。
   */
  export type Props = PopoverTitleProps;
}

/**
 * {@link PopoverTitle} です。
 */
export const Title: IComponent<Title.Props> = PopoverTitle;

// Description
// -----------

/**
 * {@link PopoverDescription} の状態です。
 */
export type PopoverDescriptionState = Popover.Description.State;

/**
 * {@link PopoverDescription} に渡すプロパティーです。
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

/**
 * {@link PopoverDescription} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Description {
  /**
   * {@link PopoverDescriptionState} です。
   */
  export type State = PopoverDescriptionState;

  /**
   * {@link PopoverDescriptionProps} です。
   */
  export type Props = PopoverDescriptionProps;
}

/**
 * {@link PopoverDescription} です。
 */
export const Description: IComponent<Description.Props> = PopoverDescription;

// Close
// -----

/**
 * {@link PopoverClose} の状態です。
 */
export type PopoverCloseState = Popover.Close.State;

/**
 * {@link PopoverClose} に渡すプロパティーです。
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

/**
 * {@link PopoverClose} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Close {
  /**
   * {@link PopoverCloseState} です。
   */
  export type State = PopoverCloseState;

  /**
   * {@link PopoverCloseProps} です。
   */
  export type Props = PopoverCloseProps;
}

/**
 * {@link PopoverClose} です。
 */
export const Close: IComponent<Close.Props> = PopoverClose;

// Viewport
// --------

/**
 * {@link PopoverViewport} の状態です。
 */
export type PopoverViewportState = Popover.Viewport.State;

/**
 * {@link PopoverViewport} に渡すプロパティーです。
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

/**
 * {@link PopoverViewport} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Viewport {
  /**
   * {@link PopoverViewportState} です。
   */
  export type State = PopoverViewportState;

  /**
   * {@link PopoverViewportProps} です。
   */
  export type Props = PopoverViewportProps;
}

/**
 * {@link PopoverViewport} です。
 */
export const Viewport: IComponent<Viewport.Props> = PopoverViewport;
