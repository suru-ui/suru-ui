import type { UseAnchorPositioningSharedParameters } from "@base-ui/react/internals/useAnchorPositioning";
import * as React from "react";

import type { IComponent } from "../types.js";
import {
  type TooltipHandle,
  type ITooltipTrigger,
  type TooltipRootSize,
  type TooltipRootProps,
  type TooltipRootState,
  type TooltipArrowProps,
  type TooltipRootRadius,
  type IUseTooltipContext,
  type TooltipPortalProps,
  type TooltipRootActions,
  type TooltipContentProps,
  type TooltipTriggerProps,
  type ICreateTooltipHandle,
  type TooltipPositionerProps,
  type TooltipRootChangeEventReason,
  type TooltipRootChangeEventDetails,
  TooltipRoot,
  TooltipArrow,
  TooltipPortal,
  TooltipContent,
  TooltipContext,
  TooltipTrigger,
  TooltipPositioner,
  useTooltipContext,
  createTooltipHandle,
} from "./tooltip.parts.js";

// Types
// -----

export type TooltipActions = TooltipRootActions;

export type TooltipChangeEventDetails = TooltipRootChangeEventDetails;

export type TooltipChangeEventReason = TooltipRootChangeEventReason;

export type TooltipRadius = TooltipRootRadius;

export type TooltipSize = TooltipRootSize;

/**
 * {@link Tooltip} の各パーツに渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type TooltipSlotProps<TPayload = any> = {
  /**
   * {@link TooltipArrow} に渡す props です。
   */
  readonly arrow?: TooltipArrowProps | undefined;

  /**
   * {@link TooltipPortal} に渡す props です。
   */
  readonly portal?: Omit<TooltipPortalProps, "children"> | undefined;

  /**
   * {@link TooltipPositioner} に渡す props です。
   */
  readonly positioner?:
    | Omit<TooltipPositionerProps, "children" | keyof UseAnchorPositioningSharedParameters>
    | undefined;

  /**
   * {@link TooltipTrigger} に渡す props です。
   */
  readonly trigger?:
    | Omit<TooltipTriggerProps<TPayload>, "children" | "handle" | keyof TooltipProps.Trigger>
    | undefined;
};

/**
 * {@link Tooltip} が持つ状態です。
 */
export type TooltipState = TooltipRootState;

namespace TooltipProps {
  export type Content = Omit<
    TooltipContentProps,
    keyof TooltipProps.Tooltip | keyof TooltipProps.Root | keyof TooltipProps.Trigger
  >;

  export type Root<TPayload = any> = Omit<TooltipRootProps<TPayload>, keyof TooltipProps.Tooltip>;

  export type Tooltip<TPayload = any> = {
    /**
     * ツールチップの内容です。
     */
    children?: React.ReactNode | undefined;

    /**
     * トリガーとツールチップに関連付けるためのハンドルです。
     *
     * {@link createHandle} で作成します。Root 内に {@link TooltipTrigger} を配置する場合は省略できます。
     */
    handle?: TooltipHandle<TPayload> | undefined;

    /**
     * 矢印を表示するかどうかを指定します。
     *
     * 矢印の内容や props を変更するときは {@link TooltipProps.slotProps|slotProps.arrow} を使います。
     */
    showArrow?: boolean | undefined;

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: TooltipSlotProps<TPayload> | undefined;

    /**
     * ツールチップを表示する対象です。
     *
     * `trigger` 未指定で `slotProps.trigger` のみ指定した場合は、トリガーは描画されません。
     */
    trigger?: TooltipTriggerProps["children"] | undefined;
  };

  export type Trigger<TPayload = any> = Pick<
    TooltipTriggerProps<TPayload>,
    "closeDelay" | "delay" | "keepOpenOnClick"
  >;
}

/**
 * {@link Tooltip} に渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type TooltipProps<TPayload = any> = TooltipProps.Tooltip<TPayload> &
  TooltipProps.Root<TPayload> &
  TooltipProps.Trigger<TPayload> &
  UseAnchorPositioningSharedParameters &
  TooltipProps.Content;

export interface IUseTooltipAPI {
  /**
   * {@link TooltipAPI} を作成します。
   *
   * @template TPayload トリガーが送信するデータの型です。
   * @param props {@link Tooltip} の props です。
   * @returns ツールチップの API です
   */
  <TPayload = any>(props: TooltipProps<TPayload>): TooltipAPI<TPayload>;
}

// API
// ---

