import * as React from "react";

import type { IComponent } from "../types.js";
import {
  type HoverCardHandle,
  type HoverCardRootSize,
  type IHoverCardTrigger,
  type HoverCardRootProps,
  type HoverCardRootState,
  type HoverCardArrowProps,
  type HoverCardRootRadius,
  type HoverCardPortalProps,
  type HoverCardRootActions,
  type HoverCardContentProps,
  type HoverCardTriggerProps,
  type HoverCardBackdropProps,
  type HoverCardPositionerProps,
  type HoverCardRootChangeEventReason,
  type HoverCardRootChangeEventDetails,
  HoverCardRoot,
  HoverCardArrow,
  HoverCardPortal,
  HoverCardContent,
  HoverCardTrigger,
  HoverCardBackdrop,
  HoverCardPositioner,
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
  readonly backdrop?: HoverCardBackdropProps | undefined;

  /**
   * {@link HoverCardPortal} に渡す props です。
   */
  readonly portal?: Omit<HoverCardPortalProps, "children"> | undefined;

  /**
   * {@link HoverCardPositioner} に渡す props です。
   */
  readonly positioner?: HoverCardPositionerProps | undefined;

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
export interface IHoverCardContentRenderer<TPayload = any> {
  /**
   * 内容をレンダリングします。
   *
   * @param args レンダリングに必要な値です。
   * @returns レンダリングする内容です。
   */
  (args: { payload: TPayload | undefined }): React.ReactNode;
}

type HoverCardPropsMain<TPayload = any> = {
  /**
   * 矢印を表示するかどうかを指定します。
   *
   * 矢印の内容や props を変更するときは {@link HoverCardProps.slotProps|slotProps.arrow} を使います。
   */
  arrow?: boolean | undefined;

  /**
   * ホバーカードの内容です。
   *
   * 関数を指定した場合は、アクティブなトリガーの payload を受け取って内容を組み立てます。
   */
  children?: React.ReactNode | IHoverCardContentRenderer<TPayload> | undefined;

  /**
   * トリガーとホバーカードに関連付けるためのハンドルです。
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

type HoverCardPropsRoot<TPayload = any> = Omit<
  HoverCardRootProps<TPayload>,
  "children" | keyof HoverCardPropsMain
>;

type HoverCardPropsTrigger<TPayload = any> = Pick<
  HoverCardTriggerProps<TPayload>,
  "closeDelay" | "delay"
>;

type HoverCardPropsContent = Omit<
  HoverCardContentProps,
  keyof HoverCardPropsMain | keyof HoverCardPropsRoot | keyof HoverCardPropsTrigger
>;

/**
 * {@link HoverCard} に渡す props です。
 *
 * @template TPayload トリガーから受け取るデータの型です。
 */
export type HoverCardProps<TPayload = any> = HoverCardPropsMain<TPayload> &
  HoverCardPropsRoot<TPayload> &
  HoverCardPropsTrigger<TPayload> &
  HoverCardPropsContent;

// API
// ---

/**
 * {@link HoverCard} を構成する各パーツの props などを作成するための API です。
 *
 * @template TPayload トリガーから受け取るデータの型です。
 */
export interface HoverCardAPI<TPayload = any> {
  /**
   * {@link HoverCardArrow} に渡す props を取得します。
   */
  getArrowProps(): HoverCardArrowProps | null;

  /**
   * {@link HoverCardBackdrop} に渡す props を取得します。
   */
  getBackdropProps(): HoverCardBackdropProps;

  /**
   * {@link HoverCardContent} に表示する子要素を取得します。
   */
  getContentChildren(): React.ReactNode | IHoverCardContentRenderer<TPayload>;

  /**
   * {@link HoverCardContent} に渡す props を取得します。
   */
  getContentProps(): Omit<HoverCardContentProps, "children">;

  /**
   * {@link HoverCardPortal} に渡す props を取得します。
   */
  getPortalProps(): Omit<HoverCardPortalProps, "children">;

  /**
   * {@link HoverCardPositioner} に渡す props を取得します。
   */
  getPositionerProps(): HoverCardPositionerProps;

  /**
   * {@link HoverCardRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<HoverCardRootProps<TPayload>, "children">;

  /**
   * {@link HoverCardTrigger} に渡す props を取得します。
   */
  getTriggerProps(): Omit<HoverCardTriggerProps<TPayload>, "handle"> | null;
}

interface IUseHoverCardAPI {
  /**
   * {@link HoverCardAPI} を作成します。
   *
   * @template TPayload トリガーから受け取るデータの型です。
   * @param props {@link HoverCard} の props です。
   * @returns ホバーカードの API です
   */
  <TPayload = any>(props: HoverCardProps<TPayload>): HoverCardAPI<TPayload>;
}

/**
 * {@link HoverCardAPI} を作成するフックです。
 */
export const useHoverCardAPI: IUseHoverCardAPI = function useSuiHoverCardAPI(
  props: HoverCardProps<any>,
) {
  const {
    open,
    size,
    arrow = false,
    delay,
    handle: handleProp,
    radius,
    trigger,
    children,
    outlined,
    slotProps: {
      arrow: arrowProps,
      portal: portalProps = {},
      trigger: triggerProps = {},
      backdrop: backdropProps = {},
      positioner: positionerProps = {},
    } = {},
    triggerId,
    actionsRef,
    closeDelay,
    defaultOpen,
    onOpenChange,
    defaultTriggerId,
    onOpenChangeComplete,
    ...otherContentProps
  } = props;
  const handle = React.useMemo(() => handleProp, [handleProp]);

  return {
    getRootProps(): Required<Omit<HoverCardRootProps<any>, "children">> {
      return {
        open,
        size,
        handle,
        radius,
        outlined,
        triggerId,
        actionsRef,
        defaultOpen,
        onOpenChange,
        defaultTriggerId,
        onOpenChangeComplete,
      };
    },
    getArrowProps() {
      if (arrow || arrowProps) {
        return arrowProps || {};
      }

      return null;
    },
    getPortalProps() {
      return portalProps;
    },
    getContentProps() {
      return otherContentProps;
    },
    getTriggerProps() {
      if (trigger) {
        const requiredProps: Required<HoverCardPropsTrigger> = {
          delay,
          closeDelay,
        };

        return {
          ...triggerProps,
          ...requiredProps,
          children: trigger,
        };
      }

      return null;
    },
    getBackdropProps() {
      return backdropProps;
    },
    getContentChildren() {
      return children;
    },
    getPositionerProps() {
      return positionerProps;
    },
  };
};

export { type HoverCardAPI as API, useHoverCardAPI as useAPI };

// Component
// ---------

interface IHoverCard extends IComponent<HoverCardProps> {
  /**
   * @template TPayload トリガーから受け取るデータの型です。
   */
  <TPayload = any>(props: HoverCardProps<TPayload>): IComponent.Return;

  readonly Trigger: IHoverCardTrigger;

  /**
   * {@link HoverCardHandle} を作成する関数です。
   */
  readonly createHandle: typeof createHoverCardHandle;
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
    const triggerProps = api.getTriggerProps();
    const arrowProps = api.getArrowProps();
    const contentChildren = api.getContentChildren();

    return (
      <HoverCardRoot {...api.getRootProps()}>
        {({ payload }) => (
          <>
            {triggerProps && <HoverCardTrigger {...triggerProps} />}
            <HoverCardPortal {...api.getPortalProps()}>
              <HoverCardBackdrop {...api.getBackdropProps()} />
              <HoverCardPositioner {...api.getPositionerProps()}>
                <HoverCardContent {...api.getContentProps()}>
                  {arrowProps && <HoverCardArrow {...arrowProps} />}
                  {typeof contentChildren === "function"
                    ? contentChildren({ payload })
                    : contentChildren}
                </HoverCardContent>
              </HoverCardPositioner>
            </HoverCardPortal>
          </>
        )}
      </HoverCardRoot>
    );
  },
  {
    Trigger: HoverCardTrigger,
    createHandle: createHoverCardHandle,
  },
);

export namespace HoverCard {
  export type State = HoverCardState;

  export type Props<TPayload = any> = HoverCardProps<TPayload>;

  export type SlotProps<TPayload = any> = HoverCardSlotProps<TPayload>;

  export type Actions = HoverCardActions;

  export type ChangeEventDetails = HoverCardChangeEventDetails;

  export type ChangeEventReason = HoverCardChangeEventReason;

  export interface IContentRenderer<TPayload = any> extends IHoverCardContentRenderer<TPayload> {}

  export type Radius = HoverCardRadius;

  export type Size = HoverCardSize;
}
