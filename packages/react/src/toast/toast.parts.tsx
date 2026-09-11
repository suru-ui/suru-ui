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
  export type BaseUI = Omit<React.ComponentProps<typeof Toast.Provider>, keyof Render>;

  export type HTML = {};

  export type Render = RenderProps<{}>;

  export type SuruUI = {};
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
  /**
   * {@link ToastProviderProps}
   */
  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    /**
     * {@link ToastProviderProps.BaseUI}
     */
    export type BaseUI = ToastProviderProps.BaseUI;

    /**
     * {@link ToastProviderProps.HTML}
     */
    export type HTML = ToastProviderProps.HTML;

    /**
     * {@link ToastProviderProps.Render}
     */
    export type Render = ToastProviderProps.Render;

    /**
     * {@link ToastProviderProps.SuruUI}
     */
    export type SuruUI = ToastProviderProps.SuruUI;
  }
}

// Portal
// ------

/**
 * {@link ToastPortal} が持つ状態です。
 */
export type ToastPortalState = Toast.Portal.State;

export namespace ToastPortalProps {
  export type BaseUI = Omit<
    React.ComponentProps<typeof Toast.Portal>,
    keyof Render | keyof React.ComponentProps<"div">
  >;

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render>;

  export type Render = RenderProps<ToastPortalState>;

  export type SuruUI = {};
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
  /**
   * {@link ToastPortalState}
   */
  export type State = ToastPortalState;

  /**
   * {@link ToastPortalProps}
   */
  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    /**
     * {@link ToastPortalProps.BaseUI}
     */
    export type BaseUI = ToastPortalProps.BaseUI;

    /**
     * {@link ToastPortalProps.HTML}
     */
    export type HTML = ToastPortalProps.HTML;

    /**
     * {@link ToastPortalProps.Render}
     */
    export type Render = ToastPortalProps.Render;

    /**
     * {@link ToastPortalProps.SuruUI}
     */
    export type SuruUI = ToastPortalProps.SuruUI;
  }
}

// Viewport
// --------

/**
 * {@link ToastViewport} が持つ状態です。
 */
export type ToastViewportState = Toast.Viewport.State;

export namespace ToastViewportProps {
  export type BaseUI = Omit<
    React.ComponentProps<typeof Toast.Viewport>,
    keyof Render | keyof React.ComponentProps<"div">
  >;

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render>;

  export type Render = RenderProps<ToastViewportState>;

  export type SuruUI = {};
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
  /**
   * {@link ToastViewportState}
   */
  export type State = ToastViewportState;

  /**
   * {@link ToastViewportProps}
   */
  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    /**
     * {@link ToastViewportProps.BaseUI}
     */
    export type BaseUI = ToastViewportProps.BaseUI;

    /**
     * {@link ToastViewportProps.HTML}
     */
    export type HTML = ToastViewportProps.HTML;

    /**
     * {@link ToastViewportProps.Render}
     */
    export type Render = ToastViewportProps.Render;

    /**
     * {@link ToastViewportProps.SuruUI}
     */
    export type SuruUI = ToastViewportProps.SuruUI;
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
  export type BaseUI = Omit<
    React.ComponentProps<typeof Toast.Root>,
    keyof Render | keyof SuruUI<any> | keyof React.ComponentProps<"div">
  >;

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render | keyof SuruUI<any>>;

  export type Render = RenderProps<ToastRootState>;

  export type SuruUI<TData extends object = any> = {
    /**
     * 表示する通知オブジェクトです。
     */
    toast: ToastRootToastObject<TData>;
  };
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
  /**
   * {@link ToastRootState}
   */
  export type State = ToastRootState;

  /**
   * {@link ToastRootProps}
   */
  export type Props<TData extends object = any> = Props.Render &
    Props.SuruUI<TData> &
    Props.BaseUI &
    Props.HTML;

  export namespace Props {
    /**
     * {@link ToastRootProps.BaseUI}
     */
    export type BaseUI = ToastRootProps.BaseUI;

    /**
     * {@link ToastRootProps.HTML}
     */
    export type HTML = ToastRootProps.HTML;

    /**
     * {@link ToastRootProps.Render}
     */
    export type Render = ToastRootProps.Render;

    /**
     * {@link ToastRootProps.SuruUI}
     */
    export type SuruUI<TData extends object = any> = ToastRootProps.SuruUI<TData>;
  }

  /**
   * {@link ToastRootToastObject}
   */
  export type ToastObject<TData extends object = any> = ToastRootToastObject<TData>;
}

// Content
// -------

/**
 * {@link Alert.Root.Color}
 */
export type ToastContentColor = Alert.Root.Color;

/**
 * {@link Alert.Root.Radius}
 */
export type ToastContentRadius = Alert.Root.Radius;

/**
 * {@link Alert.Root.Size}
 */
export type ToastContentSize = Alert.Root.Size;

/**
 * {@link Alert.Root.Variant}
 */
export type ToastContentVariant = Alert.Root.Variant;

/**
 * {@link ToastContent} が持つ状態です。
 */
