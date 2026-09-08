import { Drawer } from "@base-ui/react/drawer";
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

/**
 * {@link DrawerProvider} に渡す props です。
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

export { DrawerProvider as Provider };

export namespace Provider {
  /**
   * {@link DrawerProviderState}
   */
  export type State = DrawerProviderState;

  /**
   * {@link DrawerProviderProps}
   */
  export type Props = DrawerProviderProps;
}

// IndentBackground
// ----------------

/**
 * {@link DrawerIndentBackground} が持つ状態です。
 */
export type DrawerIndentBackgroundState = Drawer.IndentBackground.State;

/**
 * {@link DrawerIndentBackground} に渡す props です。
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

export { DrawerIndentBackground as IndentBackground };

export namespace IndentBackground {
  /**
   * {@link DrawerIndentBackgroundState}
   */
  export type State = DrawerIndentBackgroundState;

  /**
   * {@link DrawerIndentBackgroundProps}
   */
  export type Props = DrawerIndentBackgroundProps;
}

// Indent
// ------

/**
 * {@link DrawerIndent} が持つ状態です。
 */
export type DrawerIndentState = Drawer.Indent.State;

/**
 * {@link DrawerIndent} に渡す props です。
 */
export type DrawerIndentProps = React.ComponentProps<typeof Drawer.Indent>;

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
  /**
   * {@link DrawerIndentState}
   */
  export type State = DrawerIndentState;

  /**
   * {@link DrawerIndentProps}
   */
  export type Props = DrawerIndentProps;
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

/**
 * {@link DrawerRoot} に渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type DrawerRootProps<TPayload = any> = Omit<
  React.ComponentProps<typeof Drawer.Root>,
  "handle"
> & {
  /**
   * トリガーとドロワーに関連付けるためのハンドルです。
   */
  handle: DrawerHandle<TPayload>;
};

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
  /**
   * {@link DrawerRootState}
   */
  export type State = DrawerRootState;

  /**
   * {@link DrawerRootProps}
   */
  export type Props<TPayload = any> = DrawerRootProps<TPayload>;

  /**
   * {@link DrawerRootActions}
   */
  export type Actions = DrawerRootActions;

  /**
   * {@link DrawerRootChangeEventDetails}
   */
  export type ChangeEventDetails = DrawerRootChangeEventDetails;

  /**
   * {@link DrawerRootChangeEventReason}
   */
  export type ChangeEventReason = DrawerRootChangeEventReason;

  /**
   * {@link DrawerRootSnapPoint}
   */
  export type SnapPoint = DrawerRootSnapPoint;

  /**
   * {@link DrawerRootSnapPointChangeEventDetails}
   */
  export type SnapPointChangeEventDetails = DrawerRootSnapPointChangeEventDetails;

  /**
   * {@link DrawerRootSnapPointChangeEventReason}
   */
  export type SnapPointChangeEventReason = DrawerRootSnapPointChangeEventReason;
}

// Trigger
// -------

/**
 * {@link DrawerTrigger} が持つ状態です。
 */
export type DrawerTriggerState = Drawer.Trigger.State;

/**
 * {@link DrawerTrigger} に渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type DrawerTriggerProps<TPayload = any> = Omit<
  React.ComponentProps<typeof Drawer.Trigger>,
  "handle" | "children" | "render"
> & {
  /**
   * ボタンとしてレンダリングする要素です。
   */
  children: NonNullable<React.ComponentProps<typeof Drawer.Trigger>["render"]>;

  /**
   * トリガーとドロワーに関連付けるためのハンドルです。
   */
  handle: DrawerHandle<TPayload>;
};

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
  /**
   * {@link DrawerTriggerState}
   */
  export type State = DrawerTriggerState;

  /**
   * {@link DrawerTriggerProps}
   */
  export type Props<TPayload = any> = DrawerTriggerProps<TPayload>;
}

// SwipeArea
// ---------

/**
 * {@link DrawerSwipeArea} が持つ状態です。
 */
export type DrawerSwipeAreaState = Drawer.SwipeArea.State;

/**
 * {@link DrawerSwipeArea} に渡す props です。
 */
