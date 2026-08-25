import * as React from "react";

import type { IComponent } from "../types.js";
import {
  type HoverCardRootProps,
  type HoverCardRootState,
  type HoverCardArrowProps,
  type HoverCardPopupProps,
  type HoverCardPortalProps,
  type HoverCardTriggerProps,
  type HoverCardPositionerProps,
  createHandle,
  HoverCardRoot,
  HoverCardArrow,
  HoverCardPopup,
  HoverCardPortal,
  HoverCardTrigger,
  HoverCardPositioner,
} from "./hover-card.parts.jsx";
/**
 * {@link HoverCard} の各パーツに渡すプロパティーです。
 */
export type HoverCardSlotProps = {
  /**
   * {@link HoverCardArrow} に渡すプロパティーです。
   */
  readonly arrow?: HoverCardArrowProps | undefined;

  /**
   * {@link HoverCardPopup} に渡すプロパティーです。
   */
  readonly popup?: Omit<HoverCardPopupProps, "children"> | undefined;

  /**
   * {@link HoverCardPortal} に渡すプロパティーです。
   */
  readonly portal?: HoverCardPortalProps | undefined;

  /**
   * {@link HoverCardPositioner} に渡すプロパティーです。
   */
  readonly positioner?: HoverCardPositionerProps | undefined;

  /**
   * {@link HoverCardTrigger} に渡すプロパティーです。
   *
   * `delay` と `closeDelay` を除くプロパティーが優先されます。
   */
  readonly trigger?: Omit<HoverCardTriggerProps, "handle" | "delay" | "closeDelay"> | undefined;
};

/**
 * {@link HoverCard} の状態です。
 */
export type HoverCardState = HoverCardRootState;

/**
 * {@link HoverCard} コンポーネントのプロパティーです。
 *
 * @template TPayload トリガーから受け取るデータの型です。
 */
export type HoverCardProps<TPayload = unknown> = Omit<
  HoverCardRootProps<TPayload>,
  "children" | "handle"
> & {
  /**
   * ポップアップに表示する内容です。
   */
  children?: React.ReactNode | undefined;

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
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   *
   * 各パーツのプロパティーが優先されます。
   */
  slotProps?: HoverCardSlotProps | undefined;

  /**
   * ホバーの反応対象です。
   *
   * {@link HoverCardTrigger|Trigger} の子要素として直接渡され、`render` に設定されます。
   * `trigger` 未指定で `slotProps.trigger` のみ指定した場合は、トリガーは描画されません。
   */
  trigger?: HoverCardTriggerProps["children"] | undefined;
};

/**
 * {@link HoverCard} の各パーツに渡すプロパティーです。
 *
 * @template TPayload トリガーから受け取るデータの型です。
 */
export type HoverCardPartsProps<TPayload = unknown> = {
  /**
   * {@link HoverCardPopup} に渡すプロパティーです。
   *
   * `slotProps.arrow` を指定すると、`children` の先頭に {@link HoverCardArrow} が設定されます。
   */
  readonly popup: HoverCardPopupProps;

  /**
   * {@link HoverCardPortal} に渡すプロパティーです。
   */
  readonly portal: HoverCardPortalProps | undefined;

  /**
   * {@link HoverCardPositioner} に渡すプロパティーです。
   */
  readonly positioner: HoverCardPositionerProps;

  /**
   * {@link HoverCardRoot} に渡すプロパティーです。
   */
  readonly root: HoverCardRootProps<TPayload>;

  /**
   * {@link HoverCardTrigger} に渡すプロパティーです。
   *
   * トリガーを表示しないときは null になります。
   */
  readonly trigger: Omit<HoverCardTriggerProps, "handle"> | null;
};

/**
 * {@link HoverCard} の各パーツに渡すプロパティーを作るフックです。
 *
 * @template TPayload トリガーから受け取るデータの型です。
 */
export function useHoverCard<TPayload>(
  props: HoverCardProps<TPayload>,
): HoverCardPartsProps<TPayload> {
  const {
    trigger,
    children,
    slotProps: {
      arrow: arrowProps,
      popup: popupProps,
      portal: portalProps,
      positioner: positionerProps,
      trigger: triggerProps,
    } = {},
    delay,
    closeDelay,
    ...rootProps
  } = props;
  const {
    side = "bottom",
    align = "start",
    sideOffset = 8,
    ...otherPositionerProps
  } = positionerProps ?? {};

  return {
    root: rootProps as HoverCardRootProps<TPayload>,
    trigger:
      !!trigger || !!triggerProps
        ? {
            children: trigger!,
            delay,
            closeDelay,
            ...triggerProps,
          }
        : null,
    portal: portalProps,
    positioner: {
      ...otherPositionerProps,
      side,
      align,
      sideOffset,
    },
    popup: {
      ...popupProps,
      children: (
        <>
          {arrowProps && <HoverCardArrow {...arrowProps} />}
          {children}
        </>
      ),
    },
  };
}

interface HoverCardComponentType extends IComponent<HoverCardProps> {
  /**
   * ホバーカードを制御するハンドルを新しく作成します。
   *
   * 作成したハンドルは {@link HoverCardRoot|Root} と {@link HoverCardTrigger|Trigger} の `handle` プロパティーに渡します。
   */
  readonly createHandle: typeof createHandle;
}

/**
 * トリガーとポップアップを組み立てたホバーカードです。
 *
 * トリガーにマウスカーソルを重ねると、遅延の後に内容を表示します。
 * 構成を細かく制御する場合は、{@link HoverCardRoot|Root} を直接組み立てます。
 */
export const HoverCard: HoverCardComponentType = /*#__PURE__*/ Object.assign(
  function SuiHoverCard(props: HoverCardProps) {
    const partsProps = useHoverCard(props);

    return (
      <HoverCardRoot {...partsProps.root}>
        {partsProps.trigger && <HoverCardTrigger {...partsProps.trigger} />}
        <HoverCardPortal {...partsProps.portal}>
          <HoverCardPositioner {...partsProps.positioner}>
            <HoverCardPopup {...partsProps.popup} />
          </HoverCardPositioner>
        </HoverCardPortal>
      </HoverCardRoot>
    );
  },
  { createHandle },
);

/**
 * {@link HoverCard} の状態やプロパティーをまとめた型名前空間です。
 *
 * @template TPayload トリガーから受け取るデータの型です。
 */
export namespace HoverCard {
  /**
   * {@link HoverCardState} です。
   */
  export type State = HoverCardState;

  /**
   * {@link HoverCardProps} です。
   *
   * @template TPayload トリガーから受け取るデータの型です。
   */
  export type Props<TPayload = unknown> = HoverCardProps<TPayload>;

  /**
   * {@link HoverCardSlotProps} です。
   */
  export type SlotProps = HoverCardSlotProps;
}
