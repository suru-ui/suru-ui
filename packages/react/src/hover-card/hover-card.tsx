import * as React from "react";

import type { IComponent } from "../types.js";
import {
  type HoverCardHandle,
  type HoverCardRootSize,
  type IHoverCardTrigger,
  type HoverCardRootProps,
  type HoverCardRootState,
  type HoverCardArrowProps,
  type HoverCardPopupProps,
  type HoverCardRootRadius,
  type HoverCardPortalProps,
  type HoverCardRootActions,
  type IUseHoverCardContext,
  type HoverCardTriggerProps,
  type HoverCardBackdropProps,
  type ICreateHoverCardHandle,
  type IHoverCardRootRenderer,
  type HoverCardPositionerProps,
  type HoverCardRootChangeEventReason,
  type HoverCardRootChangeEventDetails,
  HoverCardRoot,
  HoverCardArrow,
  HoverCardPopup,
  HoverCardPortal,
  HoverCardContext,
  HoverCardTrigger,
  HoverCardBackdrop,
  HoverCardPositioner,
  useHoverCardContext,
  createHoverCardHandle,
} from "./hover-card.parts.js";

// Types
// -----

export type HoverCardActions = HoverCardRootActions;

export type HoverCardChangeEventDetails = HoverCardRootChangeEventDetails;

export type HoverCardChangeEventReason = HoverCardRootChangeEventReason;

export type HoverCardRadius = HoverCardRootRadius;

export type HoverCardSize = HoverCardRootSize;

/**
 * {@link HoverCard} の各パーツに渡す props です。
 *
 * @template TPayload トリガーから受け取るデータの型です。
 */
export type HoverCardSlotProps<TPayload = any> = {
  /**
   * {@link HoverCardArrow} に渡す props です。
   */
  readonly arrow?: HoverCardArrowProps | undefined;

  /**
   * {@link HoverCardBackdrop} に渡す props です。
   */
  readonly backdrop?: Omit<HoverCardBackdropProps, "children"> | undefined;

  /**
   * {@link HoverCardPortal} に渡す props です。
   */
  readonly portal?: Omit<HoverCardPortalProps, "children"> | undefined;

  /**
   * {@link HoverCardPositioner} に渡す props です。
   */
  readonly positioner?: Omit<HoverCardPositionerProps, "children"> | undefined;

  /**
   * {@link HoverCardTrigger} に渡す props です。
   */
  readonly trigger?:
    | Omit<HoverCardTriggerProps<TPayload>, "children" | "handle" | "delay" | "closeDelay">
    | undefined;
};

/**
 * {@link HoverCard} が持つ状態です。
 */
export type HoverCardState = HoverCardRootState;

/**
 * ホバーカードの内容をレンダリングする関数のインターフェイスです。
 *
 * @template TPayload トリガーから受け取るデータの型です。
 */
export interface IHoverCardPopupRenderer<TPayload = any> {
  /**
   * 内容をレンダリングします。
   *
   * @param args レンダリングに必要な値です。
   * @returns レンダリングする内容です。
   */
  (args: { payload: TPayload | undefined }): React.ReactNode;
}

namespace HoverCardProps {
  export type HoverCard<TPayload = any> = {
    /**
     * 矢印を表示するかどうかを指定します。
     *
     * 矢印の内容や props を変更するときは {@link HoverCardProps.slotProps|slotProps.arrow} を使います。
     */
    arrow?: boolean | undefined;

    /**
     * Backdrop を表示するかどうかを指定します。
     *
     * Backdrop の内容や props を変更するときは {@link HoverCardProps.slotProps|slotProps.backdrop} を使います。
     *
     * @default false
     */
    backdrop?: boolean | undefined;

    /**
     * ホバーカードの内容です。
     *
     * 関数を指定した場合は、アクティブなトリガーの payload を受け取って内容を組み立てます。
     */
    children?: React.ReactNode | IHoverCardPopupRenderer<TPayload> | undefined;

    /**
     * トリガーとホバーカードに関連付けるためのハンドルです。
     *
     * {@link createHandle} で作成します。Root 内に {@link HoverCardTrigger} を配置する場合は省略できます。
     */
    handle?: HoverCardHandle<TPayload> | undefined;

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: HoverCardSlotProps<TPayload> | undefined;

    /**
     * ホバーの反応対象です。
     *
     * `trigger` 未指定で `slotProps.trigger` のみ指定した場合は、トリガーは描画されません。
     */
    trigger?: HoverCardTriggerProps["children"] | undefined;
  };

