import * as React from "react";

import type { IComponent } from "../types.js";
import {
  type PopoverHandle,
  type PopoverRootSize,
  type PopoverRootProps,
  type PopoverRootState,
  type PopoverArrowProps,
  type PopoverRootRadius,
  type IUsePopoverContext,
  type PopoverPortalProps,
  type PopoverRootActions,
  type PopoverContentProps,
  type PopoverTriggerProps,
  type ICreatePopoverHandle,
  type PopoverBackdropProps,
  type PopoverPositionerProps,
  type PopoverRootChangeEventReason,
  type PopoverRootChangeEventDetails,
  PopoverRoot,
  PopoverArrow,
  PopoverPortal,
  PopoverContent,
  PopoverContext,
  PopoverTrigger,
  PopoverBackdrop,
  PopoverPositioner,
  usePopoverContext,
  createPopoverHandle,
} from "./popover.parts.js";

// Types
// -----

export type PopoverActions = PopoverRootActions;

export type PopoverChangeEventDetails = PopoverRootChangeEventDetails;

export type PopoverChangeEventReason = PopoverRootChangeEventReason;

export type PopoverRadius = PopoverRootRadius;

export type PopoverSize = PopoverRootSize;

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
  readonly backdrop?: Omit<PopoverBackdropProps, "children"> | undefined;

  /**
   * {@link PopoverContent} に渡す props です。
   */
  readonly content?: Omit<PopoverContentProps, "children"> | undefined;

  /**
   * {@link PopoverPortal} に渡す props です。
   */
  readonly portal?: Omit<PopoverPortalProps, "children"> | undefined;

  /**
   * {@link PopoverPositioner} に渡す props です。
   */
  readonly positioner?: Omit<PopoverPositionerProps, "children"> | undefined;

  /**
   * {@link PopoverTrigger} に渡す props です。
   */
  readonly trigger?: Omit<PopoverTriggerProps<TPayload>, "children" | "handle"> | undefined;
};

/**
 * {@link Popover} が持つ状態です。
 */
export type PopoverState = PopoverRootState;

namespace PopoverProps {
  export type Content = Omit<PopoverContentProps, keyof Popover | keyof Root>;

  export type Popover<TPayload = any> = {
    /**
     * 矢印を表示するかどうかを指定します。
     *
     * 矢印の内容や props を変更するときは {@link PopoverProps.slotProps|slotProps.arrow} を使います。
     */
    arrow?: boolean | undefined;

    /**
     * Backdrop を表示するかどうかを指定します。
     *
     * Backdrop の内容や props を変更するときは {@link PopoverProps.slotProps|slotProps.backdrop} を使います。
     *
     * @default false
     */
    backdrop?: boolean | undefined;

    /**
     * ポップオーバーの内容です。
     */
    children?: PopoverContentProps["children"] | undefined;

    /**
     * トリガーとポップオーバーに関連付けるためのハンドルです。
     *
     * {@link createHandle} で作成します。Root 内に {@link PopoverTrigger} を配置する場合は省略できます。
     */
    handle?: PopoverHandle<TPayload> | undefined;

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: PopoverSlotProps<TPayload> | undefined;

    /**
     * ポップオーバーを開く対象です。
     *
     * `trigger` 未指定で `slotProps.trigger` のみ指定した場合は、トリガーは描画されません。
     */
    trigger?: PopoverTriggerProps["children"] | undefined;
  };

  export type Root<TPayload = any> = Omit<PopoverRootProps<TPayload>, keyof Popover>;
}

