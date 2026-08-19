import { Drawer } from "@base-ui/react/drawer";
import * as React from "react";

import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

import "./drawer.css";

// Handle
// ------

/**
 * ドロワーを制御するハンドルです。
 */
export type DrawerHandle<Payload = unknown> = Drawer.Handle<Payload>;

/**
 * ドロワーを制御するハンドルを新しく作成します。
 *
 * 作成したハンドルを {@link Root} と {@link Trigger} の `handle` プロパティーに渡すことで、トリガーとドロワーの内容を関連付けます。
 */
export const createHandle: typeof Drawer.createHandle = Drawer.createHandle;

// Provider
// --------

/**
 * {@link DrawerProvider} の状態です。
 */
export type DrawerProviderState = Drawer.Provider.State;

/**
 * {@link DrawerProvider} に渡すプロパティーです。
 */
export type DrawerProviderProps = React.ComponentProps<typeof Drawer.Provider>;

/**
 * 複数のドロワーでインデント効果などの状態を共有するプロバイダーです。
 *
 * それ自身は HTML 要素をレンダリングしません。
 */
export const DrawerProvider: IComponent<DrawerProviderProps> = function SuiDrawerProvider(props) {
  return <Drawer.Provider {...props} />;
};

/**
 * {@link DrawerProvider} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Provider {
  /**
   * {@link DrawerProviderState} です。
   */
  export type State = DrawerProviderState;

  /**
   * {@link DrawerProviderProps} です。
   */
  export type Props = DrawerProviderProps;
}

/**
 * {@link DrawerProvider} です。
 */
export const Provider: IComponent<Provider.Props> = DrawerProvider;

// IndentBackground
// ----------------

/**
 * {@link DrawerIndentBackground} の状態です。
 */
export type DrawerIndentBackgroundState = Drawer.IndentBackground.State;

/**
 * {@link DrawerIndentBackground} に渡すプロパティーです。
 */
export type DrawerIndentBackgroundProps = React.ComponentProps<typeof Drawer.IndentBackground>;

/**
 * ドロワーが開いているときの背景レイヤーです。
 *
 * {@link Provider} の子として {@link Indent} より前に配置します。
 */
export const DrawerIndentBackground: IComponent<DrawerIndentBackgroundProps> =
  function SuiDrawerIndentBackground(props) {
    const { className, ...otherProps } = props;

    return (
      <Drawer.IndentBackground
        {...otherProps}
        className={cn(className, "sui_drawer_indent_background")}
      />
    );
  };

/**
 * {@link DrawerIndentBackground} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace IndentBackground {
  /**
   * {@link DrawerIndentBackgroundState} です。
   */
  export type State = DrawerIndentBackgroundState;

  /**
   * {@link DrawerIndentBackgroundProps} です。
   */
  export type Props = DrawerIndentBackgroundProps;
}

/**
 * {@link DrawerIndentBackground} です。
 */
export const IndentBackground: IComponent<IndentBackground.Props> = DrawerIndentBackground;

// Indent
// ------

/**
 * {@link DrawerIndent} の状態です。
 */
export type DrawerIndentState = Drawer.Indent.State;

/**
 * {@link DrawerIndent} に渡すプロパティーです。
 */
export type DrawerIndentProps = React.ComponentProps<typeof Drawer.Indent>;

/**
 * アプリケーションのメイン UI を囲み、ドロワーのインデント状態を受け取る要素です。
 */
export const DrawerIndent: IComponent<DrawerIndentProps> = function SuiDrawerIndent(props) {
  const { className, ...otherProps } = props;

  return <Drawer.Indent {...otherProps} className={cn(className, "sui_drawer_indent")} />;
};

/**
 * {@link DrawerIndent} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Indent {
  /**
   * {@link DrawerIndentState} です。
   */
  export type State = DrawerIndentState;

  /**
   * {@link DrawerIndentProps} です。
   */
  export type Props = DrawerIndentProps;
}

/**
 * {@link DrawerIndent} です。
 */
export const Indent: IComponent<Indent.Props> = DrawerIndent;

// Root
// ----

/**
 * {@link DrawerRoot} の状態です。
 */
export type DrawerRootState = Drawer.Root.State;

/**
 * {@link DrawerRoot} に渡すプロパティーです。
 */
export type DrawerRootProps<Payload = unknown> = Drawer.Root.Props<Payload>;

/**
 * {@link DrawerRoot} のコンポーネント型です。
 */
export interface DrawerRootComponent extends IComponent<DrawerRootProps> {
  <Payload = unknown>(props: DrawerRootProps<Payload>): React.ReactElement | null;
}

/**
 * ドロワーのルートです。
 *
 * ドロワーの開閉状態を管理し、各パーツをグループ化します。
 * それ自身は HTML 要素をレンダリングしません。
 */
