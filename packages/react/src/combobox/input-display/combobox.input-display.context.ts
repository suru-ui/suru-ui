import { ComboboxContext, useComboboxContext } from "../root/combobox.root.context.js";

// ComboboxInputDisplay は Context を変更・拡張しないため、親の ComboboxContext をそのまま使う。
export {
  ComboboxContext as InputDisplayContext,
  useComboboxContext as useInputDisplayContext,
  ComboboxContext as ComboboxInputDisplayContext,
  useComboboxContext as useComboboxInputDisplayContext,
};
