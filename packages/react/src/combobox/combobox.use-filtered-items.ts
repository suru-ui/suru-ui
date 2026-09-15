import { Combobox } from "@base-ui/react/combobox";

/**
 * フィルタリングされた項目の一覧です。
 */
export type ComboboxFilteredItems<TValue = any> = readonly TValue[];

/**
 * {@link useComboboxFilteredItems} の戻り値です。
 */
export type IUseComboboxFilteredItemsReturn<TValue = any> = ComboboxFilteredItems<TValue>;

/**
 * {@link useComboboxFilteredItems} の型です。
 */
export interface IUseComboboxFilteredItems {
  <TValue = any>(): IUseComboboxFilteredItemsReturn<TValue>;
}

/**
 * {@link IUseComboboxFilteredItems} に対応する型名前空間です。
 */
export namespace IUseComboboxFilteredItems {
  export type Return<TValue = any> = IUseComboboxFilteredItemsReturn<TValue>;
}

function useSuiComboboxFilteredItems(): ComboboxFilteredItems<any> {
  return Combobox.useFilteredItems();
}

/**
 * Root 内でフィルタリングされた項目の一覧を返すフックです。
 */
export const useComboboxFilteredItems: IUseComboboxFilteredItems = useSuiComboboxFilteredItems;

export const useFilteredItems: IUseComboboxFilteredItems = useComboboxFilteredItems;
