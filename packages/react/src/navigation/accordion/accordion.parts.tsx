import { Accordion } from "@base-ui/react/accordion";
import {
  useRenderElement,
  type UseRenderElementComponentProps,
} from "@base-ui/react/internals/useRenderElement";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import splitRenderProps from "../../_split-render-props.js";
import cn from "../../cn.js";
import type { Component } from "../../types.js";

import "./accordion.css";

// Root
// ----

/**
 * {@link Root} の状態です。
 */
export type AccordionRootState = Accordion.Root.State;

/**
 * {@link Root} に渡すプロパティーです。
 */
export type AccordionRootProps = React.ComponentProps<typeof Accordion.Root> & {
  /**
   * 隣接する項目の区切り線を表示するかどうかを指定します。
   *
   * @default true
   */
  divider?: boolean | undefined;

  /**
   * アコーディオンの枠線を表示するかどうかを指定します。
   *
   * @default true
   */
  outlined?: boolean | undefined;

  /**
   * アコーディオンの角丸を指定します。
   *
   * - `"none"`: 角を直角にする
   * - `"sm"`: 小さい角丸（4px）
   * - `"md"`: 標準的な角丸（4px）
   * - `"lg"`: 大きい角丸（6px）
   *
   * @default "md"
   */
  radius?: "none" | "sm" | "md" | "lg" | undefined;

  /**
   * アコーディオンのサイズを指定します。
   *
   * - `"sm"`: 小さいサイズ
   * - `"md"`: 標準的なサイズ
   * - `"lg"`: 大きいサイズ
   *
   * @default "md"
   */
  size?: Size | undefined;
};

/**
 * アコーディオンのルート要素です。
 *
 * @example
 * ```tsx
 * <AccordionParts.Root>
 *   <AccordionParts.Item>
 *     <AccordionParts.Header>
 *       <AccordionParts.Trigger>見出し</AccordionParts.Trigger>
 *     </AccordionParts.Header>
 *     <AccordionParts.Panel>コンテンツ</AccordionParts.Panel>
 *   </AccordionParts.Item>
 * </AccordionParts.Root>
 * ```
 */
export const AccordionRoot: Component<AccordionRootProps> = function SuiAccordionRoot(props) {
  const {
    className,
    divider = true,
    outlined = true,
    radius = "md",
    size = "md",
    ...otherProps
  } = props;

  return (
    <Accordion.Root
      {...otherProps}
      className={cn(
        className,
        "sui_accordion",
        divider && "sui_accordion-divider",
        outlined && "sui_accordion-outlined",
        `sui_accordion-radius_${radius}`,
        `sui_accordion-size_${size}`,
      )}
    />
  );
};

export namespace Root {
  export type State = AccordionRootState;
  export type Props = AccordionRootProps;
}

export const Root: Component<Root.Props> = AccordionRoot;

// Item
// ----

/**
 * {@link Item} の状態です。
 */
export type AccordionItemState = Accordion.Item.State;

/**
 * {@link Item} に渡すプロパティーです。
 */
export type AccordionItemProps = React.ComponentProps<typeof Accordion.Item>;

/**
 * アコーディオンの項目要素です。
 *
 * 見出しとパネルを 1 組にしてまとめます。
 *
 * @example
 * ```tsx
 * <AccordionParts.Item value="a">
 *   <AccordionParts.Header>…</AccordionParts.Header>
 *   <AccordionParts.Panel>…</AccordionParts.Panel>
 * </AccordionParts.Item>
 * ```
 */
export const AccordionItem: Component<AccordionItemProps> = function SuiAccordionItem(props) {
  const { className, ...otherProps } = props;

  return <Accordion.Item {...otherProps} className={cn(className, "sui_accordion_item")} />;
};

export namespace Item {
  export type State = AccordionItemState;
  export type Props = AccordionItemProps;
}

export const Item: Component<Item.Props> = AccordionItem;

// Header
// ------

/**
 * {@link Header} の状態です。
 */
export type AccordionHeaderState = Accordion.Header.State;

