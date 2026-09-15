import { Accordion } from "@base-ui/react/accordion";
import * as React from "react";

import { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

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

export namespace AccordionItemProps {
  export type Render = RenderProps<AccordionItemState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Accordion.Item>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // Pick<UseCollapsibleRootParameters, 'disabled'>:
      | "disabled"
      // AccordionItemProps:
      | "value"
      | "onOpenChange",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Accordion.Item>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AccordionItem} に渡す props です。
 */
export type AccordionItemProps = AccordionItemProps.Render &
  AccordionItemProps.SuruUI &
  AccordionItemProps.BaseUI &
  AccordionItemProps.HTML;

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
  export type State = AccordionItemState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AccordionItemProps.Render;

    export type SuruUI = AccordionItemProps.SuruUI;

    export type BaseUI = AccordionItemProps.BaseUI;

    export type HTML = AccordionItemProps.HTML;
  }

  export type ChangeEventDetails = AccordionItemChangeEventDetails;

  export type ChangeEventReason = AccordionItemChangeEventReason;
}