  export type Popup = Omit<HoverCardPopupProps, keyof HoverCard | keyof Root | keyof Trigger>;

  export type Root<TPayload = any> = Omit<HoverCardRootProps<TPayload>, keyof HoverCard>;

  export type Trigger<TPayload = any> = Pick<
    HoverCardTriggerProps<TPayload>,
    "closeDelay" | "delay"
  >;
}

/**
 * {@link HoverCard} に渡す props です。
 *
 * @template TPayload トリガーから受け取るデータの型です。
 */
export type HoverCardProps<TPayload = any> = HoverCardProps.HoverCard<TPayload> &
  HoverCardProps.Root<TPayload> &
  HoverCardProps.Trigger<TPayload> &
  HoverCardProps.Popup;

export interface IUseHoverCardAPI {
  /**
   * {@link HoverCardAPI} を作成します。
   *
   * @template TPayload トリガーから受け取るデータの型です。
   * @param props {@link HoverCard} の props です。
   * @returns ホバーカードの API です
   */
  <TPayload = any>(props: HoverCardProps<TPayload>): HoverCardAPI<TPayload>;
}

// API
// ---

/**
 * {@link HoverCard} を構成する各パーツの props などを作成するための API です。
 *
 * @template TPayload トリガーから受け取るデータの型です。
 */
export class HoverCardAPI<TPayload = any> {
  private readonly hoverCardProps: Required<
    Omit<HoverCardProps.HoverCard<TPayload> & HoverCardProps.Trigger, "slotProps">
  >;

  private readonly slotProps: HoverCardSlotProps<TPayload>;

  private readonly rootProps: Required<HoverCardProps.Root<TPayload>>;

  private readonly popupProps: HoverCardProps.Popup;

  /**
   * @param props {@link HoverCard} の props です。
   * @internal
   */
  public constructor(props: HoverCardProps<TPayload>) {
    const {
      arrow,
      delay,
      handle,
      trigger,
      backdrop,
      children,
      slotProps = {},
      closeDelay,
      ...rootAndPopupProps
    } = props;
    const {
      open,
      size,
      radius,
      outlined,
      triggerId,
      actionsRef,
      defaultOpen,
      onOpenChange,
      defaultTriggerId,
      onOpenChangeComplete,
      ...popupProps
    } = rootAndPopupProps;
    this.hoverCardProps = {
      arrow,
      delay,
      handle,
      trigger,
      backdrop,
      children,
      closeDelay,
    };
    this.slotProps = slotProps;
    this.rootProps = {
      open,
      size,
      radius,
      outlined,
      triggerId,
      actionsRef,
      defaultOpen,
      onOpenChange,
      defaultTriggerId,
      onOpenChangeComplete,
    };
    this.popupProps = popupProps;
  }

  private defaultRootChildren: IHoverCardRootRenderer<TPayload> = ({ payload }) => {
    const triggerProps = this.getTriggerProps();
    const arrowProps = this.getArrowProps();
    const backdropProps = this.getBackdropProps();
    const children = this.getPopupChildren();

    return (
      <>
        {triggerProps && <HoverCardTrigger {...triggerProps} />}
        <HoverCardPortal {...this.getPortalProps()}>
          {backdropProps && <HoverCardBackdrop {...backdropProps} />}
          <HoverCardPositioner {...this.getPositionerProps()}>
            <HoverCardPopup {...this.getPopupProps()}>
              {arrowProps && <HoverCardArrow {...arrowProps} />}
              {typeof children === "function" ? children({ payload }) : children}
            </HoverCardPopup>
          </HoverCardPositioner>
        </HoverCardPortal>
      </>
    );
  };

