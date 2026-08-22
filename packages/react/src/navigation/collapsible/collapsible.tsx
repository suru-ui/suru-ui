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
 * {@link Collapsible} の各パーツに渡すプロパティーです。
 *
 * 各パーツの指定値は、パーツに渡される既定のプロパティーより優先されます。
 */
export type CollapsibleSlotProps = {
  /**
   * {@link CollapsibleIndicator|Indicator} に渡すプロパティーです。
   */
  readonly indicator?: CollapsibleIndicatorProps | undefined;

  /**
   * {@link CollapsiblePanel|Panel} に渡すプロパティーです。
   */
  readonly panel?: CollapsiblePanelProps | undefined;

  /**
   * {@link CollapsibleTrigger|Trigger} に渡すプロパティーです。
   */
  readonly trigger?: Omit<CollapsibleTriggerProps, "children"> | undefined;
};

/**
 * 各パーツに渡すプロパティーをまとめたものです。
 */
export type CollapsiblePartsProps = {
  /**
   * {@link CollapsibleIndicator} に渡すプロパティーです。
   *
   * `children` を指定しないときは、デフォルトのアイコンが設定されます。
   */
  readonly indicator: CollapsibleIndicatorProps;

  /**
   * {@link CollapsiblePanel} に渡すプロパティーです。
   *
   * `children` にはパネルのコンテンツが設定されています。
   */
  readonly panel: CollapsiblePanelProps;

  /**
   * {@link CollapsibleRoot} に渡すプロパティーです。
   */
  readonly root: CollapsibleRootProps;

  /**
   * {@link CollapsibleTrigger} に渡すプロパティーです。
   *
   * `children` には `title` と Indicator を表示する既定のレンダリングが設定されています。
   */
  readonly trigger: CollapsibleTriggerProps;
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
   * パネルに表示するコンテンツです。
   */
  children?: React.ReactNode | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   */
  slotProps?: CollapsibleSlotProps | undefined;

  /**
   * トリガーに表示する見出しです。
   */
  title?: React.ReactNode | undefined;
};

/**
 * {@link Collapsible} の各パーツに渡すプロパティーを作るフックです。
 */
export function useCollapsible(props: CollapsibleProps): CollapsiblePartsProps {
  const { title, children, slotProps, ...rootProps } = props;
  const { panel: panelProps, trigger: triggerProps, indicator: indicatorProps } = slotProps ?? {};
  const indicator: CollapsibleIndicatorProps = {
    children: <SuiCollapsibleIcon />,
    ...indicatorProps,
  };
  const trigger: CollapsibleTriggerProps = {
    ...(triggerProps ?? {}),
    children: (triggerRenderProps) => (
      <button type="button" {...triggerRenderProps}>
        {title}
        <CollapsibleIndicator {...indicator} />
      </button>
    ),
  };

  return {
    root: rootProps,
    trigger,
    indicator,
    panel: {
      ...panelProps,
      children,
    },
  };
}

/**
 * 見出しのボタンで開閉できるパネルを表示します。
 */
export const Collapsible: IComponent<CollapsibleProps> = function SuiCollapsible(props) {
  const partsProps = useCollapsible(props);

  return (
    <CollapsibleRoot {...partsProps.root}>
      <CollapsibleTrigger {...partsProps.trigger} />
      <CollapsiblePanel {...partsProps.panel} />
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
    <svg fill="none" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
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
