import { Drawer } from "@base-ui/react/drawer";
import type { NativeButtonProps, BaseUIComponentProps } from "@base-ui/react/internals/types";
import * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./drawer.css";

// Handle
// ------

/**
 * ドロワーを命令的に制御するハンドルです。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export interface DrawerHandle<TPayload = any> extends Drawer.Handle<TPayload> {}

interface ICreateHandle {
  /**
   * @template TPayload トリガーが送信するデータの型です。
   * @returns ドロワーを命令的に制御するハンドルです。
   */
  <TPayload = any>(): DrawerHandle<TPayload>;
}

/**
 * {@link DrawerHandle} を作成する関数です。
 */
export const createDrawerHandle: ICreateHandle = function createSuiDrawerHandle() {
  return Drawer.createHandle();
};

export { type DrawerHandle as Handle, createDrawerHandle as createHandle };

// Provider
// --------

/**
 * {@link DrawerProvider} が持つ状態です。
 */
export type DrawerProviderState = Drawer.Provider.State;

export namespace DrawerProviderProps {
  export type Render = RenderProps<DrawerProviderState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Drawer.Provider>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DrawerProviderProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Drawer.Provider>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerProvider} に渡す props です。
 */
export type DrawerProviderProps = DrawerProviderProps.Render &
  DrawerProviderProps.SuruUI &
  DrawerProviderProps.BaseUI &
  DrawerProviderProps.HTML;

/**
 * 複数のドロワーでインデント効果などの状態を共有するプロバイダーです。
 *
 * それ自身は HTML 要素をレンダリングしません。
 */
export const DrawerProvider: IComponent<DrawerProviderProps> = function SuiDrawerProvider(props) {
  return <Drawer.Provider {...props} />;
};

export { DrawerProvider as Provider };

export namespace Provider {
  export type State = DrawerProviderState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerProviderProps.Render;

    export type SuruUI = DrawerProviderProps.SuruUI;

    export type BaseUI = DrawerProviderProps.BaseUI;

    export type HTML = DrawerProviderProps.HTML;
  }
}

// IndentBackground
// ----------------

/**
 * {@link DrawerIndentBackground} が持つ状態です。
 */
export type DrawerIndentBackgroundState = Drawer.IndentBackground.State;

export namespace DrawerIndentBackgroundProps {
  export type Render = RenderProps<DrawerIndentBackgroundState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Drawer.IndentBackground>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DrawerIndentBackgroundProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Drawer.IndentBackground>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerIndentBackground} に渡す props です。
 */
export type DrawerIndentBackgroundProps = DrawerIndentBackgroundProps.Render &
  DrawerIndentBackgroundProps.SuruUI &
  DrawerIndentBackgroundProps.BaseUI &
  DrawerIndentBackgroundProps.HTML;

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

export { DrawerIndentBackground as IndentBackground };

export namespace IndentBackground {
  export type State = DrawerIndentBackgroundState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerIndentBackgroundProps.Render;

    export type SuruUI = DrawerIndentBackgroundProps.SuruUI;

    export type BaseUI = DrawerIndentBackgroundProps.BaseUI;

    export type HTML = DrawerIndentBackgroundProps.HTML;
  }
}

// Indent
// ------

/**
 * {@link DrawerIndent} が持つ状態です。
 */
export type DrawerIndentState = Drawer.Indent.State;

export namespace DrawerIndentProps {
  export type Render = RenderProps<DrawerIndentState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Drawer.Indent>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DrawerIndentProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Drawer.Indent>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerIndent} に渡す props です。
 */
export type DrawerIndentProps = DrawerIndentProps.Render &
  DrawerIndentProps.SuruUI &
  DrawerIndentProps.BaseUI &
  DrawerIndentProps.HTML;

/**
 * アプリケーションのメイン UI を囲み、ドロワーのインデント状態を受け取る要素です。
 */
export const DrawerIndent: IComponent<DrawerIndentProps> = function SuiDrawerIndent(props) {
  const { className, ...otherProps } = props;

  return (
    <Drawer.Indent
      {...otherProps}
      className={cn(
        className,
        "sui_drawer_indent",
        (state) => state.active && "sui_drawer_indent-active",
      )}
    />
  );
};

export { DrawerIndent as Indent };

export namespace Indent {
  export type State = DrawerIndentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerIndentProps.Render;

