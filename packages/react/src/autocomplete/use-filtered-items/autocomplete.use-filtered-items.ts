import { Autocomplete } from "@base-ui/react/autocomplete";

/**
 * フィルタリングされた項目の一覧です。
 *
 * @template TItem 項目の値の型です。
 */
export type IAutocompleteFilteredItems<TItem = any> = ReadonlyArray<TItem>;

/**
 * {@link useFilteredItems} の型です。
 */
export interface IUseAutocompleteFilteredItems {
  <TItem = any>(): IAutocompleteFilteredItems<TItem>;
}

/**
 * Root 内でフィルタリングされた項目の一覧を返すフックです。
 */
export const useAutocompleteFilteredItems: IUseAutocompleteFilteredItems =
  function useSuiAutocompleteFilteredItems() {
    return Autocomplete.useFilteredItems();
  };

export { useAutocompleteFilteredItems as useFilteredItems };
