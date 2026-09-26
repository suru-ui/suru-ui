import { Accordion } from "@base-ui/react/accordion";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import { getItemKey } from "../_item.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { type $InferItemObjectValue, isItemObject } from "./_accordion.jsx";
import { AccordionContent } from "./accordion.content.jsx";
import { AccordionHeading } from "./accordion.heading.jsx";
import { AccordionIndicator } from "./accordion.indicator.jsx";
import { type AccordionItemProps, AccordionItem } from "./accordion.item.jsx";
import { AccordionTrigger } from "./accordion.trigger.jsx";

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
  readonly content: React.ReactNode;

  /**
   * 項目の見出しに表示するタイトルです。
   */
  readonly title: React.ReactNode;

  /**
   * 項目の HTML `title` 属性です。
   *
   * {@link https://developer.mozilla.org/docs/Web/HTML/Reference/Global_attributes/title|title}
   */
  readonly htmlTitle?: React.HTMLAttributes<HTMLDivElement>["title"];
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

export namespace AccordionRootProps {
  export type Render<TValue = any> = RenderProps<AccordionRootState<TValue>>;

  export type SuruUI<TItem = any> = {
    /**
     * アコーディオンの内容、または各項目をレンダリングする関数です。
     *
     * 関数を指定した場合は {@link AccordionRootProps.items|items} の各項目が引数として渡されます。
     */
    children?: React.ReactNode | IAccordionRootItemRenderer<TItem> | undefined;

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
     * 既定値は {@link AccordionRootProps.size|size} です。
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

  export type BaseUI<TValue = any> = Pick<
    React.ComponentProps<typeof Accordion.Root<TValue>>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // AccordionRootProps:
      | "value"
      | "defaultValue"
      | "disabled"
      | "hiddenUntilFound"
      | "keepMounted"
      | "loopFocus"
      | "onValueChange"
      | "multiple"
      | "orientation",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML<TValue = any> = Omit<
    React.ComponentProps<typeof Accordion.Root<TValue>>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AccordionRoot} に渡す props です。
 *
 * @template TItem 項目の型です。
 * @template TValue 項目の値の型です。
 */
export type AccordionRootProps<TItem = any, TValue = any> = AccordionRootProps.Render<TValue> &
  AccordionRootProps.SuruUI<TItem> &
  AccordionRootProps.BaseUI<TValue> &
  AccordionRootProps.HTML<TValue>;

export interface IAccordionRoot extends IComponent<AccordionRootProps> {
  /**
   * @template TItem 項目の型です。
   * @template TValue 項目の値の型です。
   */
  <TItem = never, TValue = $InferItemObjectValue<TItem>>(
    props: AccordionRootProps<TItem, TValue>,
  ): IComponent.Return;
}

/**
 * アコーディオンのルートコンポーネントです。
 */
export const AccordionRoot: IAccordionRoot = function SuiAccordionRoot(props: AccordionRootProps) {
  const defaultItemRenderer: IAccordionRootItemRenderer = (item, index) => {
    switch (true) {
      case isItemObject(item): {
        const { title, content, htmlTitle, ...otherItemProps } = item;

        return (
          <AccordionItem {...otherItemProps} key={getItemKey(item) ?? index} title={htmlTitle}>
            <AccordionHeading>
              <AccordionTrigger>
                {title}
                <AccordionIndicator />
              </AccordionTrigger>
            </AccordionHeading>
            <AccordionContent>{content}</AccordionContent>
          </AccordionItem>
        );
      }

      default:
        return <React.Fragment key={getItemKey(item) ?? index}>{item}</React.Fragment>;
    }
  };

  const {
    size = "md",
    items = [],
    radius = size,
    variant = "liquid",
    children = defaultItemRenderer,
    outlined = false,
    className,
    separator = false,
    // @ts-expect-error
    "data-scope": dataScope = "",
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

export { AccordionRoot as Root };

export namespace Root {
  export type State<TValue = any> = AccordionRootState<TValue>;

  export type Props<TItem = any, TValue = any> = Props.Render<TValue> &
    Props.SuruUI<TItem> &
    Props.BaseUI<TValue> &
    Props.HTML<TValue>;

  export namespace Props {
    export type Render<TValue = any> = AccordionRootProps.Render<TValue>;

    export type SuruUI<TItem = any> = AccordionRootProps.SuruUI<TItem>;

    export type BaseUI<TValue = any> = AccordionRootProps.BaseUI<TValue>;

    export type HTML<TValue = any> = AccordionRootProps.HTML<TValue>;
  }

  export type ChangeEventDetails = AccordionRootChangeEventDetails;

  export type ChangeEventReason = AccordionRootChangeEventReason;

  export type IItemRenderer<TItem = any> = IAccordionRootItemRenderer<TItem>;

  export type ItemObject = AccordionRootItemObject;

  export type Radius = AccordionRootRadius;

  export type Size = AccordionRootSize;

  export type Value<TValue = any> = AccordionRootValue<TValue>;

  export type Variant = AccordionRootVariant;
}