    export type SuruUI = DrawerIndentProps.SuruUI;

    export type BaseUI = DrawerIndentProps.BaseUI;

    export type HTML = DrawerIndentProps.HTML;
  }
}

// Root
// ----

/**
 * ドロワーを命令的に操作するためのオブジェクトです。
 */
export type DrawerRootActions = Drawer.Root.Actions;

/**
 * ドロワーの開閉状態が変更されるイベントの詳細です。
 */
export type DrawerRootChangeEventDetails = Drawer.Root.ChangeEventDetails;

/**
 * ドロワーの開閉状態が変更される理由です。
 */
export type DrawerRootChangeEventReason = Drawer.Root.ChangeEventReason;

/**
 * ドロワーのスナップポイントです。
 */
export type DrawerRootSnapPoint = Drawer.Root.SnapPoint;

/**
 * ドロワーのスナップポイントが変更されるイベントの詳細です。
 */
export type DrawerRootSnapPointChangeEventDetails = Drawer.Root.SnapPointChangeEventDetails;

/**
 * ドロワーのスナップポイントが変更される理由です。
 */
export type DrawerRootSnapPointChangeEventReason = Drawer.Root.SnapPointChangeEventReason;

/**
 * {@link DrawerRoot} が持つ状態です。
 */
export type DrawerRootState = Drawer.Root.State;

export namespace DrawerRootProps {
  export type Render = RenderProps<DrawerRootState>;

  export type SuruUI<TPayload = any> = {
    /**
     * トリガーとドロワーに関連付けるためのハンドルです。
     */
    handle: DrawerHandle<TPayload>;
  };

  export type BaseUI<TPayload = any> = Pick<
    React.ComponentProps<typeof Drawer.Root<TPayload>>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DrawerRootProps:
      | "open"
      | "defaultOpen"
      | "modal"
      | "onOpenChange"
      | "onOpenChangeComplete"
      | "disablePointerDismissal"
      | "actionsRef"
      | "triggerId"
      | "defaultTriggerId"
      | "swipeDirection"
      | "snapPoints"
      | "snapToSequentialPoints"
      | "snapPoint"
      | "defaultSnapPoint"
      | "onSnapPointChange",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML<TPayload = any> = Omit<
    React.ComponentProps<typeof Drawer.Root<TPayload>>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerRoot} に渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type DrawerRootProps<TPayload = any> = DrawerRootProps.Render &
  DrawerRootProps.SuruUI<TPayload> &
  DrawerRootProps.BaseUI<TPayload> &
  DrawerRootProps.HTML<TPayload>;

interface IDrawerRoot extends IComponent<DrawerRootProps> {
  /**
   * @template TPayload トリガーが送信するデータの型です。
   */
  <TPayload = any>(props: DrawerRootProps<TPayload>): IComponent.Return;
}

/**
 * ドロワーのルートコンポーネントです。
 *
 * ドロワーの開閉状態を管理し、各パーツをグループ化します。それ自身は HTML 要素をレンダリングしません。
 */
export const DrawerRoot: IDrawerRoot = function SuiDrawerRoot(props: DrawerRootProps) {
  return <Drawer.Root {...props} />;
};

export { DrawerRoot as Root };

export namespace Root {
  export type State = DrawerRootState;

  export type Props<TPayload = any> = Props.Render &
    Props.SuruUI<TPayload> &
    Props.BaseUI<TPayload> &
    Props.HTML<TPayload>;

  export namespace Props {
    export type Render = DrawerRootProps.Render;

    export type SuruUI<TPayload = any> = DrawerRootProps.SuruUI<TPayload>;

    export type BaseUI<TPayload = any> = DrawerRootProps.BaseUI<TPayload>;

    export type HTML<TPayload = any> = DrawerRootProps.HTML<TPayload>;
  }

  export type Actions = DrawerRootActions;

  export type ChangeEventDetails = DrawerRootChangeEventDetails;

  export type ChangeEventReason = DrawerRootChangeEventReason;

  export type SnapPoint = DrawerRootSnapPoint;

  export type SnapPointChangeEventDetails = DrawerRootSnapPointChangeEventDetails;

  export type SnapPointChangeEventReason = DrawerRootSnapPointChangeEventReason;
}

// Trigger
// -------

/**
 * {@link DrawerTrigger} が持つ状態です。
 */