export const DrawerRoot: DrawerRootComponent = function SuiDrawerRoot<Payload>(
  props: DrawerRootProps<Payload>,
) {
  const { swipeDirection = "left", ...otherProps } = props;

  return <Drawer.Root {...otherProps} swipeDirection={swipeDirection} />;
};

/**
 * {@link DrawerRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link DrawerRootState} です。
   */
  export type State = DrawerRootState;

  /**
   * {@link DrawerRootProps} です。
   */
  export type Props<Payload = unknown> = DrawerRootProps<Payload>;
}

/**
 * {@link DrawerRoot} です。
 */
export const Root: DrawerRootComponent = DrawerRoot;

// Trigger
// -------

/**
 * {@link DrawerTrigger} の状態です。
 */
export type DrawerTriggerState = Drawer.Trigger.State;

/**
 * {@link DrawerTrigger} に渡すプロパティーです。
 */
export type DrawerTriggerProps<Payload = unknown> = Omit<
  Drawer.Trigger.Props<Payload>,
  "children" | "handle" | "render"
> & {
  /**
   * ボタンとしてレンダリングする要素です。
   *
   * {@link Drawer.Trigger} の `render` プロパティーと同じ型で、そのまま `render` に渡されます。
   */
  children: NonNullable<React.ComponentProps<typeof Drawer.Trigger>["render"]>;

  /**
   * ドロワー ({@link Root}) を関連付けるハンドルです。
   *
   * {@link createHandle} で作成し、{@link Root} と共有します。
   */
  handle: DrawerHandle<Payload>;
};

/**
 * {@link DrawerTrigger} のコンポーネント型です。
 */
export interface DrawerTriggerComponent extends IComponent<DrawerTriggerProps> {
  <Payload = unknown>(props: DrawerTriggerProps<Payload>): React.ReactElement | null;
}

/**
 * ドロワーを開くボタン要素です。
 */
export const DrawerTrigger: DrawerTriggerComponent = function SuiDrawerTrigger<Payload>(
  props: DrawerTriggerProps<Payload>,
) {
  const { children, className, ...otherProps } = props;

  return (
    <Drawer.Trigger
      {...otherProps}
      render={children}
      className={cn(className, "sui_drawer_trigger")}
    />
  );
};

/**
 * {@link DrawerTrigger} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Trigger {
  /**
   * {@link DrawerTriggerState} です。
   */
  export type State = DrawerTriggerState;

  /**
   * {@link DrawerTriggerProps} です。
   */
  export type Props<Payload = unknown> = DrawerTriggerProps<Payload>;
}

/**
 * {@link DrawerTrigger} です。
 */
export const Trigger: DrawerTriggerComponent = DrawerTrigger;

// SwipeArea
// ---------

/**
 * {@link DrawerSwipeArea} の状態です。
 */
export type DrawerSwipeAreaState = Drawer.SwipeArea.State;

/**
 * {@link DrawerSwipeArea} に渡すプロパティーです。
 */
export type DrawerSwipeAreaProps = React.ComponentProps<typeof Drawer.SwipeArea>;

/**
 * 画面端からのスワイプでドロワーを開く領域です。
 */
export const DrawerSwipeArea: IComponent<DrawerSwipeAreaProps> = function SuiDrawerSwipeArea(
  props,
) {
  const { className, ...otherProps } = props;

  return <Drawer.SwipeArea {...otherProps} className={cn(className, "sui_drawer_swipe_area")} />;
};

/**
 * {@link DrawerSwipeArea} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace SwipeArea {
  /**
   * {@link DrawerSwipeAreaState} です。
   */
  export type State = DrawerSwipeAreaState;

  /**
   * {@link DrawerSwipeAreaProps} です。
   */
  export type Props = DrawerSwipeAreaProps;
}

/**
 * {@link DrawerSwipeArea} です。
 */
export const SwipeArea: IComponent<SwipeArea.Props> = DrawerSwipeArea;

// VirtualKeyboardProvider
// -----------------------

/**
 * {@link DrawerVirtualKeyboardProvider} の状態です。
 */
export type DrawerVirtualKeyboardProviderState = Drawer.VirtualKeyboardProvider.State;

/**
 * {@link DrawerVirtualKeyboardProvider} に渡すプロパティーです。
 */
export type DrawerVirtualKeyboardProviderProps = React.ComponentProps<
  typeof Drawer.VirtualKeyboardProvider
>;

/**
 * ソフトウェアキーボードに合わせたフォーカスとスクロールを管理するプロバイダーです。
 *
 * ボトムシート内にフォームを配置するときに使用します。
 */