/**
 * {@link Header} に渡すプロパティーです。
 */
export type AccordionHeaderProps = React.ComponentProps<typeof Accordion.Header>;

/**
 * アコーディオンの見出し要素です。
 *
 * @example
 * ```tsx
 * <AccordionParts.Header>
 *   <AccordionParts.Trigger>見出し</AccordionParts.Trigger>
 * </AccordionParts.Header>
 * ```
 */
export const AccordionHeader: Component<AccordionHeaderProps> = function SuiAccordionHeader(props) {
  const { className, ...otherProps } = props;

  return <Accordion.Header {...otherProps} className={cn(className, "sui_accordion_header")} />;
};

export namespace Header {
  export type State = AccordionHeaderState;
  export type Props = AccordionHeaderProps;
}

export const Header: Component<Header.Props> = AccordionHeader;

// Trigger
// -------

/**
 * {@link Trigger} の状態です。
 */
export type AccordionTriggerState = Accordion.Trigger.State;

/**
 * {@link Trigger} に渡すプロパティーです。
 */
export type AccordionTriggerProps = React.ComponentProps<typeof Accordion.Trigger>;

/**
 * アコーディオンの開閉ボタン要素です。
 *
 * @example
 * ```tsx
 * <AccordionParts.Trigger>
 *   見出し
 *   <AccordionParts.Indicator>…</AccordionParts.Indicator>
 * </AccordionParts.Trigger>
 * ```
 */
export const AccordionTrigger: Component<AccordionTriggerProps> = function SuiAccordionTrigger(
  props,
) {
  const { className, ...otherProps } = props;

  return <Accordion.Trigger {...otherProps} className={cn(className, "sui_accordion_trigger")} />;
};

export namespace Trigger {
  export type State = AccordionTriggerState;
  export type Props = AccordionTriggerProps;
}

export const Trigger: Component<Trigger.Props> = AccordionTrigger;

// Indicator
// ---------

/**
 * {@link Indicator} の状態です。
 */
export type AccordionIndicatorState = {};

/**
 * {@link Indicator} に渡すプロパティーです。
 */
export type AccordionIndicatorProps = Omit<
  React.ComponentProps<"span">,
  keyof UseRenderElementComponentProps<{}>
> &
  UseRenderElementComponentProps<AccordionIndicatorState>;

/**
 * アコーディオンの展開状態を示すアイコンを表示する要素です。
 *
 * @example
 * ```tsx
 * <AccordionParts.Indicator>
 *   <ChevronIcon />
 * </AccordionParts.Indicator>
 * ```
 */
export const AccordionIndicator: Component<AccordionIndicatorProps> =
  function SuiAccordionIndicator(props) {
    const [renderProps, componentProps] = splitRenderProps(props);
    const { ref, ...elementProps } = componentProps;

    return useRenderElement("span", renderProps, {
      ref,
      props: [
        elementProps,
        {
          className: "sui_accordion_indicator",
        },
      ],
    });
  };

export namespace Indicator {
  export type State = AccordionIndicatorState;
  export type Props = AccordionIndicatorProps;
}

export const Indicator: Component<Indicator.Props> = AccordionIndicator;

// Panel
// -----

/**
 * {@link Panel} の状態です。
 */
export type AccordionPanelState = Accordion.Panel.State;

/**
 * {@link Panel} に渡すプロパティーです。
 */
export type AccordionPanelProps = React.ComponentProps<typeof Accordion.Panel>;

/**
 * アコーディオンのパネル要素です。
 *
 * @example
 * ```tsx
 * <AccordionParts.Panel>コンテンツ</AccordionParts.Panel>
 * ```
 */
export const AccordionPanel: Component<AccordionPanelProps> = function SuiAccordionPanel(props) {
  const { className, ...otherProps } = props;

  return <Accordion.Panel {...otherProps} className={cn(className, "sui_accordion_panel")} />;
};

export namespace Panel {
  export type State = AccordionPanelState;
  export type Props = AccordionPanelProps;
}

export const Panel: Component<Panel.Props> = AccordionPanel;