export type DrawerTriggerState = Drawer.Trigger.State;

export namespace DrawerTriggerProps {
  export type Render = RenderProps<DrawerTriggerState>;

  export type SuruUI<TPayload = any> = {
    /**
     * ボタンとしてレンダリングする要素です。
     */
    children: NonNullable<React.ComponentProps<typeof Drawer.Trigger>["render"]>;

    /**
     * トリガーとドロワーに関連付けるためのハンドルです。
     */
    handle: DrawerHandle<TPayload>;
  };

  export type BaseUI<TPayload = any> = Pick<
    React.ComponentProps<typeof Drawer.Trigger<TPayload>>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // DrawerTriggerProps:
      | "payload"
      | "id",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML<TPayload = any> = Omit<
    React.ComponentProps<typeof Drawer.Trigger<TPayload>>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerTrigger} に渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type DrawerTriggerProps<TPayload = any> = DrawerTriggerProps.Render &
  DrawerTriggerProps.SuruUI<TPayload> &
  DrawerTriggerProps.BaseUI<TPayload> &
  DrawerTriggerProps.HTML<TPayload>;

interface IDrawerTrigger extends IComponent<DrawerTriggerProps> {
  /**
   * @template TPayload トリガーが送信するデータの型です。
   */
  <TPayload = any>(props: DrawerTriggerProps<TPayload>): IComponent.Return;
}

/**
 * ドロワーを開くボタンコンポーネントです。
 */
export const DrawerTrigger: IDrawerTrigger = function SuiDrawerTrigger(props: DrawerTriggerProps) {
  const { handle, children, className, ...otherProps } = props;

  return (
    <Drawer.Trigger
      {...otherProps}
      handle={handle}
      render={children}
      className={cn(className, "sui_drawer_trigger")}
    />
  );
};

export { DrawerTrigger as Trigger };

export namespace Trigger {
  export type State = DrawerTriggerState;

  export type Props<TPayload = any> = Props.Render &
    Props.SuruUI<TPayload> &
    Props.BaseUI<TPayload> &
    Props.HTML<TPayload>;

  export namespace Props {
    export type Render = DrawerTriggerProps.Render;

    export type SuruUI<TPayload = any> = DrawerTriggerProps.SuruUI<TPayload>;

    export type BaseUI<TPayload = any> = DrawerTriggerProps.BaseUI<TPayload>;

    export type HTML<TPayload = any> = DrawerTriggerProps.HTML<TPayload>;
  }
}

// SwipeArea
// ---------

/**
 * {@link DrawerSwipeArea} が持つ状態です。
 */
export type DrawerSwipeAreaState = Drawer.SwipeArea.State;

export namespace DrawerSwipeAreaProps {
  export type Render = RenderProps<DrawerSwipeAreaState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Drawer.SwipeArea>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DrawerSwipeAreaProps:
      "disabled" | "swipeDirection",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Drawer.SwipeArea>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerSwipeArea} に渡す props です。
 */
export type DrawerSwipeAreaProps = DrawerSwipeAreaProps.Render &
  DrawerSwipeAreaProps.SuruUI &
  DrawerSwipeAreaProps.BaseUI &
  DrawerSwipeAreaProps.HTML;

/**
 * 画面端からのスワイプでドロワーを開く領域です。
 */
export const DrawerSwipeArea: IComponent<DrawerSwipeAreaProps> = function SuiDrawerSwipeArea(
  props,
) {
  const { className, ...otherProps } = props;

  return (
    <Drawer.SwipeArea
      {...otherProps}
      className={cn(
        className,
        "sui_drawer_swipe_area",
        (state) => `sui_drawer_swipe_area-swipe_direction_${state.swipeDirection}`,
      )}
    />
  );
};

export { DrawerSwipeArea as SwipeArea };

export namespace SwipeArea {
  export type State = DrawerSwipeAreaState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerSwipeAreaProps.Render;

    export type SuruUI = DrawerSwipeAreaProps.SuruUI;

    export type BaseUI = DrawerSwipeAreaProps.BaseUI;

    export type HTML = DrawerSwipeAreaProps.HTML;
  }
}

// VirtualKeyboardProvider
// -----------------------

/**
 * {@link DrawerVirtualKeyboardProvider} が持つ状態です。
 */
