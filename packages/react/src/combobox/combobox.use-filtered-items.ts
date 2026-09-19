import { Combobox } from "@base-ui/react/combobox";

/**
 * フィルタリングされた項目の一覧です。
 */
export type ComboboxFilteredItems<TItem = any> = readonly TItem[];

/**
 * {@link useComboboxFilteredItems} の戻り値です。
 */
export type IUseComboboxFilteredItemsReturn<TItem = any> = ComboboxFilteredItems<TItem>;

/**
 * {@link useComboboxFilteredItems} の型です。
 */
export interface IUseComboboxFilteredItems {
  <TItem = any>(): IUseComboboxFilteredItemsReturn<TItem>;
}

/**
 * {@link IUseComboboxFilteredItems} に対応する型名前空間です。
 */
export namespace IUseComboboxFilteredItems {
  export type Return<TItem = any> = IUseComboboxFilteredItemsReturn<TItem>;
}

function useSuiComboboxFilteredItems(): ComboboxFilteredItems {
  return Combobox.useFilteredItems();
}

/**
 * Root 内でフィルタリングされた項目の一覧を返すフックです。
 */
export const useComboboxFilteredItems: IUseComboboxFilteredItems = useSuiComboboxFilteredItems;

export const useFilteredItems: IUseComboboxFilteredItems = useComboboxFilteredItems;
