import { Combobox } from "@base-ui/react/combobox";

export type IComboboxFilteredItems<TItem = any> = ReadonlyArray<TItem>;

export interface IUseComboboxFilteredItems {
  <TItem = any>(): IComboboxFilteredItems<TItem>;
}

export const useFilteredItems: IUseComboboxFilteredItems = function useSuiComboboxFilteredItems() {
  return Combobox.useFilteredItems();
};

export { useFilteredItems as useComboboxFilteredItems };