export type DrawerVirtualKeyboardProviderState = Drawer.VirtualKeyboardProvider.State;

export namespace DrawerVirtualKeyboardProviderProps {
  export type Render = RenderProps<DrawerVirtualKeyboardProviderState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Drawer.VirtualKeyboardProvider>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DrawerVirtualKeyboardProviderProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Drawer.VirtualKeyboardProvider>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerVirtualKeyboardProvider} に渡す props です。
 */
export type DrawerVirtualKeyboardProviderProps = DrawerVirtualKeyboardProviderProps.Render &
  DrawerVirtualKeyboardProviderProps.SuruUI &
  DrawerVirtualKeyboardProviderProps.BaseUI &
  DrawerVirtualKeyboardProviderProps.HTML;

/**
 * ソフトウェアキーボードに合わせたフォーカスとスクロールを管理するプロバイダーです。
 *
 * ボトムシート内にフォームを配置するときに使用します。
 */
export const DrawerVirtualKeyboardProvider: IComponent<DrawerVirtualKeyboardProviderProps> =
  function SuiDrawerVirtualKeyboardProvider(props) {
    return <Drawer.VirtualKeyboardProvider {...props} />;
  };

export { DrawerVirtualKeyboardProvider as VirtualKeyboardProvider };

export namespace VirtualKeyboardProvider {
  export type State = DrawerVirtualKeyboardProviderState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerVirtualKeyboardProviderProps.Render;

    export type SuruUI = DrawerVirtualKeyboardProviderProps.SuruUI;

    export type BaseUI = DrawerVirtualKeyboardProviderProps.BaseUI;

    export type HTML = DrawerVirtualKeyboardProviderProps.HTML;
  }
}

// Portal
// ------

/**
 * {@link DrawerPortal} が持つ状態です。
 */
export type DrawerPortalState = Drawer.Portal.State;

export namespace DrawerPortalProps {
  export type Render = RenderProps<DrawerPortalState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Drawer.Portal>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DrawerPortalProps:
      "keepMounted" | "container",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Drawer.Portal>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerPortal} に渡す props です。
 */
export type DrawerPortalProps = DrawerPortalProps.Render &
  DrawerPortalProps.SuruUI &
  DrawerPortalProps.BaseUI &
  DrawerPortalProps.HTML;

/**
 * ドロワーを DOM の別の場所に配置するコンポーネントです。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const DrawerPortal: IComponent<DrawerPortalProps> = function SuiDrawerPortal(props) {
  const {
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <Drawer.Portal
      {...otherProps}
      className={cn(className, "sui_drawer_portal")}
      data-scope={dataScope}
    />
  );
};

export { DrawerPortal as Portal };

export namespace Portal {
  export type State = DrawerPortalState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerPortalProps.Render;

    export type SuruUI = DrawerPortalProps.SuruUI;

    export type BaseUI = DrawerPortalProps.BaseUI;

    export type HTML = DrawerPortalProps.HTML;
  }
}

// Backdrop
// --------

/**
 * {@link DrawerBackdrop} が持つ状態です。
 */
export type DrawerBackdropState = Drawer.Backdrop.State;

export namespace DrawerBackdropProps {
  export type Render = RenderProps<DrawerBackdropState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Drawer.Backdrop>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DrawerBackdropProps:
      "forceRender",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Drawer.Backdrop>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerBackdrop} に渡す props です。
 */
export type DrawerBackdropProps = DrawerBackdropProps.Render &
  DrawerBackdropProps.SuruUI &
  DrawerBackdropProps.BaseUI &
  DrawerBackdropProps.HTML;

/**
 * ポップアップの背後に表示されるオーバーレイコンポーネントです。
 */
export const DrawerBackdrop: IComponent<DrawerBackdropProps> = function SuiDrawerBackdrop(props) {
  const { className, ...otherProps } = props;

  return (
    <Drawer.Backdrop
      {...otherProps}
      className={cn(
        className,
        "sui_drawer_backdrop",
        (state) =>
          state.transitionStatus !== undefined &&
          `sui_drawer_backdrop-transition_status_${state.transitionStatus}`,
      )}
    />
  );
};

export { DrawerBackdrop as Backdrop };

export namespace Backdrop {
  export type State = DrawerBackdropState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerBackdropProps.Render;

    export type SuruUI = DrawerBackdropProps.SuruUI;

