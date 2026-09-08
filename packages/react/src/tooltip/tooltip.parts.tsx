import { Tooltip } from "@base-ui/react/tooltip";
import * as React from "react";

import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./tooltip.css";

// Handle
// ------

/**
 * ツールチップを制御するハンドルです。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export interface TooltipHandle<TPayload = unknown> extends Tooltip.Handle<TPayload> {}

interface ICreateTooltipHandle {
  /**
   * @template TPayload トリガーが送信するデータの型です。
   * @returns ツールチップを制御するハンドルです。
   */
  <TPayload = unknown>(): TooltipHandle<TPayload>;
}

/**
 * {@link TooltipHandle} を作成する関数です。
 */
export const createTooltipHandle: ICreateTooltipHandle = function createSuiTooltipHandle() {
  return Tooltip.createHandle();
};

export { type TooltipHandle as Handle, createTooltipHandle as createHandle };

// Provider
// --------

/**
 * {@link TooltipProvider} が持つ状態です。
 */
export type TooltipProviderState = Tooltip.Provider.State;

/**
 * {@link TooltipProvider} に渡す props です。
 */
export type TooltipProviderProps = Tooltip.Provider.Props;

/**
 * 複数のツールチップで開閉の遅延を共有するプロバイダーです。
 *
 * 近接したツールチップを続けて表示するとき、先に表示したツールチップが閉じてから一定時間内であれば、次のツールチップをすぐに表示します。
 */
export const TooltipProvider: IComponent<TooltipProviderProps> = function SuiTooltipProvider(
  props,
) {
  return <Tooltip.Provider {...props} />;
};

export { TooltipProvider as Provider };

export namespace Provider {
  /**
   * {@link TooltipProviderState}
   */
  export type State = TooltipProviderState;

  /**
   * {@link TooltipProviderProps}
   */
  export type Props = TooltipProviderProps;
}

// Root
// ----

/**
 * {@link TooltipRoot} を命令的に操作するためのオブジェクトです。
 */
export type TooltipRootActions = Tooltip.Root.Actions;

/**
 * {@link TooltipRoot} の開閉状態を変更するイベントの詳細です。
 */
export type TooltipRootChangeEventDetails = Tooltip.Root.ChangeEventDetails;

/**
 * {@link TooltipRoot} の開閉状態を変更する理由です。
 */
export type TooltipRootChangeEventReason = Tooltip.Root.ChangeEventReason;

/**
 * {@link TooltipRoot} が持つ状態です。
 */
export type TooltipRootState = Tooltip.Root.State;

/**
 * {@link TooltipRoot} に渡す props です。
 *
 * @template TPayload トリガーから受け取るデータの型です。
 */
export type TooltipRootProps<TPayload = unknown> = Omit<Tooltip.Root.Props<TPayload>, "handle"> & {
  /**
   * ツールチップとトリガー ({@link Trigger}) を関連付けるハンドルです。
   *
   * {@link createHandle} で作成します。Root 内に {@link Trigger} を配置する場合は省略できます。
   */
  handle?: TooltipHandle<TPayload> | undefined;
};

/**
 * {@link TooltipRoot} のコンポーネント型です。
 */
export interface TooltipRootComponent extends IComponent<TooltipRootProps> {
  <TPayload = unknown>(props: TooltipRootProps<TPayload>): React.ReactElement | null;
}

/**
 * ツールチップのルートです。
 *
 * 開閉状態を管理し、トリガーとポップアップをグループ化します。
 * それ自身は HTML 要素をレンダリングしません。
 */
export const TooltipRoot: TooltipRootComponent = function SuiTooltipRoot<TPayload>(
  props: TooltipRootProps<TPayload>,
) {
  return <Tooltip.Root {...props} />;
};

export { TooltipRoot as Root };

export namespace Root {
  /**
   * {@link TooltipRootState}
   */
  export type State = TooltipRootState;

  /**
   * {@link TooltipRootProps}
   */
  export type Props<TPayload = unknown> = TooltipRootProps<TPayload>;

