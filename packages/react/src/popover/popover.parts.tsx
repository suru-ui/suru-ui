import type { NativeButtonProps } from "@base-ui/react/internals/types";
import { Popover } from "@base-ui/react/popover";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import type { IComponent, IUseContext } from "../types.js";

import "./popover.css";

// Context
// -------

/**
 * {@link PopoverRoot} が子パーツへ提供するコンテキストです。
 */
export type PopoverContext = {
  /**
   * ポップオーバーに枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * ポップオーバーの角丸の大きさです。
   */
  readonly radius: PopoverRootRadius;

  /**
   * ポップオーバーの大きさです。
   */
  readonly size: PopoverRootSize;
};

/**
 * {@link PopoverRoot} が子パーツへ提供するコンテキストです。
 */
export const PopoverContext: React.Context<PopoverContext | null> =
  React.createContext<PopoverContext | null>(null);

function useSuiPopoverContext(optional?: false): PopoverContext;
function useSuiPopoverContext(optional?: boolean): PopoverContext | null;
function useSuiPopoverContext(optional?: boolean): PopoverContext | null {
  const ctx = React.use(PopoverContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "PopoverContext",
      providerName: "PopoverRoot",
    });
  }

  return ctx;
}

/**
 * {@link PopoverContext} を読み取るフックです。
 */
export const usePopoverContext: IUseContext<PopoverContext> = useSuiPopoverContext;

export { PopoverContext as Context, usePopoverContext as useContext };

export namespace Context {
  export type Radius = PopoverRootRadius;

  export type Size = PopoverRootSize;
}

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
 * ポップオーバーの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type PopoverRootRadius = "none" | Size;

/**
 * ポップオーバーの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type PopoverRootSize = Size;

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

    /**
     * ポップオーバーの周囲に枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: boolean | undefined;

    /**
     * ポップオーバーの角丸を指定します。
     *
     * 既定値は {@link PopoverRootProps.size|size} です。
     */
    radius?: PopoverRootRadius | undefined;

    /**
     * ポップオーバーの大きさを指定します。
     *
     * @default "md"
     */
    size?: PopoverRootSize | undefined;
  };

  export type BaseUI<TPayload = any> = Pick<
    React.ComponentProps<typeof Popover.Root<TPayload>>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PopoverRootProps:
      | "defaultOpen"
      | "open"
      | "onOpenChange"
      | "onOpenChangeComplete"
      | "actionsRef"
      | "modal"
      | "triggerId"
      | "defaultTriggerId"
      | "children",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML<TPayload = any> = Omit<
    React.ComponentProps<typeof Popover.Root<TPayload>>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link PopoverRoot} に渡す props です。
 *
 * @template TPayload トリガーから受け取るデータの型です。
 */
export type PopoverRootProps<TPayload = any> = PopoverRootProps.Render &
  PopoverRootProps.SuruUI<TPayload> &
  PopoverRootProps.BaseUI<TPayload> &
  PopoverRootProps.HTML<TPayload>;

/**
 * {@link PopoverRoot} のコンポーネント型です。
 */
interface IPopoverRoot extends IComponent<PopoverRootProps> {
  /**
   * @template TPayload トリガーから受け取るデータの型です。
   */
  <TPayload = any>(props: PopoverRootProps<TPayload>): IComponent.Return;
}

/**
 * ポップオーバーのルートです。
 *
 * ポップオーバーの開閉状態を管理し、各パーツをグループ化します。
 * それ自身は HTML 要素をレンダリングしません。
 */
export const PopoverRoot: IPopoverRoot = function SuiPopoverRoot<TPayload>(
  props: PopoverRootProps<TPayload>,
) {
  const { size = "md", radius = size, outlined = false, ...otherProps } = props;
  const ctx = React.useMemo<PopoverContext>(
    () => ({ size, radius, outlined }),
    [size, radius, outlined],
  );

  return (
    <PopoverContext.Provider value={ctx}>
      <Popover.Root {...otherProps} />
    </PopoverContext.Provider>
  );
};

export { PopoverRoot as Root };

export namespace Root {
  export type State = PopoverRootState;

  export type Props<TPayload = any> = Props.Render &
    Props.SuruUI<TPayload> &
    Props.BaseUI<TPayload> &
    Props.HTML<TPayload>;

  export namespace Props {
    export type Render = PopoverRootProps.Render;

    export type SuruUI<TPayload = any> = PopoverRootProps.SuruUI<TPayload>;

    export type BaseUI<TPayload = any> = PopoverRootProps.BaseUI<TPayload>;

    export type HTML<TPayload = any> = PopoverRootProps.HTML<TPayload>;
  }

  export type Actions = PopoverRootActions;

  export type ChangeEventDetails = PopoverRootChangeEventDetails;

  export type ChangeEventReason = PopoverRootChangeEventReason;

  export type Radius = PopoverRootRadius;

  export type Size = PopoverRootSize;
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
    children: NonNullable<React.ComponentProps<typeof Popover.Trigger>["render"]>;

