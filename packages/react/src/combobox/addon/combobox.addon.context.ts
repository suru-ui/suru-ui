import {
  InputGroupContext,
  useInputGroupContext,
} from "../input-group/combobox.input-group.context.js";

// ComboboxAddon は Context を変更・拡張しないため、親の ComboboxInputGroupContext をそのまま使う。
export {
  InputGroupContext as AddonContext,
  InputGroupContext as ComboboxAddonContext,
  useInputGroupContext as useAddonContext,
  useInputGroupContext as useComboboxAddonContext,
};
