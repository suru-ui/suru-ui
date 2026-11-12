import { AccordionItemContext, useAccordionItemContext } from "../item/accordion.item.context.js";

// AccordionIndicator は Context を変更・拡張しないため、親の AccordionItemContext をそのまま使う。
export {
  AccordionItemContext as IndicatorContext,
  AccordionItemContext as AccordionIndicatorContext,
  useAccordionItemContext as useIndicatorContext,
  useAccordionItemContext as useAccordionIndicatorContext,
};
