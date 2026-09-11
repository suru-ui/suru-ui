import { Popover } from "@base-ui/react/popover";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
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

export namespace PopoverRootProps {
  export type Render = RenderProps<PopoverRootState>;

  export type SuruUI<TPayload = any> = {
    /**
     * ポップオーバーとトリガー ({@link Trigger}) を関連付けるハンドルです。
     *
     * {@link createHandle} で作成します。Root 内に {@link Trigger} を配置する場合は省略できます。
     */
    handle?: PopoverHandle<TPayload> | undefined;
  };

  export type BaseUI<TPayload = any> = Omit<
    Popover.Root.Props<TPayload>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = {};
}

/**
 * {@link PopoverRoot} に渡す props です。
 *
 * @template TPayload トリガーから受け取るデータの型です。
 */
export type PopoverRootProps<TPayload = any> = PopoverRootProps.Render &
  PopoverRootProps.SuruUI<TPayload> &
  PopoverRootProps.BaseUI<TPayload> &
  PopoverRootProps.HTML;

/**
 * {@link PopoverRoot} のコンポーネント型です。
 */
export interface PopoverRootComponent extends IComponent<PopoverRootProps> {
  <TPayload = any>(props: PopoverRootProps<TPayload>): React.ReactElement | null;
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
  export type State = PopoverRootState;

  export type Props<TPayload = any> = Props.Render &
    Props.SuruUI<TPayload> &
    Props.BaseUI<TPayload> &
    Props.HTML;

  export namespace Props {
    export type Render = PopoverRootProps.Render;

    export type SuruUI<TPayload = any> = PopoverRootProps.SuruUI<TPayload>;

    export type BaseUI<TPayload = any> = PopoverRootProps.BaseUI<TPayload>;

    export type HTML = PopoverRootProps.HTML;
  }

  export type Actions = PopoverRootActions;

  export type ChangeEventDetails = PopoverRootChangeEventDetails;

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

export namespace PopoverTriggerProps {
  export type Render = RenderProps<PopoverTriggerState>;

  export type SuruUI<TPayload = any> = {
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

  export type BaseUI<TPayload = any> = Omit<
    Popover.Trigger.Props<TPayload>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"button">,
    keyof Render | keyof SuruUI | keyof Popover.Trigger.Props<any>
  >;
}

/**
 * {@link PopoverTrigger} に渡す props です。
 *
 * @template TPayload トリガーから渡すデータの型です。
 */
export type PopoverTriggerProps<TPayload = any> = PopoverTriggerProps.Render &
  PopoverTriggerProps.SuruUI<TPayload> &
  PopoverTriggerProps.BaseUI<TPayload> &
  PopoverTriggerProps.HTML;

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
  export type State = PopoverTriggerState;

  export type Props<TPayload = unknown> = Props.Render &
    Props.SuruUI<TPayload> &
    Props.BaseUI<TPayload> &
    Props.HTML;

  export namespace Props {
    export type Render = PopoverTriggerProps.Render;

    export type SuruUI<TPayload = any> = PopoverTriggerProps.SuruUI<TPayload>;

    export type BaseUI<TPayload = any> = PopoverTriggerProps.BaseUI<TPayload>;

    export type HTML = PopoverTriggerProps.HTML;
  }
}

// Portal
// ------

/**
 * {@link PopoverPortal} が持つ状態です。
 */
export type PopoverPortalState = Popover.Portal.State;

export namespace PopoverPortalProps {
  export type Render = RenderProps<PopoverPortalState>;

  export type SuruUI = {};

  export type BaseUI = Omit<React.ComponentProps<typeof Popover.Portal>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof Popover.Portal>
  >;
}

/**
 * {@link PopoverPortal} に渡す props です。
 */
export type PopoverPortalProps = PopoverPortalProps.Render &
  PopoverPortalProps.SuruUI &
  PopoverPortalProps.BaseUI &
  PopoverPortalProps.HTML;

/**
 * ポップオーバーを DOM の別の場所へ移動する要素です。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const PopoverPortal: IComponent<PopoverPortalProps> = function SuiPopoverPortal(props) {
  const {
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <Popover.Portal
      {...otherProps}
      className={cn(className, "sui_popover_portal")}
      data-scope={dataScope}
    />
  );
};

export { PopoverPortal as Portal };

export namespace Portal {
  export type State = PopoverPortalState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PopoverPortalProps.Render;

    export type SuruUI = PopoverPortalProps.SuruUI;

    export type BaseUI = PopoverPortalProps.BaseUI;

    export type HTML = PopoverPortalProps.HTML;
  }
}

// Backdrop
// --------

/**
 * {@link PopoverBackdrop} が持つ状態です。
 */
export type PopoverBackdropState = Popover.Backdrop.State;

export namespace PopoverBackdropProps {
  export type Render = RenderProps<PopoverBackdropState>;

  export type SuruUI = {};

