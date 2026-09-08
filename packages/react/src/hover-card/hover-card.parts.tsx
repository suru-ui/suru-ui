import { PreviewCard } from "@base-ui/react/preview-card";
import * as React from "react";

import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./hover-card.css";

// Handle
// ------

/**
 * ホバーカードを制御するハンドルです。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export interface HoverCardHandle<TPayload = any> extends PreviewCard.Handle<TPayload> {}

interface ICreateHoverCardHandle {
  /**
   * @template TPayload トリガーが送信するデータの型です。
   * @returns ホバーカードを制御するハンドルです。
   */
  <TPayload = any>(): HoverCardHandle<TPayload>;
}

/**
 * {@link HoverCardHandle} を作成する関数です。
 */
export const createHoverCardHandle: ICreateHoverCardHandle = function createSuiHoverCardHandle() {
  return PreviewCard.createHandle();
};

export { type HoverCardHandle as Handle, createHoverCardHandle as createHandle };

// Root
// ----

/**
 * {@link HoverCardRoot} を命令的に操作するためのオブジェクトです。
 */
export type HoverCardRootActions = PreviewCard.Root.Actions;

/**
 * {@link HoverCardRoot} の開閉状態を変更するイベントの詳細です。
 */
export type HoverCardRootChangeEventDetails = PreviewCard.Root.ChangeEventDetails;

/**
 * {@link HoverCardRoot} の開閉状態を変更する理由です。
 */
export type HoverCardRootChangeEventReason = PreviewCard.Root.ChangeEventReason;

/**
 * {@link HoverCardRoot} が持つ状態です。
 */
export type HoverCardRootState = PreviewCard.Root.State;

/**
 * {@link HoverCardRoot} に渡す props です。
 *
 * @template TPayload トリガーから受け取るデータの型です。
 */
export type HoverCardRootProps<TPayload = unknown> = Omit<
  PreviewCard.Root.Props<TPayload>,
  "handle"
> & {
  /**
   * ホバーカードとトリガー ({@link Trigger}) を関連付けるハンドルです。
   *
   * {@link createHandle} で作成します。Root 内に {@link Trigger} を配置する場合は省略できます。
   */
  handle?: HoverCardHandle<TPayload> | undefined;
};

/**
 * {@link HoverCardRoot} のコンポーネント型です。
 */
export interface HoverCardRootComponent extends IComponent<HoverCardRootProps> {
  <TPayload = unknown>(props: HoverCardRootProps<TPayload>): React.ReactElement | null;
}

/**
 * ホバーカードのルートです。
 *
 * ホバーカードの開閉状態を管理し、各パーツをグループ化します。
 * それ自身は HTML 要素をレンダリングしません。
 */
export const HoverCardRoot: HoverCardRootComponent = function SuiHoverCardRoot<TPayload>(
  props: HoverCardRootProps<TPayload>,
) {
  return <PreviewCard.Root {...props} />;
};

export { HoverCardRoot as Root };

export namespace Root {
  /**
   * {@link HoverCardRootState}
   */
  export type State = HoverCardRootState;

  /**
   * {@link HoverCardRootProps}
   */
  export type Props<TPayload = unknown> = HoverCardRootProps<TPayload>;

  /**
   * {@link HoverCardRootActions}
   */
  export type Actions = HoverCardRootActions;

  /**
   * {@link HoverCardRootChangeEventDetails}
   */
  export type ChangeEventDetails = HoverCardRootChangeEventDetails;

  /**
   * {@link HoverCardRootChangeEventReason}
   */
  export type ChangeEventReason = HoverCardRootChangeEventReason;
}

// Trigger
// -------

/**
 * {@link HoverCardTrigger} が持つ状態です。
 *
 * @template TPayload トリガーから渡すデータの型です。
 */
export type HoverCardTriggerState = PreviewCard.Trigger.State;

/**
 * {@link HoverCardTrigger} に渡す props です。
 *
 * @template TPayload トリガーから渡すデータの型です。
 */
export type HoverCardTriggerProps<TPayload = unknown> = Omit<
  PreviewCard.Trigger.Props<TPayload>,
  "handle" | "children" | "render"
