import type { IComponent } from "../../types.js";
import { type ComboboxItemContext, useComboboxItemContext } from "../item/combobox.item.context.js";

/**
 * 項目の表示ラベルをレンダリングする関数のインターフェイスです。
 *
 * @template TItem 項目の型です。
 */
export interface IComboboxItemLabelRenderer<TItem = any> {
  /**
   * 表示ラベルをレンダリングします。
   *
   * @param item 表示する項目の値です。
   * @param context コンテクストです。
   * @returns レンダリングする内容です。
   */
  (item: TItem, context: ComboboxItemContext): IComponent.Return;
}

/**
 * {@link ComboboxItemLabel} の状態です。
 */
export type ComboboxItemLabelState = {};

export namespace ComboboxItemLabelProps {
  export type Render = {};

  export type SuruUI<TItem = any> = {
    /**
     * 表示ラベル、または項目の値から表示ラベルを生成する関数です。
     *
     * 省略時はコンボボックスの変換関数を使います。
     */
    children?: IComboboxItemLabelRenderer<TItem> | undefined;
  };

  export type BaseUI = {};

  export type HTML = {};
}

/**
 * {@link ComboboxItemLabel} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxItemLabelProps<TItem = any> = ComboboxItemLabelProps.Render &
  ComboboxItemLabelProps.SuruUI<TItem> &
  ComboboxItemLabelProps.BaseUI &
  ComboboxItemLabelProps.HTML;

export interface IComboboxItemLabel extends IComponent<ComboboxItemLabelProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: ComboboxItemLabelProps<TItem>): IComponent.Return;
}

/**
 * 項目の表示ラベルです。
 *
 * 直近の {@link ComboboxItem} または {@link ComboboxChip} の `value` を表示します。
 */
export const ComboboxItemLabel: IComboboxItemLabel = function SuiComboboxItemLabel(
  props: ComboboxItemLabelProps,
) {
  const ctx = useComboboxItemContext();
  const { children = ctx.itemToStringLabel } = props;

  return children(ctx.value, ctx);
};

export { ComboboxItemLabel as ItemLabel };

export namespace ItemLabel {
  export type State = ComboboxItemLabelState;

  export type Props<TItem = any> = Props.Render & Props.SuruUI<TItem> & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxItemLabelProps.Render;

    export type SuruUI<TItem = any> = ComboboxItemLabelProps.SuruUI<TItem>;

    export type BaseUI = ComboboxItemLabelProps.BaseUI;

    export type HTML = ComboboxItemLabelProps.HTML;
  }

  export type IRenderer<TItem = any> = IComboboxItemLabelRenderer<TItem>;
}
