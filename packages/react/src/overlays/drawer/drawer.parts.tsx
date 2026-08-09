import { Drawer } from "@base-ui/react/drawer";
import * as React from "react";

import cn from "../../cn.js";
import type { Component } from "../../types.js";

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
 * 作成したハンドルを {@link Root} と {@link Trigger} の `handle` プロパティーに渡すことで、
 * トリガーとドロワーの内容を関連付けます。
 *
 * @example
 * ```tsx
 * const handle = DrawerParts.createHandle();
 * ```
 */
export const createHandle: typeof Drawer.createHandle = Drawer.createHandle;

// Provider
// --------

/**
 * {@link Provider} の状態です。
 */
export type DrawerProviderState = Drawer.Provider.State;

/**
 * {@link Provider} に渡すプロパティーです。
 */
export type DrawerProviderProps = React.ComponentProps<typeof Drawer.Provider>;

/**
 * 複数のドロワーでインデント効果などの状態を共有するプロバイダーです。
 *
 * それ自身は HTML 要素をレンダリングしません。
 *
 * @example
 * ```tsx
 * <DrawerParts.Provider>
 *   <DrawerParts.IndentBackground />
 *   <DrawerParts.Indent>アプリケーション</DrawerParts.Indent>
 * </DrawerParts.Provider>
 * ```
 */
export const DrawerProvider: Component<DrawerProviderProps> = function SuiDrawerProvider(props) {
  return <Drawer.Provider {...props} />;
};

/**
 * {@link DrawerProvider} の型をまとめた名前空間です。
 */
export namespace Provider {
  export type State = DrawerProviderState;
  export type Props = DrawerProviderProps;
}

/**
 * {@link DrawerProvider} の短縮名です。
 */
export const Provider: Component<Provider.Props> = DrawerProvider;

// IndentBackground
// ----------------

/**
 * {@link IndentBackground} の状態です。
 */
export type DrawerIndentBackgroundState = Drawer.IndentBackground.State;

/**
 * {@link IndentBackground} に渡すプロパティーです。
 */
export type DrawerIndentBackgroundProps = React.ComponentProps<typeof Drawer.IndentBackground>;

/**
 * ドロワーが開いているときの背景レイヤーです。
 *
 * {@link Provider} の子として {@link Indent} より前に配置します。
 *
 * @example
 * ```tsx
 * <DrawerParts.IndentBackground />
 * ```
 */
export const DrawerIndentBackground: Component<DrawerIndentBackgroundProps> =
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
 * {@link DrawerIndentBackground} の型をまとめた名前空間です。
 */
export namespace IndentBackground {
  export type State = DrawerIndentBackgroundState;
  export type Props = DrawerIndentBackgroundProps;
}

/**
 * {@link DrawerIndentBackground} の短縮名です。
 */
export const IndentBackground: Component<IndentBackground.Props> = DrawerIndentBackground;

// Indent
// ------

/**
 * {@link Indent} の状態です。
 */
export type DrawerIndentState = Drawer.Indent.State;

/**
 * {@link Indent} に渡すプロパティーです。
 */
export type DrawerIndentProps = React.ComponentProps<typeof Drawer.Indent>;

/**
 * アプリケーションのメイン UI を囲み、ドロワーのインデント状態を受け取る要素です。
 *
 * @example
 * ```tsx
 * <DrawerParts.Indent>アプリケーション</DrawerParts.Indent>
 * ```
 */
export const DrawerIndent: Component<DrawerIndentProps> = function SuiDrawerIndent(props) {
  const { className, ...otherProps } = props;

  return <Drawer.Indent {...otherProps} className={cn(className, "sui_drawer_indent")} />;
};

/**
 * {@link DrawerIndent} の型をまとめた名前空間です。
 */
export namespace Indent {
  export type State = DrawerIndentState;
  export type Props = DrawerIndentProps;
}

/**
 * {@link DrawerIndent} の短縮名です。
 */
export const Indent: Component<Indent.Props> = DrawerIndent;

// SwipeDirection
// --------------

