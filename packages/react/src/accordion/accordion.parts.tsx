import { Accordion } from "@base-ui/react/accordion";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import { ChevronIcon } from "../_icons.jsx";
import toReactNode from "../_to-react-node.js";
import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { type $InferItemValue, isItemObject } from "./_accordion.jsx";

import "./accordion.css";

// Root
// ----

/**
 * アコーディオンの項目の開閉状態を変更するイベントの詳細です。
 */
export type AccordionRootChangeEventDetails = Accordion.Root.ChangeEventDetails;

/**
 * アコーディオンの項目の開閉状態を変更する理由です。
 */
export type AccordionRootChangeEventReason = Accordion.Root.ChangeEventReason;

/**
 * アコーディオンの項目を表すオブジェクトです。
 *
 * `title` と `content` を含み、その他のプロパティーは {@link AccordionItem} に渡されます。
 */
export type AccordionRootItemObject = Omit<AccordionItemProps, "title"> & {
  /**
   * 項目のパネルに表示する内容です。
   */
  content: React.ReactNode;

  /**
   * {@link https://developer.mozilla.org/docs/Web/HTML/Reference/Global_attributes/title|title}
   */
  htmlTitle?: React.HTMLAttributes<HTMLDivElement>["title"];

  /**
   * 項目の見出しに表示するタイトルです。
   */
  title: React.ReactNode;
};

/**
 * アコーディオンの各項目をレンダリングする関数のインターフェイスです。
 *
 * @template TItem 項目の型です。
 */
export interface IAccordionRootItemRenderer<TItem = any> {
  /**
   * 項目をレンダリングします。
   *
   * @param item 現在の項目です。
   * @param index 項目のインデックスです。
   * @param items すべての項目です。
   * @returns レンダリングする内容です。
   */
  (item: TItem, index: number, items: readonly TItem[]): React.ReactNode;
}

/**
 * アコーディオンの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type AccordionRootRadius = "none" | Size;

/**
 * アコーディオンの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type AccordionRootSize = Size;

/**
 * アコーディオンの主な外観です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type AccordionRootVariant = "naked" | "liquid";

/**
 * アコーディオンの項目の値です。
 *
 * @template TValue 項目の値の型です。
 */
export type AccordionRootValue<TValue = any> = Accordion.Root.Value<TValue>;

/**
 * {@link AccordionRoot} が持つ状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type AccordionRootState<TValue = any> = Accordion.Root.State<TValue>;

/**
 * {@link AccordionRoot} に渡す props です。
 *
 * @template TItem 項目の型です。
 * @template TValue 項目の値の型です。
 */
export type AccordionRootProps<TItem = any, TValue = any> = Omit<
  React.ComponentProps<typeof Accordion.Root<TValue>>,
  "children"
> & {
  /**
   * アコーディオンの内容、または各項目をレンダリングする関数です。
   *
   * 関数を指定した場合は {@link AccordionRootProps.items|items} の各項目が引数として渡されます。
   */
  children?: React.ReactNode | IAccordionRootItemRenderer<TItem>;

  /**
   * アコーディオンの項目です。
   *
   * `children` に関数を指定した場合、この配列の各項目が引数として渡されます。
   */
  items?: readonly TItem[] | undefined;

  /**
   * アコーディオンの枠線を表示するかどうかを指定します。
   *
   * @default false
   */
  outlined?: boolean | undefined;

  /**
   * アコーディオンの角丸の大きさを指定します。
   *
   * 既定値は {@link AccordionRootProps.size|size}
   */
  radius?: AccordionRootRadius | undefined;

  /**
   * アコーディオンの項目が隣接する項目の区切り線を表示するかどうかを指定します。
   *
   * @default false
   */
  separator?: boolean | undefined;

  /**
   * アコーディオンの大きさを指定します。
   *
   * @default "md"
   */
  size?: AccordionRootSize | undefined;

  /**
   * アコーディオンの主な外観を指定します。
   *
   * @default "liquid"
   */
  variant?: AccordionRootVariant | undefined;
};

interface IAccordionRoot extends IComponent<AccordionRootProps> {
  /**
   * @template TItem 項目の型です。
   * @template TValue 項目の値の型です。
   */
  <TItem = never, TValue = $InferItemValue<TItem>>(
    props: AccordionRootProps<TItem, TValue>,
  ): IComponent.Return;
}

/**
 * アコーディオンのルートコンポーネントです。
 */