  /**
   * {@link TooltipRootActions}
   */
  export type Actions = TooltipRootActions;

  /**
   * {@link TooltipRootChangeEventDetails}
   */
  export type ChangeEventDetails = TooltipRootChangeEventDetails;

  /**
   * {@link TooltipRootChangeEventReason}
   */
  export type ChangeEventReason = TooltipRootChangeEventReason;
}

// Trigger
// -------

/**
 * {@link TooltipTrigger} が持つ状態です。
 *
 * @template TPayload トリガーから渡すデータの型です。
 */
export type TooltipTriggerState = Tooltip.Trigger.State;

/**
 * {@link TooltipTrigger} に渡す props です。
 *
 * @template TPayload トリガーから渡すデータの型です。
 */
export type TooltipTriggerProps<TPayload = unknown> = Omit<
  Tooltip.Trigger.Props<TPayload>,
  "handle" | "children" | "render"
> & {
  /**
   * トリガーとしてレンダリングする要素です。
   *
   * {@link Tooltip.Trigger} の `render` プロパティーと同じ型で、そのまま `render` に渡されます。
   */
  children: NonNullable<Tooltip.Trigger.Props<TPayload>["render"]>;

  /**
   * ツールチップ ({@link Root}) を関連付けるハンドルです。
   *
   * {@link createHandle} で作成し、{@link Root} と共有します。Root 内に配置する場合は省略できます。
   */
  handle?: TooltipHandle<TPayload> | undefined;
};

/**
 * {@link TooltipTrigger} のコンポーネント型です。
 */
export interface TooltipTriggerComponent extends IComponent<TooltipTriggerProps> {
  <TPayload = unknown>(props: TooltipTriggerProps<TPayload>): React.ReactElement | null;
}

/**
 * ツールチップを開くトリガー要素です。
 *
 * 子要素は何にもラップされず、そのまま {@link Tooltip.Trigger} の `render` プロパティーに渡されます。
 */
export const TooltipTrigger: TooltipTriggerComponent = function SuiTooltipTrigger<TPayload>(
  props: TooltipTriggerProps<TPayload>,
) {
  const { handle, children, className, ...otherProps } = props;

  return (
    <Tooltip.Trigger
      {...otherProps}
      handle={handle}
      render={children}
      className={cn(className, "sui_tooltip_trigger")}
    />
  );
};

export { TooltipTrigger as Trigger };

export namespace Trigger {
  /**
   * {@link TooltipTriggerState}
   */
  export type State = TooltipTriggerState;

  /**
   * {@link TooltipTriggerProps}
   */
  export type Props<TPayload = unknown> = TooltipTriggerProps<TPayload>;
}

// Portal
// ------

/**
 * {@link TooltipPortal} が持つ状態です。
 */
export type TooltipPortalState = Tooltip.Portal.State;

/**
 * {@link TooltipPortal} に渡す props です。
 */
export type TooltipPortalProps = React.ComponentProps<typeof Tooltip.Portal>;

/**
 * ツールチップを DOM の別の場所へ移動する要素です。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const TooltipPortal: IComponent<TooltipPortalProps> = function SuiTooltipPortal(props) {
  const {
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <Tooltip.Portal
      {...otherProps}
      className={cn(className, "sui_tooltip_portal")}
      data-scope={dataScope}
    />
  );
};

export { TooltipPortal as Portal };

export namespace Portal {
  /**
   * {@link TooltipPortalState}
   */
  export type State = TooltipPortalState;

  /**
   * {@link TooltipPortalProps}
   */
  export type Props = TooltipPortalProps;
}

// Positioner
// ----------

/**
 * {@link TooltipPositioner} が持つ状態です。
 */
export type TooltipPositionerState = Tooltip.Positioner.State;

/**
 * {@link TooltipPositioner} に渡す props です。
 */
export type TooltipPositionerProps = React.ComponentProps<typeof Tooltip.Positioner>;

