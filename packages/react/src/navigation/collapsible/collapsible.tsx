import * as React from "react";

import type { IComponent } from "../../types.js";
import {
  type CollapsibleRootSize,
  type CollapsibleRootProps,
  type CollapsibleRootState,
  type CollapsiblePanelProps,
  type CollapsibleRootRadius,
  type CollapsibleTriggerProps,
  type CollapsibleIndicatorProps,
  CollapsibleRoot,
  CollapsiblePanel,
  CollapsibleTrigger,
  CollapsibleIndicator,
} from "./collapsible.parts.jsx";

/**
 * {@link CollapsibleRootRadius} です。
 */
export type CollapsibleRadius = CollapsibleRootRadius;

/**
 * {@link CollapsibleRootSize} です。
 */
export type CollapsibleSize = CollapsibleRootSize;

/**
 * {@link Collapsible} を構成する各パーツのプロパティーです。
 *
 * 各パーツの指定値は、パーツに渡される既定のプロパティーより優先されます。
 */
export type CollapsibleSlotProps = {
  /**
   * {@link CollapsibleTrigger|Trigger} に渡すプロパティーです。
   */
  readonly trigger?: Omit<CollapsibleTriggerProps, "children"> | undefined;

  /**
   * {@link CollapsibleIndicator|Indicator} に渡すプロパティーです。
   */
  readonly indicator?: CollapsibleIndicatorProps | undefined;

  /**
   * {@link CollapsiblePanel|Panel} に渡すプロパティーです。
   */
  readonly panel?: CollapsiblePanelProps | undefined;
};

/**
 * {@link Collapsible} の状態です。
 */
export type CollapsibleState = CollapsibleRootState;

/**
 * {@link Collapsible} コンポーネントのプロパティーです。
 */
export type CollapsibleProps = Omit<CollapsibleRootProps, "children"> & {
  /**
   * トリガーに表示する見出しです。
   */
  title?: React.ReactNode | undefined;

  /**
   * パネルに表示するコンテンツです。
   */
  children?: React.ReactNode | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   */
  slotProps?: CollapsibleSlotProps | undefined;
};

/**
 * 見出しのボタンで開閉できるパネルを表示します。
 */
export const Collapsible: IComponent<CollapsibleProps> = function SuiCollapsible(props) {
  const { title, children, slotProps, ...rootProps } = props;
  const { panel: panelProps, trigger: triggerProps, indicator: indicatorProps } = slotProps ?? {};

  return (
    <CollapsibleRoot {...rootProps}>
      <CollapsibleTrigger {...triggerProps}>
        {(triggerRenderProps) => (
          <button type="button" {...triggerRenderProps}>
            {title}
            <CollapsibleIndicator {...indicatorProps}>
              {indicatorProps?.children ?? <SuiCollapsibleIcon />}
            </CollapsibleIndicator>
          </button>
        )}
      </CollapsibleTrigger>
      <CollapsiblePanel {...panelProps}>{children}</CollapsiblePanel>
    </CollapsibleRoot>
  );
};

/**
 * {@link Collapsible} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Collapsible {
  /**
   * {@link CollapsibleState} です。
   */
  export type State = CollapsibleState;

  /**
   * {@link CollapsibleProps} です。
   */
  export type Props = CollapsibleProps;

  /**
   * {@link CollapsibleSlotProps} です。
   */
  export type SlotProps = CollapsibleSlotProps;

  /**
   * {@link CollapsibleRadius} です。
   */
  export type Radius = CollapsibleRadius;

  /**
   * {@link CollapsibleSize} です。
   */
  export type Size = CollapsibleSize;
}

function SuiCollapsibleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