    export type BaseUI = DrawerBackdropProps.BaseUI;

    export type HTML = DrawerBackdropProps.HTML;
  }
}

// Viewport
// --------

/**
 * {@link DrawerViewport} が持つ状態です。
 */
export type DrawerViewportState = Drawer.Viewport.State;

export namespace DrawerViewportProps {
  export type Render = RenderProps<DrawerViewportState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Drawer.Viewport>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DrawerViewportProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Drawer.Viewport>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerViewport} に渡す props です。
 */
export type DrawerViewportProps = DrawerViewportProps.Render &
  DrawerViewportProps.SuruUI &
  DrawerViewportProps.BaseUI &
  DrawerViewportProps.HTML;

/**
 * ポップアップの配置コンテナーコンポーネントです。
 *
 * スクロール可能なオーバーレイを作り、ポップアップを配置します。
 */
export const DrawerViewport: IComponent<DrawerViewportProps> = function SuiDrawerViewport(props) {
  const { className, ...otherProps } = props;

  return <Drawer.Viewport {...otherProps} className={cn(className, "sui_drawer_viewport")} />;
};

export { DrawerViewport as Viewport };

export namespace Viewport {
  export type State = DrawerViewportState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerViewportProps.Render;

    export type SuruUI = DrawerViewportProps.SuruUI;

    export type BaseUI = DrawerViewportProps.BaseUI;

    export type HTML = DrawerViewportProps.HTML;
  }
}

// Popup
// -----

/**
 * {@link DrawerPopup} が持つ状態です。
 */
export type DrawerPopupState = Drawer.Popup.State;

export namespace DrawerPopupProps {
  export type Render = RenderProps<DrawerPopupState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Drawer.Popup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DrawerPopupProps:
      "initialFocus" | "finalFocus",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Drawer.Popup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerPopup} に渡す props です。
 */
export type DrawerPopupProps = DrawerPopupProps.Render &
  DrawerPopupProps.SuruUI &
  DrawerPopupProps.BaseUI &
  DrawerPopupProps.HTML;

/**
 * ドロワーの本文を表示するコンポーネントです。
 *
 * `initialFocus` と `finalFocus` を使うと、開閉時に移動するフォーカス先を指定できます。
 */
export const DrawerPopup: IComponent<DrawerPopupProps> = function SuiDrawerPopup(props) {
  const { className, ...otherProps } = props;

  return (
    <Drawer.Popup
      {...otherProps}
      className={cn(
        className,
        "sui_drawer_popup",
        (state) => `sui_drawer_popup-swipe_direction_${state.swipeDirection}`,
        (state) => state.swiping && "sui_drawer_popup-swiping",
        (state) => state.nestedDrawerSwiping && "sui_drawer_popup-nested_drawer_swiping",
        (state) => state.nestedDrawerOpen && "sui_drawer_popup-nested_drawer_open",
        (state) =>
          state.transitionStatus !== undefined &&
          `sui_drawer_popup-transition_status_${state.transitionStatus}`,
      )}
    />
  );
};

export { DrawerPopup as Popup };

export namespace Popup {
  export type State = DrawerPopupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerPopupProps.Render;

    export type SuruUI = DrawerPopupProps.SuruUI;

    export type BaseUI = DrawerPopupProps.BaseUI;

    export type HTML = DrawerPopupProps.HTML;
  }
}

// Controls
// --------

/**
 * {@link DrawerControls} が持つ状態です。
 */
export type DrawerControlsState = {};

export namespace DrawerControlsProps {
  export type Render = RenderProps<DrawerControlsState>;

  export type SuruUI = {
    /**
     * 絶対位置として配置するかを指定します。
     *
     * @default true
     */
    absolute?: boolean | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerControls} に渡す props です。
 */
export type DrawerControlsProps = DrawerControlsProps.Render &
  DrawerControlsProps.SuruUI &
  DrawerControlsProps.BaseUI &
  DrawerControlsProps.HTML;

/**
 * ドロワーのコントロールコンポーネントです。
 */
export const DrawerControls: IComponent<DrawerControlsProps> = function SuiDrawerControls(props) {
  const { absolute = true, ...htmlProps } = props;

  return useRender({
    props: [
      htmlProps,
      {
        className: cn(
          "sui_drawer_controls",
          absolute && "sui_drawer_controls-absolute",
          !absolute && "sui_drawer_controls-relative",
        ),
      },
    ],
    defaultTagName: "div",
  });
};

export { DrawerControls as Controls };

export namespace Controls {
  export type State = DrawerControlsState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerControlsProps.Render;

