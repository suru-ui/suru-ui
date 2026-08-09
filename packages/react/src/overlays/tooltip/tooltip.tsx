import * as React from "react";

import type { Component } from "../../types.js";
import * as TooltipParts from "./tooltip.parts.jsx";

/**
 * {@link Tooltip} コンポーネントのプロパティーです。
 */
export type TooltipProps = Omit<TooltipParts.Root.Props, "children" | "handle"> & {
  /**
   * ツールチップを表示する対象です。
   *
   * {@link TooltipParts.Trigger|Trigger} の子要素として直接渡され、`render` に設定されます。
   */
  trigger?: TooltipParts.Trigger.Props["children"] | undefined;

  /**
   * ポップアップに表示する内容です。
   */
  children?: React.ReactNode | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   */
  slotProps?: {
    /**
     * {@link TooltipParts.Trigger|Trigger} に渡すプロパティーです。
     */
    readonly trigger?:
      | Omit<TooltipParts.Trigger.Props, "handle" | "children" | "render">
      | undefined;

    /**
     * {@link TooltipParts.Portal|Portal} に渡すプロパティーです。
     */
    readonly portal?: TooltipParts.Portal.Props | undefined;

    /**
     * {@link TooltipParts.Positioner|Positioner} に渡すプロパティーです。
     */
    readonly positioner?: TooltipParts.Positioner.Props | undefined;

    /**
     * {@link TooltipParts.Popup|Popup} に渡すプロパティーです。
     */
    readonly popup?: TooltipParts.Popup.Props | undefined;

    /**
     * {@link TooltipParts.Arrow|Arrow} に渡すプロパティーです。
     */
    readonly arrow?: TooltipParts.Arrow.Props | undefined;
  };
};

interface TooltipComponentType extends Component<TooltipProps> {
  /**
   * ツールチップを制御するハンドルを新しく作成します。
   *
   * 作成したハンドルは {@link TooltipParts.Root} と {@link TooltipParts.Trigger} の `handle` プロパティーに渡します。
   */
  readonly createHandle: typeof TooltipParts.createHandle;
}

/**
 * トリガーとポップアップを組み立てたツールチップです。
 *
 * 複数のトリガーで内容を共有する場合や構成を細かく制御する場合は、
 * {@link TooltipParts.Root|Root} を直接組み立てます。
 *
 * @example 基本
 * ```tsx
 * import { Tooltip } from "@suru-ui/react/tooltip";
 *
 * <Tooltip
 *   trigger={<button type="button">保存</button>}
 *   slotProps={{ trigger: { "aria-label": "保存" } }}
 * >
 *   保存します
 * </Tooltip>
 * ```
 */
export const Tooltip: TooltipComponentType = /*#__PURE__*/ Object.assign(
  function SuiTooltip(props: TooltipProps) {
    const {
      trigger,
      children,
      slotProps: {
        trigger: triggerProps,
        portal: portalProps,
        positioner: positionerProps,
        popup: popupProps,
        arrow: arrowProps,
      } = {},
      ...rootProps
    } = props;
    const { side = "top", sideOffset = 8, ...otherPositionerProps } = positionerProps ?? {};

    return (
      <TooltipParts.Root {...rootProps}>
        {trigger !== undefined && (
          <TooltipParts.Trigger {...triggerProps}>{trigger}</TooltipParts.Trigger>
        )}
        <TooltipParts.Portal {...portalProps}>
          <TooltipParts.Positioner {...otherPositionerProps} side={side} sideOffset={sideOffset}>
            <TooltipParts.Popup {...popupProps}>
              <TooltipParts.Arrow {...arrowProps} />
              {children}
            </TooltipParts.Popup>
          </TooltipParts.Positioner>
        </TooltipParts.Portal>
      </TooltipParts.Root>
    );
  },
  { createHandle: TooltipParts.createHandle },
);
