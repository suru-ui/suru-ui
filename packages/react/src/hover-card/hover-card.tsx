import * as React from "react";

import type { IComponent } from "../types.js";
import {
  type HoverCardRootProps,
  type HoverCardRootState,
  type HoverCardArrowProps,
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

type HoverCardPropsMain<TPayload = any> = Pick<
  HoverCardTriggerProps<TPayload>,
  "closeDelay" | "delay"
> & {
  /**
   * 各パーツに個別の props を渡すためのオブジェクトです。
   */
  slotProps?: HoverCardSlotProps<TPayload> | undefined;

  /**
   * ホバーの反応対象です。
   *
   * {@link HoverCardTrigger|Trigger} の子要素として直接渡され、`render` に設定されます。
   * `trigger` 未指定で `slotProps.trigger` のみ指定した場合は、トリガーは描画されません。
   */
  trigger?: HoverCardTriggerProps["children"] | undefined;
};

type HoverCardPropsRoot<TPayload = any> = Omit<
  HoverCardRootProps<TPayload>,
  "children" | keyof HoverCardPropsMain
>;

type HoverCardPropsContent = Omit<
  HoverCardContentProps,
  keyof HoverCardPropsMain | keyof HoverCardPropsRoot
>;

/**
 * {@link HoverCard} に渡す props です。
 *
 * @template TPayload トリガーから受け取るデータの型です。
 */
export type HoverCardProps<TPayload = any> = HoverCardPropsMain<TPayload> &
  HoverCardPropsRoot<TPayload> &
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
  getContentChildren(): HoverCardContentProps["children"];

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
    delay,
    handle: handleProp,
    trigger,
    children,
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
    ...contentProps
  } = props;
  const handle = React.useMemo(() => handleProp, [handleProp]);
  const {
    side = "bottom",
    align = "start",
    sideOffset = 8,
    ...otherPositionerProps
  } = positionerProps;

  return {
    getRootProps(): HoverCardPropsRoot {
      return {
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
    getPortalProps() {
      return portalProps;
    },
    getContentProps() {
      return contentProps;
    },
    getTriggerProps() {
      if (trigger) {
        return {
          ...triggerProps,
          delay,
          children: trigger,
          closeDelay,
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
      return {
        ...otherPositionerProps,
        side,
        align,
        sideOffset,
      };
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
    const contentProps = api.getContentProps();
    const arrowProps = api.getArrowProps();

    return (
      <HoverCardRoot {...api.getRootProps()}>
        {triggerProps && <HoverCardTrigger {...triggerProps} />}
        <HoverCardPortal {...api.getPortalProps()}>
          <HoverCardBackdrop {...api.getBackdropProps()} />
          <HoverCardPositioner {...api.getPositionerProps()}>
            <HoverCardContent {...contentProps}>
              {arrowProps && <HoverCardArrow {...arrowProps} />}
              {api.getContentChildren()}
            </HoverCardContent>
          </HoverCardPositioner>
        </HoverCardPortal>
      </HoverCardRoot>
    );
  },
  {
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
}