    /**
     * ポップオーバー ({@link Root}) を関連付けるハンドルです。
     *
     * {@link createHandle} で作成し、{@link Root} と共有します。Root 内に配置する場合は省略できます。
     */
    handle?: PopoverHandle<TPayload> | undefined;
  };

  export type BaseUI<TPayload = any> = Pick<
    React.ComponentProps<typeof Popover.Trigger<TPayload>>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // PopoverTriggerProps:
      | "payload"
      | "id"
      | "openOnHover"
      | "delay"
      | "closeDelay",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML<TPayload = any> = Omit<
    React.ComponentProps<typeof Popover.Trigger<TPayload>>,
    keyof Render | keyof SuruUI | keyof BaseUI
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
  PopoverTriggerProps.HTML<TPayload>;

/**
 * {@link PopoverTrigger} のコンポーネント型です。
 */
interface IPopoverTrigger extends IComponent<PopoverTriggerProps> {
  /**
   * @template TPayload トリガーから渡すデータの型です。
   */
  <TPayload = any>(props: PopoverTriggerProps<TPayload>): IComponent.Return;
}

/**
 * ポップオーバーを開くトリガー要素です。
 *
 * 子要素は何にもラップされず、そのまま {@link Popover.Trigger} の `render` プロパティーに渡されます。
 */
export const PopoverTrigger: IPopoverTrigger = function SuiPopoverTrigger<TPayload>(
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

  export type Props<TPayload = any> = Props.Render &
    Props.SuruUI<TPayload> &
    Props.BaseUI<TPayload> &
    Props.HTML<TPayload>;

  export namespace Props {
    export type Render = PopoverTriggerProps.Render;

    export type SuruUI<TPayload = any> = PopoverTriggerProps.SuruUI<TPayload>;

    export type BaseUI<TPayload = any> = PopoverTriggerProps.BaseUI<TPayload>;

    export type HTML<TPayload = any> = PopoverTriggerProps.HTML<TPayload>;
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

  export type BaseUI = Pick<
    React.ComponentProps<typeof Popover.Portal>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PopoverPortalProps:
      "keepMounted" | "container",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Popover.Portal>,
    keyof Render | keyof SuruUI | keyof BaseUI
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
  const ctx = usePopoverContext(true);
  const size = ctx?.size ?? "md";
  const radius = ctx?.radius ?? "md";
  const outlined = ctx?.outlined ?? false;

  return (
    <Popover.Portal
      {...otherProps}
      className={cn(
        className,
        "sui_popover_portal",
        `sui_popover_portal-size_${size}`,
        `sui_popover_portal-radius_${radius}`,
        outlined && "sui_popover_portal-outlined",
      )}
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

  export type BaseUI = Pick<
    React.ComponentProps<typeof Popover.Backdrop>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PopoverBackdropProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Popover.Backdrop>,
    keyof Render | keyof SuruUI | keyof BaseUI
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

  export type BaseUI = Pick<
    React.ComponentProps<typeof Popover.Positioner>,
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
    React.ComponentProps<typeof Popover.Positioner>,
    keyof Render | keyof SuruUI | keyof BaseUI
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

// Content
// -------

/**
 * {@link PopoverContent} が持つ状態です。
 */
export type PopoverContentState = Popover.Popup.State;

export namespace PopoverContentProps {
  export type Render = RenderProps<PopoverContentState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Popover.Popup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PopoverContentProps:
      "initialFocus" | "finalFocus",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Popover.Popup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link PopoverContent} に渡す props です。
 */
export type PopoverContentProps = PopoverContentProps.Render &
  PopoverContentProps.SuruUI &
  PopoverContentProps.BaseUI &
  PopoverContentProps.HTML;

/**
 * ポップオーバーの内容を表示するポップアップ要素です。
 */
export const PopoverContent: IComponent<PopoverContentProps> = function SuiPopoverContent(props) {
  const { className, ...otherProps } = props;

  return (
    <Popover.Popup
      {...otherProps}
      className={cn(
        className,
        "sui_popover_content",
        (state) =>
          state.transitionStatus !== undefined &&
          `sui_popover_content-transition_status_${state.transitionStatus}`,
      )}
    />
  );
};

export { PopoverContent as Content };

export namespace Content {
  export type State = PopoverContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PopoverContentProps.Render;

    export type SuruUI = PopoverContentProps.SuruUI;

    export type BaseUI = PopoverContentProps.BaseUI;

    export type HTML = PopoverContentProps.HTML;
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

  export type BaseUI = Pick<
    React.ComponentProps<typeof Popover.Arrow>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PopoverArrowProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Popover.Arrow>,
    keyof Render | keyof SuruUI | keyof BaseUI
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

  return (
    <Popover.Arrow
      {...otherProps}
      className={cn(
        className,
        "sui_popover_arrow",
        (state) => `sui_popover_arrow-side_${state.side}`,
      )}
    />
  );
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

  export type BaseUI = Pick<
    React.ComponentProps<typeof Popover.Title>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PopoverTitleProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Popover.Title>,
    keyof Render | keyof SuruUI | keyof BaseUI
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

  export type BaseUI = Pick<
    React.ComponentProps<typeof Popover.Description>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PopoverDescriptionProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Popover.Description>,
    keyof Render | keyof SuruUI | keyof BaseUI
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

  export type BaseUI = Pick<
    React.ComponentProps<typeof Popover.Close>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // PopoverCloseProps:
      | never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Popover.Close>,
    keyof Render | keyof SuruUI | keyof BaseUI
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

  export type BaseUI = Pick<
    React.ComponentProps<typeof Popover.Viewport>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PopoverViewportProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Popover.Viewport>,
    keyof Render | keyof SuruUI | keyof BaseUI
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
