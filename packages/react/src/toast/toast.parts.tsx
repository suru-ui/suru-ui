import { type ToastManager, type UseToastManagerReturnValue, Toast } from "@base-ui/react/toast";
import * as React from "react";

import mergeProps from "../_merge-props.js";
import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import * as Alert from "../alert/alert.parts.jsx";
import * as Button from "../button/button.parts.jsx";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";

import "./toast.css";

// Provider
// --------

export namespace ToastProviderProps {
  export type Render = RenderProps<{}>;

  export type SuruUI = {};

  export type BaseUI = Omit<React.ComponentProps<typeof Toast.Provider>, keyof Render>;

  export type HTML = {};
}

/**
 * {@link ToastProvider} に渡す props です。
 */
export type ToastProviderProps = ToastProviderProps.Render &
  ToastProviderProps.SuruUI &
  ToastProviderProps.BaseUI &
  ToastProviderProps.HTML;

/**
 * 通知の作成と管理を行うコンテキストを提供します。
 */
export const ToastProvider: IComponent<ToastProviderProps> = function SuiToastProvider(props) {
  return <Toast.Provider {...props} />;
};

export { ToastProvider as Provider };

export namespace Provider {
  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ToastProviderProps.Render;

    export type SuruUI = ToastProviderProps.SuruUI;

    export type BaseUI = ToastProviderProps.BaseUI;

    export type HTML = ToastProviderProps.HTML;
  }
}

// Portal
// ------

/**
 * {@link ToastPortal} が持つ状態です。
 */
export type ToastPortalState = Toast.Portal.State;

export namespace ToastPortalProps {
  export type Render = RenderProps<ToastPortalState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    React.ComponentProps<typeof Toast.Portal>,
    keyof Render | keyof React.ComponentProps<"div">
  >;

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render>;
}

/**
 * {@link ToastPortal} に渡す props です。
 */
export type ToastPortalProps = ToastPortalProps.Render &
  ToastPortalProps.SuruUI &
  ToastPortalProps.BaseUI &
  ToastPortalProps.HTML;

/**
 * 通知の表示領域を DOM の別の場所へ移動する要素です。
 *
 * 既定では表示領域を `<body>` の末尾に配置します。
 */
export const ToastPortal: IComponent<ToastPortalProps> = function SuiToastPortal(props) {
  const {
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <Toast.Portal
      {...otherProps}
      className={cn(className, "sui_toast_portal")}
      data-scope={dataScope}
    />
  );
};

export { ToastPortal as Portal };

export namespace Portal {
  export type State = ToastPortalState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ToastPortalProps.Render;

    export type SuruUI = ToastPortalProps.SuruUI;

    export type BaseUI = ToastPortalProps.BaseUI;

    export type HTML = ToastPortalProps.HTML;
  }
}

// Viewport
// --------

/**
 * {@link ToastViewport} が持つ状態です。
 */
export type ToastViewportState = Toast.Viewport.State;

export namespace ToastViewportProps {
  export type Render = RenderProps<ToastViewportState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    React.ComponentProps<typeof Toast.Viewport>,
    keyof Render | keyof React.ComponentProps<"div">
  >;

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render>;
}

/**
 * {@link ToastViewport} に渡す props です。
 */
export type ToastViewportProps = ToastViewportProps.Render &
  ToastViewportProps.SuruUI &
  ToastViewportProps.BaseUI &
  ToastViewportProps.HTML;

/**
 * 通知を表示するビューポートです。
 */
export const ToastViewport: IComponent<ToastViewportProps> = function SuiToastViewport(props) {
  const { className, ...otherProps } = props;

  return (
    <Toast.Viewport
      {...otherProps}
      className={cn(
        className,
        "sui_toast_viewport",
        (state) => state.expanded && "sui_toast_viewport-expanded",
      )}
    />
  );
};

export { ToastViewport as Viewport };

export namespace Viewport {
  export type State = ToastViewportState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ToastViewportProps.Render;