export type ToastContentState = Override<Alert.Root.State, Toast.Content.State>;

export namespace ToastContentProps {
  export type BaseUI = Omit<
    Override<
      Alert.Root.Props,
      Override<React.ComponentProps<typeof Toast.Content>, RenderProps<ToastContentState>>
    >,
    keyof Render | keyof React.ComponentProps<"div">
  >;

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render>;

  export type Render = RenderProps<ToastContentState>;

  export type SuruUI = {};
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
  const { style, render, className, ...otherProps } = props;

  return (
    <Toast.Content
      {...otherProps}
      render={(htmlProps: {}, toastState) => (
        <Alert.Root
          {...mergeProps<typeof Alert.Root>([
            htmlProps,
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
  /**
   * {@link ToastContentState}
   */
  export type State = ToastContentState;

  /**
   * {@link ToastContentProps}
   */
  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    /**
     * {@link ToastContentProps.BaseUI}
     */
    export type BaseUI = ToastContentProps.BaseUI;

    /**
     * {@link ToastContentProps.HTML}
     */
    export type HTML = ToastContentProps.HTML;

    /**
     * {@link ToastContentProps.Render}
     */
    export type Render = ToastContentProps.Render;

    /**
     * {@link ToastContentProps.SuruUI}
     */
    export type SuruUI = ToastContentProps.SuruUI;
  }

  /**
   * {@link ToastContentColor}
   */
  export type Color = ToastContentColor;

  /**
   * {@link ToastContentRadius}
   */
  export type Radius = ToastContentRadius;

  /**
   * {@link ToastContentSize}
   */
  export type Size = ToastContentSize;

  /**
   * {@link ToastContentVariant}
   */
  export type Variant = ToastContentVariant;
}

// Title
// -----

/**
 * {@link ToastTitle} が持つ状態です。
 */
export type ToastTitleState = Override<Alert.Title.State, Toast.Title.State>;

export namespace ToastTitleProps {
  export type BaseUI = Omit<
    Override<
      Alert.Title.Props,
      Override<React.ComponentProps<typeof Toast.Title>, RenderProps<ToastTitleState>>
    >,
    keyof Render | keyof React.ComponentProps<"h2">
  >;

  export type HTML = Omit<React.ComponentProps<"h2">, keyof Render>;

  export type Render = RenderProps<ToastTitleState>;

  export type SuruUI = {};
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
  /**
   * {@link ToastTitleState}
   */
  export type State = ToastTitleState;

  /**
   * {@link ToastTitleProps}
   */
  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    /**
     * {@link ToastTitleProps.BaseUI}
     */
    export type BaseUI = ToastTitleProps.BaseUI;

    /**
     * {@link ToastTitleProps.HTML}
     */
    export type HTML = ToastTitleProps.HTML;

    /**
     * {@link ToastTitleProps.Render}
     */
    export type Render = ToastTitleProps.Render;

    /**
     * {@link ToastTitleProps.SuruUI}
     */
    export type SuruUI = ToastTitleProps.SuruUI;
  }
}

// Description
// -----------

/**
 * {@link ToastDescription} が持つ状態です。
 */
export type ToastDescriptionState = Override<Alert.Content.State, Toast.Description.State>;

export namespace ToastDescriptionProps {
  export type BaseUI = Omit<
    Override<
      Alert.Content.Props,
      Override<React.ComponentProps<typeof Toast.Description>, RenderProps<ToastDescriptionState>>
    >,
    keyof Render | keyof React.ComponentProps<"p">
  >;

  export type HTML = Omit<React.ComponentProps<"p">, keyof Render>;

  export type Render = RenderProps<ToastDescriptionState>;

  export type SuruUI = {};
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
  /**
   * {@link ToastDescriptionState}
   */
  export type State = ToastDescriptionState;

  /**
   * {@link ToastDescriptionProps}
   */
  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    /**
     * {@link ToastDescriptionProps.BaseUI}
     */
    export type BaseUI = ToastDescriptionProps.BaseUI;

    /**
     * {@link ToastDescriptionProps.HTML}
     */
    export type HTML = ToastDescriptionProps.HTML;

    /**
     * {@link ToastDescriptionProps.Render}
     */
    export type Render = ToastDescriptionProps.Render;

    /**
     * {@link ToastDescriptionProps.SuruUI}
     */
    export type SuruUI = ToastDescriptionProps.SuruUI;
  }
}

// Actions
// -------

/**
 * {@link ToastActions} が持つ状態です。
 */
export type ToastActionsState = Alert.Actions.State;

export namespace ToastActionsProps {
  export type BaseUI = Omit<Alert.Actions.Props, keyof Render | keyof React.ComponentProps<"div">>;

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render>;

  export type Render = RenderProps<ToastActionsState>;

  export type SuruUI = {};
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
  /**
   * {@link ToastActionsState}
   */
  export type State = ToastActionsState;

  /**
   * {@link ToastActionsProps}
   */
  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    /**
     * {@link ToastActionsProps.BaseUI}
     */
    export type BaseUI = ToastActionsProps.BaseUI;

    /**
     * {@link ToastActionsProps.HTML}
     */
    export type HTML = ToastActionsProps.HTML;

    /**
     * {@link ToastActionsProps.Render}
     */
    export type Render = ToastActionsProps.Render;

    /**
     * {@link ToastActionsProps.SuruUI}
     */
    export type SuruUI = ToastActionsProps.SuruUI;
  }
}

// Action
// ------

/**
 * {@link Button.Root.Color}
 */
export type ToastActionColor = Button.Root.Color;

/**
 * {@link Button.Root.Radius}
 */
export type ToastActionRadius = Button.Root.Radius;

/**
 * {@link Button.Root.Size}
 */
export type ToastActionSize = Button.Root.Size;

/**
 * {@link Button.Root.Variant}
 */
export type ToastActionVariant = Button.Root.Variant;

/**
 * {@link ToastAction} が持つ状態です。
 */
export type ToastActionState = Override<Button.Root.State, Toast.Action.State>;

export namespace ToastActionProps {
  export type BaseUI = Omit<
    Override<
      Button.ButtonRootProps,
      Override<React.ComponentProps<typeof Toast.Action>, RenderProps<ToastActionState>>
    >,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<"button">
  >;

  export type HTML = Omit<React.ComponentProps<"button">, keyof Render | keyof SuruUI>;

  export type Render = RenderProps<ToastActionState>;

  export type SuruUI = {
    color?: ToastActionColor | undefined;
    variant?: ToastActionVariant | undefined;
  };
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
  /**
   * {@link ToastActionState}
   */
  export type State = ToastActionState;

  /**
   * {@link ToastActionProps}
   */
  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    /**
     * {@link ToastActionProps.BaseUI}
     */
    export type BaseUI = ToastActionProps.BaseUI;

    /**
     * {@link ToastActionProps.HTML}
     */
    export type HTML = ToastActionProps.HTML;

    /**
     * {@link ToastActionProps.Render}
     */
    export type Render = ToastActionProps.Render;

    /**
     * {@link ToastActionProps.SuruUI}
     */
    export type SuruUI = ToastActionProps.SuruUI;
  }

  /**
   * {@link ToastActionColor}
   */
  export type Color = ToastActionColor;

  /**
   * {@link ToastActionRadius}
   */
  export type Radius = ToastActionRadius;

  /**
   * {@link ToastActionSize}
   */
  export type Size = ToastActionSize;

  /**
   * {@link ToastActionVariant}
   */
  export type Variant = ToastActionVariant;
}

// Close
// -----

/**
 * {@link Button.Root.Color}
 */
export type ToastCloseColor = Button.Root.Color;

/**
 * {@link Button.Root.Radius}
 */
export type ToastCloseRadius = Button.Root.Radius;

/**
 * {@link Button.Root.Size}
 */
export type ToastCloseSize = Button.Root.Size;

/**
 * {@link Button.Root.Variant}
 */
export type ToastCloseVariant = Button.Root.Variant;

/**
 * {@link ToastClose} が持つ状態です。
 */
export type ToastCloseState = Override<Button.Root.State, Toast.Close.State>;

export namespace ToastCloseProps {
  export type BaseUI = Omit<
    Override<
      Button.ButtonRootProps,
      Override<React.ComponentProps<typeof Toast.Close>, RenderProps<ToastCloseState>>
    >,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<"button">
  >;

