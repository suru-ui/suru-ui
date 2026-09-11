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
  export type BaseUI<TPayload = unknown> = Omit<
    PreviewCard.Root.Props<TPayload>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = {};

  export type Render = RenderProps<HoverCardRootState>;

  export type SuruUI<TPayload = unknown> = {
    /**
     * ホバーカードとトリガー ({@link Trigger}) を関連付けるハンドルです。
     *
     * {@link createHandle} で作成します。Root 内に {@link Trigger} を配置する場合は省略できます。
     */
    handle?: HoverCardHandle<TPayload> | undefined;
  };
}

/**
 * {@link HoverCardRoot} に渡す props です。
 *
 * @template TPayload トリガーから受け取るデータの型です。
 */
export type HoverCardRootProps<TPayload = unknown> = HoverCardRootProps.Render &
  HoverCardRootProps.SuruUI<TPayload> &
  HoverCardRootProps.BaseUI<TPayload> &
  HoverCardRootProps.HTML;

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
  export type State = HoverCardRootState;

  export type Props<TPayload = unknown> = Props.Render &
    Props.SuruUI<TPayload> &
    Props.BaseUI<TPayload> &
    Props.HTML;

  export namespace Props {
    export type BaseUI<TPayload = unknown> = HoverCardRootProps.BaseUI<TPayload>;

    export type HTML = HoverCardRootProps.HTML;

    export type Render = HoverCardRootProps.Render;

    export type SuruUI<TPayload = unknown> = HoverCardRootProps.SuruUI<TPayload>;
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
  export type BaseUI<TPayload = unknown> = Omit<
    PreviewCard.Trigger.Props<TPayload>,
    keyof Render | keyof SuruUI | "render"
  >;

  export type HTML = Omit<
    React.ComponentProps<"a">,
    | keyof Render
    | keyof SuruUI
    | keyof Omit<PreviewCard.Trigger.Props<any>, "handle" | "children" | "render">
  >;

  export type Render = RenderProps<HoverCardTriggerState>;

  export type SuruUI<TPayload = unknown> = {
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
}

/**
 * {@link HoverCardTrigger} に渡す props です。
 *
 * @template TPayload トリガーから渡すデータの型です。
 */
export type HoverCardTriggerProps<TPayload = unknown> = HoverCardTriggerProps.Render &
  HoverCardTriggerProps.SuruUI<TPayload> &
  HoverCardTriggerProps.BaseUI<TPayload> &
  HoverCardTriggerProps.HTML;

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
  export type State = HoverCardTriggerState;

  export type Props<TPayload = unknown> = Props.Render &
    Props.SuruUI<TPayload> &
    Props.BaseUI<TPayload> &
    Props.HTML;

  export namespace Props {
    export type BaseUI<TPayload = unknown> = HoverCardTriggerProps.BaseUI<TPayload>;

    export type HTML = HoverCardTriggerProps.HTML;

    export type Render = HoverCardTriggerProps.Render;

    export type SuruUI<TPayload = unknown> = HoverCardTriggerProps.SuruUI<TPayload>;
  }
}

// Portal
// ------

/**
 * {@link HoverCardPortal} が持つ状態です。
 */
export type HoverCardPortalState = PreviewCard.Portal.State;

export namespace HoverCardPortalProps {
  export type BaseUI = Omit<React.ComponentProps<typeof PreviewCard.Portal>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof PreviewCard.Portal>
  >;

  export type Render = RenderProps<HoverCardPortalState>;

  export type SuruUI = {};
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
    export type BaseUI = HoverCardPortalProps.BaseUI;

    export type HTML = HoverCardPortalProps.HTML;

    export type Render = HoverCardPortalProps.Render;

    export type SuruUI = HoverCardPortalProps.SuruUI;
  }
}

// Backdrop
// --------

/**
 * {@link HoverCardBackdrop} が持つ状態です。
 */
export type HoverCardBackdropState = PreviewCard.Backdrop.State;

export namespace HoverCardBackdropProps {
  export type BaseUI = Omit<React.ComponentProps<typeof PreviewCard.Backdrop>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof PreviewCard.Backdrop>
  >;

  export type Render = RenderProps<HoverCardBackdropState>;

  export type SuruUI = {};
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
    export type BaseUI = HoverCardBackdropProps.BaseUI;

    export type HTML = HoverCardBackdropProps.HTML;

    export type Render = HoverCardBackdropProps.Render;

    export type SuruUI = HoverCardBackdropProps.SuruUI;
  }
}

// Positioner
// ----------

/**
 * {@link HoverCardPositioner} が持つ状態です。
 */
export type HoverCardPositionerState = PreviewCard.Positioner.State;

export namespace HoverCardPositionerProps {
  export type BaseUI = Omit<React.ComponentProps<typeof PreviewCard.Positioner>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof PreviewCard.Positioner>
  >;

  export type Render = RenderProps<HoverCardPositionerState>;

  export type SuruUI = {};
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
    export type BaseUI = HoverCardPositionerProps.BaseUI;

    export type HTML = HoverCardPositionerProps.HTML;

    export type Render = HoverCardPositionerProps.Render;

    export type SuruUI = HoverCardPositionerProps.SuruUI;
  }
}

// Content
// -------

/**
 * {@link HoverCardContent} が持つ状態です。
 */
export type HoverCardContentState = PreviewCard.Popup.State;

export namespace HoverCardContentProps {
  export type BaseUI = Omit<React.ComponentProps<typeof PreviewCard.Popup>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof PreviewCard.Popup>
  >;

  export type Render = RenderProps<HoverCardContentState>;

  export type SuruUI = {};
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
    export type BaseUI = HoverCardContentProps.BaseUI;

    export type HTML = HoverCardContentProps.HTML;

    export type Render = HoverCardContentProps.Render;

    export type SuruUI = HoverCardContentProps.SuruUI;
  }
}

// Arrow
// -----

/**
 * {@link HoverCardArrow} が持つ状態です。
 */
export type HoverCardArrowState = PreviewCard.Arrow.State;

export namespace HoverCardArrowProps {
  export type BaseUI = Omit<React.ComponentProps<typeof PreviewCard.Arrow>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof PreviewCard.Arrow>
  >;

  export type Render = RenderProps<HoverCardArrowState>;

  export type SuruUI = {};
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
    export type BaseUI = HoverCardArrowProps.BaseUI;

    export type HTML = HoverCardArrowProps.HTML;

    export type Render = HoverCardArrowProps.Render;

    export type SuruUI = HoverCardArrowProps.SuruUI;
  }
}

// Viewport
// --------

/**
 * {@link HoverCardViewport} が持つ状態です。
 */
export type HoverCardViewportState = PreviewCard.Viewport.State;

export namespace HoverCardViewportProps {
  export type BaseUI = Omit<React.ComponentProps<typeof PreviewCard.Viewport>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof PreviewCard.Viewport>
  >;

  export type Render = RenderProps<HoverCardViewportState>;

  export type SuruUI = {};
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
    export type BaseUI = HoverCardViewportProps.BaseUI;

    export type HTML = HoverCardViewportProps.HTML;

    export type Render = HoverCardViewportProps.Render;

    export type SuruUI = HoverCardViewportProps.SuruUI;
  }
}
