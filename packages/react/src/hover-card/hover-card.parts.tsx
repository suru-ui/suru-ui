import { PreviewCard } from "@base-ui/react/preview-card";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
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

export namespace HoverCardRootProps {
  export type Render = RenderProps<HoverCardRootState>;

  export type SuruUI<TPayload = any> = {
    /**
     * ホバーカードとトリガー ({@link Trigger}) を関連付けるハンドルです。
     *
     * {@link createHandle} で作成します。Root 内に {@link Trigger} を配置する場合は省略できます。
     */
    handle?: HoverCardHandle<TPayload> | undefined;
  };

  export type BaseUI<TPayload = any> = Pick<
    React.ComponentProps<typeof PreviewCard.Root<TPayload>>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PreviewCardRootProps:
      | "defaultOpen"
      | "open"
      | "onOpenChange"
      | "onOpenChangeComplete"
      | "actionsRef"
      | "children"
      | "triggerId"
      | "defaultTriggerId",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML<TPayload = any> = Omit<
    React.ComponentProps<typeof PreviewCard.Root<TPayload>>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link HoverCardRoot} に渡す props です。
 *
 * @template TPayload トリガーから受け取るデータの型です。
 */
export type HoverCardRootProps<TPayload = any> = HoverCardRootProps.Render &
  HoverCardRootProps.SuruUI<TPayload> &
  HoverCardRootProps.BaseUI<TPayload> &
  HoverCardRootProps.HTML<TPayload>;

/**
 * {@link HoverCardRoot} のコンポーネント型です。
 */
export interface HoverCardRootComponent extends IComponent<HoverCardRootProps> {
  <TPayload = any>(props: HoverCardRootProps<TPayload>): React.ReactElement | null;
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
  export type State = HoverCardRootState;

  export type Props<TPayload = any> = Props.Render &
    Props.SuruUI<TPayload> &
    Props.BaseUI<TPayload> &
    Props.HTML<TPayload>;

  export namespace Props {
    export type Render = HoverCardRootProps.Render;

    export type SuruUI<TPayload = any> = HoverCardRootProps.SuruUI<TPayload>;

    export type BaseUI<TPayload = any> = HoverCardRootProps.BaseUI<TPayload>;

    export type HTML<TPayload = any> = HoverCardRootProps.HTML<TPayload>;
  }

  export type Actions = HoverCardRootActions;

  export type ChangeEventDetails = HoverCardRootChangeEventDetails;

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

export namespace HoverCardTriggerProps {
  export type Render = RenderProps<HoverCardTriggerState>;

  export type SuruUI<TPayload = any> = {
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

  export type BaseUI<TPayload = any> = Pick<
    React.ComponentProps<typeof PreviewCard.Trigger<TPayload>>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PreviewCardTriggerProps:
      "payload" | "delay" | "closeDelay",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML<TPayload = any> = Omit<
    React.ComponentProps<typeof PreviewCard.Trigger<TPayload>>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link HoverCardTrigger} に渡す props です。
 *
 * @template TPayload トリガーから渡すデータの型です。
 */
export type HoverCardTriggerProps<TPayload = any> = HoverCardTriggerProps.Render &
  HoverCardTriggerProps.SuruUI<TPayload> &
  HoverCardTriggerProps.BaseUI<TPayload> &
  HoverCardTriggerProps.HTML<TPayload>;

/**
 * {@link HoverCardTrigger} のコンポーネント型です。
 */
export interface HoverCardTriggerComponent extends IComponent<HoverCardTriggerProps> {
  <TPayload = any>(props: HoverCardTriggerProps<TPayload>): React.ReactElement | null;
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
  export type State = HoverCardTriggerState;

  export type Props<TPayload = any> = Props.Render &
    Props.SuruUI<TPayload> &
    Props.BaseUI<TPayload> &
    Props.HTML<TPayload>;

  export namespace Props {
    export type Render = HoverCardTriggerProps.Render;

    export type SuruUI<TPayload = any> = HoverCardTriggerProps.SuruUI<TPayload>;

    export type BaseUI<TPayload = any> = HoverCardTriggerProps.BaseUI<TPayload>;

    export type HTML<TPayload = any> = HoverCardTriggerProps.HTML<TPayload>;
  }
}

// Portal
// ------

/**
 * {@link HoverCardPortal} が持つ状態です。
 */
export type HoverCardPortalState = PreviewCard.Portal.State;

export namespace HoverCardPortalProps {
  export type Render = RenderProps<HoverCardPortalState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof PreviewCard.Portal>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PreviewCardPortalProps:
      "keepMounted" | "container",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof PreviewCard.Portal>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link HoverCardPortal} に渡す props です。
 */
export type HoverCardPortalProps = HoverCardPortalProps.Render &
  HoverCardPortalProps.SuruUI &
  HoverCardPortalProps.BaseUI &
  HoverCardPortalProps.HTML;

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
  export type State = HoverCardPortalState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = HoverCardPortalProps.Render;

    export type SuruUI = HoverCardPortalProps.SuruUI;

    export type BaseUI = HoverCardPortalProps.BaseUI;

    export type HTML = HoverCardPortalProps.HTML;
  }
}

// Backdrop
// --------

/**
 * {@link HoverCardBackdrop} が持つ状態です。
 */
