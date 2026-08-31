import * as React from "react";

import type { LikelyVisibleNode } from "../_is-likely-visible-node.js";
import toReactNode from "../_to-react-node.js";
import type { IComponent } from "../types.js";
import { type $InferItemValue, isItemObject } from "./_accordion.jsx";
import {
  type AccordionRootSize,
  type AccordionItemProps,
  type AccordionRootProps,
  type AccordionRootState,
  type AccordionRootValue,
  type AccordionRootRadius,
  type AccordionRootVariant,
  type AccordionContentProps,
  type AccordionHeadingProps,
  type AccordionTriggerProps,
  type AccordionIndicatorProps,
  type AccordionRootItemObject,
  type IAccordionRootItemRenderer,
  type AccordionRootChangeEventReason,
  type AccordionRootChangeEventDetails,
  AccordionItem,
  AccordionRoot,
  AccordionContent,
  AccordionHeading,
  AccordionTrigger,
  AccordionIndicator,
} from "./accordion.parts.jsx";

/**
 * {@link AccordionRootChangeEventDetails}
 */
export type AccordionChangeEventDetails = AccordionRootChangeEventDetails;

/**
 * {@link AccordionRootChangeEventReason}
 */
export type AccordionChangeEventReason = AccordionRootChangeEventReason;

/**
 * {@link AccordionRootItemObject}
 */
export type AccordionItemObject = AccordionRootItemObject;

/**
 * {@link IAccordionRootItemRenderer}
 */
export interface IAccordionItemRenderer<TItem = any> extends IAccordionRootItemRenderer<TItem> {}

/**
 * {@link AccordionRootRadius}
 */
export type AccordionRadius = AccordionRootRadius;

/**
 * {@link AccordionRootSize}
 */
export type AccordionSize = AccordionRootSize;

/**
 * {@link AccordionRootValue}
 */
export type AccordionValue<TValue = any> = AccordionRootValue<TValue>;

/**
 * {@link AccordionRootVariant}
 */
export type AccordionVariant = AccordionRootVariant;

/**
 * {@link Accordion} の各パーツに渡す props です。
 */
export type AccordionSlotProps = {
  /**
   * {@link AccordionContent} に渡す props です。
   */
  readonly content?: Omit<AccordionContentProps, "children"> | undefined;

  /**
   * {@link AccordionHeading} に渡す props です。
   */
  readonly heading?: Omit<AccordionHeadingProps, "children"> | undefined;

  /**
   * {@link AccordionIndicator} に渡す props です。
   */
  readonly indicator?: AccordionIndicatorProps | undefined;

  /**
   * {@link AccordionItem} に渡す props です。
   */
  readonly item?: Omit<AccordionItemProps, "children"> | undefined;

  /**
   * {@link AccordionTrigger} に渡す props です。
   */
  readonly trigger?: Omit<AccordionTriggerProps, "children"> | undefined;
};

/**
 * {@link Accordion} を構成する各パーツの props などを作成するための API です。
 *
 * @template TItem 項目の型です。
 */
export interface AccordionAPI<TItem = any> {
  /**
   * {@link AccordionContent} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getContentProps(item: TItem): AccordionContentProps;

  /**
   * {@link AccordionHeading} に渡す props を取得します。
   */
  getHeadingProps(): Omit<AccordionHeadingProps, "children">;

  /**
   * {@link AccordionIndicator} に渡す props を取得します。
   */
  getIndicatorProps(): AccordionIndicatorProps;

  /**
   * {@link AccordionItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getItemProps(item: TItem): Omit<AccordionItemProps, "children">;

  /**
   * {@link AccordionRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<AccordionRootProps, "children"> & {
    children: LikelyVisibleNode | null;
  };

  /**
   * 項目のタイトルを取得します。
   *
   * @param item 項目です。
   */
  getTitle(item: TItem): React.ReactNode;

  /**
   * {@link AccordionTrigger} に渡す props を取得します。
   */
  getTriggerProps(): Omit<AccordionTriggerProps, "children">;
}

/**
 * {@link Accordion} が持つ状態です。
 */
export type AccordionState = AccordionRootState;

/**
 * {@link Accordion} に渡す props です。
 *
 * @template TItem 項目の型です。
 * @template TValue 項目の値の型です。
 */
export type AccordionProps<TItem = any, TValue = any> = AccordionRootProps<TItem, TValue> & {
  /**
   * 各パーツに個別の props を渡すためのオブジェクトです。
   *
   * 各パーツの props が優先されます。
   */
  slotProps?: AccordionSlotProps | undefined;
};

