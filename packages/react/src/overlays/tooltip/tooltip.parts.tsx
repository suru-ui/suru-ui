import { Tooltip } from "@base-ui/react/tooltip";
import * as React from "react";

import cn from "../../cn.js";
import type { Component } from "../../types.js";

import "./tooltip.css";

// Handle
// ------

/**
 * ツールチップを制御するハンドルです。
 */
export type TooltipHandle<Payload = unknown> = Tooltip.Handle<Payload>;

/**
 * ツールチップを制御するハンドルを新しく作成します。
 *
 * 作成したハンドルを {@link Root} と {@link Trigger} の `handle` プロパティーに渡すことで、
 * ルートとトリガーを別々の場所に配置できます。
 *
 * @example
 * ```tsx
 * const handle = TooltipParts.createHandle();
 * ```
 */
export const createHandle: typeof Tooltip.createHandle = Tooltip.createHandle;

// Provider
// --------

/**
 * {@link Provider} の状態です。
 */
export type TooltipProviderState = Tooltip.Provider.State;

/**
 * {@link Provider} に渡すプロパティーです。
 */
export type TooltipProviderProps = Tooltip.Provider.Props;

/**
 * 複数のツールチップで開閉の遅延を共有するプロバイダーです。
 *
 * 近接したツールチップを続けて表示するとき、先に表示したツールチップが閉じてから一定時間内であれば、
 * 次のツールチップをすぐに表示します。
 *
 * @example
 * ```tsx
 * <TooltipParts.Provider>
 *   <Toolbar />
 * </TooltipParts.Provider>
 * ```
 */
export const TooltipProvider: Component<TooltipProviderProps> = function SuiTooltipProvider(props) {
  return <Tooltip.Provider {...props} />;
};

/**
 * {@link TooltipProvider} の型をまとめた名前空間です。
 */
export namespace Provider {
  /**
   * {@link TooltipProvider} の状態型です。
   */
  export type State = TooltipProviderState;

  /**
   * {@link TooltipProvider} のプロパティー型です。
   */
  export type Props = TooltipProviderProps;
}

/**
 * {@link TooltipProvider} の短縮名です。
 */
export const Provider: Component<Provider.Props> = TooltipProvider;

// Root
// ----

/**
 * {@link Root} の状態です。
 */
export type TooltipRootState = Tooltip.Root.State;

/**
 * {@link Root} に渡すプロパティーです。
 *
 * @template Payload トリガーから受け取るデータの型です。
 */
export type TooltipRootProps<Payload = unknown> = Tooltip.Root.Props<Payload>;

/**
 * {@link TooltipRoot} のコンポーネント型です。
 */
export interface TooltipRootComponent {
  <Payload = unknown>(props: TooltipRootProps<Payload>): React.ReactElement | null;

  displayName?: string | undefined;
}

/**
 * ツールチップのルートです。
 *
 * 開閉状態を管理し、トリガーとポップアップをグループ化します。
 * それ自身は HTML 要素をレンダリングしません。
 *
 * @example
 * ```tsx
 * <TooltipParts.Root>
 *   <TooltipParts.Trigger aria-label="保存">
 *     {(props) => <button type="button" {...props}>保存</button>}
 *   </TooltipParts.Trigger>
 *   <TooltipParts.Portal>
 *     <TooltipParts.Positioner>
 *       <TooltipParts.Popup>
 *         <TooltipParts.Arrow />
 *         保存します
 *       </TooltipParts.Popup>
 *     </TooltipParts.Positioner>
 *   </TooltipParts.Portal>
 * </TooltipParts.Root>
 * ```
 */
export const TooltipRoot: TooltipRootComponent = function SuiTooltipRoot<Payload>(
  props: TooltipRootProps<Payload>,
) {
  return <Tooltip.Root {...props} />;
};

/**
 * {@link TooltipRoot} の型をまとめた名前空間です。
 */
export namespace Root {
  /**
   * {@link TooltipRoot} の状態型です。
   */
  export type State = TooltipRootState;

  /**
   * {@link TooltipRoot} のプロパティー型です。
   */
  export type Props<Payload = unknown> = TooltipRootProps<Payload>;
}

/**
 * {@link TooltipRoot} の短縮名です。
 */
export const Root: TooltipRootComponent = TooltipRoot;

// Trigger
// -------

/**
 * {@link Trigger} の状態です。
 *
 * @template Payload トリガーから渡すデータの型です。
 */