/**
 * トリガーを基準にポップアップを配置する要素です。
 */
export const TooltipPositioner: IComponent<TooltipPositionerProps> = function SuiTooltipPositioner(
  props,
) {
  const { className, positionMethod = "fixed", ...otherProps } = props;

  return (
    <Tooltip.Positioner
      {...otherProps}
      className={cn(className, "sui_tooltip_positioner")}
      positionMethod={positionMethod}
    />
  );
};

export { TooltipPositioner as Positioner };

export namespace Positioner {
  /**
   * {@link TooltipPositionerState}
   */
  export type State = TooltipPositionerState;

  /**
   * {@link TooltipPositionerProps}
   */
  export type Props = TooltipPositionerProps;
}

// Popup
// -----

/**
 * {@link TooltipPopup} が持つ状態です。
 */
export type TooltipPopupState = Tooltip.Popup.State;

/**
 * {@link TooltipPopup} に渡す props です。
 */
export type TooltipPopupProps = React.ComponentProps<typeof Tooltip.Popup>;

/**
 * ツールチップの内容を表示するポップアップ要素です。
 */
export const TooltipPopup: IComponent<TooltipPopupProps> = function SuiTooltipPopup(props) {
  const { className, ...otherProps } = props;

  return (
    <Tooltip.Popup
      role="tooltip"
      {...otherProps}
      className={cn(
        className,
        "sui_tooltip_popup",
        (state) =>
          state.transitionStatus !== undefined &&
          `sui_tooltip_popup-transition_status_${state.transitionStatus}`,
      )}
    />
  );
};

export { TooltipPopup as Popup };

export namespace Popup {
  /**
   * {@link TooltipPopupState}
   */
  export type State = TooltipPopupState;

  /**
   * {@link TooltipPopupProps}
   */
  export type Props = TooltipPopupProps;
}

// Arrow
// -----

/**
 * {@link TooltipArrow} が持つ状態です。
 */
export type TooltipArrowState = Tooltip.Arrow.State;

/**
 * {@link TooltipArrow} に渡す props です。
 */
export type TooltipArrowProps = React.ComponentProps<typeof Tooltip.Arrow>;

/**
 * ポップアップとトリガーをつなぐ矢印要素です。
 */
export const TooltipArrow: IComponent<TooltipArrowProps> = function SuiTooltipArrow(props) {
  const { className, ...otherProps } = props;

  return (
    <Tooltip.Arrow
      {...otherProps}
      className={cn(
        className,
        "sui_tooltip_arrow",
        (state) => `sui_tooltip_arrow-side_${state.side}`,
      )}
    />
  );
};

export { TooltipArrow as Arrow };

export namespace Arrow {
  /**
   * {@link TooltipArrowState}
   */
  export type State = TooltipArrowState;

  /**
   * {@link TooltipArrowProps}
   */
  export type Props = TooltipArrowProps;
}

// Viewport
// --------

/**
 * {@link TooltipViewport} が持つ状態です。
 */
export type TooltipViewportState = Tooltip.Viewport.State;

/**
 * {@link TooltipViewport} に渡す props です。
 */
export type TooltipViewportProps = React.ComponentProps<typeof Tooltip.Viewport>;

/**
 * 複数のトリガー間で内容を切り替えるときのアニメーション領域です。
 *
 * 1 つのツールチップを複数のトリガーで共有し、内容をトリガーごとに変える場合に使います。
 */
export const TooltipViewport: IComponent<TooltipViewportProps> = function SuiTooltipViewport(
  props,
) {
  const { className, ...otherProps } = props;

  return <Tooltip.Viewport {...otherProps} className={cn(className, "sui_tooltip_viewport")} />;
};

export { TooltipViewport as Viewport };

export namespace Viewport {
  /**
   * {@link TooltipViewportState}
   */
  export type State = TooltipViewportState;

  /**
   * {@link TooltipViewportProps}
   */
  export type Props = TooltipViewportProps;
}