    export type SuruUI = ToastViewportProps.SuruUI;

    export type BaseUI = ToastViewportProps.BaseUI;

    export type HTML = ToastViewportProps.HTML;
  }
}

// Root
// ----

/**
 * {@link ToastRoot} に渡す通知オブジェクトの型です。
 *
 * @template TData 通知に含める追加データの型です。
 */
export type ToastRootToastObject<TData extends object = any> = Toast.Root.ToastObject<TData>;

/**
 * {@link ToastRoot} が持つ状態です。
 */
export type ToastRootState = Toast.Root.State;

export namespace ToastRootProps {
  export type Render = RenderProps<ToastRootState>;

  export type SuruUI<TData extends object = any> = {
    /**
     * 表示する通知オブジェクトです。
     */
    toast: ToastRootToastObject<TData>;
  };

  export type BaseUI = Omit<React.ComponentProps<typeof Toast.Root>, keyof Render | keyof SuruUI>;

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render | keyof SuruUI>;
}

/**
 * {@link ToastRoot} に渡す props です。
 *
 * @template TData 通知に含める追加データの型です。
 */
export type ToastRootProps<TData extends object = any> = ToastRootProps.Render &
  ToastRootProps.SuruUI<TData> &
  ToastRootProps.BaseUI &
  ToastRootProps.HTML;

/**
 * {@link ToastRoot} のコンポーネント型です。
 */
export interface IToastRoot extends IComponent<ToastRootProps> {
  /**
   * @template TData 通知に含める追加データの型です。
   */
  <TData extends object = any>(props: ToastRootProps<TData>): IComponent.Return;
}

/**
 * 個別の通知をグループ化するルート要素です。
 *
 * `toast` は {@link useToastClient} から取得した通知オブジェクトを渡します。
 */
export const ToastRoot: IToastRoot = function SuiToastRoot<TData extends object = any>(
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
        (state) => state.limited && "sui_toast-limited",
        (state) => state.expanded && "sui_toast-expanded",
        (state) => state.type !== undefined && `sui_toast-type_${CSS.escape(state.type)}`,
        (state) => state.swiping && "sui_toast-swiping",
        (state) =>
          state.swipeDirection !== undefined && `sui_toast-swipe_direction_${state.swipeDirection}`,
      )}
    />
  );
};

export { ToastRoot as Root };

export namespace Root {
  export type State = ToastRootState;

  export type Props<TData extends object = any> = Props.Render &
    Props.SuruUI<TData> &
    Props.BaseUI &
    Props.HTML;

  export namespace Props {
    export type Render = ToastRootProps.Render;

    export type SuruUI<TData extends object = any> = ToastRootProps.SuruUI<TData>;

    export type BaseUI = ToastRootProps.BaseUI;

    export type HTML = ToastRootProps.HTML;
  }

  export type ToastObject<TData extends object = any> = ToastRootToastObject<TData>;
}

// Content
// -------

export type ToastContentColor = Alert.Root.Color;

export type ToastContentRadius = Alert.Root.Radius;

export type ToastContentSize = Alert.Root.Size;

export type ToastContentVariant = Alert.Root.Variant;

/**
 * {@link ToastContent} が持つ状態です。
 */
export type ToastContentState = Override<Alert.Root.State, Toast.Content.State>;

export namespace ToastContentProps {
  export type Render = RenderProps<ToastContentState>;

  export type SuruUI = Alert.Root.Props.SuruUI;

  export type BaseUI = Omit<
    React.ComponentProps<typeof Toast.Content>,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<"div">
  >;

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render | keyof SuruUI>;
}

/**
 * {@link ToastContent} に渡す props です。
 */
export type ToastContentProps = ToastContentProps.Render &
  ToastContentProps.SuruUI &
  ToastContentProps.BaseUI &
  ToastContentProps.HTML;

/**
 * 通知の内容をまとめるコンテナー要素です。
 */