export type TooltipTriggerState = Tooltip.Trigger.State;

/**
 * {@link Trigger} に渡すプロパティーです。
 *
 * @template Payload トリガーから渡すデータの型です。
 */
export type TooltipTriggerProps<Payload = unknown> = Omit<
  Tooltip.Trigger.Props<Payload>,
  "children" | "render"
> & {
  /**
   * トリガーとしてレンダリングする要素です。
   *
   * {@link Tooltip.Trigger} の `render` プロパティーと同じ型で、そのまま `render` に渡されます。
   */
  children: NonNullable<Tooltip.Trigger.Props<Payload>["render"]>;
};

/**
 * {@link TooltipTrigger} のコンポーネント型です。
 */
export interface TooltipTriggerComponent {
  <Payload = unknown>(props: TooltipTriggerProps<Payload>): React.ReactElement | null;

  displayName?: string | undefined;
}

/**
 * ツールチップを開くトリガー要素です。
 *
 * 子要素は何にもラップされず、そのまま {@link Tooltip.Trigger} の `render` プロパティーに渡されます。
 *
 * @example
 * ```tsx
 * <TooltipParts.Trigger aria-label="削除">
 *   {(props) => <button type="button" {...props}>削除</button>}
 * </TooltipParts.Trigger>
 * ```
 */
export const TooltipTrigger: TooltipTriggerComponent = function SuiTooltipTrigger<Payload>(
  props: TooltipTriggerProps<Payload>,
) {
  const { className, children, ...otherProps } = props;

  return (
    <Tooltip.Trigger
      {...otherProps}
      className={cn(className, "sui_tooltip_trigger")}
      render={children}
    />
  );
};

/**
 * {@link TooltipTrigger} の型をまとめた名前空間です。
 */
export namespace Trigger {
  /**
   * {@link TooltipTrigger} の状態型です。
   */
  export type State = TooltipTriggerState;

  /**
   * {@link TooltipTrigger} のプロパティー型です。
   */
  export type Props<Payload = unknown> = TooltipTriggerProps<Payload>;
}

/**
 * {@link TooltipTrigger} の短縮名です。
 */
export const Trigger: TooltipTriggerComponent = TooltipTrigger;

// Portal
// ------

/**
 * {@link Portal} の状態です。
 */
export type TooltipPortalState = Tooltip.Portal.State;

/**
 * {@link Portal} に渡すプロパティーです。
 */
export type TooltipPortalProps = React.ComponentProps<typeof Tooltip.Portal>;

/**
 * ツールチップを DOM の別の場所へ移動する要素です。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 *
 * @example
 * ```tsx
 * <TooltipParts.Portal>
 *   <TooltipParts.Positioner>…</TooltipParts.Positioner>
 * </TooltipParts.Portal>
 * ```
 */
export const TooltipPortal: Component<TooltipPortalProps> = function SuiTooltipPortal(props) {
  const { className, ...otherProps } = props;

  return <Tooltip.Portal {...otherProps} className={cn(className, "sui_tooltip_portal")} />;
};

/**
 * {@link TooltipPortal} の型をまとめた名前空間です。
 */
export namespace Portal {
  /**
   * {@link TooltipPortal} の状態型です。
   */
  export type State = TooltipPortalState;

  /**
   * {@link TooltipPortal} のプロパティー型です。
   */
  export type Props = TooltipPortalProps;
}

/**
 * {@link TooltipPortal} の短縮名です。
 */
export const Portal: Component<Portal.Props> = TooltipPortal;

// Positioner
// ----------

/**
 * {@link Positioner} の状態です。
 */
export type TooltipPositionerState = Tooltip.Positioner.State;

/**
 * {@link Positioner} に渡すプロパティーです。
 */
export type TooltipPositionerProps = React.ComponentProps<typeof Tooltip.Positioner>;

/**
 * トリガーを基準にポップアップを配置する要素です。
 *
 * @example
 * ```tsx
 * <TooltipParts.Positioner sideOffset={8}>
 *   <TooltipParts.Popup>説明</TooltipParts.Popup>
 * </TooltipParts.Positioner>
 * ```
 */
