import { Toast as BaseToast } from "@base-ui/react/toast";
import * as React from "react";

import cn from "../../cn.js";
import type { Component } from "../../types.js";

import "./toast.css";

// Provider
// --------

/**
 * {@link Provider} の状態です。
 */
export type ToastProviderState = BaseToast.Provider.State;

/**
 * {@link Provider} に渡すプロパティーです。
 */
export type ToastProviderProps = BaseToast.Provider.Props;

/**
 * 通知の作成と管理を行うコンテキストを提供します。
 *
 * @example
 * ```tsx
 * <ToastParts.Provider>
 *   <App />
 * </ToastParts.Provider>
 * ```
 */
export const ToastProvider: Component<ToastProviderProps> = function SuiToastProvider(props) {
  return <BaseToast.Provider {...props} />;
};

/**
 * {@link ToastProvider} の型をまとめた名前空間です。
 */
export namespace Provider {
  /**
   * {@link ToastProvider} の状態型です。
   */
  export type State = ToastProviderState;

  /**
   * {@link ToastProvider} のプロパティー型です。
   */
  export type Props = ToastProviderProps;
}

/**
 * {@link ToastProvider} の短縮名です。
 */
export const Provider: Component<Provider.Props> = ToastProvider;

// Portal
// ------

/**
 * {@link Portal} の状態です。
 */
export type ToastPortalState = BaseToast.Portal.State;

/**
 * {@link Portal} に渡すプロパティーです。
 */
export type ToastPortalProps = BaseToast.Portal.Props;

/**
 * 通知の表示領域を DOM の別の場所へ移動する要素です。
 *
 * 既定では表示領域を `<body>` の末尾に配置します。
 *
 * @example
 * ```tsx
 * <ToastParts.Portal>
 *   <ToastParts.Viewport />
 * </ToastParts.Portal>
 * ```
 */
export const ToastPortal: Component<ToastPortalProps> = function SuiToastPortal(props) {
  const { className, ...otherProps } = props;

  return <BaseToast.Portal {...otherProps} className={cn(className, "sui_toast_portal")} />;
};

/**
 * {@link ToastPortal} の型をまとめた名前空間です。
 */
export namespace Portal {
  /**
   * {@link ToastPortal} の状態型です。
   */
  export type State = ToastPortalState;

  /**
   * {@link ToastPortal} のプロパティー型です。
   */
  export type Props = ToastPortalProps;
}

/**
 * {@link ToastPortal} の短縮名です。
 */
export const Portal: Component<Portal.Props> = ToastPortal;

// Viewport
// --------

/**
 * {@link Viewport} の状態です。
 */
export type ToastViewportState = BaseToast.Viewport.State;

/**
 * {@link Viewport} に渡すプロパティーです。
 */
export type ToastViewportProps = BaseToast.Viewport.Props;

/**
 * 通知を表示するビューポートです。
 *
 * @example
 * ```tsx
 * <ToastParts.Viewport>
 *   {toasts.map((toast) => (
 *     <ToastParts.Root key={toast.id} toast={toast} />
 *   ))}
 * </ToastParts.Viewport>
 * ```
 */
export const ToastViewport: Component<ToastViewportProps> = function SuiToastViewport(props) {
  const { className, ...otherProps } = props;

  return <BaseToast.Viewport {...otherProps} className={cn(className, "sui_toast_viewport")} />;
};

/**
 * {@link ToastViewport} の型をまとめた名前空間です。
 */
export namespace Viewport {
  /**
   * {@link ToastViewport} の状態型です。
   */
  export type State = ToastViewportState;

  /**
   * {@link ToastViewport} のプロパティー型です。
   */
  export type Props = ToastViewportProps;
}

/**
 * {@link ToastViewport} の短縮名です。
 */
export const Viewport: Component<Viewport.Props> = ToastViewport;

// Root
// ----

/**
 * {@link Root} の状態です。
 */
export type ToastRootState = BaseToast.Root.State;

/**
 * {@link Root} に渡すプロパティーです。
 *
 * @template Data 通知に含める追加データの型です。
 */
export type ToastRootProps<Data extends object = object> = Omit<BaseToast.Root.Props, "toast"> & {
  /**
   * 表示する通知オブジェクトです。
   */
  toast: BaseToast.Root.ToastObject<Data>;
};

/**
 * {@link ToastRoot} のコンポーネント型です。
 */
export interface ToastRootComponent {
  <Data extends object = object>(props: ToastRootProps<Data>): React.ReactElement | null;

  displayName?: string | undefined;
}

/**
 * 個別の通知をグループ化するルート要素です。
 *
 * `toast` は {@link useToastManager} から取得した通知オブジェクトを渡します。
 *
 * @example
 * ```tsx
 * <ToastParts.Root toast={toast}>
 *   <ToastParts.Content>
 *     <ToastParts.Title />
 *     <ToastParts.Description />
 *   </ToastParts.Content>
 * </ToastParts.Root>
 * ```
 */
