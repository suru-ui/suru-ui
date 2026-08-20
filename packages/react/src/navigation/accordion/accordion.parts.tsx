import { Accordion } from "@base-ui/react/accordion";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

import "./accordion.css";

// Root
// ----

/**
 * アコーディオンの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 */
export type AccordionRootRadius = "none" | Size;

/**
 * アコーディオンの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type AccordionRootSize = Size;

/**
 * {@link AccordionRoot} の状態です。
 */
export type AccordionRootState = Accordion.Root.State;

/**
 * {@link AccordionRoot} に渡すプロパティーです。
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
   * @default false
   */
  outlined?: boolean | undefined;

  /**
   * アコーディオンの角丸を指定します。
   *
   * @default "md"
   */
  radius?: AccordionRootRadius | undefined;

  /**
   * アコーディオンのサイズを指定します。
   *
   * @default "md"
   */
  size?: AccordionRootSize | undefined;
};

/**
 * アコーディオンのルート要素です。
 */
export const AccordionRoot: IComponent<AccordionRootProps> = function SuiAccordionRoot(props) {
  const {
    size = "md",
    radius = "md",
    divider = true,
    outlined = false,
    className,
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

/**
 * {@link AccordionRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link AccordionRootState} です。
   */
  export type State = AccordionRootState;

  /**
   * {@link AccordionRootProps} です。
   */
  export type Props = AccordionRootProps;

  /**
   * {@link AccordionRootRadius} です。
   */
  export type Radius = AccordionRootRadius;

  /**
   * {@link AccordionRootSize} です。
   */
  export type Size = AccordionRootSize;
}

/**
 * {@link AccordionRoot} です。
 */
export const Root: IComponent<Root.Props> = AccordionRoot;

// Item
// ----

/**
 * {@link AccordionItemState} です。
 */
export type AccordionItemState = Accordion.Item.State;

/**
 * {@link AccordionItemProps} です。
 */
export type AccordionItemProps = React.ComponentProps<typeof Accordion.Item>;

/**
 * アコーディオンの項目要素です。
 *
 * 見出しとパネルを 1 組にしてまとめます。
 */
export const AccordionItem: IComponent<AccordionItemProps> = function SuiAccordionItem(props) {
  const { className, ...otherProps } = props;

  return <Accordion.Item {...otherProps} className={cn(className, "sui_accordion_item")} />;
};

/**
 * {@link AccordionItem} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Item {
  /**
   * {@link AccordionItemState} です。
   */
  export type State = AccordionItemState;

  /**
   * {@link AccordionItemProps} です。
   */
  export type Props = AccordionItemProps;
}

/**
 * {@link AccordionItem} です。
 */
export const Item: IComponent<Item.Props> = AccordionItem;

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
 */
export const AccordionHeader: IComponent<AccordionHeaderProps> = function SuiAccordionHeader(
  props,
) {
  const { className, ...otherProps } = props;

  return <Accordion.Header {...otherProps} className={cn(className, "sui_accordion_header")} />;
};

/**
 * {@link AccordionHeader} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Header {
  /**
   * {@link AccordionHeaderState} です。
   */
  export type State = AccordionHeaderState;

  /**
   * {@link AccordionHeaderProps} です。
   */
  export type Props = AccordionHeaderProps;
}

/**
 * {@link AccordionHeader} です。
 */
export const Header: IComponent<Header.Props> = AccordionHeader;

// Trigger
// -------

/**
 * {@link AccordionTriggerState} です。
 */
export type AccordionTriggerState = Accordion.Trigger.State;

/**
 * {@link AccordionTriggerProps} です。
 */
export type AccordionTriggerProps = React.ComponentProps<typeof Accordion.Trigger>;

/**
 * アコーディオンの開閉ボタン要素です。
 */
export const AccordionTrigger: IComponent<AccordionTriggerProps> = function SuiAccordionTrigger(
  props,
) {
  const { className, ...otherProps } = props;

  return <Accordion.Trigger {...otherProps} className={cn(className, "sui_accordion_trigger")} />;
};

/**
 * {@link AccordionTrigger} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Trigger {
  /**
   * {@link AccordionTriggerState} です。
   */
  export type State = AccordionTriggerState;

  /**
   * {@link AccordionTriggerProps} です。
   */
  export type Props = AccordionTriggerProps;
}

/**
 * {@link AccordionTrigger} です。
 */
export const Trigger: IComponent<Trigger.Props> = AccordionTrigger;

// Indicator
// ---------

/**
 * 状態を持たない自前実装パーツの状態型です。
 *
 * {@link AccordionIndicator} は `useRender` で実装するため、状態を自前で明示定義します。
 * このパーツは状態を持たないため、空オブジェクト型になります。
 */
export type AccordionIndicatorState = {};

/**
 * {@link AccordionIndicatorProps} です。
 */
export type AccordionIndicatorProps = Omit<React.ComponentProps<"span">, keyof RenderProps> &
  RenderProps<AccordionIndicatorState>;

/**
 * アコーディオンの展開状態を示すアイコンを表示する要素です。
 */
export const AccordionIndicator: IComponent<AccordionIndicatorProps> =
  function SuiAccordionIndicator(props) {
    return useRender({
      defaultTagName: "span",
      props: [
        props,
        {
          className: "sui_accordion_indicator",
        },
      ],
    });
  };

/**
 * {@link AccordionIndicator} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Indicator {
  /**
   * {@link AccordionIndicatorState} です。
   */
  export type State = AccordionIndicatorState;

  /**
   * {@link AccordionIndicatorProps} です。
   */
  export type Props = AccordionIndicatorProps;
}

/**
 * {@link AccordionIndicator} です。
 */
export const Indicator: IComponent<Indicator.Props> = AccordionIndicator;

// Panel
// -----

/**
 * {@link AccordionPanelState} です。
 */
export type AccordionPanelState = Accordion.Panel.State;

/**
 * {@link AccordionPanelProps} です。
 */
export type AccordionPanelProps = React.ComponentProps<typeof Accordion.Panel>;

/**
 * アコーディオンのパネル要素です。
 */
export const AccordionPanel: IComponent<AccordionPanelProps> = function SuiAccordionPanel(props) {
  const { className, ...otherProps } = props;

  return <Accordion.Panel {...otherProps} className={cn(className, "sui_accordion_panel")} />;
};

/**
 * {@link AccordionPanel} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Panel {
  /**
   * {@link AccordionPanel} の状態です。
   */
  export type State = AccordionPanelState;

  /**
   * {@link AccordionPanel} に渡すプロパティーです。
   */
  export type Props = AccordionPanelProps;
}

/**
 * {@link AccordionPanel} です。
 */
export const Panel: IComponent<Panel.Props> = AccordionPanel;
