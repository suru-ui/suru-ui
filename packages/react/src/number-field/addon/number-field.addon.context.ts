import { NumberFieldContext, useNumberFieldContext } from "../root/number-field.root.context.js";

// NumberFieldAddon は Context を変更・拡張しないため、親の NumberFieldContext をそのまま使う。
export {
  NumberFieldContext as AddonContext,
  useNumberFieldContext as useAddonContext,
  NumberFieldContext as NumberFieldAddonContext,
  useNumberFieldContext as useNumberFieldAddonContext,
};