export const ToastRoot: ToastRootComponent = function SuiToastRoot<Data extends object = object>(
  props: ToastRootProps<Data>,
) {
  const { className, ...otherProps } = props;

  return <BaseToast.Root {...otherProps} className={cn(className, "sui_toast")} />;
};

/**
 * {@link ToastRoot} の型をまとめた名前空間です。
 */
export namespace Root {
  /**
   * {@link ToastRoot} の状態型です。
   */
  export type State = ToastRootState;

  /**
   * {@link ToastRoot} のプロパティー型です。
   */
  export type Props<Data extends object = object> = ToastRootProps<Data>;
  export type ToastObject<Data extends object = object> = BaseToast.Root.ToastObject<Data>;
}

/**
 * {@link ToastRoot} の短縮名です。
 */
export const Root: ToastRootComponent = ToastRoot;

// Content
// -------

/**
 * {@link Content} の状態です。
 */
export type ToastContentState = BaseToast.Content.State;

/**
 * {@link Content} に渡すプロパティーです。
 */
export type ToastContentProps = BaseToast.Content.Props;

/**
 * 通知の内容をまとめるコンテナー要素です。
 *
 * @example
 * ```tsx
 * <ToastParts.Content>
 *   <ToastParts.Title />
 *   <ToastParts.Description />
 * </ToastParts.Content>
 * ```
 */
export const ToastContent: Component<ToastContentProps> = function SuiToastContent(props) {
  const { className, ...otherProps } = props;

  return <BaseToast.Content {...otherProps} className={cn(className, "sui_toast_content")} />;
};

/**
 * {@link ToastContent} の型をまとめた名前空間です。
 */
export namespace Content {
  /**
   * {@link ToastContent} の状態型です。
   */
  export type State = ToastContentState;

  /**
   * {@link ToastContent} のプロパティー型です。
   */
  export type Props = ToastContentProps;
}

/**
 * {@link ToastContent} の短縮名です。
 */
export const Content: Component<Content.Props> = ToastContent;

// Title
// -----

/**
 * {@link Title} の状態です。
 */
export type ToastTitleState = BaseToast.Title.State;

/**
 * {@link Title} に渡すプロパティーです。
 */
export type ToastTitleProps = BaseToast.Title.Props;

/**
 * 通知のタイトルを表示する見出し要素です。
 *
 * `children` を省略すると通知オブジェクトの `title` が表示されます。
 *
 * @example
 * ```tsx
 * <ToastParts.Title />
 * ```
 */
export const ToastTitle: Component<ToastTitleProps> = function SuiToastTitle(props) {
  const { className, ...otherProps } = props;

  return <BaseToast.Title {...otherProps} className={cn(className, "sui_toast_title")} />;
};

/**
 * {@link ToastTitle} の型をまとめた名前空間です。
 */
export namespace Title {
  /**
   * {@link ToastTitle} の状態型です。
   */
  export type State = ToastTitleState;

  /**
   * {@link ToastTitle} のプロパティー型です。
   */
  export type Props = ToastTitleProps;
}

/**
 * {@link ToastTitle} の短縮名です。
 */
export const Title: Component<Title.Props> = ToastTitle;

// Description
// -----------

/**
 * {@link Description} の状態です。
 */
export type ToastDescriptionState = BaseToast.Description.State;

/**
 * {@link Description} に渡すプロパティーです。
 */
export type ToastDescriptionProps = BaseToast.Description.Props;

/**
 * 通知の説明文を表示する段落要素です。
 *
 * `children` を省略すると通知オブジェクトの `description` が表示されます。
 *
 * @example
 * ```tsx
 * <ToastParts.Description />
 * ```
 */
export const ToastDescription: Component<ToastDescriptionProps> = function SuiToastDescription(
  props,
) {
  const { className, ...otherProps } = props;

  return (
    <BaseToast.Description {...otherProps} className={cn(className, "sui_toast_description")} />
  );
};

/**
 * {@link ToastDescription} の型をまとめた名前空間です。
 */
export namespace Description {
  /**
   * {@link ToastDescription} の状態型です。
   */
  export type State = ToastDescriptionState;

  /**
   * {@link ToastDescription} のプロパティー型です。
   */
  export type Props = ToastDescriptionProps;
}

/**
 * {@link ToastDescription} の短縮名です。
 */
export const Description: Component<Description.Props> = ToastDescription;

// Action
// ------

/**
 * {@link Action} の状態です。
 */
export type ToastActionState = BaseToast.Action.State;

/**
 * {@link Action} に渡すプロパティーです。
 */
export type ToastActionProps = BaseToast.Action.Props;

/**
 * 通知に設定されたアクションを実行するボタン要素です。
 *
 * 通知の `actionProps.children` がない場合はレンダリングされません。
 *
 * @example
 * ```tsx
 * <ToastParts.Action />
 * ```
 */