    export type SuruUI = DrawerControlsProps.SuruUI;

    export type BaseUI = DrawerControlsProps.BaseUI;

    export type HTML = DrawerControlsProps.HTML;
  }
}

// Content
// -------

/**
 * {@link DrawerContent} が持つ状態です。
 */
export type DrawerContentState = Drawer.Content.State;

export namespace DrawerContentProps {
  export type Render = RenderProps<DrawerContentState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Drawer.Content>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DrawerContentProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Drawer.Content>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerContent} に渡す props です。
 */
export type DrawerContentProps = DrawerContentProps.Render &
  DrawerContentProps.SuruUI &
  DrawerContentProps.BaseUI &
  DrawerContentProps.HTML;

/**
 * ドロワー内のテキスト選択とスワイプ操作を分けるコンテンツコンポーネントです。
 */
export const DrawerContent: IComponent<DrawerContentProps> = function SuiDrawerContent(props) {
  const { className, ...otherProps } = props;

  return <Drawer.Content {...otherProps} className={cn(className, "sui_drawer_content")} />;
};

export { DrawerContent as Content };

export namespace Content {
  export type State = DrawerContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerContentProps.Render;

    export type SuruUI = DrawerContentProps.SuruUI;

    export type BaseUI = DrawerContentProps.BaseUI;

    export type HTML = DrawerContentProps.HTML;
  }
}

// Header
// ------

/**
 * {@link DrawerHeader} が持つ状態です。
 */
export type DrawerHeaderState = {};

export namespace DrawerHeaderProps {
  export type Render = RenderProps<DrawerHeaderState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerHeader} に渡す props です。
 */
export type DrawerHeaderProps = DrawerHeaderProps.Render &
  DrawerHeaderProps.SuruUI &
  DrawerHeaderProps.BaseUI &
  DrawerHeaderProps.HTML;

/**
 * ドロワーのヘッダーコンポーネントです。
 */
export const DrawerHeader: IComponent<DrawerHeaderProps> = function SuiDrawerHeader(htmlProps) {
  return useRender({
    props: [
      htmlProps,
      {
        className: "sui_drawer_header",
      },
    ],
    defaultTagName: "div",
  });
};

export { DrawerHeader as Header };

export namespace Header {
  export type State = DrawerHeaderState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerHeaderProps.Render;

    export type SuruUI = DrawerHeaderProps.SuruUI;

    export type BaseUI = DrawerHeaderProps.BaseUI;

    export type HTML = DrawerHeaderProps.HTML;
  }
}

// Title
// -----

/**
 * {@link DrawerTitle} が持つ状態です。
 */
export type DrawerTitleState = Drawer.Title.State;

export namespace DrawerTitleProps {
  export type Render = RenderProps<DrawerTitleState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Drawer.Title>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DrawerTitleProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Drawer.Title>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerTitle} に渡す props です。
 */
export type DrawerTitleProps = DrawerTitleProps.Render &
  DrawerTitleProps.SuruUI &
  DrawerTitleProps.BaseUI &
  DrawerTitleProps.HTML;

/**
 * ドロワーの見出しを表示するコンポーネントです。
 */
export const DrawerTitle: IComponent<DrawerTitleProps> = function SuiDrawerTitle(props) {
  const { className, ...otherProps } = props;

  return <Drawer.Title {...otherProps} className={cn(className, "sui_drawer_title")} />;
};

export { DrawerTitle as Title };

export namespace Title {
  export type State = DrawerTitleState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerTitleProps.Render;

    export type SuruUI = DrawerTitleProps.SuruUI;

    export type BaseUI = DrawerTitleProps.BaseUI;

    export type HTML = DrawerTitleProps.HTML;
  }
}

// Description
// -----------

/**
 * {@link DrawerDescription} が持つ状態です。
 */
export type DrawerDescriptionState = Drawer.Description.State;

export namespace DrawerDescriptionProps {
  export type Render = RenderProps<DrawerDescriptionState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Drawer.Description>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DrawerDescriptionProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Drawer.Description>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerDescription} に渡す props です。
 */