  /**
   * {@link HoverCardArrow} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getArrowProps(): HoverCardArrowProps | null {
    const { arrow = false } = this.hoverCardProps;
    const { arrow: props } = this.slotProps;

    if (arrow || props) {
      return props || {};
    }

    return null;
  }

  /**
   * {@link HoverCardBackdrop} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getBackdropProps(): Omit<HoverCardBackdropProps, "children"> | null {
    const { backdrop = false } = this.hoverCardProps;
    const { backdrop: props } = this.slotProps;

    if (backdrop || props) {
      return props || {};
    }

    return null;
  }

  /**
   * {@link HoverCardPopup} に表示する子要素を取得します。
   */
  public getPopupChildren(): HoverCardProps.HoverCard<TPayload>["children"] {
    const { children } = this.hoverCardProps;

    return children;
  }

  /**
   * {@link HoverCardPopup} に渡す props を取得します。
   */
  public getPopupProps(): Omit<HoverCardPopupProps, "children"> {
    return this.popupProps;
  }

  /**
   * {@link HoverCardPortal} に渡す props を取得します。
   */
  public getPortalProps(): Omit<HoverCardPortalProps, "children"> {
    const { portal: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link HoverCardPositioner} に渡す props を取得します。
   */
  public getPositionerProps(): Omit<HoverCardPositionerProps, "children"> {
    const { positioner: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link HoverCardRoot} に渡す props を取得します。
   */
  public getRootProps(): HoverCardRootProps<TPayload> {
    const { handle } = this.hoverCardProps;

    return {
      ...this.rootProps,
      handle,
      children: this.defaultRootChildren,
    };
  }

  /**
   * {@link HoverCardTrigger} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getTriggerProps(): Omit<HoverCardTriggerProps<TPayload>, "handle"> | null {
    const { delay, trigger, closeDelay } = this.hoverCardProps;
    const { trigger: props = {} } = this.slotProps;

    if (trigger) {
      return {
        ...props,
        delay,
        children: trigger,
        closeDelay,
      };
    }

    return null;
  }
}

/**
 * {@link HoverCardAPI} を作成するフックです。
 */
export const useHoverCardAPI: IUseHoverCardAPI = function useSuiHoverCardAPI<TPayload>(
  props: HoverCardProps<TPayload>,
) {
  return new HoverCardAPI(props);
};

export { HoverCardAPI as API, useHoverCardAPI as useAPI };

// Component
// ---------

export interface IHoverCard extends IComponent<HoverCardProps> {
  /**
   * @template TPayload トリガーから受け取るデータの型です。
   */
  <TPayload = any>(props: HoverCardProps<TPayload>): IComponent.Return;

  readonly Trigger: IHoverCardTrigger;

  /**
   * {@link HoverCardHandle} を作成する関数です。
   */
  readonly createHandle: ICreateHoverCardHandle;

  readonly useContext: IUseHoverCardContext;
}

/**
 * トリガーとポップアップを組み立てたホバーカードです。
 *
 * トリガーにマウスカーソルを重ねると、遅延の後に内容を表示します。
 * 構成を細かく制御する場合は、{@link HoverCardRoot|Root} を直接組み立てます。
 */
export const HoverCard: IHoverCard = /*#__PURE__*/ Object.assign(
  function SuiHoverCard(props: HoverCardProps) {
    const api = useHoverCardAPI(props);

    return <HoverCardRoot {...api.getRootProps()} />;
  },
  {
    Trigger: HoverCardTrigger,
    useContext: useHoverCardContext,
    createHandle: createHoverCardHandle,
  },
);

export namespace HoverCard {
  export type State = HoverCardState;

  export type Props<TPayload = any> = HoverCardProps<TPayload>;

  export type SlotProps<TPayload = any> = HoverCardSlotProps<TPayload>;

  export type Context = HoverCardContext;

  export type Actions = HoverCardActions;

  export type ChangeEventDetails = HoverCardChangeEventDetails;

  export type ChangeEventReason = HoverCardChangeEventReason;

  export type IPopupRenderer<TPayload = any> = IHoverCardPopupRenderer<TPayload>;

  export type Radius = HoverCardRadius;

  export type Size = HoverCardSize;
}