export const AccordionRoot: IAccordionRoot = function SuiAccordionRoot(props: AccordionRootProps) {
  const {
    size = "md",
    items = [],
    radius = size,
    variant = "liquid",
    children = defaultRootItemRenderer,
    outlined = false,
    separator = false,
    // @ts-expect-error
    "data-scope": dataScope = "",
    className,
    ...otherProps
  } = props;

  return (
    <Accordion.Root
      {...otherProps}
      className={cn(
        className,
        "sui_accordion",
        `sui_accordion-size_${size}`,
        `sui_accordion-radius_${radius}`,
        `sui_accordion-variant_${variant}`,
        outlined && "sui_accordion-outlined",
        separator && "sui_accordion-separator",
        (state) => state.disabled && "sui_accordion-disabled",
      )}
      data-scope={dataScope}
    >
      {typeof children === "function" ? items.map(children) : children}
    </Accordion.Root>
  );
};

const defaultRootItemRenderer: IAccordionRootItemRenderer = (item, index) => {
  if (!isItemObject(item)) {
    return toReactNode(item);
  }

  const { title, content, htmlTitle, ...otherItemProps } = item;

  return (
    <AccordionItem {...otherItemProps} key={index} title={htmlTitle}>
      <AccordionHeading>
        <AccordionTrigger>
          {toReactNode(title)}
          <AccordionIndicator />
        </AccordionTrigger>
      </AccordionHeading>
      <AccordionContent>{toReactNode(content)}</AccordionContent>
    </AccordionItem>
  );
};

export { AccordionRoot as Root };

export namespace Root {
  /**
   * {@link AccordionRootState}
   */
  export type State<TValue = any> = AccordionRootState<TValue>;

  /**
   * {@link AccordionRootProps}
   */
  export type Props<TItem = any, TValue = any> = AccordionRootProps<TItem, TValue>;

  /**
   * {@link AccordionRootChangeEventDetails}
   */
  export type ChangeEventDetails = AccordionRootChangeEventDetails;

  /**
   * {@link AccordionRootChangeEventReason}
   */
  export type ChangeEventReason = AccordionRootChangeEventReason;

  /**
   * {@link AccordionRootItemObject}
   */
  export type ItemObject = AccordionRootItemObject;

  /**
   * {@link IAccordionRootItemRenderer}
   */
  export interface IItemRenderer<TItem = any> extends IAccordionRootItemRenderer<TItem> {}

  /**
   * {@link AccordionRootRadius}
   */
  export type Radius = AccordionRootRadius;

  /**
   * {@link AccordionRootSize}
   */
  export type Size = AccordionRootSize;

  /**
   * {@link AccordionRootValue}
   */
  export type Value<TValue = any> = AccordionRootValue<TValue>;

  /**
   * {@link AccordionRootVariant}
   */
  export type Variant = AccordionRootVariant;
}

// Item
// ----

/**
 * アコーディオンの項目の開閉状態が変更するイベントの詳細です。
 */
export type AccordionItemChangeEventDetails = Accordion.Item.ChangeEventDetails;

/**
 * アコーディオンの項目の開閉状態を変更する理由です。
 */
export type AccordionItemChangeEventReason = Accordion.Item.ChangeEventReason;

/**
 * {@link AccordionItem} が持つ状態です。
 */
export type AccordionItemState = Accordion.Item.State;

/**
 * {@link AccordionItem} に渡す props です。
 */
export type AccordionItemProps = React.ComponentProps<typeof Accordion.Item>;

/**
 * アコーディオンの項目コンポーネントです。
 */
export const AccordionItem: IComponent<AccordionItemProps> = function SuiAccordionItem(props) {
  const { className, ...otherProps } = props;

  return (
    <Accordion.Item
      {...otherProps}
      className={cn(
        className,
        "sui_accordion_item",
        (state) => state.open && "sui_accordion_item-open",
        (state) => state.disabled && "sui_accordion_item-disabled",
      )}
    />
  );
};

export { AccordionItem as Item };

export namespace Item {
  /**
   * {@link AccordionItemState}
   */
  export type State = AccordionItemState;

  /**
   * {@link AccordionItemProps}
   */
  export type Props = AccordionItemProps;

  /**
   * {@link AccordionItemChangeEventDetails}
   */
  export type ChangeEventDetails = AccordionItemChangeEventDetails;

  /**
   * {@link AccordionItemChangeEventReason}
   */
  export type ChangeEventReason = AccordionItemChangeEventReason;
}

