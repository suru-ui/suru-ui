import { Accordion } from "@base-ui/react/accordion";
import * as React from "react";

import { getItemKey } from "../../_item.js";
import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { type $InferItemObjectValue, isItemObject } from "../_accordion.js";
import { AccordionContent } from "../content/accordion.content.jsx";
import { AccordionHeading } from "../heading/accordion.heading.jsx";
import { AccordionIndicator } from "../indicator/accordion.indicator.jsx";
import { type AccordionItemProps, AccordionItem } from "../item/accordion.item.jsx";
import { AccordionTrigger } from "../trigger/accordion.trigger.jsx";
import { decomposeItemObject } from "../utils/accordion.utils.js";
import {
  type AccordionContextSize,
  type AccordionContextRadius,
  AccordionContext,
} from "./accordion.root.context.js";

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
export type AccordionRootItemObject = Override<
  AccordionItemProps,
  {
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
     * @see https://developer.mozilla.org/docs/Web/HTML/Reference/Global_attributes/title
     */
    readonly htmlTitle?: React.HTMLAttributes<HTMLDivElement>["title"];
  }
>;

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
export type AccordionRootRadius = AccordionContextRadius;

/**
 * アコーディオンの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type AccordionRootSize = AccordionContextSize;

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
export type AccordionRootState<TValue = any> = Override<
  AccordionContext,
  Accordion.Root.State<TValue>
>;

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
     * アコーディオンの角丸の大きさを指定します。
     *
     * @default "none"
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
  };

  export type BaseUI<TValue = any> = Omit<
    Pick<
      React.ComponentProps<typeof Accordion.Root<TValue>>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // AccordionRootProps より:
      | "value"
      | "defaultValue"
      | "disabled"
      | "hiddenUntilFound"
      | "keepMounted"
      | "loopFocus"
      | "onValueChange"
      | "multiple"
      | "orientation"
    >,
    keyof Render | keyof SuruUI
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
  <TItem = any, TValue = $InferItemObjectValue<TItem>>(
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
        const { title, content, itemProps } = decomposeItemObject(item);

        return (
          <AccordionItem {...itemProps} key={getItemKey(item) ?? index}>
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
    style,
    radius = "none",
    render,
    children = defaultItemRenderer,
    className,
    separator = false,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;
  const ctx = React.useMemo<AccordionContext>(
    () => ({ size, radius, separator }),
    [radius, separator, size],
  );

  return (
    <AccordionContext value={ctx}>
      <Accordion.Root
        {...otherProps}
        {...proxyRenderProps<Accordion.Root.State, AccordionRootState>(
          (state) => ({ ...ctx, ...state }),
          {
            style,
            render,
            className: cn<AccordionRootState>(
              className,
              "sui_accordion",
              (state) => `sui_accordion-size_${state.size}`,
              (state) => `sui_accordion-radius_${state.radius}`,
              (state) => state.separator && "sui_accordion-separator",
              (state) => state.disabled && "sui_accordion-disabled",
              (state) => `sui_accordion-orientation_${state.orientation}`,
            ),
          },
        )}
        data-scope={dataScope}
      >
        {typeof children === "function" ? items.map(children) : children}
      </Accordion.Root>
    </AccordionContext>
  );
};

export { AccordionRoot as Root };

export namespace Root {
  export type State<TValue = any> = AccordionRootState<TValue>;

  export type Props<TItem = any, TValue = $InferItemObjectValue<TItem>> = Props.Render<TValue> &
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
}
