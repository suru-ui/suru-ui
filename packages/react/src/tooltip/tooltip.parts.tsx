import { Tooltip } from "@base-ui/react/tooltip";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import type { IComponent, IUseContext } from "../types.js";

import "./tooltip.css";

// Context
// -------

/**
 * {@link TooltipRoot} が子パーツへ提供するコンテキストです。
 */
export type TooltipContext = {
  /**
   * ツールチップに枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * ツールチップの角丸の大きさです。
   */
  readonly radius: TooltipRootRadius;

  /**
   * ツールチップの大きさです。
   */
  readonly size: TooltipRootSize;
};

/**
 * {@link TooltipRoot} が子パーツへ提供するコンテキストです。
 */
export const TooltipContext: React.Context<TooltipContext | null> =
  React.createContext<TooltipContext | null>(null);

function useSuiTooltipContext(optional?: false): TooltipContext;
function useSuiTooltipContext(optional?: boolean): TooltipContext | null;
function useSuiTooltipContext(optional?: boolean): TooltipContext | null {
  const ctx = React.use(TooltipContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "TooltipContext",
      providerName: "TooltipRoot",
    });
  }

  return ctx;
}

/**
 * {@link TooltipContext} を読み取るフックです。
 */
export const useTooltipContext: IUseContext<TooltipContext> = useSuiTooltipContext;

export { TooltipContext as Context, useTooltipContext as useContext };

// Handle
// ------

/**
 * ツールチップを制御するハンドルです。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export interface TooltipHandle<TPayload = any> extends Tooltip.Handle<TPayload> {}

interface ICreateTooltipHandle {
  /**
   * @template TPayload トリガーが送信するデータの型です。
   * @returns ツールチップを制御するハンドルです。
   */
  <TPayload = any>(): TooltipHandle<TPayload>;
}

/**
 * {@link TooltipHandle} を作成する関数です。
 */
export const createTooltipHandle: ICreateTooltipHandle = function createSuiTooltipHandle() {
  return Tooltip.createHandle();
};

export { type TooltipHandle as Handle, createTooltipHandle as createHandle };

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
 * ツールチップの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type TooltipRootRadius = "none" | Size;

/**
 * ツールチップの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type TooltipRootSize = Size;

/**
 * {@link TooltipRoot} が持つ状態です。
 */
export type TooltipRootState = Tooltip.Root.State;

/**
 * {@link TooltipRoot} に渡す props です。
 *
 * @template TPayload トリガーから受け取るデータの型です。
 */
export type TooltipRootProps<TPayload = any> = Omit<
  React.ComponentProps<typeof Tooltip.Root<TPayload>>,
  "handle"
> & {
  /**
   * ツールチップとトリガーを関連付けるハンドルです。
   *
   * {@link createHandle} で作成します。Root 内に {@link Trigger} を配置する場合は省略できます。
   */
  handle?: TooltipHandle<TPayload> | undefined;

  /**
   * ツールチップに枠線を表示するかどうかを指定します。
   *
   * @default false
   */
  outlined?: boolean | undefined;

  /**
   * ツールチップの角丸を指定します。
   *
   * 既定値は {@link TooltipRootProps.size|size} です。
   */
  radius?: TooltipRootRadius | undefined;

  /**
   * ツールチップのサイズを指定します。
   *
   * @default "md"
   */
  size?: TooltipRootSize | undefined;
};

/**
 * {@link TooltipRoot} のコンポーネント型です。
 */
export interface ITooltipRoot extends IComponent<TooltipRootProps> {
  <TPayload = any>(props: TooltipRootProps<TPayload>): React.ReactElement | null;
}

/**
 * ツールチップのルートです。
 *
 * 開閉状態を管理し、トリガーとポップアップをグループ化します。
 * それ自身は HTML 要素をレンダリングしません。
 */
