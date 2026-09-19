import type { IComponent } from "../types.js";
import { useComboboxContext } from "./combobox.context.js";
import { useComboboxItemContext } from "./combobox.item.context.js";

export interface IComboboxItemLabelRenderer {
  (item: any): IComponent.Return;
}

/**
 * {@link ComboboxItemLabel} が持つ状態です。
 */
export type ComboboxItemLabelState = {};

export namespace ComboboxItemLabelProps {
  export type Render = {};

  export type SuruUI = {
    children?: IComboboxItemLabelRenderer | undefined;
  };

  export type BaseUI = {};

  export type HTML = {};
}

/**
 * {@link ComboboxItemLabel} に渡す props です。
 */
export type ComboboxItemLabelProps = ComboboxItemLabelProps.Render &
  ComboboxItemLabelProps.SuruUI &
  ComboboxItemLabelProps.BaseUI &
  ComboboxItemLabelProps.HTML;

/**
 * 項目の表示ラベルです。
 *
 * 直近の {@link ComboboxItem} または {@link ComboboxChip} の `value` を表示します。
 */
export const ComboboxItemLabel: IComponent<ComboboxItemLabelProps> = function SuiComboboxItemLabel(
  props,
) {
  const ctx = useComboboxContext();
  const itemCtx = useComboboxItemContext();
  const { children = ctx.itemToStringLabel } = props;

  return children(itemCtx.value);
};

export { ComboboxItemLabel as ItemLabel };

export namespace ItemLabel {
  export type State = ComboboxItemLabelState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxItemLabelProps.Render;

    export type SuruUI = ComboboxItemLabelProps.SuruUI;

    export type BaseUI = ComboboxItemLabelProps.BaseUI;

    export type HTML = ComboboxItemLabelProps.HTML;
  }
}