/**
 * {@link Tooltip} を構成する各パーツの props などを作成するための API です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export class TooltipAPI<TPayload = any> {
  private readonly tooltipProps: Required<
    Omit<TooltipProps.Tooltip<TPayload> & TooltipProps.Trigger, "slotProps">
  >;

  private readonly slotProps: TooltipSlotProps<TPayload>;

  private readonly rootProps: Required<TooltipProps.Root<TPayload>>;

  private readonly positionerProps: Required<UseAnchorPositioningSharedParameters>;

  private readonly contentProps: TooltipProps.Content;

  /**
   * @param props {@link Tooltip} の props です。
   * @internal
   */
  public constructor(props: TooltipProps<TPayload>) {
    const {
      delay,
      handle,
      trigger,
      children,
      showArrow,
      slotProps = {},
      closeDelay,
      keepOpenOnClick,
      ...rootAndPositionerAndContentProps
    } = props;
    const {
      open,
      side = "top",
      size,
      align,
      anchor,
      radius,
      sticky,
      disabled,
      outlined,
      triggerId,
      actionsRef,
      sideOffset = 8,
      alignOffset,
      defaultOpen,
      arrowPadding,
      onOpenChange,
      positionMethod,
      trackCursorAxis,
      collisionPadding,
      defaultTriggerId,
      collisionBoundary,
      collisionAvoidance,
      onOpenChangeComplete,
      disableAnchorTracking,
      disableHoverablePopup,
      ...contentProps
    } = rootAndPositionerAndContentProps;
    this.tooltipProps = {
      delay,
      handle,
      trigger,
      children,
      showArrow,
      closeDelay,
      keepOpenOnClick,
    };
    this.slotProps = slotProps;
    this.rootProps = {
      open,
      size,
      radius,
      disabled,
      outlined,
      triggerId,
      actionsRef,
      defaultOpen,
      onOpenChange,
      trackCursorAxis,
      defaultTriggerId,
      onOpenChangeComplete,
      disableHoverablePopup,
    };
    this.positionerProps = {
      side,
      align,
      anchor,
      sticky,
      sideOffset,
      alignOffset,
      arrowPadding,
      positionMethod,
      collisionPadding,
      collisionBoundary,
      collisionAvoidance,
      disableAnchorTracking,
    };
    this.contentProps = contentProps;
  }

  /**
   * {@link TooltipArrow} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getArrowProps(): TooltipArrowProps | null {
    const { showArrow = false } = this.tooltipProps;
    const { arrow: props } = this.slotProps;

    if (showArrow || props) {
      return props || {};
    }

    return null;
  }

  /**
   * {@link TooltipContent} に表示する子要素を取得します。
   */
  public getContentChildren(): TooltipProps.Tooltip<TPayload>["children"] {
    const { children } = this.tooltipProps;

    return children;
  }

  /**
   * {@link TooltipContent} に渡す props を取得します。
   */
  public getContentProps(): Omit<TooltipContentProps, "children"> {
    return this.contentProps;
  }

  /**
   * {@link TooltipPortal} に渡す props を取得します。
   */
  public getPortalProps(): Omit<TooltipPortalProps, "children"> {
    const { portal: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link TooltipPositioner} に渡す props を取得します。
   */
  public getPositionerProps(): Omit<TooltipPositionerProps, "children"> {
    const { positioner: props = {} } = this.slotProps;

    return {
      ...props,
      ...this.positionerProps,
    };
  }

  /**
   * {@link TooltipRoot} に渡す props を取得します。
   */
  public getRootProps(): Omit<TooltipRootProps<TPayload>, "children"> {
    const { handle } = this.tooltipProps;

    return {
      ...this.rootProps,
      handle,
    };
  }

  /**
   * {@link TooltipTrigger} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getTriggerProps(): Omit<TooltipTriggerProps<TPayload>, "handle"> | null {
    const { delay, trigger, closeDelay, keepOpenOnClick } = this.tooltipProps;
    const { trigger: props = {} } = this.slotProps;

    if (trigger) {
      return {
        ...props,
        delay,
        children: trigger,
        closeDelay,
        keepOpenOnClick,
      };
    }

    return null;
  }
}

/**
 * {@link TooltipAPI} を作成するフックです。
 */
export const useTooltipAPI: IUseTooltipAPI = function useSuiTooltipAPI<TPayload>(
  props: TooltipProps<TPayload>,
) {
  return new TooltipAPI(props);
};

export { TooltipAPI as API, useTooltipAPI as useAPI };

// Component
// ---------

export interface ITooltip extends IComponent<TooltipProps> {
  /**
   * @template TPayload トリガーが送信するデータの型です。
   */
  <TPayload = any>(props: TooltipProps<TPayload>): IComponent.Return;

  /**
   * {@link TooltipTrigger} です。
   */
  readonly Trigger: ITooltipTrigger;

  /**
   * {@link TooltipHandle} を作成する関数です。
   */
  readonly createHandle: ICreateTooltipHandle;

  readonly useContext: IUseTooltipContext;
}

/**
 * トリガーとポップアップを組み立てたツールチップです。
 *
 * ホバーまたはフォーカスで内容を表示します。
 */
export const Tooltip: ITooltip = /*#__PURE__*/ Object.assign(
  function SuiTooltip(props: TooltipProps) {
    const api = useTooltipAPI(props);
    const triggerProps = api.getTriggerProps();
    const arrowProps = api.getArrowProps();
    const children = api.getContentChildren();

    return (
      <TooltipRoot {...api.getRootProps()}>
        {triggerProps && <TooltipTrigger {...triggerProps} />}
        <TooltipPortal {...api.getPortalProps()}>
          <TooltipPositioner {...api.getPositionerProps()}>
            <TooltipContent {...api.getContentProps()}>
              {arrowProps && <TooltipArrow {...arrowProps} />}
              {children}
            </TooltipContent>
          </TooltipPositioner>
        </TooltipPortal>
      </TooltipRoot>
    );
  },
  {
    Trigger: TooltipTrigger,
    useContext: useTooltipContext,
    createHandle: createTooltipHandle,
  },
);

export namespace Tooltip {
  export type State = TooltipState;

  export type Props<TPayload = any> = TooltipProps<TPayload>;

  export type SlotProps<TPayload = any> = TooltipSlotProps<TPayload>;

  export type Context = TooltipContext;

  export type Actions = TooltipActions;

  export type ChangeEventDetails = TooltipChangeEventDetails;

  export type ChangeEventReason = TooltipChangeEventReason;

  export type Radius = TooltipRadius;

  export type Size = TooltipSize;
}
