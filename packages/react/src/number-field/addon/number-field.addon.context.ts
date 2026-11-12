import {
  NumberFieldGroupContext,
  useNumberFieldGroupContext,
} from "../group/number-field.group.context.js";

// NumberFieldAddon は Context を変更・拡張しないため、親の NumberFieldGroupContext をそのまま使う。
export {
  NumberFieldGroupContext as AddonContext,
  NumberFieldGroupContext as NumberFieldAddonContext,
  useNumberFieldGroupContext as useAddonContext,
  useNumberFieldGroupContext as useNumberFieldAddonContext,
};
