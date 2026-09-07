import * as React from "react";

import type { IComponent } from "../types.js";
import {
  type HoverCardHandle,
  type HoverCardRootProps,
  type HoverCardRootState,
  type HoverCardArrowProps,
  type HoverCardPopupProps,
  type HoverCardPortalProps,
  type HoverCardRootActions,
  type HoverCardTriggerProps,
  type HoverCardBackdropProps,
  type HoverCardPositionerProps,
  type HoverCardRootChangeEventReason,
  type HoverCardRootChangeEventDetails,
  HoverCardRoot,
  HoverCardArrow,
  HoverCardPopup,
  HoverCardPortal,
  HoverCardTrigger,
  HoverCardBackdrop,
  HoverCardPositioner,
  createHoverCardHandle,
} from "./hover-card.parts.jsx";

// Types
// -----

/**
 * {@link HoverCardRootActions}
 */
export type HoverCardActions = HoverCardRootActions;

/**
 * {@link HoverCardRootChangeEventDetails}
 */
export type HoverCardChangeEventDetails = HoverCardRootChangeEventDetails;

/**
 * {@link HoverCardRootChangeEventReason}
 */
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
   * {@link HoverCardPopup} に渡す props です。
   */
  readonly popup?: Omit<HoverCardPopupProps, "children"> | undefined;

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

type HoverCardPropsMain<TPayload = any> = {
  /**
   * ポップアップに表示する内容です。
   */
  children?: HoverCardPopupProps["children"] | undefined;

  /**
   * ホバーカードが閉じるまでの遅延時間 (ミリ秒) です。
   *
   * ポップアップ上にマウスカーソルを移動しても閉じずに済むように、0 より大きい値を指定することを推奨します。
   *
   * @default 300
   */
  closeDelay?: number | undefined;

  /**
   * ホバーカードが開くまでの遅延時間 (ミリ秒) です。
   *
   * @default 600
   */
  delay?: number | undefined;

  /**
   * トリガーとホバーカードに関連付けるためのハンドルです。
   */
  handle?: HoverCardHandle<TPayload> | undefined;

  /**
   * 各パーツに個別の props を渡すためのオブジェクトです。
   *
   * 各パーツの props が優先されます。
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

/**
 * {@link HoverCard} に渡す props です。
 *
 * @template TPayload トリガーから受け取るデータの型です。
 */
export type HoverCardProps<TPayload = any> = HoverCardPropsMain<TPayload> &
  HoverCardPropsRoot<TPayload>;

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
   * {@link HoverCardPopup} に渡す props を取得します。
   */
  getPopupProps(): Omit<HoverCardPopupProps, "children">;

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
    trigger,
    children,
    handle: handleProp,
    closeDelay,
    slotProps: {
      arrow: arrowProps,
      popup: popupProps = {},
      portal: portalProps = {},
      backdrop: backdropProps = {},
      positioner: positionerProps = {},
      trigger: triggerProps = {},
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
    getArrowProps() {
      if (arrowProps) {
        return arrowProps;
      }

      return null;
    },
    getBackdropProps() {
      return backdropProps;
    },
    getPopupProps() {
      return popupProps;
    },
    getPortalProps() {
      return portalProps;
    },
    getPositionerProps() {
      return {
        ...otherPositionerProps,
        align,
        side,
        sideOffset,
      };
    },
    getRootProps(): Required<Omit<HoverCardRootProps<any>, "children">> {
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
    getTriggerProps() {
      if (trigger) {
        return {
          ...triggerProps,
          children: trigger,
          closeDelay,
          delay,
        };
      }

      return null;
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
    const arrowProps = api.getArrowProps();
    const triggerProps = api.getTriggerProps();

    return (
      <HoverCardRoot {...api.getRootProps()}>
        {triggerProps && <HoverCardTrigger {...triggerProps} />}
        <HoverCardPortal {...api.getPortalProps()}>
          <HoverCardBackdrop {...api.getBackdropProps()} />
          <HoverCardPositioner {...api.getPositionerProps()}>
            <HoverCardPopup {...api.getPopupProps()}>
              {arrowProps && <HoverCardArrow {...arrowProps} />}
              {props.children}
            </HoverCardPopup>
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
  /**
   * {@link HoverCardState}
   */
  export type State = HoverCardState;

  /**
   * {@link HoverCardProps}
   */
  export type Props<TPayload = any> = HoverCardProps<TPayload>;

  /**
   * {@link HoverCardSlotProps}
   */
  export type SlotProps = HoverCardSlotProps;

  /**
   * {@link HoverCardActions}
   */
  export type Actions = HoverCardActions;

  /**
   * {@link HoverCardChangeEventDetails}
   */
  export type ChangeEventDetails = HoverCardChangeEventDetails;

  /**
   * {@link HoverCardChangeEventReason}
   */
  export type ChangeEventReason = HoverCardChangeEventReason;
}
