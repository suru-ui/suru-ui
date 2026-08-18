import { Tooltip } from "@base-ui/react/tooltip";
import * as React from "react";

import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

import "./tooltip.css";

// Types
// -----

// Handle
// ------

/**
 * ツールチップを制御するハンドルです。
 */
export type TooltipHandle<TPayload = unknown> = Tooltip.Handle<TPayload>;

/**
 * ツールチップを制御するハンドルを新しく作成します。
 *
 * 作成したハンドルを {@link Root} と {@link Trigger} の `handle` プロパティーに渡すことで、
 * ルートとトリガーを別々の場所に配置できます。
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
 */
export const TooltipProvider: IComponent<TooltipProviderProps> = function SuiTooltipProvider(
  props,
) {
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
export const Provider: IComponent<Provider.Props> = TooltipProvider;

// Root
// ----

/**
 * {@link Root} の状態です。
 */
export type TooltipRootState = Tooltip.Root.State;

/**
 * {@link Root} に渡すプロパティーです。
 *
 * @template TPayload トリガーから受け取るデータの型です。
 */
export type TooltipRootProps<TPayload = unknown> = Tooltip.Root.Props<TPayload>;

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
  export type Props<TPayload = unknown> = TooltipRootProps<TPayload>;
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
 * @template TPayload トリガーから渡すデータの型です。
 */
export type TooltipTriggerState = Tooltip.Trigger.State;

/**
 * {@link Trigger} に渡すプロパティーです。
 *
 * @template TPayload トリガーから渡すデータの型です。
 */
export type TooltipTriggerProps<TPayload = unknown> = Omit<
  Tooltip.Trigger.Props<TPayload>,
  "children" | "render"
> & {
  /**
   * トリガーとしてレンダリングする要素です。
   *
   * {@link Tooltip.Trigger} の `render` プロパティーと同じ型で、そのまま `render` に渡されます。
   */
  children: NonNullable<Tooltip.Trigger.Props<TPayload>["render"]>;
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
  export type Props<TPayload = unknown> = TooltipTriggerProps<TPayload>;
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
 */
export const TooltipPortal: IComponent<TooltipPortalProps> = function SuiTooltipPortal(props) {
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
export const Portal: IComponent<Portal.Props> = TooltipPortal;

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
export const Positioner: IComponent<Positioner.Props> = TooltipPositioner;

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
 */
export const TooltipPopup: IComponent<TooltipPopupProps> = function SuiTooltipPopup(props) {
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
export const Popup: IComponent<Popup.Props> = TooltipPopup;

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
 */
export const TooltipArrow: IComponent<TooltipArrowProps> = function SuiTooltipArrow(props) {
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
export const Arrow: IComponent<Arrow.Props> = TooltipArrow;

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
 */
export const TooltipViewport: IComponent<TooltipViewportProps> = function SuiTooltipViewport(
  props,
) {
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
export const Viewport: IComponent<Viewport.Props> = TooltipViewport;
