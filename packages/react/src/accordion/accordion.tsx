import * as React from "react";

import { getItemKey } from "../_item.js";
import mergeProps from "../_merge-props.js";
import type { IComponent } from "../types.js";
import { type $InferItemObjectValue, isItemObject } from "./_accordion.js";
import {
  type AccordionContext,
  type AccordionRootSize,
  type AccordionItemProps,
  type AccordionRootProps,
  type AccordionRootState,
  type AccordionRootValue,
  type AccordionRootRadius,
  type AccordionItemContext,
  type IUseAccordionContext,
  type AccordionContentProps,
  type AccordionHeadingProps,
  type AccordionTriggerProps,
  type AccordionIndicatorProps,
  type AccordionRootItemObject,
  type AccordionTriggerContext,
  type IUseAccordionItemContext,
  type IAccordionRootItemRenderer,
  type IUseAccordionTriggerContext,
  type AccordionRootChangeEventReason,
  type AccordionRootChangeEventDetails,
  AccordionItem,
  AccordionRoot,
  AccordionContent,
  AccordionHeading,
  AccordionTrigger,
  AccordionIndicator,
  decomposeItemObject,
  useAccordionContext,
  useAccordionItemContext,
  useAccordionTriggerContext,
} from "./accordion.parts.js";

// Types
// -----

export type AccordionChangeEventDetails = AccordionRootChangeEventDetails;

export type AccordionChangeEventReason = AccordionRootChangeEventReason;

export type AccordionItemObject = AccordionRootItemObject;

export type IAccordionItemRenderer<TItem = any> = IAccordionRootItemRenderer<TItem>;

export type AccordionRadius = AccordionRootRadius;

export type AccordionSize = AccordionRootSize;

export type AccordionValue<TValue = any> = AccordionRootValue<TValue>;

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
  readonly indicator?: Omit<AccordionIndicatorProps, "children"> | undefined;

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
 * {@link Accordion} が持つ状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type AccordionState<TValue = any> = AccordionRootState<TValue>;

namespace AccordionProps {
  export type Accordion = {
    /**
     * アコーディオンのインジケーターです。
     *
     * `true` を指定すると既定のインジケーターを表示し、`false` を指定すると表示しません。
     * 表示内容を指定するとその内容で表示します。
     * 既定で表示します。
     */
    indicator?: React.ReactNode;

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: AccordionSlotProps | undefined;
  };

  export type Root<TItem = any, TValue = any> = Omit<
    AccordionRootProps<TItem, TValue>,
    keyof Accordion
  >;
}

/**
 * {@link Accordion} に渡す props です。
 *
 * @template TItem 項目の型です。
 * @template TValue 項目の値の型です。
 */
export type AccordionProps<TItem = any, TValue = any> = AccordionProps.Accordion &
  AccordionProps.Root<TItem, TValue>;

export interface IUseAccordionAPI {
  /**
   * {@link AccordionAPI} を作成します。
   *
   * @template TItem 項目の型です。
   * @template TValue 項目の値の型です。
   * @param props {@link Accordion} の props です。
   * @returns アコーディオンの API です
   */
  <TItem = any, TValue = $InferItemObjectValue<TItem>>(
    props: AccordionProps<TItem, TValue>,
  ): AccordionAPI<TItem, TValue>;
}

export interface IAccordion extends IComponent<AccordionProps> {
  /**
   * @template TItem 項目の型です。
   * @template TValue 項目の値の型です。
   */
  <TItem = any, TValue = $InferItemObjectValue<TItem>>(
    props: AccordionProps<TItem, TValue>,
  ): IComponent.Return;

  readonly useContext: IUseAccordionContext;

  readonly useItemContext: IUseAccordionItemContext;

  readonly useTriggerContext: IUseAccordionTriggerContext;
}

// API
// ---

/**
 * {@link Accordion} を構成する各パーツの props などを作成するための API です。
 *
 * @template TItem 項目の型です。
 * @template TValue 項目の値の型です。
 */
export class AccordionAPI<TItem = any, TValue = any> {
  private readonly indicator: AccordionProps.Accordion["indicator"];

  private readonly slotProps: AccordionSlotProps;

  private readonly rootProps: AccordionRootProps<TItem, TValue>;

