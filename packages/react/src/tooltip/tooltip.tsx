import * as React from "react";

import type { IComponent } from "../types.js";
import {
  type TooltipHandle,
  type TooltipRootProps,
  type TooltipRootState,
  type TooltipArrowProps,
  type TooltipPopupProps,
  type TooltipPortalProps,
  type TooltipRootActions,
  type TooltipTriggerProps,
  type TooltipPositionerProps,
  type TooltipRootChangeEventReason,
  type TooltipRootChangeEventDetails,
  TooltipRoot,
  TooltipArrow,
  TooltipPopup,
  TooltipPortal,
  TooltipTrigger,
  TooltipPositioner,
  createTooltipHandle,
} from "./tooltip.parts.jsx";

// Types
// -----

/**
 * {@link TooltipRootActions}
 */
export type TooltipActions = TooltipRootActions;

/**
 * {@link TooltipRootChangeEventDetails}
 */
export type TooltipChangeEventDetails = TooltipRootChangeEventDetails;

/**
 * {@link TooltipRootChangeEventReason}
 */
export type TooltipChangeEventReason = TooltipRootChangeEventReason;

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
   * {@link TooltipPopup} に渡す props です。
   */
  readonly popup?: Omit<TooltipPopupProps, "children"> | undefined;

  /**
   * {@link TooltipPortal} に渡す props です。
   */
  readonly portal?: Omit<TooltipPortalProps, "children"> | undefined;

  /**
   * {@link TooltipPositioner} に渡す props です。
   */
  readonly positioner?: TooltipPositionerProps | undefined;

  /**
   * {@link TooltipTrigger} に渡す props です。
   */
  readonly trigger?: Omit<TooltipTriggerProps<TPayload>, "children" | "handle"> | undefined;
};

/**
 * {@link Tooltip} が持つ状態です。
 */
export type TooltipState = TooltipRootState;

type TooltipPropsMain<TPayload = any> = {
  /**
   * ポップアップに表示する内容です。
   */
  children?: TooltipPopupProps["children"] | undefined;

  /**
   * トリガーとツールチップに関連付けるためのハンドルです。
   */
  handle?: TooltipHandle<TPayload> | undefined;

  /**
   * 各パーツに個別の props を渡すためのオブジェクトです。
   *
   * 各パーツの props が優先されます。
   */
  slotProps?: TooltipSlotProps<TPayload> | undefined;

  /**
   * ツールチップを表示する対象です。
   *
   * {@link TooltipTrigger|Trigger} の子要素として直接渡され、`render` に設定されます。
   * `trigger` 未指定で `slotProps.trigger` のみ指定した場合は、トリガーは描画されません。
   */
  trigger?: TooltipTriggerProps["children"] | undefined;
};

type TooltipPropsRoot<TPayload = any> = Omit<
  TooltipRootProps<TPayload>,
  "children" | keyof TooltipPropsMain
>;

/**
 * {@link Tooltip} に渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type TooltipProps<TPayload = any> = TooltipPropsMain<TPayload> & TooltipPropsRoot<TPayload>;

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
   * {@link TooltipPopup} に渡す props を取得します。
   */
  getPopupProps(): Omit<TooltipPopupProps, "children">;

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
    handle: handleProp,
    trigger,
    children: _children,
    slotProps: {
      arrow: arrowProps,
      popup: popupProps = {},
      portal: portalProps = {},
      trigger: triggerProps = {},
      positioner: positionerProps = {},
    } = {},
    triggerId,
    actionsRef,
    defaultOpen,
    onOpenChange,
    defaultTriggerId,
    onOpenChangeComplete,
    ...otherRootProps
  } = props;
  const handle = React.useMemo(() => handleProp, [handleProp]);
  const { side = "top", sideOffset = 8, ...otherPositionerProps } = positionerProps;

  return {
    getRootProps(): Omit<TooltipRootProps<any>, "children"> {
      return {
        ...otherRootProps,
        open,
        handle,
        triggerId,
        actionsRef,
        defaultOpen,
        onOpenChange,
        defaultTriggerId,
        onOpenChangeComplete,
      };
    },
    getArrowProps() {
      if (arrowProps) {
        return arrowProps;
      }

      return null;
    },
    getPopupProps() {
      return popupProps;
    },
    getPortalProps() {
      return portalProps;
    },
    getTriggerProps() {
      if (trigger) {
        return {
          ...triggerProps,
          children: trigger,
        };
      }

      return null;
    },
    getPositionerProps() {
      return {
        ...otherPositionerProps,
        side,
        sideOffset,
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
   * {@link TooltipHandle} を作成する関数です。
   */
  readonly createHandle: typeof createTooltipHandle;
}

/**
 * トリガーとポップアップを組み立てたツールチップです。
 *
 * ホバーまたはフォーカスで内容を表示します。
 * 構成を細かく制御する場合は、{@link TooltipRoot|Root} を直接組み立てます。
 */
export const Tooltip: ITooltip = /*#__PURE__*/ Object.assign(
  function SuiTooltip(props: TooltipProps) {
    const api = useTooltipAPI(props);
    const triggerProps = api.getTriggerProps();
    const arrowProps = api.getArrowProps();

    return (
      <TooltipRoot {...api.getRootProps()}>
        {triggerProps && <TooltipTrigger {...triggerProps} />}
        <TooltipPortal {...api.getPortalProps()}>
          <TooltipPositioner {...api.getPositionerProps()}>
            <TooltipPopup {...api.getPopupProps()}>
              {arrowProps && <TooltipArrow {...arrowProps} />}
              {props.children}
            </TooltipPopup>
          </TooltipPositioner>
        </TooltipPortal>
      </TooltipRoot>
    );
  },
  {
    createHandle: createTooltipHandle,
  },
);

export namespace Tooltip {
  /**
   * {@link TooltipState}
   */
  export type State = TooltipState;

  /**
   * {@link TooltipProps}
   */
  export type Props<TPayload = any> = TooltipProps<TPayload>;

  /**
   * {@link TooltipSlotProps}
   */
  export type SlotProps = TooltipSlotProps;

  /**
   * {@link TooltipActions}
   */
  export type Actions = TooltipActions;

  /**
   * {@link TooltipChangeEventDetails}
   */
  export type ChangeEventDetails = TooltipChangeEventDetails;

  /**
   * {@link TooltipChangeEventReason}
   */
  export type ChangeEventReason = TooltipChangeEventReason;
}
