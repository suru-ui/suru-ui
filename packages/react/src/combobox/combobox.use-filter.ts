import { Combobox } from "@base-ui/react/combobox";

/**
 * 項目を検索文字列と照合するフィルターです。
 */
export interface ComboboxFilter extends ReturnType<typeof Combobox.useFilter> {}

/**
 * {@link useComboboxFilter} のオプションです。
 */
export type IUseComboboxFilterOptions =
  Parameters<typeof Combobox.useFilter> extends readonly [arg0?: infer TArg0, ...never[]]
    ? NonNullable<TArg0>
    : unknown;

/**
 * {@link useComboboxFilter} の戻り値です。
 */
export interface IUseComboboxFilterReturn extends ComboboxFilter {}

/**
 * {@link useComboboxFilter} の型です。
 */
export interface IUseComboboxFilter {
  (options?: IUseComboboxFilterOptions): IUseComboboxFilterReturn;
}

/**
 * {@link IUseComboboxFilter} に対応する型名前空間です。
 */
export namespace IUseComboboxFilter {
  export type Options = IUseComboboxFilterOptions;

  export interface Return extends IUseComboboxFilterReturn {}
}

function useSuiComboboxFilter(options?: IUseComboboxFilterOptions): ComboboxFilter {
  return Combobox.useFilter(options);
}

/**
 * 項目を検索文字列と照合するフィルター関数を作るフックです。
 */
export const useComboboxFilter: IUseComboboxFilter = useSuiComboboxFilter;

export { useComboboxFilter as useFilter };