export type HoverCardBackdropState = PreviewCard.Backdrop.State;

export namespace HoverCardBackdropProps {
  export type Render = RenderProps<HoverCardBackdropState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof PreviewCard.Backdrop>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PreviewCardBackdropProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof PreviewCard.Backdrop>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link HoverCardBackdrop} に渡す props です。
 */
export type HoverCardBackdropProps = HoverCardBackdropProps.Render &
  HoverCardBackdropProps.SuruUI &
  HoverCardBackdropProps.BaseUI &
  HoverCardBackdropProps.HTML;

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
  export type State = HoverCardBackdropState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = HoverCardBackdropProps.Render;

    export type SuruUI = HoverCardBackdropProps.SuruUI;

    export type BaseUI = HoverCardBackdropProps.BaseUI;

    export type HTML = HoverCardBackdropProps.HTML;
  }
}

// Positioner
// ----------

/**
 * {@link HoverCardPositioner} が持つ状態です。
 */
export type HoverCardPositionerState = PreviewCard.Positioner.State;

export namespace HoverCardPositionerProps {
  export type Render = RenderProps<HoverCardPositionerState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof PreviewCard.Positioner>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // UseAnchorPositioningSharedParameters:
      | "anchor"
      | "positionMethod"
      | "side"
      | "sideOffset"
      | "align"
      | "alignOffset"
      | "collisionBoundary"
      | "collisionPadding"
      | "sticky"
      | "arrowPadding"
      | "disableAnchorTracking"
      | "collisionAvoidance",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof PreviewCard.Positioner>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link HoverCardPositioner} に渡す props です。
 */
export type HoverCardPositionerProps = HoverCardPositionerProps.Render &
  HoverCardPositionerProps.SuruUI &
  HoverCardPositionerProps.BaseUI &
  HoverCardPositionerProps.HTML;

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
  export type State = HoverCardPositionerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = HoverCardPositionerProps.Render;

    export type SuruUI = HoverCardPositionerProps.SuruUI;

    export type BaseUI = HoverCardPositionerProps.BaseUI;

    export type HTML = HoverCardPositionerProps.HTML;
  }
}

// Content
// -------

/**
 * {@link HoverCardContent} が持つ状態です。
 */
export type HoverCardContentState = PreviewCard.Popup.State;

export namespace HoverCardContentProps {
  export type Render = RenderProps<HoverCardContentState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof PreviewCard.Popup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PreviewCardPopupProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof PreviewCard.Popup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link HoverCardContent} に渡す props です。
 */
export type HoverCardContentProps = HoverCardContentProps.Render &
  HoverCardContentProps.SuruUI &
  HoverCardContentProps.BaseUI &
  HoverCardContentProps.HTML;

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
  export type State = HoverCardContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = HoverCardContentProps.Render;

    export type SuruUI = HoverCardContentProps.SuruUI;

    export type BaseUI = HoverCardContentProps.BaseUI;

    export type HTML = HoverCardContentProps.HTML;
  }
}

// Arrow
// -----

/**
 * {@link HoverCardArrow} が持つ状態です。
 */
export type HoverCardArrowState = PreviewCard.Arrow.State;

export namespace HoverCardArrowProps {
  export type Render = RenderProps<HoverCardArrowState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof PreviewCard.Arrow>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PreviewCardArrowProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof PreviewCard.Arrow>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link HoverCardArrow} に渡す props です。
 */
export type HoverCardArrowProps = HoverCardArrowProps.Render &
  HoverCardArrowProps.SuruUI &
  HoverCardArrowProps.BaseUI &
  HoverCardArrowProps.HTML;

/**
 * ポップアップとトリガーをつなぐ矢印要素です。
 */
export const HoverCardArrow: IComponent<HoverCardArrowProps> = function SuiHoverCardArrow(props) {
  const { className, ...otherProps } = props;

  return <PreviewCard.Arrow {...otherProps} className={cn(className, "sui_hover_card_arrow")} />;
};

export { HoverCardArrow as Arrow };

export namespace Arrow {
  export type State = HoverCardArrowState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = HoverCardArrowProps.Render;

    export type SuruUI = HoverCardArrowProps.SuruUI;

    export type BaseUI = HoverCardArrowProps.BaseUI;

    export type HTML = HoverCardArrowProps.HTML;
  }
}

// Viewport
// --------

/**
 * {@link HoverCardViewport} が持つ状態です。
 */
export type HoverCardViewportState = PreviewCard.Viewport.State;

export namespace HoverCardViewportProps {
  export type Render = RenderProps<HoverCardViewportState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof PreviewCard.Viewport>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PreviewCardViewportProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof PreviewCard.Viewport>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link HoverCardViewport} に渡す props です。
 */
export type HoverCardViewportProps = HoverCardViewportProps.Render &
  HoverCardViewportProps.SuruUI &
  HoverCardViewportProps.BaseUI &
  HoverCardViewportProps.HTML;

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
  export type State = HoverCardViewportState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = HoverCardViewportProps.Render;

    export type SuruUI = HoverCardViewportProps.SuruUI;

    export type BaseUI = HoverCardViewportProps.BaseUI;

    export type HTML = HoverCardViewportProps.HTML;
  }
}