export const DrawerVirtualKeyboardProvider: IComponent<DrawerVirtualKeyboardProviderProps> =
  function SuiDrawerVirtualKeyboardProvider(props) {
    return <Drawer.VirtualKeyboardProvider {...props} />;
  };

/**
 * {@link DrawerVirtualKeyboardProvider} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace VirtualKeyboardProvider {
  /**
   * {@link DrawerVirtualKeyboardProviderState} です。
   */
  export type State = DrawerVirtualKeyboardProviderState;

  /**
   * {@link DrawerVirtualKeyboardProviderProps} です。
   */
  export type Props = DrawerVirtualKeyboardProviderProps;
}

/**
 * {@link DrawerVirtualKeyboardProvider} です。
 */
export const VirtualKeyboardProvider: IComponent<VirtualKeyboardProvider.Props> =
  DrawerVirtualKeyboardProvider;

// Portal
// ------

/**
 * {@link DrawerPortal} の状態です。
 */
export type DrawerPortalState = Drawer.Portal.State;

/**
 * {@link DrawerPortal} に渡すプロパティーです。
 */
export type DrawerPortalProps = React.ComponentProps<typeof Drawer.Portal>;

/**
 * ドロワーを DOM の別の場所へ移動する要素です。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const DrawerPortal: IComponent<DrawerPortalProps> = function SuiDrawerPortal(props) {
  const { className, ...otherProps } = props;

  return <Drawer.Portal {...otherProps} className={cn(className, "sui_drawer_portal")} />;
};

/**
 * {@link DrawerPortal} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Portal {
  /**
   * {@link DrawerPortalState} です。
   */
  export type State = DrawerPortalState;

  /**
   * {@link DrawerPortalProps} です。
   */
  export type Props = DrawerPortalProps;
}

/**
 * {@link DrawerPortal} です。
 */
export const Portal: IComponent<Portal.Props> = DrawerPortal;

// Backdrop
// --------

/**
 * {@link DrawerBackdrop} の状態です。
 */
export type DrawerBackdropState = Drawer.Backdrop.State;

/**
 * {@link DrawerBackdrop} に渡すプロパティーです。
 */
export type DrawerBackdropProps = React.ComponentProps<typeof Drawer.Backdrop>;

/**
 * ドロワーの背後に表示されるオーバーレイ要素です。
 */
export const DrawerBackdrop: IComponent<DrawerBackdropProps> = function SuiDrawerBackdrop(props) {
  const { className, ...otherProps } = props;

  return <Drawer.Backdrop {...otherProps} className={cn(className, "sui_drawer_backdrop")} />;
};

/**
 * {@link DrawerBackdrop} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Backdrop {
  /**
   * {@link DrawerBackdropState} です。
   */
  export type State = DrawerBackdropState;

  /**
   * {@link DrawerBackdropProps} です。
   */
  export type Props = DrawerBackdropProps;
}

/**
 * {@link DrawerBackdrop} です。
 */
export const Backdrop: IComponent<Backdrop.Props> = DrawerBackdrop;

// Viewport
// --------

/**
 * {@link DrawerViewport} の状態です。
 */
export type DrawerViewportState = Drawer.Viewport.State;

/**
 * {@link DrawerViewport} に渡すプロパティーです。
 */
export type DrawerViewportProps = React.ComponentProps<typeof Drawer.Viewport>;

/**
 * ドロワーのポップアップを配置するコンテナー要素です。
 */
export const DrawerViewport: IComponent<DrawerViewportProps> = function SuiDrawerViewport(props) {
  const { className, ...otherProps } = props;

  return <Drawer.Viewport {...otherProps} className={cn(className, "sui_drawer_viewport")} />;
};

/**
 * {@link DrawerViewport} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Viewport {
  /**
   * {@link DrawerViewportState} です。
   */
  export type State = DrawerViewportState;

  /**
   * {@link DrawerViewportProps} です。
   */
  export type Props = DrawerViewportProps;
}

/**
 * {@link DrawerViewport} です。
 */
export const Viewport: IComponent<Viewport.Props> = DrawerViewport;

// Popup
// -----

/**
 * {@link DrawerPopup} の状態です。
 */
export type DrawerPopupState = Drawer.Popup.State;

/**
 * {@link DrawerPopup} に渡すプロパティーです。
 */
export type DrawerPopupProps = React.ComponentProps<typeof Drawer.Popup>;

/**
 * ドロワーの本文を表示する要素です。
 *
 * `initialFocus` と `finalFocus` を使うと、開閉時に移動するフォーカス先を指定できます。
 */
export const DrawerPopup: IComponent<DrawerPopupProps> = function SuiDrawerPopup(props) {
  const { className, ...otherProps } = props;

  return <Drawer.Popup {...otherProps} className={cn(className, "sui_drawer_popup")} />;
};