> & {
  /**
   * ホバーの反応対象としてレンダリングする要素です。
   *
   * {@link PreviewCard.Trigger} の `render` プロパティーと同じ型で、そのまま `render` に渡されます。
   */
  children: NonNullable<PreviewCard.Trigger.Props<TPayload>["render"]>;

  /**
   * ホバーカード ({@link Root}) を関連付けるハンドルです。
   *
   * {@link createHandle} で作成し、{@link Root} と共有します。Root 内に配置する場合は省略できます。
   */
  handle?: HoverCardHandle<TPayload> | undefined;
};

/**
 * {@link HoverCardTrigger} のコンポーネント型です。
 */
export interface HoverCardTriggerComponent extends IComponent<HoverCardTriggerProps> {
  <TPayload = unknown>(props: HoverCardTriggerProps<TPayload>): React.ReactElement | null;
}

/**
 * ホバーカードを開くトリガー要素です。
 *
 * 要素にマウスカーソルを重ねると、遅延の後にホバーカードが開きます。
 * 子要素は何にもラップされず、そのまま {@link PreviewCard.Trigger} の `render` プロパティーに渡されます。
 */
export const HoverCardTrigger: HoverCardTriggerComponent = function SuiHoverCardTrigger<TPayload>(
  props: HoverCardTriggerProps<TPayload>,
) {
  const { handle, children, className, ...otherProps } = props;

  return (
    <PreviewCard.Trigger
      {...otherProps}
      handle={handle}
      render={children}
      className={cn(className, "sui_hover_card_trigger")}
    />
  );
};

export { HoverCardTrigger as Trigger };

export namespace Trigger {
  /**
   * {@link HoverCardTriggerState}
   */
  export type State = HoverCardTriggerState;

  /**
   * {@link HoverCardTriggerProps}
   */
  export type Props<TPayload = unknown> = HoverCardTriggerProps<TPayload>;
}

// Portal
// ------

/**
 * {@link HoverCardPortal} が持つ状態です。
 */
export type HoverCardPortalState = PreviewCard.Portal.State;

/**
 * {@link HoverCardPortal} に渡す props です。
 */
export type HoverCardPortalProps = React.ComponentProps<typeof PreviewCard.Portal>;

/**
 * ホバーカードを DOM の別の場所へ移動する要素です。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const HoverCardPortal: IComponent<HoverCardPortalProps> = function SuiHoverCardPortal(
  props,
) {
  const {
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <PreviewCard.Portal
      {...otherProps}
      className={cn(className, "sui_hover_card_portal")}
      data-scope={dataScope}
    />
  );
};

export { HoverCardPortal as Portal };

export namespace Portal {
  /**
   * {@link HoverCardPortalState}
   */
  export type State = HoverCardPortalState;

  /**
   * {@link HoverCardPortalProps}
   */
  export type Props = HoverCardPortalProps;
}

// Backdrop
// --------

/**
 * {@link HoverCardBackdrop} が持つ状態です。
 */
export type HoverCardBackdropState = PreviewCard.Backdrop.State;

/**
 * {@link HoverCardBackdrop} に渡す props です。
 */
export type HoverCardBackdropProps = React.ComponentProps<typeof PreviewCard.Backdrop>;

/**
 * ポップアップの背後に表示されるオーバーレイ要素です。
 */
export const HoverCardBackdrop: IComponent<HoverCardBackdropProps> = function SuiHoverCardBackdrop(
  props,
) {
  const { className, ...otherProps } = props;

  return (
    <PreviewCard.Backdrop
      {...otherProps}
      className={cn(
        className,
        "sui_hover_card_backdrop",
        (state) =>
          state.transitionStatus !== undefined &&
          `sui_hover_card_backdrop-transition_status_${state.transitionStatus}`,
      )}
    />
  );
};

export { HoverCardBackdrop as Backdrop };

export namespace Backdrop {
  /**
   * {@link HoverCardBackdropState}
   */
  export type State = HoverCardBackdropState;

  /**
   * {@link HoverCardBackdropProps}
   */
  export type Props = HoverCardBackdropProps;
}

// Positioner
// ----------

