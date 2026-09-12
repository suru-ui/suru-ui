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
  type TooltipPortalProps,
  type TooltipRootActions,
  type TooltipContentProps,
  type TooltipTriggerProps,
  type TooltipPositionerProps,
  type TooltipRootChangeEventReason,
  type TooltipRootChangeEventDetails,
  TooltipRoot,
  TooltipArrow,
  TooltipPortal,
  TooltipContent,
  TooltipTrigger,
  TooltipPositioner,
  createTooltipHandle,
} from "./tooltip.parts.jsx";

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
    | Omit<TooltipTriggerProps<TPayload>, "children" | "handle" | keyof TooltipPropsTrigger>
    | undefined;
};

/**
 * {@link Tooltip} が持つ状態です。
 */
export type TooltipState = TooltipRootState;

type TooltipPropsMain<TPayload = any> = {
  /**
   * トリガーとツールチップに関連付けるためのハンドルです。
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

type TooltipPropsRoot<TPayload = any> = Omit<
  TooltipRootProps<TPayload>,
  "children" | keyof TooltipPropsMain
>;

type TooltipPropsTrigger<TPayload = any> = Pick<
  TooltipTriggerProps<TPayload>,
  Exclude<
    // Base UI の型を確認して取り出すプロパティーを決めます。
    // TooltipTriggerProps:
    | "delay"
    | "closeDelay"
    // TooltipTriggerProps.SuruUI:
    | "keepOpenOnClick",
    keyof TooltipPropsMain | keyof TooltipPropsRoot
  >
>;

type TooltipPropsContent = Omit<
  TooltipContentProps,
  keyof TooltipPropsMain | keyof TooltipPropsRoot | keyof TooltipPropsTrigger
>;

/**
 * {@link Tooltip} に渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type TooltipProps<TPayload = any> = TooltipPropsMain<TPayload> &
  TooltipPropsRoot<TPayload> &
  TooltipPropsTrigger<TPayload> &
  UseAnchorPositioningSharedParameters &
  TooltipPropsContent;

// API
// ---

/**
 * {@link Tooltip} を構成する各パーツの props などを作成するための API です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export interface TooltipAPI<TPayload = any> {
  /**
   * {@link TooltipArrow} に渡す props を取得します。
   */
  getArrowProps(): TooltipArrowProps | null;

  /**
   * {@link TooltipContent} に渡す props を取得します。
   */
  getContentProps(): TooltipContentProps;

  /**
   * {@link TooltipPortal} に渡す props を取得します。
   */
  getPortalProps(): Omit<TooltipPortalProps, "children">;

  /**
   * {@link TooltipPositioner} に渡す props を取得します。
   */
  getPositionerProps(): TooltipPositionerProps;

  /**
   * {@link TooltipRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<TooltipRootProps<TPayload>, "children">;

  /**
   * {@link TooltipTrigger} に渡す props を取得します。
   */
  getTriggerProps(): Omit<TooltipTriggerProps<TPayload>, "handle"> | null;
}

interface IUseTooltipAPI {
  /**
   * {@link TooltipAPI} を作成します。
   *
   * @template TPayload トリガーが送信するデータの型です。
   * @param props {@link Tooltip} の props です。
   * @returns ツールチップの API です
   */
  <TPayload = any>(props: TooltipProps<TPayload>): TooltipAPI<TPayload>;
}

/**
 * {@link TooltipAPI} を作成するフックです。
 */
export const useTooltipAPI: IUseTooltipAPI = function useSuiTooltipAPI(props: TooltipProps<any>) {
  const {
    open,
    side = "top",
    size,
    align,
    delay,
    anchor,
    handle: handleProp,
    radius,
    sticky,
    trigger,
    disabled,
    outlined,
    showArrow = false,
    slotProps: {
      arrow: arrowProps,
      portal: portalProps = {},
      trigger: triggerProps = {},
      positioner: positionerProps = {},
    } = {},
    triggerId,
    actionsRef,
    closeDelay,
    sideOffset = 8,
    alignOffset,
    defaultOpen,
    arrowPadding,
    onOpenChange,
    positionMethod,
    keepOpenOnClick,
    trackCursorAxis,
    collisionPadding,
    defaultTriggerId,
    collisionBoundary,
    collisionAvoidance,
    onOpenChangeComplete,
    disableAnchorTracking,
    disableHoverablePopup,
    ...contentProps
  } = props;
  const handle = React.useMemo(() => handleProp, [handleProp]);
  const renderArrow = showArrow || arrowProps !== undefined;

  return {
    getRootProps(): Omit<TooltipRootProps<any>, "children"> {
      return {
        open,
        size,
        handle,
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
    },
    getArrowProps() {
      if (renderArrow) {
        return arrowProps || {};
      }

      return null;
    },
    getPortalProps() {
      return portalProps;
    },
    getContentProps() {
      return contentProps;
    },
    getTriggerProps() {
      if (trigger) {
        const requiredProps: Required<TooltipPropsTrigger> = {
          delay,
          closeDelay,
          keepOpenOnClick,
        };

        return {
          ...triggerProps,
          ...requiredProps,
          children: trigger,
        };
      }

      return null;
    },
    getPositionerProps() {
      const requiredProps: Required<UseAnchorPositioningSharedParameters> = {
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

      return {
        ...positionerProps,
        ...requiredProps,
      };
    },
  };
};

export { type TooltipAPI as API, useTooltipAPI as useAPI };

// Component
// ---------

interface ITooltip extends IComponent<TooltipProps> {
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
  readonly createHandle: typeof createTooltipHandle;
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
    const contentProps = api.getContentProps();
    const arrowProps = api.getArrowProps();

    return (
      <TooltipRoot {...api.getRootProps()}>
        {triggerProps && <TooltipTrigger {...triggerProps} />}
        <TooltipPortal {...api.getPortalProps()}>
          <TooltipPositioner {...api.getPositionerProps()}>
            <TooltipContent {...contentProps}>
              {arrowProps && <TooltipArrow {...arrowProps} />}
              {contentProps.children}
            </TooltipContent>
          </TooltipPositioner>
        </TooltipPortal>
      </TooltipRoot>
    );
  },
  {
    Trigger: TooltipTrigger,
    createHandle: createTooltipHandle,
  },
);

export namespace Tooltip {
  export type State = TooltipState;

  export type Props<TPayload = any> = TooltipProps<TPayload>;

  export type SlotProps<TPayload = any> = TooltipSlotProps<TPayload>;

  export type Actions = TooltipActions;

  export type ChangeEventDetails = TooltipChangeEventDetails;

  export type ChangeEventReason = TooltipChangeEventReason;

  export type Radius = TooltipRadius;

  export type Size = TooltipSize;
}
