import { Autocomplete } from "@base-ui/react/autocomplete";

/**
 * 項目を検索文字列と照合するフィルターです。
 */
export type IAutocompleteFilter = ReturnType<typeof Autocomplete.useFilter>;

/**
 * {@link useAutocompleteFilter} のオプションです。
 */
export type IUseAutocompleteFilterOptions = NonNullable<
  Parameters<typeof Autocomplete.useFilter>[0]
>;

/**
 * {@link useAutocompleteFilter} の型です。
 */
export interface IUseAutocompleteFilter {
  (options?: IUseAutocompleteFilterOptions): IAutocompleteFilter;
}

/**
 * 項目を検索文字列と照合するフィルター関数を作るフックです。
 */
export const useAutocompleteFilter: IUseAutocompleteFilter = function useSuiAutocompleteFilter(
  options,
) {
  return Autocomplete.useFilter(options);
};

export { useAutocompleteFilter as useFilter };
