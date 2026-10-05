import { AccordionItemContext, useAccordionItemContext } from "../item/accordion.item.context.js";

// AccordionIndicator は Context を変更・拡張しないため、親の AccordionItemContext をそのまま使う。
export {
  AccordionItemContext as IndicatorContext,
  useAccordionItemContext as useIndicatorContext,
  AccordionItemContext as AccordionIndicatorContext,
  useAccordionItemContext as useAccordionIndicatorContext,
};