  export type HTML = Omit<React.ComponentProps<"button">, keyof Render | keyof SuruUI>;

  export type Render = RenderProps<ToastCloseState>;

  export type SuruUI = {
    color?: ToastCloseColor | undefined;
    variant?: ToastCloseVariant | undefined;
  };
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
    color = "grey",
    style,
    render,
    variant = "naked",
    className,
    nativeButton,
    ...otherProps
  } = props;

  return (
    <Toast.Close
      {...otherProps}
      render={(htmlProps: {}, toastState) => (
        <Button.Root
          {...mergeProps<typeof Button.Root>([
            htmlProps,
            {
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

export { ToastClose as Close };

export namespace Close {
  /**
   * {@link ToastCloseState}
   */
  export type State = ToastCloseState;

  /**
   * {@link ToastCloseProps}
   */
  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    /**
     * {@link ToastCloseProps.BaseUI}
     */
    export type BaseUI = ToastCloseProps.BaseUI;

    /**
     * {@link ToastCloseProps.HTML}
     */
    export type HTML = ToastCloseProps.HTML;

    /**
     * {@link ToastCloseProps.Render}
     */
    export type Render = ToastCloseProps.Render;

    /**
     * {@link ToastCloseProps.SuruUI}
     */
    export type SuruUI = ToastCloseProps.SuruUI;
  }

  /**
   * {@link ToastCloseColor}
   */
  export type Color = ToastCloseColor;

  /**
   * {@link ToastCloseRadius}
   */
  export type Radius = ToastCloseRadius;

  /**
   * {@link ToastCloseSize}
   */
  export type Size = ToastCloseSize;

  /**
   * {@link ToastCloseVariant}
   */
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
