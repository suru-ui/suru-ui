import * as React from "react";

import type { IComponent } from "../types.js";
import {
  type PopoverHandle,
  type PopoverRootProps,
  type PopoverRootState,
  type PopoverArrowProps,
  type PopoverPopupProps,
  type PopoverPortalProps,
  type PopoverRootActions,
  type PopoverTriggerProps,
  type PopoverBackdropProps,
  type PopoverPositionerProps,
  type PopoverRootChangeEventReason,
  type PopoverRootChangeEventDetails,
  PopoverRoot,
  PopoverArrow,
  PopoverPopup,
  PopoverPortal,
  PopoverTrigger,
  PopoverBackdrop,
  PopoverPositioner,
  createPopoverHandle,
} from "./popover.parts.jsx";

// Types
// -----

export type PopoverActions = PopoverRootActions;

export type PopoverChangeEventDetails = PopoverRootChangeEventDetails;

export type PopoverChangeEventReason = PopoverRootChangeEventReason;

/**
 * {@link Popover} の各パーツに渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type PopoverSlotProps<TPayload = any> = {
  /**
   * {@link PopoverArrow} に渡す props です。
   */
  readonly arrow?: PopoverArrowProps | undefined;

  /**
   * {@link PopoverBackdrop} に渡す props です。
   */
  readonly backdrop?: PopoverBackdropProps | undefined;

  /**
   * {@link PopoverPopup} に渡す props です。
   */
  readonly popup?: Omit<PopoverPopupProps, "children"> | undefined;

  /**
   * {@link PopoverPortal} に渡す props です。
   */
  readonly portal?: Omit<PopoverPortalProps, "children"> | undefined;

  /**
   * {@link PopoverPositioner} に渡す props です。
   */
  readonly positioner?: PopoverPositionerProps | undefined;

  /**
   * {@link PopoverTrigger} に渡す props です。
   */
  readonly trigger?: Omit<PopoverTriggerProps<TPayload>, "children" | "handle"> | undefined;
};

/**
 * {@link Popover} が持つ状態です。
 */
export type PopoverState = PopoverRootState;

type PopoverPropsMain<TPayload = any> = {
  /**
   * ポップアップに表示する内容です。
   */
  children?: PopoverPopupProps["children"] | undefined;

  /**
   * トリガーとポップオーバーに関連付けるためのハンドルです。
   */
  handle?: PopoverHandle<TPayload> | undefined;

  /**
   * 各パーツに個別の props を渡すためのオブジェクトです。
   */
  slotProps?: PopoverSlotProps<TPayload> | undefined;

  /**
   * ポップオーバーを開く対象です。
   *
   * {@link PopoverTrigger|Trigger} の子要素として直接渡され、`render` に設定されます。
   * `trigger` 未指定で `slotProps.trigger` のみ指定した場合は、トリガーは描画されません。
   */
  trigger?: PopoverTriggerProps["children"] | undefined;
};

type PopoverPropsRoot<TPayload = any> = Omit<
  PopoverRootProps<TPayload>,
  "children" | keyof PopoverPropsMain
>;

/**
 * {@link Popover} に渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type PopoverProps<TPayload = any> = PopoverPropsMain<TPayload> & PopoverPropsRoot<TPayload>;

// API
// ---

/**
 * {@link Popover} を構成する各パーツの props などを作成するための API です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export interface PopoverAPI<TPayload = any> {
  /**
   * {@link PopoverArrow} に渡す props を取得します。
   */
  getArrowProps(): PopoverArrowProps | null;

  /**
   * {@link PopoverBackdrop} に渡す props を取得します。
   */
  getBackdropProps(): PopoverBackdropProps;

  /**
   * {@link PopoverPopup} に渡す props を取得します。
   */
  getPopupProps(): Omit<PopoverPopupProps, "children">;

  /**
   * {@link PopoverPortal} に渡す props を取得します。
   */
  getPortalProps(): Omit<PopoverPortalProps, "children">;

  /**
   * {@link PopoverPositioner} に渡す props を取得します。
   */
  getPositionerProps(): PopoverPositionerProps;

  /**
   * {@link PopoverRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<PopoverRootProps<TPayload>, "children">;

  /**
   * {@link PopoverTrigger} に渡す props を取得します。
   */
  getTriggerProps(): Omit<PopoverTriggerProps<TPayload>, "handle"> | null;
}

interface IUsePopoverAPI {
  /**
   * {@link PopoverAPI} を作成します。
   *
   * @template TPayload トリガーが送信するデータの型です。
   * @param props {@link Popover} の props です。
   * @returns ポップオーバーの API です
   */
  <TPayload = any>(props: PopoverProps<TPayload>): PopoverAPI<TPayload>;
}

/**
 * {@link PopoverAPI} を作成するフックです。
 */
export const usePopoverAPI: IUsePopoverAPI = function useSuiPopoverAPI(props: PopoverProps<any>) {
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
      backdrop: backdropProps = {},
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
  const {
    side = "bottom",
    align = "start",
    sideOffset = 8,
    ...otherPositionerProps
  } = positionerProps;

  return {
    getRootProps(): Omit<PopoverRootProps<any>, "children"> {
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
    getBackdropProps() {
      return backdropProps;
    },
    getPositionerProps() {
      return {
        ...otherPositionerProps,
        side,
        align,
        sideOffset,
      };
    },
  };
};

export { type PopoverAPI as API, usePopoverAPI as useAPI };

// Component
// ---------

interface IPopover extends IComponent<PopoverProps> {
  /**
   * @template TPayload トリガーが送信するデータの型です。
   */
  <TPayload = any>(props: PopoverProps<TPayload>): IComponent.Return;

  /**
   * {@link PopoverHandle} を作成する関数です。
   */
  readonly createHandle: typeof createPopoverHandle;
}

/**
 * トリガーとポップアップを組み立てたポップオーバーです。
 *
 * ボタンを押すと内容を表示します。
 * 構成を細かく制御する場合は、{@link PopoverRoot|Root} を直接組み立てます。
 */
export const Popover: IPopover = /*#__PURE__*/ Object.assign(
  function SuiPopover(props: PopoverProps) {
    const api = usePopoverAPI(props);
    const triggerProps = api.getTriggerProps();
    const arrowProps = api.getArrowProps();

    return (
      <PopoverRoot {...api.getRootProps()}>
        {triggerProps && <PopoverTrigger {...triggerProps} />}
        <PopoverPortal {...api.getPortalProps()}>
          <PopoverBackdrop {...api.getBackdropProps()} />
          <PopoverPositioner {...api.getPositionerProps()}>
            <PopoverPopup {...api.getPopupProps()}>
              {arrowProps && <PopoverArrow {...arrowProps} />}
              {props.children}
            </PopoverPopup>
          </PopoverPositioner>
        </PopoverPortal>
      </PopoverRoot>
    );
  },
  {
    createHandle: createPopoverHandle,
  },
);

export namespace Popover {
  export type State = PopoverState;

  export type Props<TPayload = any> = PopoverProps<TPayload>;

  export type SlotProps = PopoverSlotProps;

  export type Actions = PopoverActions;

  export type ChangeEventDetails = PopoverChangeEventDetails;

  export type ChangeEventReason = PopoverChangeEventReason;
}