/**
 * {@link HoverCardPositioner} が持つ状態です。
 */
export type HoverCardPositionerState = PreviewCard.Positioner.State;

/**
 * {@link HoverCardPositioner} に渡す props です。
 */
export type HoverCardPositionerProps = React.ComponentProps<typeof PreviewCard.Positioner>;

/**
 * トリガーを基準にポップアップを配置する要素です。
 */
export const HoverCardPositioner: IComponent<HoverCardPositionerProps> =
  function SuiHoverCardPositioner(props) {
    const { className, ...otherProps } = props;

    return (
      <PreviewCard.Positioner
        {...otherProps}
        className={cn(className, "sui_hover_card_positioner")}
      />
    );
  };

export { HoverCardPositioner as Positioner };

export namespace Positioner {
  /**
   * {@link HoverCardPositionerState}
   */
  export type State = HoverCardPositionerState;

  /**
   * {@link HoverCardPositionerProps}
   */
  export type Props = HoverCardPositionerProps;
}

// Content
// -------

/**
 * {@link HoverCardContent} が持つ状態です。
 */
export type HoverCardContentState = PreviewCard.Popup.State;

/**
 * {@link HoverCardContent} に渡す props です。
 */
export type HoverCardContentProps = React.ComponentProps<typeof PreviewCard.Popup>;

/**
 * ホバーカードの内容を表示するポップアップ要素です。
 */
export const HoverCardContent: IComponent<HoverCardContentProps> = function SuiHoverCardContent(
  props,
) {
  const { className, ...otherProps } = props;

  return (
    <PreviewCard.Popup
      {...otherProps}
      className={cn(
        className,
        "sui_hover_card_content",
        (state) =>
          state.transitionStatus !== undefined &&
          `sui_hover_card_content-transition_status_${state.transitionStatus}`,
      )}
    />
  );
};

export { HoverCardContent as Content };

export namespace Content {
  /**
   * {@link HoverCardContentState}
   */
  export type State = HoverCardContentState;

  /**
   * {@link HoverCardContentProps}
   */
  export type Props = HoverCardContentProps;
}

// Arrow
// -----

/**
 * {@link HoverCardArrow} が持つ状態です。
 */
export type HoverCardArrowState = PreviewCard.Arrow.State;

/**
 * {@link HoverCardArrow} に渡す props です。
 */
export type HoverCardArrowProps = React.ComponentProps<typeof PreviewCard.Arrow>;

/**
 * ポップアップとトリガーをつなぐ矢印要素です。
 */
export const HoverCardArrow: IComponent<HoverCardArrowProps> = function SuiHoverCardArrow(props) {
  const { className, ...otherProps } = props;

  return <PreviewCard.Arrow {...otherProps} className={cn(className, "sui_hover_card_arrow")} />;
};

export { HoverCardArrow as Arrow };

export namespace Arrow {
  /**
   * {@link HoverCardArrowState}
   */
  export type State = HoverCardArrowState;

  /**
   * {@link HoverCardArrowProps}
   */
  export type Props = HoverCardArrowProps;
}

// Viewport
// --------

/**
 * {@link HoverCardViewport} が持つ状態です。
 */
export type HoverCardViewportState = PreviewCard.Viewport.State;

/**
 * {@link HoverCardViewport} に渡す props です。
 */
export type HoverCardViewportProps = React.ComponentProps<typeof PreviewCard.Viewport>;

/**
 * 複数のトリガー間で内容を切り替えるときのアニメーション領域です。
 *
 * 1 つのホバーカードを複数のトリガーで共有し、内容をトリガーごとに変える場合に使います。
 */
export const HoverCardViewport: IComponent<HoverCardViewportProps> = function SuiHoverCardViewport(
  props,
) {
  const { className, ...otherProps } = props;

  return (
    <PreviewCard.Viewport {...otherProps} className={cn(className, "sui_hover_card_viewport")} />
  );
};

export { HoverCardViewport as Viewport };

export namespace Viewport {
  /**
   * {@link HoverCardViewportState}
   */
  export type State = HoverCardViewportState;

  /**
   * {@link HoverCardViewportProps}
   */
  export type Props = HoverCardViewportProps;
}
