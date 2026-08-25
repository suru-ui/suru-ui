import * as React from "react";

import type { IComponent } from "../types.js";
import {
  type TooltipRootProps,
  type TooltipRootState,
  type TooltipArrowProps,
  type TooltipPopupProps,
  type TooltipPortalProps,
  type TooltipTriggerProps,
  type TooltipPositionerProps,
  TooltipRoot,
  TooltipArrow,
  TooltipPopup,
  createHandle,
  TooltipPortal,
  TooltipTrigger,
  TooltipPositioner,
} from "./tooltip.parts.jsx";

/**
 * {@link Tooltip} の各パーツに渡すプロパティーです。
 */
export type TooltipSlotProps = {
  /**
   * {@link TooltipArrow} に渡すプロパティーです。
   */
  readonly arrow?: TooltipArrowProps | undefined;

  /**
   * {@link TooltipPopup} に渡すプロパティーです。
   */
  readonly popup?: TooltipPopupProps | undefined;

  /**
   * {@link TooltipPortal} に渡すプロパティーです。
   */
  readonly portal?: TooltipPortalProps | undefined;

  /**
   * {@link TooltipPositioner} に渡すプロパティーです。
   */
  readonly positioner?: TooltipPositionerProps | undefined;

  /**
   * {@link TooltipTrigger} に渡すプロパティーです。
   */
  readonly trigger?: Omit<TooltipTriggerProps, "handle"> | undefined;
};

/**
 * {@link Tooltip} の状態です。
 */
export type TooltipState = TooltipRootState;

/**
 * {@link Tooltip} コンポーネントのプロパティーです。
 */
export type TooltipProps = Omit<TooltipRootProps, "children" | "handle"> & {
  /**
   * ポップアップに表示する内容です。
   */
  children?: React.ReactNode | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   *
   * 各パーツのプロパティーが優先されます。
   */
  slotProps?: TooltipSlotProps | undefined;

  /**
   * ツールチップを表示する対象です。
   *
   * {@link TooltipTrigger|Trigger} の子要素として直接渡され、`render` に設定されます。
   * `trigger` 未指定で `slotProps.trigger` のみ指定した場合は、トリガーは描画されません。
   */
  trigger?: TooltipTriggerProps["children"] | undefined;
};

/**
 * {@link Tooltip} の各パーツに渡すプロパティーです。
 */
export type TooltipPartsProps = {
  /**
   * {@link TooltipPopup} に渡すプロパティーです。
   *
   * `children` には {@link TooltipArrow} とポップアップの内容が設定されています。
   */
  readonly popup: TooltipPopupProps;

  /**
   * {@link TooltipPortal} に渡すプロパティーです。
   */
  readonly portal: TooltipPortalProps | undefined;

  /**
   * {@link TooltipPositioner} に渡すプロパティーです。
   */
  readonly positioner: TooltipPositionerProps;

  /**
   * {@link TooltipRoot} に渡すプロパティーです。
   */
  readonly root: TooltipRootProps;

  /**
   * {@link TooltipTrigger} に渡すプロパティーです。
   *
   * トリガーを表示しないときは null になります。
   */
  readonly trigger: Omit<TooltipTriggerProps, "handle"> | null;
};

/**
 * {@link Tooltip} の各パーツに渡すプロパティーを作るフックです。
 */
export function useTooltip(props: TooltipProps): TooltipPartsProps {
  const {
    trigger,
    children,
    slotProps: {
      arrow: arrowProps,
      popup: popupProps,
      portal: portalProps,
      trigger: triggerProps,
      positioner: positionerProps,
    } = {},
    ...rootProps
  } = props;
  const { side = "top", sideOffset = 8, ...otherPositionerProps } = positionerProps ?? {};

  return {
    root: rootProps,
    trigger:
      !!trigger || !!triggerProps
        ? {
            children: trigger!,
            ...triggerProps,
          }
        : null,
    portal: portalProps,
    positioner: {
      ...otherPositionerProps,
      side,
      sideOffset,
    },
    popup: {
      ...popupProps,
      children: (
        <>
          <TooltipArrow {...arrowProps} />
          {children}
        </>
      ),
    },
  };
}

interface TooltipComponentType extends IComponent<TooltipProps> {
  /**
   * ツールチップを制御するハンドルを新しく作成します。
   *
   * 作成したハンドルは {@link TooltipRoot} と {@link TooltipTrigger} の `handle` プロパティーに渡します。
   */
  readonly createHandle: typeof createHandle;
}

/**
 * トリガーとポップアップを組み立てたツールチップです。
 *
 * 複数のトリガーで内容を共有する場合や構成を細かく制御する場合は、{@link TooltipRoot|Root} を直接組み立てます。
 */
export const Tooltip: TooltipComponentType = /*#__PURE__*/ Object.assign(
  function SuiTooltip(props: TooltipProps) {
    const partsProps = useTooltip(props);

    return (
      <TooltipRoot {...partsProps.root}>
        {partsProps.trigger && <TooltipTrigger {...partsProps.trigger} />}
        <TooltipPortal {...partsProps.portal}>
          <TooltipPositioner {...partsProps.positioner}>
            <TooltipPopup {...partsProps.popup} />
          </TooltipPositioner>
        </TooltipPortal>
      </TooltipRoot>
    );
  },
  { createHandle },
);

/**
 * {@link Tooltip} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Tooltip {
  /**
   * {@link TooltipState} です。
   */
  export type State = TooltipState;

  /**
   * {@link TooltipProps} です。
   */
  export type Props = TooltipProps;

  /**
   * {@link TooltipSlotProps} です。
   */
  export type SlotProps = TooltipSlotProps;
}
