import { Toast } from "@base-ui/react/toast";
import * as React from "react";

import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./toast.css";

// Provider
// --------

/**
 * {@link ToastProvider} が持つ状態です。
 */
export type ToastProviderState = Toast.Provider.State;

/**
 * {@link ToastProvider} に渡す props です。
 */
export type ToastProviderProps = React.ComponentProps<typeof Toast.Provider>;

/**
 * 通知の作成と管理を行うコンテキストを提供します。
 */
export const ToastProvider: IComponent<ToastProviderProps> = function SuiToastProvider(props) {
  return <Toast.Provider {...props} />;
};

export { ToastProvider as Provider };

export namespace Provider {
  /**
   * {@link ToastProviderState}
   */
  export type State = ToastProviderState;

  /**
   * {@link ToastProviderProps}
   */
  export type Props = ToastProviderProps;
}

// Portal
// ------

/**
 * {@link ToastPortal} が持つ状態です。
 */
export type ToastPortalState = Toast.Portal.State;

/**
 * {@link ToastPortal} に渡す props です。
 */
export type ToastPortalProps = React.ComponentProps<typeof Toast.Portal>;

/**
 * 通知の表示領域を DOM の別の場所へ移動する要素です。
 *
 * 既定では表示領域を `<body>` の末尾に配置します。
 */
export const ToastPortal: IComponent<ToastPortalProps> = function SuiToastPortal(props) {
  const { className, ...otherProps } = props;

  return (
    <Toast.Portal {...otherProps} className={cn(className, "sui_toast_portal")} data-scope="" />
  );
};

export { ToastPortal as Portal };

export namespace Portal {
  /**
   * {@link ToastPortalState}
   */
  export type State = ToastPortalState;

  /**
   * {@link ToastPortalProps}
   */
  export type Props = ToastPortalProps;
}

// Viewport
// --------

/**
 * {@link ToastViewport} が持つ状態です。
 */
export type ToastViewportState = Toast.Viewport.State;

/**
 * {@link ToastViewport} に渡す props です。
 */
export type ToastViewportProps = React.ComponentProps<typeof Toast.Viewport>;

/**
 * 通知を表示するビューポートです。
 */
export const ToastViewport: IComponent<ToastViewportProps> = function SuiToastViewport(props) {
  const { className, ...otherProps } = props;

  return <Toast.Viewport {...otherProps} className={cn(className, "sui_toast_viewport")} />;
};

export { ToastViewport as Viewport };

export namespace Viewport {
  /**
   * {@link ToastViewportState}
   */
  export type State = ToastViewportState;

  /**
   * {@link ToastViewportProps}
   */
  export type Props = ToastViewportProps;
}

// Root
// ----

/**
 * {@link ToastRoot} に渡す通知オブジェクトの型です。
 *
 * @template TData 通知に含める追加データの型です。
 */
export type ToastRootToastObject<TData extends object = object> = Toast.Root.ToastObject<TData>;

/**
 * {@link ToastRoot} が持つ状態です。
 */
export type ToastRootState = Toast.Root.State;

/**
 * {@link ToastRoot} に渡す props です。
 *
 * @template TData 通知に含める追加データの型です。
 */
export type ToastRootProps<TData extends object = object> = Omit<
  React.ComponentProps<typeof Toast.Root>,
  "toast"
> & {
  /**
   * 表示する通知オブジェクトです。
   */
  toast: ToastRootToastObject<TData>;
};

/**
 * {@link ToastRoot} のコンポーネント型です。
 */
export interface ToastRootComponent extends IComponent<ToastRootProps> {
  /**
   * @template TData 通知に含める追加データの型です。
   */
  <TData extends object = object>(props: ToastRootProps<TData>): React.ReactElement | null;
}

/**
 * 個別の通知をグループ化するルート要素です。
 *
 * `toast` は {@link useToastManager} から取得した通知オブジェクトを渡します。
 */
export const ToastRoot: ToastRootComponent = function SuiToastRoot<TData extends object = object>(
  props: ToastRootProps<TData>,
) {
  const { className, ...otherProps } = props;

  return (
    <Toast.Root
      {...otherProps}
      className={cn(
        className,
        "sui_toast",
        (state) =>
          state.transitionStatus !== undefined &&
          `sui_toast-transition_status_${state.transitionStatus}`,
        (state) => state.type !== undefined && `sui_toast-type_${state.type}`,
      )}
    />
  );
};

export { ToastRoot as Root };

export namespace Root {
  /**
   * {@link ToastRootState}
   */
  export type State = ToastRootState;

  /**
   * {@link ToastRootProps}
   */
  export type Props<TData extends object = object> = ToastRootProps<TData>;

  /**
   * {@link ToastRootToastObject}
   */
  export type ToastObject<TData extends object = object> = ToastRootToastObject<TData>;
}

// Content
// -------

/**
 * {@link ToastContent} が持つ状態です。
 */
export type ToastContentState = Toast.Content.State;

/**
 * {@link ToastContent} に渡す props です。
 */
export type ToastContentProps = React.ComponentProps<typeof Toast.Content>;

/**
 * 通知の内容をまとめるコンテナー要素です。
 */
export const ToastContent: IComponent<ToastContentProps> = function SuiToastContent(props) {
  const { className, ...otherProps } = props;

  return <Toast.Content {...otherProps} className={cn(className, "sui_toast_content")} />;
};

export { ToastContent as Content };

export namespace Content {
  /**
   * {@link ToastContentState}
   */
  export type State = ToastContentState;

  /**
   * {@link ToastContentProps}
   */
  export type Props = ToastContentProps;
}

// Title
// -----

/**
 * {@link ToastTitle} が持つ状態です。
 */
