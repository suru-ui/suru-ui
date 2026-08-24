import { PreviewCard } from "@base-ui/react/preview-card";
import * as React from "react";

import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

import "./hover-card.css";

// Handle
// ------

/**
 * ホバーカードを制御するハンドルです。
 */
export type HoverCardHandle<TPayload = unknown> = PreviewCard.Handle<TPayload>;

/**
 * ホバーカードを制御するハンドルを新しく作成します。
 *
 * 作成したハンドルを {@link Root} と {@link Trigger} の `handle` プロパティーに渡すことで、トリガーとホバーカードの内容を関連付けます。
 */
export const createHandle: typeof PreviewCard.createHandle = PreviewCard.createHandle;

// Root
// ----

/**
 * {@link HoverCardRoot} の状態です。
 */
export type HoverCardRootState = PreviewCard.Root.State;

/**
 * {@link HoverCardRoot} に渡すプロパティーです。
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

/**
 * {@link HoverCardRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link HoverCardRootState} です。
   */
  export type State = HoverCardRootState;

  /**
   * {@link HoverCardRootProps} です。
   */
  export type Props<TPayload = unknown> = HoverCardRootProps<TPayload>;
}

/**
 * {@link HoverCardRoot} です。
 */
export const Root: HoverCardRootComponent = HoverCardRoot;

// Trigger
// -------

/**
 * {@link HoverCardTrigger} の状態です。
 *
 * @template TPayload トリガーから渡すデータの型です。
 */
export type HoverCardTriggerState = PreviewCard.Trigger.State;

/**
 * {@link HoverCardTrigger} に渡すプロパティーです。
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
      className={cn(className, "sui_hovercard_trigger")}
    />
  );
};

/**
 * {@link HoverCardTrigger} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Trigger {
  /**
   * {@link HoverCardTriggerState} です。
   */
  export type State = HoverCardTriggerState;

  /**
   * {@link HoverCardTriggerProps} です。
   */
  export type Props<TPayload = unknown> = HoverCardTriggerProps<TPayload>;
}

/**
 * {@link HoverCardTrigger} です。
 */
export const Trigger: HoverCardTriggerComponent = HoverCardTrigger;

// Portal
// ------

/**
 * {@link HoverCardPortal} の状態です。
 */
export type HoverCardPortalState = PreviewCard.Portal.State;

/**
 * {@link HoverCardPortal} に渡すプロパティーです。
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
  const { className, ...otherProps } = props;

  return <PreviewCard.Portal {...otherProps} className={cn(className, "sui_hovercard_portal")} />;
};

/**
 * {@link HoverCardPortal} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Portal {
  /**
   * {@link HoverCardPortalState} です。
   */
  export type State = HoverCardPortalState;

  /**
   * {@link HoverCardPortalProps} です。
   */
  export type Props = HoverCardPortalProps;
}

/**
 * {@link HoverCardPortal} です。
 */
export const Portal: IComponent<Portal.Props> = HoverCardPortal;

// Positioner
// ----------

/**
 * {@link HoverCardPositioner} の状態です。
 */
export type HoverCardPositionerState = PreviewCard.Positioner.State;

/**
 * {@link HoverCardPositioner} に渡すプロパティーです。
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
        className={cn(className, "sui_hovercard_positioner")}
      />
    );
  };

/**
 * {@link HoverCardPositioner} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Positioner {
  /**
   * {@link HoverCardPositionerState} です。
   */
  export type State = HoverCardPositionerState;

  /**
   * {@link HoverCardPositionerProps} です。
   */
  export type Props = HoverCardPositionerProps;
}

/**
 * {@link HoverCardPositioner} です。
 */
export const Positioner: IComponent<Positioner.Props> = HoverCardPositioner;

// Popup
// -----

/**
 * {@link HoverCardPopup} の状態です。
 */
export type HoverCardPopupState = PreviewCard.Popup.State;

/**
 * {@link HoverCardPopup} に渡すプロパティーです。
 */
export type HoverCardPopupProps = React.ComponentProps<typeof PreviewCard.Popup>;

/**
 * ホバーカードの内容を表示するポップアップ要素です。
 */
export const HoverCardPopup: IComponent<HoverCardPopupProps> = function SuiHoverCardPopup(props) {
  const { className, ...otherProps } = props;

  return <PreviewCard.Popup {...otherProps} className={cn(className, "sui_hovercard_popup")} />;
};

/**
 * {@link HoverCardPopup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Popup {
  /**
   * {@link HoverCardPopupState} です。
   */
  export type State = HoverCardPopupState;

  /**
   * {@link HoverCardPopupProps} です。
   */
  export type Props = HoverCardPopupProps;
}

/**
 * {@link HoverCardPopup} です。
 */
export const Popup: IComponent<Popup.Props> = HoverCardPopup;

// Arrow
// -----

/**
 * {@link HoverCardArrow} の状態です。
 */
export type HoverCardArrowState = PreviewCard.Arrow.State;

/**
 * {@link HoverCardArrow} に渡すプロパティーです。
 */
export type HoverCardArrowProps = React.ComponentProps<typeof PreviewCard.Arrow>;

/**
 * ポップアップとトリガーをつなぐ矢印要素です。
 */
export const HoverCardArrow: IComponent<HoverCardArrowProps> = function SuiHoverCardArrow(props) {
  const { className, ...otherProps } = props;

  return <PreviewCard.Arrow {...otherProps} className={cn(className, "sui_hovercard_arrow")} />;
};

/**
 * {@link HoverCardArrow} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Arrow {
  /**
   * {@link HoverCardArrowState} です。
   */
  export type State = HoverCardArrowState;

  /**
   * {@link HoverCardArrowProps} です。
   */
  export type Props = HoverCardArrowProps;
}

/**
 * {@link HoverCardArrow} です。
 */
export const Arrow: IComponent<Arrow.Props> = HoverCardArrow;