interface IUseAccordionAPI {
  /**
   * {@link AccordionAPI} を作成します。
   *
   * @template TItem 項目の型です。
   * @template TValue 項目の値の型です。
   * @param props {@link Accordion} の props です。
   * @returns アコーディオンの API です
   */
  <TItem = never, TValue = $InferItemValue<TItem>>(
    props: AccordionProps<TItem, TValue>,
  ): AccordionAPI<TItem>;
}

/**
 * {@link AccordionAPI} を作成するフックです。
 */
export const useAccordionAPI: IUseAccordionAPI = function useSuiAccordionAPI(props) {
  const {
    items = [],
    children,
    slotProps: {
      item: itemProps = {},
      content: contentProps = {},
      heading: headingProps = {},
      trigger: triggerProps = {},
      indicator: indicatorProps = {},
    } = {},
    ...otherRootProps
  } = props;

  return {
    getTitle(item) {
      return isItemObject(item) ? toReactNode(item.title) : null;
    },
    getItemProps(item) {
      if (!isItemObject(item)) {
        return itemProps;
      }

      const {
        // title と content を取り除いた props を AccordionItem の props とします。
        title: _title,
        content: _content,
        htmlTitle: title,
        ...otherItemprops
      } = item as AccordionItemObject;

      return {
        ...otherItemprops,
        title,
        ...itemProps, // JSDoc 通り、`slotProps.item` を優先します。
      };
    },
    getRootProps() {
      return {
        ...otherRootProps,
        items,
        children: typeof children === "function" ? items.map(children) : toReactNode(children),
      };
    },
    getContentProps(item) {
      return {
        ...contentProps,
        children: isItemObject(item) ? toReactNode(item.content) : null,
      };
    },
    getHeadingProps() {
      return headingProps;
    },
    getTriggerProps() {
      return triggerProps;
    },
    getIndicatorProps() {
      return indicatorProps;
    },
  };
};

/**
 * {@link useAccordionAPI}
 */
export const useAPI: IUseAccordionAPI = useAccordionAPI;

interface IAccordion extends IComponent<AccordionProps> {
  /**
   * @template TItem 項目の型です。
   * @template TValue 項目の値の型です。
   */
  <TItem = never, TValue = $InferItemValue<TItem>>(
    props: AccordionProps<TItem, TValue>,
  ): IComponent.Return;
}

/**
 * アコーディオンを表示するコンポーネントです。
 */
export const Accordion: IAccordion = function SuiAccordion(props: AccordionProps) {
  const api = useAPI(props);
  const { children, ...otherRootProps } = api.getRootProps();

  return (
    <AccordionRoot {...otherRootProps}>
      {children ??
        ((item, index) => (
          <AccordionItem key={index} {...api.getItemProps(item)}>
            <AccordionHeading {...api.getHeadingProps()}>
              <AccordionTrigger {...api.getTriggerProps()}>
                {api.getTitle(item)}
                <AccordionIndicator {...api.getIndicatorProps()} />
              </AccordionTrigger>
            </AccordionHeading>
            <AccordionContent {...api.getContentProps(item)} />
          </AccordionItem>
        ))}
    </AccordionRoot>
  );
};

export namespace Accordion {
  /**
   * {@link AccordionState}
   */
  export type State = AccordionState;

  /**
   * {@link AccordionProps}
   */
  export type Props = AccordionProps;

  /**
   * {@link AccordionSlotProps}
   */
  export type SlotProps = AccordionSlotProps;

  /**
   * {@link AccordionChangeEventDetails}
   */
  export type ChangeEventDetails = AccordionChangeEventDetails;

  /**
   * {@link AccordionChangeEventReason}
   */
  export type ChangeEventReason = AccordionChangeEventReason;

  /**
   * {@link AccordionItemObject}
   */
  export type ItemObject = AccordionItemObject;

  /**
   * {@link IAccordionItemRenderer}
   */
  export interface IItemRenderer<TItem = any> extends IAccordionItemRenderer<TItem> {}

  /**
   * {@link AccordionRadius}
   */
  export type Radius = AccordionRadius;

  /**
   * {@link AccordionSize}
   */
  export type Size = AccordionSize;

  /**
   * {@link AccordionValue}
   */
  export type Value<TValue = any> = AccordionValue<TValue>;

  /**
   * {@link AccordionVariant}
   */
  export type Variant = AccordionVariant;
}
