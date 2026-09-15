import { Autocomplete } from "@base-ui/react/autocomplete";

/**
 * フィルタリングされた項目の一覧です。
 */
export type AutocompleteFilteredItems<TItem = any> = readonly TItem[];

/**
 * {@link useAutocompleteFilteredItems} の戻り値です。
 */
export type IUseAutocompleteFilteredItemsReturn<TItem = any> = AutocompleteFilteredItems<TItem>;

/**
 * {@link useAutocompleteFilteredItems} の型です。
 */
export interface IUseAutocompleteFilteredItems {
  <TItem = any>(): IUseAutocompleteFilteredItemsReturn<TItem>;
}

export namespace IUseAutocompleteFilteredItems {
  export type Return<TItem = any> = IUseAutocompleteFilteredItemsReturn<TItem>;
}

function useSuiAutocompleteFilteredItems(): AutocompleteFilteredItems<any> {
  return Autocomplete.useFilteredItems();
}

/**
 * Root 内でフィルタリングされた項目の一覧を返すフックです。
 */
export const useAutocompleteFilteredItems: IUseAutocompleteFilteredItems =
  useSuiAutocompleteFilteredItems;

export { useAutocompleteFilteredItems as useFilteredItems };