  /**
   * @param props {@link Accordion} の props です。
   * @internal
   */
  public constructor(props: AccordionProps<TItem, TValue>) {
    const { indicator, slotProps = {}, ...rootProps } = props;
    this.indicator = indicator;
    this.slotProps = slotProps;
    this.rootProps = rootProps;
  }

  private defaultItemRenderer: IAccordionItemRenderer = (item, index) => {
    switch (true) {
      case isItemObject(item): {
        const indicatorProps = this.getIndicatorProps();

        return (
          <AccordionItem {...this.getItemProps(item)} key={getItemKey(item) ?? index}>
            <AccordionHeading {...this.getHeadingProps()}>
              <AccordionTrigger {...this.getTriggerProps()}>
                {this.getTitle(item)}
                {indicatorProps && <AccordionIndicator {...indicatorProps} />}
              </AccordionTrigger>
            </AccordionHeading>
            <AccordionContent {...this.getContentProps(item)} />
          </AccordionItem>
        );
      }

      default:
        return <React.Fragment key={getItemKey(item) ?? index}>{item}</React.Fragment>;
    }
  };

  /**
   * {@link AccordionContent} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  public getContentProps(item?: AccordionItemObject): AccordionContentProps {
    const { content: props = {} } = this.slotProps;

    if (item) {
      return {
        ...props,
        children: item.content,
      };
    }

    return props;
  }

  /**
   * {@link AccordionHeading} に渡す props を取得します。
   */
  public getHeadingProps(): Omit<AccordionHeadingProps, "children"> {
    const { heading: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link AccordionIndicator} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getIndicatorProps(): AccordionIndicatorProps | null {
    const { indicator } = this;
    const { indicator: props = {} } = this.slotProps;

    switch (indicator) {
      case false:
        return null;

      case true:
      case undefined:
        return props;

      default:
        return {
          ...props,
          children: indicator,
        };
    }
  }

  /**
   * {@link AccordionItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  public getItemProps(item?: AccordionItemObject): Omit<AccordionItemProps, "children"> {
    const { item: props = {} } = this.slotProps;

    if (item) {
      // title と content は他のパーツへ渡すため取り除きます。
      const { itemProps } = decomposeItemObject(item);

      return mergeProps([props, itemProps]);
    }

    return props;
  }

  /**
   * {@link AccordionRoot} に渡す props を取得します。
   */
  public getRootProps(): AccordionRootProps<TItem, TValue> {
    const { children = this.defaultItemRenderer, ...otherProps } = this.rootProps;

    return {
      ...otherProps,
      children,
    };
  }

  /**
   * 項目のタイトルを取得します。
   *
   * @param item 項目です。
   */
  public getTitle(item: AccordionItemObject): React.ReactNode {
    return item.title;
  }

  /**
   * {@link AccordionTrigger} に渡す props を取得します。
   */
  public getTriggerProps(): Omit<AccordionTriggerProps, "children"> {
    const { trigger: props = {} } = this.slotProps;

    return props;
  }
}

/**
 * {@link AccordionAPI} を作成するフックです。
 */
export const useAccordionAPI: IUseAccordionAPI = function useSuiAccordionAPI(props) {
  return new AccordionAPI(props);
};

export { AccordionAPI as API, useAccordionAPI as useAPI };

// Component
// ---------

/**
 * アコーディオンを表示するコンポーネントです。
 */
export const Accordion: IAccordion = Object.assign(
  function SuiAccordion(props: AccordionProps) {
    const api = useAccordionAPI(props);

    return <AccordionRoot {...api.getRootProps()} />;
  },
  {
    useContext: useAccordionContext,
    useItemContext: useAccordionItemContext,
    useTriggerContext: useAccordionTriggerContext,
  },
);

export namespace Accordion {
  export type State<TValue = any> = AccordionState<TValue>;

  export type Props<TItem = any, TValue = any> = AccordionProps<TItem, TValue>;

  export type SlotProps = AccordionSlotProps;

  export type Context = AccordionContext;

  export type ItemContext = AccordionItemContext;

  export type TriggerContext = AccordionTriggerContext;

  export type ChangeEventDetails = AccordionChangeEventDetails;

  export type ChangeEventReason = AccordionChangeEventReason;

  export type IItemRenderer<TItem = any> = IAccordionItemRenderer<TItem>;

  export type ItemObject = AccordionItemObject;

  export type Radius = AccordionRadius;

  export type Size = AccordionSize;

  export type Value<TValue = any> = AccordionValue<TValue>;
}
