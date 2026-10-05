import { ComboboxContext, useComboboxContext } from "../root/combobox.root.context.js";

// ComboboxAddon は Context を変更・拡張しないため、親の ComboboxContext をそのまま使う。
export {
  ComboboxContext as AddonContext,
  useComboboxContext as useAddonContext,
  ComboboxContext as ComboboxAddonContext,
  useComboboxContext as useComboboxAddonContext,
};