/**
 * {@link DrawerPopup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Popup {
  /**
   * {@link DrawerPopupState} です。
   */
  export type State = DrawerPopupState;

  /**
   * {@link DrawerPopupProps} です。
   */
  export type Props = DrawerPopupProps;
}

/**
 * {@link DrawerPopup} です。
 */
export const Popup: IComponent<Popup.Props> = DrawerPopup;

// Content
// -------

/**
 * {@link DrawerContent} の状態です。
 */
export type DrawerContentState = Drawer.Content.State;

/**
 * {@link DrawerContent} に渡すプロパティーです。
 */
export type DrawerContentProps = React.ComponentProps<typeof Drawer.Content>;

/**
 * ドロワー内のテキスト選択とスワイプ操作を分けるコンテンツ要素です。
 */
export const DrawerContent: IComponent<DrawerContentProps> = function SuiDrawerContent(props) {
  const { className, ...otherProps } = props;

  return <Drawer.Content {...otherProps} className={cn(className, "sui_drawer_content")} />;
};

/**
 * {@link DrawerContent} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Content {
  /**
   * {@link DrawerContentState} です。
   */
  export type State = DrawerContentState;

  /**
   * {@link DrawerContentProps} です。
   */
  export type Props = DrawerContentProps;
}

/**
 * {@link DrawerContent} です。
 */
export const Content: IComponent<Content.Props> = DrawerContent;

// Title
// -----

/**
 * {@link DrawerTitle} の状態です。
 */
export type DrawerTitleState = Drawer.Title.State;

/**
 * {@link DrawerTitle} に渡すプロパティーです。
 */
export type DrawerTitleProps = React.ComponentProps<typeof Drawer.Title>;

/**
 * ドロワーのタイトルを表示する見出し要素です。
 */
export const DrawerTitle: IComponent<DrawerTitleProps> = function SuiDrawerTitle(props) {
  const { className, ...otherProps } = props;

  return <Drawer.Title {...otherProps} className={cn(className, "sui_drawer_title")} />;
};

/**
 * {@link DrawerTitle} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Title {
  /**
   * {@link DrawerTitleState} です。
   */
  export type State = DrawerTitleState;

  /**
   * {@link DrawerTitleProps} です。
   */
  export type Props = DrawerTitleProps;
}

/**
 * {@link DrawerTitle} です。
 */
export const Title: IComponent<Title.Props> = DrawerTitle;

// Description
// -----------

/**
 * {@link DrawerDescription} の状態です。
 */
export type DrawerDescriptionState = Drawer.Description.State;

/**
 * {@link DrawerDescription} に渡すプロパティーです。
 */
export type DrawerDescriptionProps = React.ComponentProps<typeof Drawer.Description>;

/**
 * ドロワーの説明文を表示する段落要素です。
 */
export const DrawerDescription: IComponent<DrawerDescriptionProps> = function SuiDrawerDescription(
  props,
) {
  const { className, ...otherProps } = props;

  return <Drawer.Description {...otherProps} className={cn(className, "sui_drawer_description")} />;
};

/**
 * {@link DrawerDescription} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Description {
  /**
   * {@link DrawerDescriptionState} です。
   */
  export type State = DrawerDescriptionState;

  /**
   * {@link DrawerDescriptionProps} です。
   */
  export type Props = DrawerDescriptionProps;
}

/**
 * {@link DrawerDescription} です。
 */
export const Description: IComponent<Description.Props> = DrawerDescription;

// Close
// -----

/**
 * {@link DrawerClose} の状態です。
 */
export type DrawerCloseState = Drawer.Close.State;

/**
 * {@link DrawerClose} に渡すプロパティーです。
 */
export type DrawerCloseProps = Omit<
  React.ComponentProps<typeof Drawer.Close>,
  "children" | "render"
> & {
  /**
   * ボタンとしてレンダリングする要素です。
   *
   * {@link Drawer.Close} の `render` プロパティーと同じ型で、そのまま `render` に渡されます。
   */
  children: NonNullable<React.ComponentProps<typeof Drawer.Close>["render"]>;
};

/**
 * ドロワーを閉じるボタン要素です。
 */
export const DrawerClose: IComponent<DrawerCloseProps> = function SuiDrawerClose(props) {
  const { children, className, ...otherProps } = props;

  return (
    <Drawer.Close {...otherProps} render={children} className={cn(className, "sui_drawer_close")} />
  );
};

/**
 * {@link DrawerClose} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Close {
  /**
   * {@link DrawerCloseState} です。
   */
  export type State = DrawerCloseState;

  /**
   * {@link DrawerCloseProps} です。
   */
  export type Props = DrawerCloseProps;
}

/**
 * {@link DrawerClose} です。
 */
export const Close: IComponent<Close.Props> = DrawerClose;
