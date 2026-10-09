import {
  NumberFieldGroupContext,
  useNumberFieldGroupContext,
} from "../group/number-field.group.context.js";

// NumberFieldAddon は Context を変更・拡張しないため、親の NumberFieldGroupContext をそのまま使う。
export {
  NumberFieldGroupContext as AddonContext,
  useNumberFieldGroupContext as useAddonContext,
  NumberFieldGroupContext as NumberFieldAddonContext,
  useNumberFieldGroupContext as useNumberFieldAddonContext,
};