export type ToastTitleState = Toast.Title.State;

/**
 * {@link ToastTitle} に渡す props です。
 */
export type ToastTitleProps = React.ComponentProps<typeof Toast.Title>;

/**
 * 通知のタイトルを表示する見出し要素です。
 *
 * `children` を省略すると通知オブジェクトの `title` が表示されます。
 */
export const ToastTitle: IComponent<ToastTitleProps> = function SuiToastTitle(props) {
  const { className, ...otherProps } = props;

  return <Toast.Title {...otherProps} className={cn(className, "sui_toast_title")} />;
};

export { ToastTitle as Title };

export namespace Title {
  /**
   * {@link ToastTitleState}
   */
  export type State = ToastTitleState;

  /**
   * {@link ToastTitleProps}
   */
  export type Props = ToastTitleProps;
}

// Description
// -----------

/**
 * {@link ToastDescription} が持つ状態です。
 */
export type ToastDescriptionState = Toast.Description.State;

/**
 * {@link ToastDescription} に渡す props です。
 */
export type ToastDescriptionProps = React.ComponentProps<typeof Toast.Description>;

/**
 * 通知の説明文を表示する段落要素です。
 *
 * `children` を省略すると通知オブジェクトの `description` が表示されます。
 */
export const ToastDescription: IComponent<ToastDescriptionProps> = function SuiToastDescription(
  props,
) {
  const { className, ...otherProps } = props;

  return <Toast.Description {...otherProps} className={cn(className, "sui_toast_description")} />;
};

export { ToastDescription as Description };

export namespace Description {
  /**
   * {@link ToastDescriptionState}
   */
  export type State = ToastDescriptionState;

  /**
   * {@link ToastDescriptionProps}
   */
  export type Props = ToastDescriptionProps;
}

// Action
// ------

/**
 * {@link ToastAction} が持つ状態です。
 */
export type ToastActionState = Toast.Action.State;

/**
 * {@link ToastAction} に渡す props です。
 */
export type ToastActionProps = React.ComponentProps<typeof Toast.Action>;

/**
 * 通知に設定されたアクションを実行するボタン要素です。
 *
 * 通知の `actionProps.children` がない場合はレンダリングされません。
 */
export const ToastAction: IComponent<ToastActionProps> = function SuiToastAction(props) {
  const { className, ...otherProps } = props;

  return <Toast.Action {...otherProps} className={cn(className, "sui_toast_action")} />;
};

export { ToastAction as Action };

export namespace Action {
  /**
   * {@link ToastActionState}
   */
  export type State = ToastActionState;

  /**
   * {@link ToastActionProps}
   */
  export type Props = ToastActionProps;
}

// Close
// -----

/**
 * {@link ToastClose} が持つ状態です。
 */
export type ToastCloseState = Toast.Close.State;

/**
 * {@link ToastClose} に渡す props です。
 */
export type ToastCloseProps = React.ComponentProps<typeof Toast.Close>;

/**
 * 通知を閉じるボタン要素です。
 */
export const ToastClose: IComponent<ToastCloseProps> = function SuiToastClose(props) {
  const { className, ...otherProps } = props;

  return <Toast.Close {...otherProps} className={cn(className, "sui_toast_close")} />;
};

export { ToastClose as Close };

export namespace Close {
  /**
   * {@link ToastCloseState}
   */
  export type State = ToastCloseState;

  /**
   * {@link ToastCloseProps}
   */
  export type Props = ToastCloseProps;
}

// Positioner
// ----------

/**
 * {@link ToastPositioner} が持つ状態です。
 */
export type ToastPositionerState = Toast.Positioner.State;

/**
 * {@link ToastPositioner} に渡す props です。
 */
export type ToastPositionerProps = React.ComponentProps<typeof Toast.Positioner>;

/**
 * 通知を特定の要素に対して配置する要素です。
 */
export const ToastPositioner: IComponent<ToastPositionerProps> = function SuiToastPositioner(
  props,
) {
  const { className, ...otherProps } = props;

  return <Toast.Positioner {...otherProps} className={cn(className, "sui_toast_positioner")} />;
};

export { ToastPositioner as Positioner };

export namespace Positioner {
  /**
   * {@link ToastPositionerState}
   */
  export type State = ToastPositionerState;

  /**
   * {@link ToastPositionerProps}
   */
  export type Props = ToastPositionerProps;
}

// Arrow
// -----

/**
 * {@link ToastArrow} が持つ状態です。
 */
export type ToastArrowState = Toast.Arrow.State;

/**
 * {@link ToastArrow} に渡す props です。
 */
export type ToastArrowProps = React.ComponentProps<typeof Toast.Arrow>;

/**
 * アンカーと通知をつなぐ矢印要素です。
 */
export const ToastArrow: IComponent<ToastArrowProps> = function SuiToastArrow(props) {
  const { className, ...otherProps } = props;

  return <Toast.Arrow {...otherProps} className={cn(className, "sui_toast_arrow")} />;
};

export { ToastArrow as Arrow };

export namespace Arrow {
  /**
   * {@link ToastArrowState}
   */
  export type State = ToastArrowState;

  /**
   * {@link ToastArrowProps}
   */
  export type Props = ToastArrowProps;
}

// Manager
// -------

/**
 * 通知を管理するフックです。
 *
 * {@link Provider} の配下で、通知一覧と追加、更新、削除の操作を取得します。
 */
export const useToastManager: typeof Toast.useToastManager = Toast.useToastManager;

/**
 * Provider の外から通知を管理するマネージャーを作成します。
 *
 * 作成したマネージャーは {@link Provider} の `toastManager` に渡します。
 */
export const createToastManager: typeof Toast.createToastManager = Toast.createToastManager;
