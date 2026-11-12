import { CollapsibleContext, useCollapsibleContext } from "../root/collapsible.root.context.js";

// CollapsibleIndicator は Context を変更・拡張しないため、親の CollapsibleContext をそのまま使う。
export {
  CollapsibleContext as IndicatorContext,
  CollapsibleContext as CollapsibleIndicatorContext,
  useCollapsibleContext as useIndicatorContext,
  useCollapsibleContext as useCollapsibleIndicatorContext,
};
