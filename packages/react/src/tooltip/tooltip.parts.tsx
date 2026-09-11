import { Tooltip } from "@base-ui/react/tooltip";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
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

export namespace TooltipRootProps {
  export type Render = RenderProps<TooltipRootState>;

  export type SuruUI<TPayload = any> = {
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

  export type BaseUI<TPayload = any> = Omit<
    React.ComponentProps<typeof Tooltip.Root<TPayload>>,
    keyof Render | keyof SuruUI | "handle"
  >;

  export type HTML = {};
}

/**
 * {@link TooltipRoot} に渡す props です。
 *
 * @template TPayload トリガーから受け取るデータの型です。
 */
export type TooltipRootProps<TPayload = any> = TooltipRootProps.Render &
  TooltipRootProps.SuruUI<TPayload> &
  TooltipRootProps.BaseUI<TPayload> &
  TooltipRootProps.HTML;

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
  export type State = TooltipRootState;

  export type Props<TPayload = any> = Props.Render &
    Props.SuruUI<TPayload> &
    Props.BaseUI<TPayload> &
    Props.HTML;

  export namespace Props {
    export type Render = TooltipRootProps.Render;

    export type SuruUI<TPayload = any> = TooltipRootProps.SuruUI<TPayload>;

    export type BaseUI<TPayload = any> = TooltipRootProps.BaseUI<TPayload>;

    export type HTML = TooltipRootProps.HTML;
  }

  export type Actions = TooltipRootActions;

  export type ChangeEventDetails = TooltipRootChangeEventDetails;

  export type ChangeEventReason = TooltipRootChangeEventReason;

  export type Radius = TooltipRootRadius;

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

export namespace TooltipTriggerProps {
  export type Render = RenderProps<TooltipTriggerState>;

  export type SuruUI<TPayload = any> = {
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

  export type BaseUI<TPayload = any> = Omit<
    Omit<React.ComponentProps<typeof Tooltip.Trigger<TPayload>>, "closeOnClick">,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<React.ComponentProps<"button">, keyof Render | keyof SuruUI>;
}

/**
 * {@link TooltipTrigger} に渡す props です。
 *
 * @template TPayload トリガーから渡すデータの型です。
 */
export type TooltipTriggerProps<TPayload = any> = TooltipTriggerProps.Render &
  TooltipTriggerProps.SuruUI<TPayload> &
  TooltipTriggerProps.BaseUI<TPayload> &
  TooltipTriggerProps.HTML;

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
  export type State = TooltipTriggerState;

  export type Props<TPayload = any> = Props.Render &
    Props.SuruUI<TPayload> &
    Props.BaseUI<TPayload> &
    Props.HTML;

  export namespace Props {
    export type Render = TooltipTriggerProps.Render;

    export type SuruUI<TPayload = any> = TooltipTriggerProps.SuruUI<TPayload>;

    export type BaseUI<TPayload = any> = TooltipTriggerProps.BaseUI<TPayload>;

    export type HTML = TooltipTriggerProps.HTML;
  }
}

// Portal
// ------

/**
 * {@link TooltipPortal} が持つ状態です。
 */
export type TooltipPortalState = Tooltip.Portal.State;

export namespace TooltipPortalProps {
  export type Render = RenderProps<TooltipPortalState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    React.ComponentProps<typeof Tooltip.Portal>,
    keyof Render | keyof React.ComponentProps<"div">
  >;

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render>;
}

/**
 * {@link TooltipPortal} に渡す props です。
 */
export type TooltipPortalProps = TooltipPortalProps.Render &
  TooltipPortalProps.SuruUI &
  TooltipPortalProps.BaseUI &
  TooltipPortalProps.HTML;

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
  export type State = TooltipPortalState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = TooltipPortalProps.Render;

    export type SuruUI = TooltipPortalProps.SuruUI;

    export type BaseUI = TooltipPortalProps.BaseUI;

    export type HTML = TooltipPortalProps.HTML;
  }
}

// Positioner
// ----------

/**
 * {@link TooltipPositioner} が持つ状態です。
 */
export type TooltipPositionerState = Tooltip.Positioner.State;

export namespace TooltipPositionerProps {
  export type Render = RenderProps<TooltipPositionerState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    React.ComponentProps<typeof Tooltip.Positioner>,
    keyof Render | keyof React.ComponentProps<"div">
  >;

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render>;
}

/**
 * {@link TooltipPositioner} に渡す props です。
 */
export type TooltipPositionerProps = TooltipPositionerProps.Render &
  TooltipPositionerProps.SuruUI &
  TooltipPositionerProps.BaseUI &
  TooltipPositionerProps.HTML;

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
  export type State = TooltipPositionerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = TooltipPositionerProps.Render;

    export type SuruUI = TooltipPositionerProps.SuruUI;

    export type BaseUI = TooltipPositionerProps.BaseUI;

    export type HTML = TooltipPositionerProps.HTML;
  }
}

// Content
// -------

/**
 * {@link TooltipContent} が持つ状態です。
 */
export type TooltipContentState = Tooltip.Popup.State;

export namespace TooltipContentProps {
  export type Render = RenderProps<TooltipContentState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    React.ComponentProps<typeof Tooltip.Popup>,
    keyof Render | keyof React.ComponentProps<"div">
  >;

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render>;
}

/**
 * {@link TooltipContent} に渡す props です。
 */
export type TooltipContentProps = TooltipContentProps.Render &
  TooltipContentProps.SuruUI &
  TooltipContentProps.BaseUI &
  TooltipContentProps.HTML;

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
  export type State = TooltipContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = TooltipContentProps.Render;

    export type SuruUI = TooltipContentProps.SuruUI;

    export type BaseUI = TooltipContentProps.BaseUI;

    export type HTML = TooltipContentProps.HTML;
  }
}

// Arrow
// -----

/**
 * {@link TooltipArrow} が持つ状態です。
 */
export type TooltipArrowState = Tooltip.Arrow.State;

export namespace TooltipArrowProps {
  export type Render = RenderProps<TooltipArrowState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    React.ComponentProps<typeof Tooltip.Arrow>,
    keyof Render | keyof React.ComponentProps<"div">
  >;

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render>;
}

/**
 * {@link TooltipArrow} に渡す props です。
 */
export type TooltipArrowProps = TooltipArrowProps.Render &
  TooltipArrowProps.SuruUI &
  TooltipArrowProps.BaseUI &
  TooltipArrowProps.HTML;

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
  export type State = TooltipArrowState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = TooltipArrowProps.Render;

    export type SuruUI = TooltipArrowProps.SuruUI;

    export type BaseUI = TooltipArrowProps.BaseUI;

    export type HTML = TooltipArrowProps.HTML;
  }
}

// Viewport
// --------

/**
 * {@link TooltipViewport} が持つ状態です。
 */
export type TooltipViewportState = Tooltip.Viewport.State;

export namespace TooltipViewportProps {
  export type Render = RenderProps<TooltipViewportState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    React.ComponentProps<typeof Tooltip.Viewport>,
    keyof Render | keyof React.ComponentProps<"div">
  >;

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render>;
}

/**
 * {@link TooltipViewport} に渡す props です。
 */
export type TooltipViewportProps = TooltipViewportProps.Render &
  TooltipViewportProps.SuruUI &
  TooltipViewportProps.BaseUI &
  TooltipViewportProps.HTML;

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
  export type State = TooltipViewportState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = TooltipViewportProps.Render;

    export type SuruUI = TooltipViewportProps.SuruUI;

    export type BaseUI = TooltipViewportProps.BaseUI;

    export type HTML = TooltipViewportProps.HTML;
  }
}
