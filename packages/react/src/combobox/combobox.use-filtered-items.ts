import { Combobox } from "@base-ui/react/combobox";

function useSuiComboboxFilteredItems<TItem = any>(): readonly TItem[] {
  return Combobox.useFilteredItems();
}

export {
  useSuiComboboxFilteredItems as useFilteredItems,
  useSuiComboboxFilteredItems as useComboboxFilteredItems,
};
