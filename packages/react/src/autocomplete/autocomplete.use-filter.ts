import { Autocomplete } from "@base-ui/react/autocomplete";

/**
 * 項目を検索文字列と照合するフィルターです。
 */
export interface AutocompleteFilter extends ReturnType<typeof Autocomplete.useFilter> {}

/**
 * {@link useAutocompleteFilter} のオプションです。
 */
export type IUseAutocompleteFilterOptions =
  Parameters<typeof Autocomplete.useFilter> extends readonly [arg0?: infer TArg0, ...never[]]
    ? NonNullable<TArg0>
    : unknown;

/**
 * {@link useAutocompleteFilter} の戻り値です。
 */
export interface IUseAutocompleteFilterReturn extends AutocompleteFilter {}

/**
 * {@link useAutocompleteFilter} の型です。
 */
export interface IUseAutocompleteFilter {
  (options?: IUseAutocompleteFilterOptions): IUseAutocompleteFilterReturn;
}

export namespace IUseAutocompleteFilter {
  export type Options = IUseAutocompleteFilterOptions;

  export interface Return extends IUseAutocompleteFilterReturn {}
}

function useSuiAutocompleteFilter(options?: IUseAutocompleteFilterOptions): AutocompleteFilter {
  return Autocomplete.useFilter(options);
}

/**
 * 項目を検索文字列と照合するフィルター関数を作るフックです。
 */
export const useAutocompleteFilter: IUseAutocompleteFilter = useSuiAutocompleteFilter;

export { useAutocompleteFilter as useFilter };