export const ToastContent: IComponent<ToastContentProps> = function SuiToastContent(props) {
  const { size, color, style, radius, render, variant, outlined, className, ...otherProps } = props;
  const alertRootProps: Required<Alert.Root.Props.SuruUI> = {
    size,
    color,
    radius,
    variant,
    outlined,
  };

  return (
    <Toast.Content
      {...otherProps}
      render={(htmlProps: {}, toastState) => (
        <Alert.Root
          {...mergeProps<typeof Alert.Root>([
            htmlProps,
            alertRootProps,
            proxyRenderProps(toastState, {
              style,
              render,
              className: cn(
                className,
                "sui_toast_content",
                (state) => state.behind && "sui_toast_content-behind",
                (state) => state.expanded && "sui_toast_content-expanded",
              ),
            }),
          ])}
        />
      )}
    />
  );
};

export { ToastContent as Content };

export namespace Content {
  export type State = ToastContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ToastContentProps.Render;

    export type SuruUI = ToastContentProps.SuruUI;

    export type BaseUI = ToastContentProps.BaseUI;

    export type HTML = ToastContentProps.HTML;
  }

  export type Color = ToastContentColor;

  export type Radius = ToastContentRadius;

  export type Size = ToastContentSize;

  export type Variant = ToastContentVariant;
}

// Title
// -----

/**
 * {@link ToastTitle} が持つ状態です。
 */
export type ToastTitleState = Override<Alert.Title.State, Toast.Title.State>;

export namespace ToastTitleProps {
  export type Render = RenderProps<ToastTitleState>;

  export type SuruUI = Alert.Title.Props.SuruUI;

  export type BaseUI = Omit<
    React.ComponentProps<typeof Toast.Title>,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<"h2">
  >;

  export type HTML = Omit<React.ComponentProps<"h2">, keyof Render | keyof SuruUI>;
}

/**
 * {@link ToastTitle} に渡す props です。
 */
export type ToastTitleProps = ToastTitleProps.Render &
  ToastTitleProps.SuruUI &
  ToastTitleProps.BaseUI &
  ToastTitleProps.HTML;

/**
 * 通知のタイトルを表示する見出し要素です。
 */
export const ToastTitle: IComponent<ToastTitleProps> = function SuiToastTitle(props) {
  const { style, render, className, ...otherProps } = props;

  return (
    <Toast.Title
      {...otherProps}
      render={(htmlProps: {}, toastState) => (
        <Alert.Title
          {...mergeProps<typeof Alert.Title>([
            htmlProps,
            proxyRenderProps(toastState, {
              style,
              render,
              className,
            }),
          ])}
        />
      )}
    />
  );
};

export { ToastTitle as Title };

export namespace Title {
  export type State = ToastTitleState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ToastTitleProps.Render;

    export type SuruUI = ToastTitleProps.SuruUI;

    export type BaseUI = ToastTitleProps.BaseUI;

    export type HTML = ToastTitleProps.HTML;
  }
}

// Description
// -----------

/**
 * {@link ToastDescription} が持つ状態です。
 */
export type ToastDescriptionState = Override<Alert.Content.State, Toast.Description.State>;

export namespace ToastDescriptionProps {
  export type Render = RenderProps<ToastDescriptionState>;

  export type SuruUI = Alert.Content.Props.SuruUI;

  export type BaseUI = Omit<
    React.ComponentProps<typeof Toast.Description>,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<"p">
  >;

  export type HTML = Omit<React.ComponentProps<"p">, keyof Render | keyof SuruUI>;
}

/**
 * {@link ToastDescription} に渡す props です。
 */
export type ToastDescriptionProps = ToastDescriptionProps.Render &
  ToastDescriptionProps.SuruUI &
  ToastDescriptionProps.BaseUI &
  ToastDescriptionProps.HTML;

/**
 * 通知の説明文を表示する段落要素です。
 */
