import {
  InputGroupContext,
  useInputGroupContext,
} from "../input-group/combobox.input-group.context.js";

// ComboboxAddon は Context を変更・拡張しないため、親の ComboboxInputGroupContext をそのまま使う。
export {
  InputGroupContext as AddonContext,
  useInputGroupContext as useAddonContext,
  InputGroupContext as ComboboxAddonContext,
  useInputGroupContext as useComboboxAddonContext,
};
