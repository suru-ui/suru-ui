import { Combobox } from "@base-ui/react/combobox";

/**
 * フィルタリングされた項目の一覧です。
 *
 * @template TItem 項目の型です。
 */
export type IComboboxFilteredItems<TItem = any> = readonly TItem[];

/**
 * {@link useFilteredItems} の型です。
 */
export interface IUseComboboxFilteredItems {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(): IComboboxFilteredItems<TItem>;
}

/** Root 内でフィルタリングされた項目の一覧を返すフックです。 */
export const useComboboxFilteredItems: IUseComboboxFilteredItems = () =>
  Combobox.useFilteredItems();

export { useComboboxFilteredItems as useFilteredItems };