export type DrawerDescriptionProps = DrawerDescriptionProps.Render &
  DrawerDescriptionProps.SuruUI &
  DrawerDescriptionProps.BaseUI &
  DrawerDescriptionProps.HTML;

/**
 * ドロワーの内容を表示するコンポーネントです。
 */
export const DrawerDescription: IComponent<DrawerDescriptionProps> = function SuiDrawerDescription(
  props,
) {
  const { className, ...otherProps } = props;

  return <Drawer.Description {...otherProps} className={cn(className, "sui_drawer_description")} />;
};

export { DrawerDescription as Description };

export namespace Description {
  export type State = DrawerDescriptionState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerDescriptionProps.Render;

    export type SuruUI = DrawerDescriptionProps.SuruUI;

    export type BaseUI = DrawerDescriptionProps.BaseUI;

    export type HTML = DrawerDescriptionProps.HTML;
  }
}

// Body
// ----

/**
 * {@link DrawerBody} が持つ状態です。
 */
export type DrawerBodyState = {};

export namespace DrawerBodyProps {
  export type Render = RenderProps<DrawerBodyState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerBody} に渡す props です。
 */
export type DrawerBodyProps = DrawerBodyProps.Render &
  DrawerBodyProps.SuruUI &
  DrawerBodyProps.BaseUI &
  DrawerBodyProps.HTML;

/**
 * ドロワーのボディーコンポーネントです。
 */
export const DrawerBody: IComponent<DrawerBodyProps> = function SuiDrawerBody(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_drawer_body",
      },
    ],
    defaultTagName: "div",
  });
};

export { DrawerBody as Body };

export namespace Body {
  export type State = DrawerBodyState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerBodyProps.Render;

    export type SuruUI = DrawerBodyProps.SuruUI;

    export type BaseUI = DrawerBodyProps.BaseUI;

    export type HTML = DrawerBodyProps.HTML;
  }
}

// Footer
// ------

/**
 * {@link DrawerFooter} が持つ状態です。
 */
export type DrawerFooterState = {};

export namespace DrawerFooterProps {
  export type Render = RenderProps<DrawerFooterState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerFooter} に渡す props です。
 */
export type DrawerFooterProps = DrawerFooterProps.Render &
  DrawerFooterProps.SuruUI &
  DrawerFooterProps.BaseUI &
  DrawerFooterProps.HTML;

/**
 * ドロワーのフッターコンポーネントです。
 */
export const DrawerFooter: IComponent<DrawerFooterProps> = function SuiDrawerFooter(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_drawer_footer",
      },
    ],
    defaultTagName: "div",
  });
};

export { DrawerFooter as Footer };

export namespace Footer {
  export type State = DrawerFooterState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerFooterProps.Render;

    export type SuruUI = DrawerFooterProps.SuruUI;

    export type BaseUI = DrawerFooterProps.BaseUI;

    export type HTML = DrawerFooterProps.HTML;
  }
}

// Close
// -----

/**
 * {@link DrawerClose} が持つ状態です。
 */
export type DrawerCloseState = Drawer.Close.State;

export namespace DrawerCloseProps {
  export type Render = RenderProps<DrawerCloseState>;

  export type SuruUI = {
    /**
     * ボタンとしてレンダリングする要素です。
     */
    children: NonNullable<React.ComponentProps<typeof Drawer.Close>["render"]>;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof Drawer.Close>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // DrawerCloseProps:
      | never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Drawer.Close>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerClose} に渡す props です。
 */
export type DrawerCloseProps = DrawerCloseProps.Render &
  DrawerCloseProps.SuruUI &
  DrawerCloseProps.BaseUI &
  DrawerCloseProps.HTML;

/**
 * ドロワーを閉じるボタンコンポーネントです。
 */
export const DrawerClose: IComponent<DrawerCloseProps> = function SuiDrawerClose(props) {
  const { children, className, ...otherProps } = props;

  return (
    <Drawer.Close {...otherProps} render={children} className={cn(className, "sui_drawer_close")} />
  );
};

export { DrawerClose as Close };

export namespace Close {
  export type State = DrawerCloseState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerCloseProps.Render;

    export type SuruUI = DrawerCloseProps.SuruUI;

    export type BaseUI = DrawerCloseProps.BaseUI;

    export type HTML = DrawerCloseProps.HTML;
  }
}