  export type BaseUI = Omit<React.ComponentProps<typeof Popover.Backdrop>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof Popover.Backdrop>
  >;
}

/**
 * {@link PopoverBackdrop} に渡す props です。
 */
export type PopoverBackdropProps = PopoverBackdropProps.Render &
  PopoverBackdropProps.SuruUI &
  PopoverBackdropProps.BaseUI &
  PopoverBackdropProps.HTML;

/**
 * ポップアップの背後に表示されるオーバーレイ要素です。
 */
export const PopoverBackdrop: IComponent<PopoverBackdropProps> = function SuiPopoverBackdrop(
  props,
) {
  const { className, ...otherProps } = props;

  return (
    <Popover.Backdrop
      {...otherProps}
      className={cn(
        className,
        "sui_popover_backdrop",
        (state) =>
          state.transitionStatus !== undefined &&
          `sui_popover_backdrop-transition_status_${state.transitionStatus}`,
      )}
    />
  );
};

export { PopoverBackdrop as Backdrop };

export namespace Backdrop {
  export type State = PopoverBackdropState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PopoverBackdropProps.Render;

    export type SuruUI = PopoverBackdropProps.SuruUI;

    export type BaseUI = PopoverBackdropProps.BaseUI;

    export type HTML = PopoverBackdropProps.HTML;
  }
}

// Positioner
// ----------

/**
 * {@link PopoverPositioner} が持つ状態です。
 */
export type PopoverPositionerState = Popover.Positioner.State;

export namespace PopoverPositionerProps {
  export type Render = RenderProps<PopoverPositionerState>;

  export type SuruUI = {};

  export type BaseUI = Omit<React.ComponentProps<typeof Popover.Positioner>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof Popover.Positioner>
  >;
}

/**
 * {@link PopoverPositioner} に渡す props です。
 */
export type PopoverPositionerProps = PopoverPositionerProps.Render &
  PopoverPositionerProps.SuruUI &
  PopoverPositionerProps.BaseUI &
  PopoverPositionerProps.HTML;

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
  export type State = PopoverPositionerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PopoverPositionerProps.Render;

    export type SuruUI = PopoverPositionerProps.SuruUI;

    export type BaseUI = PopoverPositionerProps.BaseUI;

    export type HTML = PopoverPositionerProps.HTML;
  }
}

// Popup
// -----

/**
 * {@link PopoverPopup} が持つ状態です。
 */
export type PopoverPopupState = Popover.Popup.State;

export namespace PopoverPopupProps {
  export type Render = RenderProps<PopoverPopupState>;

  export type SuruUI = {};

  export type BaseUI = Omit<React.ComponentProps<typeof Popover.Popup>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof Popover.Popup>
  >;
}

/**
 * {@link PopoverPopup} に渡す props です。
 */
export type PopoverPopupProps = PopoverPopupProps.Render &
  PopoverPopupProps.SuruUI &
  PopoverPopupProps.BaseUI &
  PopoverPopupProps.HTML;

/**
 * ポップオーバーの内容を表示するポップアップ要素です。
 */
export const PopoverPopup: IComponent<PopoverPopupProps> = function SuiPopoverPopup(props) {
  const { className, ...otherProps } = props;

  return (
    <Popover.Popup
      {...otherProps}
      className={cn(
        className,
        "sui_popover_popup",
        (state) =>
          state.transitionStatus !== undefined &&
          `sui_popover_popup-transition_status_${state.transitionStatus}`,
      )}
    />
  );
};

export { PopoverPopup as Popup };

export namespace Popup {
  export type State = PopoverPopupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PopoverPopupProps.Render;

    export type SuruUI = PopoverPopupProps.SuruUI;

    export type BaseUI = PopoverPopupProps.BaseUI;

    export type HTML = PopoverPopupProps.HTML;
  }
}

// Arrow
// -----

/**
 * {@link PopoverArrow} が持つ状態です。
 */
export type PopoverArrowState = Popover.Arrow.State;

export namespace PopoverArrowProps {
  export type Render = RenderProps<PopoverArrowState>;

  export type SuruUI = {};

  export type BaseUI = Omit<React.ComponentProps<typeof Popover.Arrow>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof Popover.Arrow>
  >;
}

/**
 * {@link PopoverArrow} に渡す props です。
 */
export type PopoverArrowProps = PopoverArrowProps.Render &
  PopoverArrowProps.SuruUI &
  PopoverArrowProps.BaseUI &
  PopoverArrowProps.HTML;

/**
 * ポップアップとトリガーをつなぐ矢印要素です。
 */
export const PopoverArrow: IComponent<PopoverArrowProps> = function SuiPopoverArrow(props) {
  const { className, ...otherProps } = props;

  return <Popover.Arrow {...otherProps} className={cn(className, "sui_popover_arrow")} />;
};

export { PopoverArrow as Arrow };