/**
 * ドロワーが表示され、スワイプで閉じられる方向です。
 */
export type DrawerSwipeDirection = "up" | "down" | "left" | "right";

// Root
// ----

/**
 * {@link Root} の状態です。
 */
export type DrawerRootState = Drawer.Root.State;

/**
 * {@link Root} に渡すプロパティーです。
 */
export type DrawerRootProps<Payload = unknown> = Omit<
  Drawer.Root.Props<Payload>,
  "handle" | "swipeDirection"
> & {
  /**
   * ドロワーが表示され、スワイプで閉じられる方向です。
   *
   * - `"up"`: 上端から表示する
   * - `"down"`: 下端から表示する
   * - `"left"`: 左端から表示する
   * - `"right"`: 右端から表示する
   *
   * @default "left"
   */
  swipeDirection?: DrawerSwipeDirection | undefined;

  /**
   * ドロワーとトリガー ({@link Trigger}) を関連付けるハンドルです。
   *
   * {@link createHandle} で作成します。
   */
  handle: DrawerHandle<Payload>;
};

/**
 * {@link DrawerRoot} のコンポーネント型です。
 */
export interface DrawerRootComponent {
  <Payload = unknown>(props: DrawerRootProps<Payload>): React.ReactElement | null;

  displayName?: string | undefined;
}

/**
 * ドロワーのルートです。
 *
 * ドロワーの開閉状態を管理し、各パーツをグループ化します。
 * それ自身は HTML 要素をレンダリングしません。
 *
 * @example
 * ```tsx
 * const handle = DrawerParts.createHandle();
 *
 * <DrawerParts.Root handle={handle}>
 *   <DrawerParts.Trigger handle={handle}>開く</DrawerParts.Trigger>
 *   <DrawerParts.Portal>
 *     <DrawerParts.Viewport>
 *       <DrawerParts.Popup>
 *         <DrawerParts.Content>
 *           <DrawerParts.Title>通知</DrawerParts.Title>
 *         </DrawerParts.Content>
 *       </DrawerParts.Popup>
 *     </DrawerParts.Viewport>
 *   </DrawerParts.Portal>
 * </DrawerParts.Root>
 * ```
 */
export const DrawerRoot: DrawerRootComponent = function SuiDrawerRoot<Payload>(
  props: DrawerRootProps<Payload>,
) {
  const { swipeDirection = "left", ...otherProps } = props;

  return <Drawer.Root {...otherProps} swipeDirection={swipeDirection} />;
};

/**
 * {@link DrawerRoot} の型をまとめた名前空間です。
 */
export namespace Root {
  export type State = DrawerRootState;
  export type Props<Payload = unknown> = DrawerRootProps<Payload>;
}

/**
 * {@link DrawerRoot} の短縮名です。
 */
export const Root: DrawerRootComponent = DrawerRoot;

// Trigger
// -------

/**
 * {@link Trigger} の状態です。
 */
export type DrawerTriggerState = Drawer.Trigger.State;

/**
 * {@link Trigger} に渡すプロパティーです。
 */
export type DrawerTriggerProps<Payload = unknown> = Omit<
  Drawer.Trigger.Props<Payload>,
  "handle"
