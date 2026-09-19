import { Combobox } from "@base-ui/react/combobox";

/**
 * 項目を検索文字列と照合するフィルターです。
 */
export type IComboboxFilter = ReturnType<typeof Combobox.useFilter>;

/**
 * {@link useComboboxFilter} のオプションです。
 */
export type IUseComboboxFilterOptions = NonNullable<Parameters<typeof Combobox.useFilter>[0]>;

export interface IUseComboboxFilter {
  (options?: IUseComboboxFilterOptions): IComboboxFilter;
}

/**
 * 項目を検索文字列と照合するフィルター関数を作るフックです。
 */
export const useComboboxFilter: IUseComboboxFilter = function useSuiComboboxFilter(options) {
  return Combobox.useFilter(options);
};

export { useComboboxFilter as useFilter };