export const ToastDescription: IComponent<ToastDescriptionProps> = function SuiToastDescription(
  props,
) {
  const { style, render, className, ...otherProps } = props;

  return (
    <Toast.Description
      {...otherProps}
      render={(htmlProps: {}, toastState) => (
        <Alert.Content
          {...mergeProps<typeof Alert.Content>([
            htmlProps,
            proxyRenderProps(toastState, {
              style,
              render,
              className,
            }),
          ])}
        />
      )}
    />
  );
};

export { ToastDescription as Description };

export namespace Description {
  export type State = ToastDescriptionState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ToastDescriptionProps.Render;

    export type SuruUI = ToastDescriptionProps.SuruUI;

    export type BaseUI = ToastDescriptionProps.BaseUI;

    export type HTML = ToastDescriptionProps.HTML;
  }
}

// Actions
// -------

/**
 * {@link ToastActions} が持つ状態です。
 */
export type ToastActionsState = Alert.Actions.State;

export namespace ToastActionsProps {
  export type Render = RenderProps<ToastActionsState>;

  export type SuruUI = {};

  export type BaseUI = Omit<Alert.Actions.Props, keyof Render | keyof React.ComponentProps<"div">>;

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render>;
}

/**
 * {@link ToastActions} に渡す props です。
 */
export type ToastActionsProps = ToastActionsProps.Render &
  ToastActionsProps.SuruUI &
  ToastActionsProps.BaseUI &
  ToastActionsProps.HTML;

/**
 * 通知の操作ボタンを右寄せでまとめるコンポーネントです。
 */
export const ToastActions: IComponent<ToastActionsProps> = function SuiToastActions(props) {
  return <Alert.Actions {...props} />;
};

export { ToastActions as Actions };

export namespace Actions {
  export type State = ToastActionsState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ToastActionsProps.Render;

    export type SuruUI = ToastActionsProps.SuruUI;

    export type BaseUI = ToastActionsProps.BaseUI;

    export type HTML = ToastActionsProps.HTML;
  }
}

// Action
// ------

export type ToastActionColor = Button.Root.Color;

export type ToastActionRadius = Button.Root.Radius;

export type ToastActionSize = Button.Root.Size;

export type ToastActionVariant = Button.Root.Variant;

/**
 * {@link ToastAction} が持つ状態です。
 */
export type ToastActionState = Override<Button.Root.State, Toast.Action.State>;

export namespace ToastActionProps {
  export type Render = RenderProps<ToastActionState>;

  export type SuruUI = {
    color?: ToastActionColor | undefined;
    size?: ToastActionSize | undefined;
    variant?: ToastActionVariant | undefined;
  };

  export type BaseUI = Omit<
    React.ComponentProps<typeof Toast.Action>,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<"button">
  >;

  export type HTML = Omit<React.ComponentProps<"button">, keyof Render | keyof SuruUI>;
}

/**
 * {@link ToastAction} に渡す props です。
 */
export type ToastActionProps = ToastActionProps.Render &
  ToastActionProps.SuruUI &
  ToastActionProps.BaseUI &
  ToastActionProps.HTML;

/**
 * 通知に設定されたアクションを実行するボタン要素です。
 */
export const ToastAction: IComponent<ToastActionProps> = function SuiToastAction(props) {
  const {
    size,
    color = "grey",
    style,
    render,
    variant = "naked",
    className,
    nativeButton,
    ...otherProps
  } = props;

  return (
    <Toast.Action
      {...otherProps}
      render={(htmlProps: {}, toastState) => (
        <Button.Root
          {...mergeProps<typeof Button.Root>([
            htmlProps,
            {
              size,
              color,
              variant,
            },
            proxyRenderProps(toastState, {
              style,
              render,
              className,
            }),
          ])}
          nativeButton={nativeButton}
        />
      )}
      nativeButton={nativeButton}
    />
  );
};

export { ToastAction as Action };

export namespace Action {
  export type State = ToastActionState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ToastActionProps.Render;