// Heading
// -------

/**
 * {@link AccordionHeading} が持つ状態です。
 */
export type AccordionHeadingState = Accordion.Header.State;

/**
 * {@link AccordionHeading} に渡す props です。
 */
export type AccordionHeadingProps = React.ComponentProps<typeof Accordion.Header>;

/**
 * アコーディオンの見出しコンポーネントです。
 */
export const AccordionHeading: IComponent<AccordionHeadingProps> = function SuiAccordionHeading(
  props,
) {
  const { className, ...otherProps } = props;

  return <Accordion.Header {...otherProps} className={cn(className, "sui_accordion_heading")} />;
};

export { AccordionHeading as Heading };

export namespace Heading {
  /**
   * {@link AccordionHeadingState}
   */
  export type State = AccordionHeadingState;

  /**
   * {@link AccordionHeadingProps}
   */
  export type Props = AccordionHeadingProps;
}

// Trigger
// -------

/**
 * {@link AccordionTrigger} が持つ状態です。
 */
export type AccordionTriggerState = Accordion.Trigger.State;

/**
 * {@link AccordionTrigger} に渡す props です。
 */
export type AccordionTriggerProps = React.ComponentProps<typeof Accordion.Trigger> & {
  /**
   * `true` にすると Suru UI のスタイルがつかなくなります。
   *
   * これは主に、`render`  props でボタンコンポーネントを描画する際に使用されます。
   *
   * @default false
   */
  unstyled?: boolean | undefined;
};

/**
 * アコーディオンの開閉ボタンコンポーネントです。
 */
export const AccordionTrigger: IComponent<AccordionTriggerProps> = function SuiAccordionTrigger(
  props,
) {
  const { unstyled = false, className, ...otherProps } = props;

  return (
    <Accordion.Trigger
      {...otherProps}
      className={cn(
        className,
        "sui_accordion_trigger",
        unstyled && "sui_accordion_trigger-unstyled",
      )}
    />
  );
};

export { AccordionTrigger as Trigger };

export namespace Trigger {
  /**
   * {@link AccordionTriggerState}
   */
  export type State = AccordionTriggerState;

  /**
   * {@link AccordionTriggerProps}
   */
  export type Props = AccordionTriggerProps;
}

// Indicator
// ---------

/**
 * {@link AccordionIndicator} が持つ状態です。
 */
export type AccordionIndicatorState = {};

/**
 * {@link AccordionIndicator} に渡す props です。
 */
export type AccordionIndicatorProps = Omit<React.ComponentProps<"span">, keyof RenderProps> &
  RenderProps<AccordionIndicatorState>;

/**
 * アコーディオンの展開状態を示すアイコンを表示するコンポーネントです。
 */
export const AccordionIndicator: IComponent<AccordionIndicatorProps> =
  function SuiAccordionIndicator(props) {
    const { children = <ChevronIcon />, ...otherSpanProps } = props;

    return useRender({
      props: [
        otherSpanProps,
        {
          children,
          className: "sui_accordion_indicator",
        },
      ],
      defaultTagName: "span",
    });
  };

export { AccordionIndicator as Indicator };

export namespace Indicator {
  /**
   * {@link AccordionIndicatorState}
   */
  export type State = AccordionIndicatorState;

  /**
   * {@link AccordionIndicatorProps}
   */
  export type Props = AccordionIndicatorProps;
}

// Content
// -------

/**
 * {@link AccordionContent} が持つ状態です。
 */
export type AccordionContentState = Accordion.Panel.State;

/**
 * {@link AccordionContent} に渡す props です。
 */
export type AccordionContentProps = React.ComponentProps<typeof Accordion.Panel>;

/**
 * アコーディオンのパネルコンポーネントです。
 */
export const AccordionContent: IComponent<AccordionContentProps> = function SuiAccordionContent(
  props,
) {
  const { className, ...otherProps } = props;

  return (
    <Accordion.Panel
      {...otherProps}
      className={cn(
        className,
        "sui_accordion_content",
        (state) =>
          state.transitionStatus !== undefined &&
          `sui_accordion_content-transition_status_${state.transitionStatus}`,
      )}
    />
  );
};

export { AccordionContent as Content };

export namespace Content {
  /**
   * {@link AccordionContentState}
   */
  export type State = AccordionContentState;

  /**
   * {@link AccordionContentProps}
   */
  export type Props = AccordionContentProps;
}