export type DrawerSwipeAreaProps = React.ComponentProps<typeof Drawer.SwipeArea>;

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
  /**
   * {@link DrawerSwipeAreaState}
   */
  export type State = DrawerSwipeAreaState;

  /**
   * {@link DrawerSwipeAreaProps}
   */
  export type Props = DrawerSwipeAreaProps;
}

// VirtualKeyboardProvider
// -----------------------

/**
 * {@link DrawerVirtualKeyboardProvider} が持つ状態です。
 */
export type DrawerVirtualKeyboardProviderState = Drawer.VirtualKeyboardProvider.State;

/**
 * {@link DrawerVirtualKeyboardProvider} に渡す props です。
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

export { DrawerVirtualKeyboardProvider as VirtualKeyboardProvider };

export namespace VirtualKeyboardProvider {
  /**
   * {@link DrawerVirtualKeyboardProviderState}
   */
  export type State = DrawerVirtualKeyboardProviderState;

  /**
   * {@link DrawerVirtualKeyboardProviderProps}
   */
  export type Props = DrawerVirtualKeyboardProviderProps;
}

// Portal
// ------

/**
 * {@link DrawerPortal} が持つ状態です。
 */
export type DrawerPortalState = Drawer.Portal.State;

/**
 * {@link DrawerPortal} に渡す props です。
 */
export type DrawerPortalProps = React.ComponentProps<typeof Drawer.Portal>;

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
  /**
   * {@link DrawerPortalState}
   */
  export type State = DrawerPortalState;

  /**
   * {@link DrawerPortalProps}
   */
  export type Props = DrawerPortalProps;
}

// Backdrop
// --------

/**
 * {@link DrawerBackdrop} が持つ状態です。
 */
export type DrawerBackdropState = Drawer.Backdrop.State;

/**
 * {@link DrawerBackdrop} に渡す props です。
 */
export type DrawerBackdropProps = React.ComponentProps<typeof Drawer.Backdrop>;

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
  /**
   * {@link DrawerBackdropState}
   */
  export type State = DrawerBackdropState;

  /**
   * {@link DrawerBackdropProps}
   */
  export type Props = DrawerBackdropProps;
}

// Viewport
// --------

/**
 * {@link DrawerViewport} が持つ状態です。
 */
export type DrawerViewportState = Drawer.Viewport.State;

/**
 * {@link DrawerViewport} に渡す props です。
 */
export type DrawerViewportProps = React.ComponentProps<typeof Drawer.Viewport>;

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
  /**
   * {@link DrawerViewportState}
   */
  export type State = DrawerViewportState;

  /**
   * {@link DrawerViewportProps}
   */
  export type Props = DrawerViewportProps;
}

// Popup
// -----

/**
 * {@link DrawerPopup} が持つ状態です。
 */
export type DrawerPopupState = Drawer.Popup.State;

/**
 * {@link DrawerPopup} に渡す props です。
 */
export type DrawerPopupProps = React.ComponentProps<typeof Drawer.Popup>;

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
  /**
   * {@link DrawerPopupState}
   */
  export type State = DrawerPopupState;

  /**
   * {@link DrawerPopupProps}
   */
  export type Props = DrawerPopupProps;
}

// Controls
// --------

/**
 * {@link DrawerControls} が持つ状態です。
 */
export type DrawerControlsState = {};

/**
 * {@link DrawerControls} に渡す props です。
 */
export type DrawerControlsProps = Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<DrawerControlsState> & {
    /**
     * 絶対位置として配置するかを指定します。
     *
     * @default true
     */
    absolute?: boolean | undefined;
  };

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
  /**
   * {@link DrawerControlsState}
   */
  export type State = DrawerControlsState;

  /**
   * {@link DrawerControlsProps}
   */
  export type Props = DrawerControlsProps;
}

// Content
// -------

/**
 * {@link DrawerContent} が持つ状態です。
 */
export type DrawerContentState = Drawer.Content.State;

/**
 * {@link DrawerContent} に渡す props です。
 */
export type DrawerContentProps = React.ComponentProps<typeof Drawer.Content>;

