import * as React from "react";

import type { IComponent } from "../types.js";
import {
  type AccordionRootSize,
  type AccordionItemProps,
  type AccordionRootProps,
  type AccordionRootState,
  type AccordionPanelProps,
  type AccordionRootRadius,
  type AccordionHeaderProps,
  type AccordionTriggerProps,
  type AccordionIndicatorProps,
  AccordionItem,
  AccordionRoot,
  AccordionPanel,
  AccordionHeader,
  AccordionTrigger,
  AccordionIndicator,
} from "./accordion.parts.jsx";

/**
 * {@link AccordionRootRadius} です。
 */
export type AccordionRadius = AccordionRootRadius;

/**
 * {@link AccordionRootSize} です。
 */
export type AccordionSize = AccordionRootSize;

/**
 * {@link Accordion} の各パーツに渡すプロパティーです。
 *
 * 各パーツの指定値は、パーツに渡される既定のプロパティーより優先されます。
 * `trigger.children` を指定した場合は `title` と既定の Indicator が表示されません。
 */
export type AccordionSlotProps = {
  /**
   * {@link AccordionHeader} に渡すプロパティーです。
   */
  readonly header?: AccordionHeaderProps | undefined;

  /**
   * {@link AccordionIndicator} に渡すプロパティーです。
   * `children` を指定すると、既定の下向き矢印アイコンより優先されます。
   */
  readonly indicator?: AccordionIndicatorProps | undefined;

  /**
   * {@link AccordionItem} に渡すプロパティーです。
   */
  readonly item?: AccordionItemProps | undefined;

  /**
   * {@link AccordionPanel} に渡すプロパティーです。
   */
  readonly panel?: AccordionPanelProps | undefined;

  /**
   * {@link AccordionTrigger} に渡すプロパティーです。
   * `children` を指定すると、`title` より優先されてトリガー全体を置き換えます。
   */
  readonly trigger?: AccordionTriggerProps | undefined;
};

/**
 * 各パーツに渡すプロパティーをまとめたものです。
 */
export type AccordionPartsProps = {
  /**
   * {@link AccordionHeader} に渡すプロパティーです。
   */
  readonly header: AccordionHeaderProps;

  /**
   * {@link AccordionIndicator} に渡すプロパティーです。
   *
   * `children` を指定しないときは、デフォルトの下向き矢印アイコンが設定されます。
   */
  readonly indicator: AccordionIndicatorProps;

  /**
   * {@link AccordionItem} に渡すプロパティーです。
   */
  readonly item: AccordionItemProps;

  /**
   * {@link AccordionPanel} に渡すプロパティーです。
   *
   * `children` にはパネルのコンテンツが設定されています。
   */
  readonly panel: AccordionPanelProps;

  /**
   * {@link AccordionRoot} に渡すプロパティーです。
   */
  readonly root: AccordionRootProps;

  /**
   * {@link AccordionTrigger} に渡すプロパティーです。
   *
   * `children` を指定しないときは、`title` と Indicator を表示する既定の内容が設定されます。
   */
  readonly trigger: AccordionTriggerProps;
};

/**
 * {@link Accordion} の状態です。
 */
export type AccordionState = AccordionRootState;

/**
 * {@link Accordion} コンポーネントのプロパティーです。
 */
export type AccordionProps = Omit<AccordionRootProps, "children"> & {
  /**
   * アコーディオンのパネルに表示するコンテンツです。
   * パネルを閉じると、既定ではパネル要素が DOM から除去されます。
   */
  children?: React.ReactNode | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   * `trigger.children` を指定すると、`title` と既定の Indicator は表示されません。
   */
  slotProps?: AccordionSlotProps | undefined;

  /**
   * アコーディオンの見出し（Trigger に表示するラベル）です。
   * `slotProps.trigger.children` を指定した場合は、そちらが優先されます。
   */
  title?: React.ReactNode | undefined;
};

/**
 * {@link Accordion} の各パーツに渡すプロパティーを作るフックです。
 */
export function useAccordion(props: AccordionProps): AccordionPartsProps {
  const { title, children, slotProps, ...rootProps } = props;
  const {
    item: itemProps,
    panel: panelProps,
    header: headerProps,
    trigger: triggerProps,
    indicator: indicatorProps,
  } = slotProps ?? {};
  const { children: triggerChildren, ...otherTriggerProps } = triggerProps ?? {};
  const indicator: AccordionIndicatorProps = {
    children: <SuiAccordionIcon />,
    ...indicatorProps,
  };

  return {
    root: rootProps,
    item: itemProps ?? {},
    header: headerProps ?? {},
    trigger: {
      ...otherTriggerProps,
      children: triggerChildren ?? (
        <>
          {title}
          <AccordionIndicator {...indicator} />
        </>
      ),
    },
    indicator,
    panel: {
      ...panelProps,
      children,
    },
  };
}

/**
 * アコーディオンの 1 項目を表示するコンポーネントです。
 *
 * 見出し（`title`）とコンテンツ（`children`）から、展開・折りたたみ可能なアコーディオンを組み立てます。
 * 複数の項目を扱う場合は、{@link AccordionRoot|Root} を直接組み立てます。
 */
export const Accordion: IComponent<AccordionProps> = function SuiAccordion(props) {
  const partsProps = useAccordion(props);

  return (
    <AccordionRoot {...partsProps.root}>
      <AccordionItem {...partsProps.item}>
        <AccordionHeader {...partsProps.header}>
          <AccordionTrigger {...partsProps.trigger} />
        </AccordionHeader>
        <AccordionPanel {...partsProps.panel} />
      </AccordionItem>
    </AccordionRoot>
  );
};

/**
 * {@link Accordion} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Accordion {
  /**
   * {@link AccordionState} です。
   */
  export type State = AccordionState;

  /**
   * {@link AccordionProps} です。
   */
  export type Props = AccordionProps;

  /**
   * {@link AccordionSlotProps} です。
   */
  export type SlotProps = AccordionSlotProps;

  /**
   * {@link AccordionRadius} です。
   */
  export type Radius = AccordionRadius;

  /**
   * {@link AccordionSize} です。
   */
  export type Size = AccordionSize;
}

function SuiAccordionIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
