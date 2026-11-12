import { TextFieldContext, useTextFieldContext } from "../root/text-field.root.context.js";

// TextFieldAddon は Context を変更・拡張しないため、親の TextFieldContext をそのまま使う。
export {
  TextFieldContext as AddonContext,
  TextFieldContext as TextFieldAddonContext,
  useTextFieldContext as useAddonContext,
  useTextFieldContext as useTextFieldAddonContext,
};