/**
 * ドロワー内のテキスト選択とスワイプ操作を分けるコンテンツコンポーネントです。
 */
export const DrawerContent: IComponent<DrawerContentProps> = function SuiDrawerContent(props) {
  const { className, ...otherProps } = props;

  return <Drawer.Content {...otherProps} className={cn(className, "sui_drawer_content")} />;
};

export { DrawerContent as Content };

export namespace Content {
  /**
   * {@link DrawerContentState}
   */
  export type State = DrawerContentState;

  /**
   * {@link DrawerContentProps}
   */
  export type Props = DrawerContentProps;
}

// Header
// ------

/**
 * {@link DrawerHeader} が持つ状態です。
 */
export type DrawerHeaderState = {};

/**
 * {@link DrawerHeader} に渡す props です。
 */
export type DrawerHeaderProps = Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<DrawerHeaderState>;

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
  /**
   * {@link DrawerHeaderState}
   */
  export type State = DrawerHeaderState;

  /**
   * {@link DrawerHeaderProps}
   */
  export type Props = DrawerHeaderProps;
}

// Title
// -----

/**
 * {@link DrawerTitle} が持つ状態です。
 */
export type DrawerTitleState = Drawer.Title.State;

/**
 * {@link DrawerTitle} に渡す props です。
 */
export type DrawerTitleProps = React.ComponentProps<typeof Drawer.Title>;

/**
 * ドロワーの見出しを表示するコンポーネントです。
 */
export const DrawerTitle: IComponent<DrawerTitleProps> = function SuiDrawerTitle(props) {
  const { className, ...otherProps } = props;

  return <Drawer.Title {...otherProps} className={cn(className, "sui_drawer_title")} />;
};

export { DrawerTitle as Title };

export namespace Title {
  /**
   * {@link DrawerTitleState}
   */
  export type State = DrawerTitleState;

  /**
   * {@link DrawerTitleProps}
   */
  export type Props = DrawerTitleProps;
}

// Description
// -----------

/**
 * {@link DrawerDescription} が持つ状態です。
 */
export type DrawerDescriptionState = Drawer.Description.State;

/**
 * {@link DrawerDescription} に渡す props です。
 */
export type DrawerDescriptionProps = React.ComponentProps<typeof Drawer.Description>;

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
  /**
   * {@link DrawerDescriptionState}
   */
  export type State = DrawerDescriptionState;

  /**
   * {@link DrawerDescriptionProps}
   */
  export type Props = DrawerDescriptionProps;
}

// Body
// ----

/**
 * {@link DrawerBody} が持つ状態です。
 */
export type DrawerBodyState = {};

/**
 * {@link DrawerBody} に渡す props です。
 */
export type DrawerBodyProps = Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<DrawerBodyState>;

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
  /**
   * {@link DrawerBodyState}
   */
  export type State = DrawerBodyState;

  /**
   * {@link DrawerBodyProps}
   */
  export type Props = DrawerBodyProps;
}

// Footer
// ------

/**
 * {@link DrawerFooter} が持つ状態です。
 */
export type DrawerFooterState = {};

/**
 * {@link DrawerFooter} に渡す props です。
 */
export type DrawerFooterProps = Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<DrawerFooterState>;

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
  /**
   * {@link DrawerFooterState}
   */
  export type State = DrawerFooterState;

  /**
   * {@link DrawerFooterProps}
   */
  export type Props = DrawerFooterProps;
}

// Close
// -----

/**
 * {@link DrawerClose} が持つ状態です。
 */
export type DrawerCloseState = Drawer.Close.State;

/**
 * {@link DrawerClose} に渡す props です。
 */
export type DrawerCloseProps = Omit<
  React.ComponentProps<typeof Drawer.Close>,
  "children" | "render"
> & {
  /**
   * ボタンとしてレンダリングする要素です。
   */
  children: NonNullable<React.ComponentProps<typeof Drawer.Close>["render"]>;
};

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
  /**
   * {@link DrawerCloseState}
   */
  export type State = DrawerCloseState;

  /**
   * {@link DrawerCloseProps}
   */
  export type Props = DrawerCloseProps;
}