export namespace Arrow {
  export type State = PopoverArrowState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PopoverArrowProps.Render;

    export type SuruUI = PopoverArrowProps.SuruUI;

    export type BaseUI = PopoverArrowProps.BaseUI;

    export type HTML = PopoverArrowProps.HTML;
  }
}

// Title
// -----

/**
 * {@link PopoverTitle} が持つ状態です。
 */
export type PopoverTitleState = Popover.Title.State;

export namespace PopoverTitleProps {
  export type Render = RenderProps<PopoverTitleState>;

  export type SuruUI = {};

  export type BaseUI = Omit<React.ComponentProps<typeof Popover.Title>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"h1">,
    keyof Render | keyof React.ComponentProps<typeof Popover.Title>
  >;
}

/**
 * {@link PopoverTitle} に渡す props です。
 */
export type PopoverTitleProps = PopoverTitleProps.Render &
  PopoverTitleProps.SuruUI &
  PopoverTitleProps.BaseUI &
  PopoverTitleProps.HTML;

/**
 * ポップオーバーのタイトルを表示する見出し要素です。
 */
export const PopoverTitle: IComponent<PopoverTitleProps> = function SuiPopoverTitle(props) {
  const { className, ...otherProps } = props;

  return <Popover.Title {...otherProps} className={cn(className, "sui_popover_title")} />;
};

export { PopoverTitle as Title };

export namespace Title {
  export type State = PopoverTitleState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PopoverTitleProps.Render;

    export type SuruUI = PopoverTitleProps.SuruUI;

    export type BaseUI = PopoverTitleProps.BaseUI;

    export type HTML = PopoverTitleProps.HTML;
  }
}

// Description
// -----------

/**
 * {@link PopoverDescription} が持つ状態です。
 */
export type PopoverDescriptionState = Popover.Description.State;

export namespace PopoverDescriptionProps {
  export type Render = RenderProps<PopoverDescriptionState>;

  export type SuruUI = {};

  export type BaseUI = Omit<React.ComponentProps<typeof Popover.Description>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"p">,
    keyof Render | keyof React.ComponentProps<typeof Popover.Description>
  >;
}

/**
 * {@link PopoverDescription} に渡す props です。
 */
export type PopoverDescriptionProps = PopoverDescriptionProps.Render &
  PopoverDescriptionProps.SuruUI &
  PopoverDescriptionProps.BaseUI &
  PopoverDescriptionProps.HTML;

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
  export type State = PopoverDescriptionState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PopoverDescriptionProps.Render;

    export type SuruUI = PopoverDescriptionProps.SuruUI;

    export type BaseUI = PopoverDescriptionProps.BaseUI;

    export type HTML = PopoverDescriptionProps.HTML;
  }
}

// Close
// -----

/**
 * {@link PopoverClose} が持つ状態です。
 */
export type PopoverCloseState = Popover.Close.State;

export namespace PopoverCloseProps {
  export type Render = RenderProps<PopoverCloseState>;

  export type SuruUI = {
    /**
     * ボタンとしてレンダリングする要素です。
     *
     * {@link Popover.Close} の `render` プロパティーと同じ型で、そのまま `render` に渡されます。
     */
    children: NonNullable<React.ComponentProps<typeof Popover.Close>["render"]>;
  };

  export type BaseUI = Omit<
    React.ComponentProps<typeof Popover.Close>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"button">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof Popover.Close>
  >;
}

/**
 * {@link PopoverClose} に渡す props です。
 */
export type PopoverCloseProps = PopoverCloseProps.Render &
  PopoverCloseProps.SuruUI &
  PopoverCloseProps.BaseUI &
  PopoverCloseProps.HTML;

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
  export type State = PopoverCloseState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PopoverCloseProps.Render;

    export type SuruUI = PopoverCloseProps.SuruUI;

    export type BaseUI = PopoverCloseProps.BaseUI;

    export type HTML = PopoverCloseProps.HTML;
  }
}

// Viewport
// --------

/**
 * {@link PopoverViewport} が持つ状態です。
 */
export type PopoverViewportState = Popover.Viewport.State;

export namespace PopoverViewportProps {
  export type Render = RenderProps<PopoverViewportState>;

  export type SuruUI = {};

  export type BaseUI = Omit<React.ComponentProps<typeof Popover.Viewport>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof Popover.Viewport>
  >;
}

/**
 * {@link PopoverViewport} に渡す props です。
 */
export type PopoverViewportProps = PopoverViewportProps.Render &
  PopoverViewportProps.SuruUI &
  PopoverViewportProps.BaseUI &
  PopoverViewportProps.HTML;

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
  export type State = PopoverViewportState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PopoverViewportProps.Render;

    export type SuruUI = PopoverViewportProps.SuruUI;

    export type BaseUI = PopoverViewportProps.BaseUI;

    export type HTML = PopoverViewportProps.HTML;
  }
}
