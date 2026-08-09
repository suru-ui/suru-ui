import * as React from "react";

import type { Component } from "../../types.js";
import * as CollapsibleParts from "./collapsible.parts.jsx";

/**
 * {@link Collapsible} を構成する各パーツのプロパティーです。
 *
 * 各パーツの指定値は、パーツに渡される既定のプロパティーより優先されます。
 */
export type CollapsibleSlotProps = {
  /**
   * {@link CollapsibleParts.Trigger|Trigger} に渡すプロパティーです。
   */
  readonly trigger?: Omit<CollapsibleParts.Trigger.Props, "children"> | undefined;

  /**
   * {@link CollapsibleParts.Indicator|Indicator} に渡すプロパティーです。
   */
  readonly indicator?: CollapsibleParts.Indicator.Props | undefined;

  /**
   * {@link CollapsibleParts.Panel|Panel} に渡すプロパティーです。
   */
  readonly panel?: CollapsibleParts.Panel.Props | undefined;
};

/**
 * {@link Collapsible} コンポーネントのプロパティーです。
 */
export type CollapsibleProps = Omit<CollapsibleParts.Root.Props, "children"> & {
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
 *
 * @example 基本
 * ```tsx
 * <Collapsible title="見出し">コンテンツ</Collapsible>
 * ```
 *
 * @example 初期状態を開く
 * ```tsx
 * <Collapsible title="見出し" defaultOpen>
 *   コンテンツ
 * </Collapsible>
 * ```
 */
export const Collapsible: Component<CollapsibleProps> = function SuiCollapsible(props) {
  const { title, children, slotProps, ...rootProps } = props;
  const { trigger: triggerProps, indicator: indicatorProps, panel: panelProps } = slotProps ?? {};

  return (
    <CollapsibleParts.Root {...rootProps}>
      <CollapsibleParts.Trigger {...triggerProps}>
        {(triggerRenderProps) => (
          <button type="button" {...triggerRenderProps}>
            {title}
            <CollapsibleParts.Indicator {...indicatorProps}>
              {indicatorProps?.children ?? <SuiCollapsibleIcon />}
            </CollapsibleParts.Indicator>
          </button>
        )}
      </CollapsibleParts.Trigger>
      <CollapsibleParts.Panel {...panelProps}>{children}</CollapsibleParts.Panel>
    </CollapsibleParts.Root>
  );
};

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