/**
 * {@link Popover} に渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type PopoverProps<TPayload = any> = PopoverProps.Popover<TPayload> &
  PopoverProps.Root<TPayload> &
  PopoverProps.Content;

// API
// ---

/**
 * {@link Popover} を構成する各パーツの props などを作成するための API です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export class PopoverAPI<TPayload = any> {
  private readonly popoverProps: Required<Omit<PopoverProps.Popover<TPayload>, "slotProps">>;

  private readonly slotProps: PopoverSlotProps<TPayload>;

  private readonly rootProps: Required<PopoverProps.Root<TPayload>>;

  private readonly contentProps: PopoverProps.Content;

  /**
   * @param props {@link Popover} の props です。
   * @internal
   */
  public constructor(props: PopoverProps<TPayload>) {
    const {
      arrow,
      handle,
      trigger,
      backdrop,
      children,
      slotProps = {},
      ...rootAndContentProps
    } = props;
    const {
      open,
      size,
      modal,
      radius,
      outlined,
      triggerId,
      actionsRef,
      defaultOpen,
      onOpenChange,
      defaultTriggerId,
      onOpenChangeComplete,
      ...contentProps
    } = rootAndContentProps;
    this.popoverProps = {
      arrow,
      handle,
      trigger,
      backdrop,
      children,
    };
    this.slotProps = slotProps;
    this.rootProps = {
      open,
      size,
      modal,
      radius,
      outlined,
      triggerId,
      actionsRef,
      defaultOpen,
      onOpenChange,
      defaultTriggerId,
      onOpenChangeComplete,
    };
    this.contentProps = contentProps;
  }

  /**
   * {@link PopoverArrow} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getArrowProps(): PopoverArrowProps | null {
    const { arrow = false } = this.popoverProps;
    const { arrow: props } = this.slotProps;

    if (arrow || props) {
      return props || {};
    }

    return null;
  }

  /**
   * {@link PopoverBackdrop} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getBackdropProps(): Omit<PopoverBackdropProps, "children"> | null {
    const { backdrop = false } = this.popoverProps;
    const { backdrop: props } = this.slotProps;

    if (backdrop || props) {
      return props || {};
    }

    return null;
  }

  /**
   * {@link PopoverContent} に表示する子要素を取得します。
   */
  public getContentChildren(): PopoverContentProps["children"] {
    const { children } = this.popoverProps;

    return children;
  }

  /**
   * {@link PopoverContent} に渡す props を取得します。
   */
  public getContentProps(): Omit<PopoverContentProps, "children"> {
    const { content: props = {} } = this.slotProps;

    return {
      ...props,
      ...this.contentProps,
    };
  }

  /**
   * {@link PopoverPortal} に渡す props を取得します。
   */
  public getPortalProps(): Omit<PopoverPortalProps, "children"> {
    const { portal: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link PopoverPositioner} に渡す props を取得します。
   */
  public getPositionerProps(): Omit<PopoverPositionerProps, "children"> {
    const { positioner: props = {} } = this.slotProps;
    const { side = "bottom", align = "center", sideOffset = 8, ...otherProps } = props;

    return {
      ...otherProps,
      side,
      align,
      sideOffset,
    };
  }

  /**
   * {@link PopoverRoot} に渡す props を取得します。
   */
  public getRootProps(): Omit<PopoverRootProps<TPayload>, "children"> {
    const { handle } = this.popoverProps;

    return {
      ...this.rootProps,
      handle,
    };
  }

  /**
   * {@link PopoverTrigger} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getTriggerProps(): Omit<PopoverTriggerProps<TPayload>, "handle"> | null {
    const { trigger } = this.popoverProps;
    const { trigger: props = {} } = this.slotProps;

    if (trigger) {
      return {
        ...props,
        children: trigger,
      };
    }

    return null;
  }
}

export interface IUsePopoverAPI {
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
export const usePopoverAPI: IUsePopoverAPI = function useSuiPopoverAPI<TPayload>(
  props: PopoverProps<TPayload>,
) {
  return new PopoverAPI(props);
};

export { PopoverAPI as API, usePopoverAPI as useAPI };

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
  readonly createHandle: ICreatePopoverHandle;

  readonly useContext: IUsePopoverContext;
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
    const backdropProps = api.getBackdropProps();
    const children = api.getContentChildren();

    return (
      <PopoverRoot {...api.getRootProps()}>
        {triggerProps && <PopoverTrigger {...triggerProps} />}
        <PopoverPortal {...api.getPortalProps()}>
          {backdropProps && <PopoverBackdrop {...backdropProps} />}
          <PopoverPositioner {...api.getPositionerProps()}>
            <PopoverContent {...api.getContentProps()}>
              {arrowProps && <PopoverArrow {...arrowProps} />}
              {children}
            </PopoverContent>
          </PopoverPositioner>
        </PopoverPortal>
      </PopoverRoot>
    );
  },
  {
    useContext: usePopoverContext,
    createHandle: createPopoverHandle,
  },
);

export namespace Popover {
  export type State = PopoverState;

  export type Props<TPayload = any> = PopoverProps<TPayload>;

  export type SlotProps<TPayload = any> = PopoverSlotProps<TPayload>;

  export type Context = PopoverContext;

  export type Actions = PopoverActions;

  export type ChangeEventDetails = PopoverChangeEventDetails;

  export type ChangeEventReason = PopoverChangeEventReason;

  export type Radius = PopoverRadius;

  export type Size = PopoverSize;
}