export const TooltipPositioner: Component<TooltipPositionerProps> = function SuiTooltipPositioner(
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

/**
 * {@link TooltipPositioner} の型をまとめた名前空間です。
 */
export namespace Positioner {
  /**
   * {@link TooltipPositioner} の状態型です。
   */
  export type State = TooltipPositionerState;

  /**
   * {@link TooltipPositioner} のプロパティー型です。
   */
  export type Props = TooltipPositionerProps;
}

/**
 * {@link TooltipPositioner} の短縮名です。
 */
export const Positioner: Component<Positioner.Props> = TooltipPositioner;

// Popup
// -----

/**
 * {@link Popup} の状態です。
 */
export type TooltipPopupState = Tooltip.Popup.State;

/**
 * {@link Popup} に渡すプロパティーです。
 */
export type TooltipPopupProps = React.ComponentProps<typeof Tooltip.Popup>;

/**
 * ツールチップの内容を表示するポップアップ要素です。
 *
 * @example
 * ```tsx
 * <TooltipParts.Popup>
 *   <TooltipParts.Arrow />
 *   保存します
 * </TooltipParts.Popup>
 * ```
 */
export const TooltipPopup: Component<TooltipPopupProps> = function SuiTooltipPopup(props) {
  const { className, ...otherProps } = props;

  return (
    <Tooltip.Popup role="tooltip" {...otherProps} className={cn(className, "sui_tooltip_popup")} />
  );
};

/**
 * {@link TooltipPopup} の型をまとめた名前空間です。
 */
export namespace Popup {
  /**
   * {@link TooltipPopup} の状態型です。
   */
  export type State = TooltipPopupState;

  /**
   * {@link TooltipPopup} のプロパティー型です。
   */
  export type Props = TooltipPopupProps;
}

/**
 * {@link TooltipPopup} の短縮名です。
 */
export const Popup: Component<Popup.Props> = TooltipPopup;

// Arrow
// -----

/**
 * {@link Arrow} の状態です。
 */
export type TooltipArrowState = Tooltip.Arrow.State;

/**
 * {@link Arrow} に渡すプロパティーです。
 */
export type TooltipArrowProps = React.ComponentProps<typeof Tooltip.Arrow>;

/**
 * ポップアップとトリガーをつなぐ矢印要素です。
 *
 * @example
 * ```tsx
 * <TooltipParts.Popup>
 *   <TooltipParts.Arrow />
 *   説明
 * </TooltipParts.Popup>
 * ```
 */
export const TooltipArrow: Component<TooltipArrowProps> = function SuiTooltipArrow(props) {
  const { className, ...otherProps } = props;

  return <Tooltip.Arrow {...otherProps} className={cn(className, "sui_tooltip_arrow")} />;
};

/**
 * {@link TooltipArrow} の型をまとめた名前空間です。
 */
export namespace Arrow {
  /**
   * {@link TooltipArrow} の状態型です。
   */
  export type State = TooltipArrowState;

  /**
   * {@link TooltipArrow} のプロパティー型です。
   */
  export type Props = TooltipArrowProps;
}

/**
 * {@link TooltipArrow} の短縮名です。
 */
export const Arrow: Component<Arrow.Props> = TooltipArrow;

// Viewport
// --------

/**
 * {@link Viewport} の状態です。
 */
export type TooltipViewportState = Tooltip.Viewport.State;

/**
 * {@link Viewport} に渡すプロパティーです。
 */
export type TooltipViewportProps = React.ComponentProps<typeof Tooltip.Viewport>;

/**
 * 複数のトリガー間で内容を切り替えるときのアニメーション領域です。
 *
 * 1 つのツールチップを複数のトリガーで共有し、内容をトリガーごとに変える場合に使います。
 *
 * @example
 * ```tsx
 * <TooltipParts.Popup>
 *   <TooltipParts.Arrow />
 *   <TooltipParts.Viewport>{content}</TooltipParts.Viewport>
 * </TooltipParts.Popup>
 * ```
 */
export const TooltipViewport: Component<TooltipViewportProps> = function SuiTooltipViewport(props) {
  const { className, ...otherProps } = props;

  return <Tooltip.Viewport {...otherProps} className={cn(className, "sui_tooltip_viewport")} />;
};

/**
 * {@link TooltipViewport} の型をまとめた名前空間です。
 */
export namespace Viewport {
  /**
   * {@link TooltipViewport} の状態型です。
   */
  export type State = TooltipViewportState;

  /**
   * {@link TooltipViewport} のプロパティー型です。
   */
  export type Props = TooltipViewportProps;
}

/**
 * {@link TooltipViewport} の短縮名です。
 */
export const Viewport: Component<Viewport.Props> = TooltipViewport;