    export type SuruUI = ToastActionProps.SuruUI;

    export type BaseUI = ToastActionProps.BaseUI;

    export type HTML = ToastActionProps.HTML;
  }

  export type Color = ToastActionColor;

  export type Radius = ToastActionRadius;

  export type Size = ToastActionSize;

  export type Variant = ToastActionVariant;
}

// Close
// -----

export type ToastCloseColor = Button.Root.Color;

export type ToastCloseRadius = Button.Root.Radius;

export type ToastCloseSize = Button.Root.Size;

export type ToastCloseVariant = Button.Root.Variant;

/**
 * {@link ToastClose} が持つ状態です。
 */
export type ToastCloseState = Override<Button.Root.State, Toast.Close.State>;

export namespace ToastCloseProps {
  export type Render = RenderProps<ToastCloseState>;

  export type SuruUI = Omit<Button.Root.Props.SuruUI, "item" | "pending">;

  export type BaseUI = Omit<
    Override<Button.Root.Props.BaseUI, React.ComponentProps<typeof Toast.Close>>,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<"button">
  >;

  export type HTML = Omit<React.ComponentProps<"button">, keyof Render | keyof SuruUI>;
}

/**
 * {@link ToastClose} に渡す props です。
 */
export type ToastCloseProps = ToastCloseProps.Render &
  ToastCloseProps.SuruUI &
  ToastCloseProps.BaseUI &
  ToastCloseProps.HTML;

/**
 * 通知を閉じるボタン要素です。
 */
export const ToastClose: IComponent<ToastCloseProps> = function SuiToastClose(props) {
  const {
    size,
    color = "grey",
    muted,
    style,
    radius,
    render,
    squared,
    variant = "naked",
    outlined,
    className,
    nativeButton,
    focusableWhenDisabled,
    ...otherProps
  } = props;
  const baseuiProps: Required<ToastCloseProps.BaseUI> = {
    nativeButton,
    focusableWhenDisabled,
  };
  const buttonRootProps: Required<Button.Root.Props.SuruUI & Button.Root.Props.BaseUI> = {
    item: undefined,
    size,
    color,
    muted,
    radius,
    pending: undefined,
    squared,
    variant,
    outlined,
    nativeButton,
    focusableWhenDisabled,
  };

  return (
    <Toast.Close
      {...otherProps}
      {...baseuiProps}
      render={(htmlProps: {}, toastState) => (
        <Button.Root
          {...mergeProps<typeof Button.Root>([
            htmlProps,
            buttonRootProps,
            proxyRenderProps(toastState, {
              style,
              render,
              className,
            }),
          ])}
        />
      )}
    />
  );
};

export { ToastClose as Close };

export namespace Close {
  export type State = ToastCloseState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ToastCloseProps.Render;

    export type SuruUI = ToastCloseProps.SuruUI;

    export type BaseUI = ToastCloseProps.BaseUI;

    export type HTML = ToastCloseProps.HTML;
  }

  export type Color = ToastCloseColor;

  export type Radius = ToastCloseRadius;

  export type Size = ToastCloseSize;

  export type Variant = ToastCloseVariant;
}

// Client
// ------

export interface IToastClient<
  TData extends object = any,
> extends UseToastManagerReturnValue<TData> {}

/**
 * 通知を管理するフックです。
 *
 * {@link Provider} の配下で、通知一覧と追加、更新、削除の操作を取得します。
 */
export function useToastClient<TData extends object = any>(): IToastClient<TData> {
  return Toast.useToastManager();
}

// Manager
// -------

export interface IToastManager<TData extends object = any> extends ToastManager<TData> {}

/**
 * Provider の外から通知を管理するマネージャーを作成します。
 *
 * 作成したマネージャーは {@link Provider} の `toastManager` に渡します。
 */
export function createToastManager<TData extends object = any>(): IToastManager<TData> {
  return Toast.createToastManager();
}
