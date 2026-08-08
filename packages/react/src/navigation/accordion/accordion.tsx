import type { Component } from "../../types.js";
import * as AccordionParts from "./accordion.parts.jsx";

/**
 * {@link Accordion} を構成する各パーツのプロパティーです。
 *
 * 各パーツの指定値は、パーツに渡される既定のプロパティーより優先されます。
 * `trigger.children` を指定した場合は `title` と既定の Indicator が表示されません。
 */
export type AccordionSlotProps = {
  /**
   * {@link AccordionParts.Item|Item} に渡すプロパティーです。
   */
  readonly item?: AccordionParts.Item.Props | undefined;

  /**
   * {@link AccordionParts.Header|Header} に渡すプロパティーです。
   */
  readonly header?: AccordionParts.Header.Props | undefined;

  /**
   * {@link AccordionParts.Trigger|Trigger} に渡すプロパティーです。
   * `children` を指定すると、`title` より優先されてトリガー全体を置き換えます。
   */
  readonly trigger?: AccordionParts.Trigger.Props | undefined;

  /**
   * {@link AccordionParts.Indicator|Indicator} に渡すプロパティーです。
   * `children` を指定すると、既定の下向き矢印アイコンより優先されます。
   */
  readonly indicator?: AccordionParts.Indicator.Props | undefined;

  /**
   * {@link AccordionParts.Panel|Panel} に渡すプロパティーです。
   */
  readonly panel?: AccordionParts.Panel.Props | undefined;
};

/**
 * {@link Accordion} コンポーネントのプロパティーです。
 */
export type AccordionProps = Omit<AccordionParts.Root.Props, "children"> & {
  /**
   * アコーディオンの見出し（Trigger に表示するラベル）です。
   * `slotProps.trigger.children` を指定した場合は、そちらが優先されます。
   */
  title?: React.ReactNode | undefined;

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
};

/**
 * アコーディオンの 1 項目を表示するコンポーネントです。
 *
 * 見出し（`title`）とコンテンツ（`children`）から、展開・折りたたみ可能な
 * アコーディオンを組み立てます。
 * 複数の項目を扱う場合は、{@link AccordionParts.Root|Root} を直接組み立てます。
 *
 * @example 基本
 * ```tsx
 * <Accordion title="見出し">コンテンツ</Accordion>
 * ```
 *
 * @example アイコンの差し替え
 * ```tsx
 * <Accordion
 *   title="見出し"
 *   slotProps={{ indicator: { children: <HelpIcon /> } }}
 * >
 *   コンテンツ
 * </Accordion>
 * ```
 */
export const Accordion: Component<AccordionProps> = function SuiAccordion(props) {
  const { title, children, slotProps, ...rootProps } = props;
  const {
    item: itemProps,
    header: headerProps,
    trigger: triggerProps,
    indicator: indicatorProps,
    panel: panelProps,
  } = slotProps ?? {};
  const { children: triggerChildren, ...otherTriggerProps } = triggerProps ?? {};

  return (
    <AccordionParts.Root {...rootProps}>
      <AccordionParts.Item {...itemProps}>
        <AccordionParts.Header {...headerProps}>
          <AccordionParts.Trigger {...otherTriggerProps}>
            {triggerChildren ?? (
              <>
                {title}
                <AccordionParts.Indicator {...indicatorProps}>
                  {indicatorProps?.children ?? <SuiAccordionIcon />}
                </AccordionParts.Indicator>
              </>
            )}
          </AccordionParts.Trigger>
        </AccordionParts.Header>
        <AccordionParts.Panel {...panelProps}>{children}</AccordionParts.Panel>
      </AccordionParts.Item>
    </AccordionParts.Root>
  );
};

function SuiAccordionIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