> & {
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
export interface DrawerTriggerComponent {
  <Payload = unknown>(props: DrawerTriggerProps<Payload>): React.ReactElement | null;

  displayName?: string | undefined;
}

/**
 * ドロワーを開くボタン要素です。
 *
 * @example
 * ```tsx
 * <DrawerParts.Trigger handle={handle}>通知を見る</DrawerParts.Trigger>
 * ```
 */
export const DrawerTrigger: DrawerTriggerComponent = function SuiDrawerTrigger<Payload>(
  props: DrawerTriggerProps<Payload>,
) {
  const { className, ...otherProps } = props;

  return <Drawer.Trigger {...otherProps} className={cn(className, "sui_drawer_trigger")} />;
};

/**
 * {@link DrawerTrigger} の型をまとめた名前空間です。
 */
export namespace Trigger {
  export type State = DrawerTriggerState;
  export type Props<Payload = unknown> = DrawerTriggerProps<Payload>;
}

/**
 * {@link DrawerTrigger} の短縮名です。
 */
export const Trigger: DrawerTriggerComponent = DrawerTrigger;

// SwipeArea
// ---------

/**
 * {@link SwipeArea} の状態です。
 */
export type DrawerSwipeAreaState = Drawer.SwipeArea.State;

/**
 * {@link SwipeArea} に渡すプロパティーです。
 */
export type DrawerSwipeAreaProps = React.ComponentProps<typeof Drawer.SwipeArea>;

/**
 * 画面端からのスワイプでドロワーを開く領域です。
 *
 * @example
 * ```tsx
 * <DrawerParts.SwipeArea aria-label="ドロワーを開く" />
 * ```
 */
export const DrawerSwipeArea: Component<DrawerSwipeAreaProps> = function SuiDrawerSwipeArea(props) {
  const { className, ...otherProps } = props;

  return <Drawer.SwipeArea {...otherProps} className={cn(className, "sui_drawer_swipe_area")} />;
};

/**
 * {@link DrawerSwipeArea} の型をまとめた名前空間です。
 */
export namespace SwipeArea {
  export type State = DrawerSwipeAreaState;
  export type Props = DrawerSwipeAreaProps;
}

/**
 * {@link DrawerSwipeArea} の短縮名です。
 */
export const SwipeArea: Component<SwipeArea.Props> = DrawerSwipeArea;

// VirtualKeyboardProvider
// -----------------------

/**
 * {@link VirtualKeyboardProvider} の状態です。
 */
export type DrawerVirtualKeyboardProviderState = Drawer.VirtualKeyboardProvider.State;

/**
 * {@link VirtualKeyboardProvider} に渡すプロパティーです。
 */
export type DrawerVirtualKeyboardProviderProps = React.ComponentProps<
  typeof Drawer.VirtualKeyboardProvider
>;

/**
 * ソフトウェアキーボードに合わせたフォーカスとスクロールを管理するプロバイダーです。
 *
 * ボトムシート内にフォームを配置するときに使用します。
 *
 * @example
 * ```tsx
 * <DrawerParts.VirtualKeyboardProvider>
 *   <DrawerParts.Portal>…</DrawerParts.Portal>
 * </DrawerParts.VirtualKeyboardProvider>
 * ```
 */
export const DrawerVirtualKeyboardProvider: Component<DrawerVirtualKeyboardProviderProps> =
  function SuiDrawerVirtualKeyboardProvider(props) {
    return <Drawer.VirtualKeyboardProvider {...props} />;
  };

/**
 * {@link DrawerVirtualKeyboardProvider} の型をまとめた名前空間です。
 */
export namespace VirtualKeyboardProvider {
  export type State = DrawerVirtualKeyboardProviderState;
  export type Props = DrawerVirtualKeyboardProviderProps;
}

/**
 * {@link DrawerVirtualKeyboardProvider} の短縮名です。
 */
export const VirtualKeyboardProvider: Component<VirtualKeyboardProvider.Props> =
  DrawerVirtualKeyboardProvider;

// Portal
// ------

/**
 * {@link Portal} の状態です。
 */
export type DrawerPortalState = Drawer.Portal.State;

/**
 * {@link Portal} に渡すプロパティーです。
 */
export type DrawerPortalProps = React.ComponentProps<typeof Drawer.Portal>;

/**
 * ドロワーを DOM の別の場所へ移動する要素です。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 *
 * @example
 * ```tsx
 * <DrawerParts.Portal>
 *   <DrawerParts.Viewport>…</DrawerParts.Viewport>
 * </DrawerParts.Portal>
 * ```
 */
export const DrawerPortal: Component<DrawerPortalProps> = function SuiDrawerPortal(props) {
  const { className, ...otherProps } = props;

  return <Drawer.Portal {...otherProps} className={cn(className, "sui_drawer_portal")} />;
};

/**
 * {@link DrawerPortal} の型をまとめた名前空間です。
 */
export namespace Portal {
  export type State = DrawerPortalState;
  export type Props = DrawerPortalProps;
}

/**
 * {@link DrawerPortal} の短縮名です。
 */
export const Portal: Component<Portal.Props> = DrawerPortal;

// Backdrop
// --------

/**
 * {@link Backdrop} の状態です。
 */
export type DrawerBackdropState = Drawer.Backdrop.State;

/**
 * {@link Backdrop} に渡すプロパティーです。
 */
export type DrawerBackdropProps = React.ComponentProps<typeof Drawer.Backdrop>;

/**
 * ドロワーの背後に表示されるオーバーレイ要素です。
 *
 * @example
 * ```tsx
 * <DrawerParts.Backdrop />
 * ```
 */
export const DrawerBackdrop: Component<DrawerBackdropProps> = function SuiDrawerBackdrop(props) {
  const { className, ...otherProps } = props;

  return <Drawer.Backdrop {...otherProps} className={cn(className, "sui_drawer_backdrop")} />;
};

/**
 * {@link DrawerBackdrop} の型をまとめた名前空間です。
 */
export namespace Backdrop {
  export type State = DrawerBackdropState;
  export type Props = DrawerBackdropProps;
}

/**
 * {@link DrawerBackdrop} の短縮名です。
 */
export const Backdrop: Component<Backdrop.Props> = DrawerBackdrop;

// Viewport
// --------

/**
 * {@link Viewport} の状態です。
 */
export type DrawerViewportState = Drawer.Viewport.State;

/**
 * {@link Viewport} に渡すプロパティーです。
 */
export type DrawerViewportProps = React.ComponentProps<typeof Drawer.Viewport>;

/**
 * ドロワーのポップアップを配置するコンテナー要素です。
 *
 * @example
 * ```tsx
 * <DrawerParts.Viewport>
 *   <DrawerParts.Popup>…</DrawerParts.Popup>
 * </DrawerParts.Viewport>
 * ```
 */
export const DrawerViewport: Component<DrawerViewportProps> = function SuiDrawerViewport(props) {
  const { className, ...otherProps } = props;

  return <Drawer.Viewport {...otherProps} className={cn(className, "sui_drawer_viewport")} />;
};

/**
 * {@link DrawerViewport} の型をまとめた名前空間です。
 */
export namespace Viewport {
  export type State = DrawerViewportState;
  export type Props = DrawerViewportProps;
}

/**
 * {@link DrawerViewport} の短縮名です。
 */
export const Viewport: Component<Viewport.Props> = DrawerViewport;

// Popup
// -----

/**
 * {@link Popup} の状態です。
 */
export type DrawerPopupState = Drawer.Popup.State;

/**
 * {@link Popup} に渡すプロパティーです。
 */
export type DrawerPopupProps = React.ComponentProps<typeof Drawer.Popup>;

/**
 * ドロワーの本文を表示する要素です。
 *
 * `initialFocus` と `finalFocus` を使うと、開閉時に移動するフォーカス先を指定できます。
 *
 * @example
 * ```tsx
 * <DrawerParts.Popup>
 *   <DrawerParts.Content>…</DrawerParts.Content>
 * </DrawerParts.Popup>
 * ```
 */
export const DrawerPopup: Component<DrawerPopupProps> = function SuiDrawerPopup(props) {
  const { className, ...otherProps } = props;

  return <Drawer.Popup {...otherProps} className={cn(className, "sui_drawer_popup")} />;
};

/**
 * {@link DrawerPopup} の型をまとめた名前空間です。
 */
export namespace Popup {
  export type State = DrawerPopupState;
  export type Props = DrawerPopupProps;
}

/**
 * {@link DrawerPopup} の短縮名です。
 */
export const Popup: Component<Popup.Props> = DrawerPopup;

// Content
// -------

/**
 * {@link Content} の状態です。
 */
export type DrawerContentState = Drawer.Content.State;

/**
 * {@link Content} に渡すプロパティーです。
 */
export type DrawerContentProps = React.ComponentProps<typeof Drawer.Content>;

/**
 * ドロワー内のテキスト選択とスワイプ操作を分けるコンテンツ要素です。
 *
 * @example
 * ```tsx
 * <DrawerParts.Content>通知はありません。</DrawerParts.Content>
 * ```
 */
export const DrawerContent: Component<DrawerContentProps> = function SuiDrawerContent(props) {
  const { className, ...otherProps } = props;

  return <Drawer.Content {...otherProps} className={cn(className, "sui_drawer_content")} />;
};

/**
 * {@link DrawerContent} の型をまとめた名前空間です。
 */
export namespace Content {
  export type State = DrawerContentState;
  export type Props = DrawerContentProps;
}

/**
 * {@link DrawerContent} の短縮名です。
 */
export const Content: Component<Content.Props> = DrawerContent;

// Title
// -----

/**
 * {@link Title} の状態です。
 */
export type DrawerTitleState = Drawer.Title.State;

/**
 * {@link Title} に渡すプロパティーです。
 */
export type DrawerTitleProps = React.ComponentProps<typeof Drawer.Title>;

/**
 * ドロワーのタイトルを表示する見出し要素です。
 *
 * @example
 * ```tsx
 * <DrawerParts.Title>通知</DrawerParts.Title>
 * ```
 */
export const DrawerTitle: Component<DrawerTitleProps> = function SuiDrawerTitle(props) {
  const { className, ...otherProps } = props;

  return <Drawer.Title {...otherProps} className={cn(className, "sui_drawer_title")} />;
};

/**
 * {@link DrawerTitle} の型をまとめた名前空間です。
 */
export namespace Title {
  export type State = DrawerTitleState;
  export type Props = DrawerTitleProps;
}

/**
 * {@link DrawerTitle} の短縮名です。
 */
export const Title: Component<Title.Props> = DrawerTitle;

// Description
// -----------

/**
 * {@link Description} の状態です。
 */
export type DrawerDescriptionState = Drawer.Description.State;

/**
 * {@link Description} に渡すプロパティーです。
 */
export type DrawerDescriptionProps = React.ComponentProps<typeof Drawer.Description>;

/**
 * ドロワーの説明文を表示する段落要素です。
 *
 * @example
 * ```tsx
 * <DrawerParts.Description>新しい通知はありません。</DrawerParts.Description>
 * ```
 */
export const DrawerDescription: Component<DrawerDescriptionProps> = function SuiDrawerDescription(
  props,
) {
  const { className, ...otherProps } = props;

  return <Drawer.Description {...otherProps} className={cn(className, "sui_drawer_description")} />;
};

/**
 * {@link DrawerDescription} の型をまとめた名前空間です。
 */
export namespace Description {
  export type State = DrawerDescriptionState;
  export type Props = DrawerDescriptionProps;
}

/**
 * {@link DrawerDescription} の短縮名です。
 */
export const Description: Component<Description.Props> = DrawerDescription;

// Close
// -----

/**
 * {@link Close} の状態です。
 */
export type DrawerCloseState = Drawer.Close.State;

/**
 * {@link Close} に渡すプロパティーです。
 */
export type DrawerCloseProps = React.ComponentProps<typeof Drawer.Close>;

/**
 * ドロワーを閉じるボタン要素です。
 *
 * @example
 * ```tsx
 * <DrawerParts.Close>閉じる</DrawerParts.Close>
 * ```
 */
export const DrawerClose: Component<DrawerCloseProps> = function SuiDrawerClose(props) {
  const { className, ...otherProps } = props;

  return <Drawer.Close {...otherProps} className={cn(className, "sui_drawer_close")} />;
};

/**
 * {@link DrawerClose} の型をまとめた名前空間です。
 */
export namespace Close {
  export type State = DrawerCloseState;
  export type Props = DrawerCloseProps;
}

/**
 * {@link DrawerClose} の短縮名です。
 */
export const Close: Component<Close.Props> = DrawerClose;