export const ToastAction: Component<ToastActionProps> = function SuiToastAction(props) {
  const { className, ...otherProps } = props;

  return <BaseToast.Action {...otherProps} className={cn(className, "sui_toast_action")} />;
};

/**
 * {@link ToastAction} の型をまとめた名前空間です。
 */
export namespace Action {
  /**
   * {@link ToastAction} の状態型です。
   */
  export type State = ToastActionState;

  /**
   * {@link ToastAction} のプロパティー型です。
   */
  export type Props = ToastActionProps;
}

/**
 * {@link ToastAction} の短縮名です。
 */
export const Action: Component<Action.Props> = ToastAction;

// Close
// -----

/**
 * {@link Close} の状態です。
 */
export type ToastCloseState = BaseToast.Close.State;

/**
 * {@link Close} に渡すプロパティーです。
 */
export type ToastCloseProps = BaseToast.Close.Props;

/**
 * 通知を閉じるボタン要素です。
 *
 * @example
 * ```tsx
 * <ToastParts.Close>閉じる</ToastParts.Close>
 * ```
 */
export const ToastClose: Component<ToastCloseProps> = function SuiToastClose(props) {
  const { className, ...otherProps } = props;

  return <BaseToast.Close {...otherProps} className={cn(className, "sui_toast_close")} />;
};

/**
 * {@link ToastClose} の型をまとめた名前空間です。
 */
export namespace Close {
  /**
   * {@link ToastClose} の状態型です。
   */
  export type State = ToastCloseState;

  /**
   * {@link ToastClose} のプロパティー型です。
   */
  export type Props = ToastCloseProps;
}

/**
 * {@link ToastClose} の短縮名です。
 */
export const Close: Component<Close.Props> = ToastClose;

// Positioner
// ----------

/**
 * {@link Positioner} の状態です。
 */
export type ToastPositionerState = BaseToast.Positioner.State;

/**
 * {@link Positioner} に渡すプロパティーです。
 */
export type ToastPositionerProps = BaseToast.Positioner.Props;

/**
 * 通知を特定の要素に対して配置する要素です。
 *
 * @example
 * ```tsx
 * <ToastParts.Positioner toast={toast} anchor={buttonElement}>
 *   <ToastParts.Root toast={toast}>
 *     <ToastParts.Content>
 *       <ToastParts.Description />
 *     </ToastParts.Content>
 *   </ToastParts.Root>
 * </ToastParts.Positioner>
 * ```
 */
export const ToastPositioner: Component<ToastPositionerProps> = function SuiToastPositioner(props) {
  const { className, ...otherProps } = props;

  return <BaseToast.Positioner {...otherProps} className={cn(className, "sui_toast_positioner")} />;
};

/**
 * {@link ToastPositioner} の型をまとめた名前空間です。
 */
export namespace Positioner {
  /**
   * {@link ToastPositioner} の状態型です。
   */
  export type State = ToastPositionerState;

  /**
   * {@link ToastPositioner} のプロパティー型です。
   */
  export type Props = ToastPositionerProps;
}

/**
 * {@link ToastPositioner} の短縮名です。
 */
export const Positioner: Component<Positioner.Props> = ToastPositioner;

// Arrow
// -----

/**
 * {@link Arrow} の状態です。
 */
export type ToastArrowState = BaseToast.Arrow.State;

/**
 * {@link Arrow} に渡すプロパティーです。
 */
export type ToastArrowProps = BaseToast.Arrow.Props;

/**
 * アンカーと通知をつなぐ矢印要素です。
 *
 * @example
 * ```tsx
 * <ToastParts.Arrow />
 * ```
 */
export const ToastArrow: Component<ToastArrowProps> = function SuiToastArrow(props) {
  const { className, ...otherProps } = props;

  return <BaseToast.Arrow {...otherProps} className={cn(className, "sui_toast_arrow")} />;
};

/**
 * {@link ToastArrow} の型をまとめた名前空間です。
 */
export namespace Arrow {
  /**
   * {@link ToastArrow} の状態型です。
   */
  export type State = ToastArrowState;

  /**
   * {@link ToastArrow} のプロパティー型です。
   */
  export type Props = ToastArrowProps;
}

/**
 * {@link ToastArrow} の短縮名です。
 */
export const Arrow: Component<Arrow.Props> = ToastArrow;

// Manager
// -------

/**
 * 通知を管理するフックです。
 *
 * {@link Provider} の配下で、通知一覧と追加、更新、削除の操作を取得します。
 */
export const useToastManager: typeof BaseToast.useToastManager = BaseToast.useToastManager;

/**
 * Provider の外から通知を管理するマネージャーを作成します。
 *
 * 作成したマネージャーは {@link Provider} の `toastManager` に渡します。
 *
 * @example
 * ```tsx
 * const toastManager = ToastParts.createToastManager();
 *
 * toastManager.add({ description: "保存しました。" });
 * ```
 */
export const createToastManager: typeof BaseToast.createToastManager = BaseToast.createToastManager;
