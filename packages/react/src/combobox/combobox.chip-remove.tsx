import { Combobox } from "@base-ui/react/combobox";
import type { NativeButtonProps } from "@base-ui/react/internals/types";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ComboboxChipRemove} が持つ状態です。
 */
export type ComboboxChipRemoveState = Combobox.ChipRemove.State;

export namespace ComboboxChipRemoveProps {
  export type Render = RenderProps<ComboboxChipRemoveState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.ChipRemove>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // ComboboxChipRemoveProps:
      | never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.ChipRemove>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxChipRemove} に渡す props です。
 */
export type ComboboxChipRemoveProps = ComboboxChipRemoveProps.Render &
  ComboboxChipRemoveProps.SuruUI &
  ComboboxChipRemoveProps.BaseUI &
  ComboboxChipRemoveProps.HTML;

/**
 * チップを選択値から削除するボタン要素です。
 */
export const ComboboxChipRemove: IComponent<ComboboxChipRemoveProps> =
  function SuiComboboxChipRemove(props) {
    const { className, ...otherProps } = props;

    return (
      <Combobox.ChipRemove {...otherProps} className={cn(className, "sui_combobox_chip_remove")} />
    );
  };

export { ComboboxChipRemove as ChipRemove };

export namespace ChipRemove {
  export type State = ComboboxChipRemoveState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxChipRemoveProps.Render;

    export type SuruUI = ComboboxChipRemoveProps.SuruUI;

    export type BaseUI = ComboboxChipRemoveProps.BaseUI;

    export type HTML = ComboboxChipRemoveProps.HTML;
  }
}