export const TooltipRoot: ITooltipRoot = function SuiTooltipRoot<TPayload>(
  props: TooltipRootProps<TPayload>,
) {
  const { size = "md", radius = size, outlined = false, ...otherProps } = props;
  const ctx = React.useMemo<TooltipContext>(
    () => ({ size, radius, outlined }),
    [size, radius, outlined],
  );

  return (
    <TooltipContext.Provider value={ctx}>
      <Tooltip.Root {...otherProps} />
    </TooltipContext.Provider>
  );
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
  export type Props<TPayload = any> = TooltipRootProps<TPayload>;

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

  /**
   * {@link TooltipRootRadius}
   */
  export type Radius = TooltipRootRadius;

  /**
   * {@link TooltipRootSize}
   */
  export type Size = TooltipRootSize;
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
export type TooltipTriggerProps<TPayload = any> = Omit<
  React.ComponentProps<typeof Tooltip.Trigger<TPayload>>,
  "handle" | "children" | "render" | "closeOnClick"
> & {
  /**
   * トリガーとしてレンダリングする要素です。
   *
   * {@link Tooltip.Trigger} の `render` プロパティーと同じ型で、そのまま `render` に渡されます。
   */
  children: NonNullable<Tooltip.Trigger.Props<TPayload>["render"]>;

  /**
   * ツールチップを関連付けるハンドルです。
   *
   * {@link createHandle} で作成し、{@link Root} と共有します。Root 内に配置する場合は省略できます。
   */
  handle?: TooltipHandle<TPayload> | undefined;

  /**
   * このトリガーがクリックされたときにツールチップを開いたままにするかかどうかを指定します。
   *
   * @default false
   */
  keepOpenOnClick?: boolean | undefined;
};

/**
 * {@link TooltipTrigger} のコンポーネント型です。
 */
export interface ITooltipTrigger extends IComponent<TooltipTriggerProps> {
  <TPayload = any>(props: TooltipTriggerProps<TPayload>): React.ReactElement | null;
}

/**
 * ツールチップを開くトリガー要素です。
 *
 * 子要素は何にもラップされず、そのまま {@link Tooltip.Trigger} の `render` プロパティーに渡されます。
 */
export const TooltipTrigger: ITooltipTrigger = function SuiTooltipTrigger<TPayload>(
  props: TooltipTriggerProps<TPayload>,
) {
  const { handle, children, className, keepOpenOnClick = false, ...otherProps } = props;

  return (
    <Tooltip.Trigger
      {...otherProps}
      handle={handle}
      render={children}
      className={cn(className, "sui_tooltip_trigger")}
      closeOnClick={!keepOpenOnClick}
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
  export type Props<TPayload = any> = TooltipTriggerProps<TPayload>;
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
  const ctx = useTooltipContext(true);
  const size = ctx?.size ?? "md";
  const radius = ctx?.radius ?? "md";
  const outlined = ctx?.outlined ?? false;

  return (
    <Tooltip.Portal
      {...otherProps}
      className={cn(
        className,
        "sui_tooltip_portal",
        `sui_tooltip-size_${size}`,
        `sui_tooltip-radius_${radius}`,
        outlined && "sui_tooltip-outlined",
      )}
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

// Content
// -------

/**
 * {@link TooltipContent} が持つ状態です。
 */
export type TooltipContentState = Tooltip.Popup.State;

/**
 * {@link TooltipContent} に渡す props です。
 */
export type TooltipContentProps = React.ComponentProps<typeof Tooltip.Popup>;

/**
 * ツールチップの内容を表示するポップアップ要素です。
 */
export const TooltipContent: IComponent<TooltipContentProps> = function SuiTooltipContent(props) {
  const { className, ...otherProps } = props;

  return (
    <Tooltip.Popup
      role="tooltip"
      {...otherProps}
      className={cn(
        className,
        "sui_tooltip_content",
        (state) =>
          state.transitionStatus !== undefined &&
          `sui_tooltip_content-transition_status_${state.transitionStatus}`,
      )}
    />
  );
};

export { TooltipContent as Content };

export namespace Content {
  /**
   * {@link TooltipContentState}
   */
  export type State = TooltipContentState;

  /**
   * {@link TooltipContentProps}
   */
  export type Props = TooltipContentProps;
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
