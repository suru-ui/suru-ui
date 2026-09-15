import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ComboboxChip} が持つ状態です。
 */
export type ComboboxChipState = Combobox.Chip.State;

export namespace ComboboxChipProps {
  export type Render = RenderProps<ComboboxChipState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Chip>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxChipProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Chip>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxChip} に渡す props です。
 */
export type ComboboxChipProps = ComboboxChipProps.Render &
  ComboboxChipProps.SuruUI &
  ComboboxChipProps.BaseUI &
  ComboboxChipProps.HTML;

/**
 * 複数選択した値を表すチップ要素です。
 */
export const ComboboxChip: IComponent<ComboboxChipProps> = function SuiComboboxChip(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Chip {...otherProps} className={cn(className, "sui_combobox_chip")} />;
};

export { ComboboxChip as Chip };

/**
 * {@link ComboboxChip} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Chip {
  export type State = ComboboxChipState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxChipProps.Render;

    export type SuruUI = ComboboxChipProps.SuruUI;

    export type BaseUI = ComboboxChipProps.BaseUI;

    export type HTML = ComboboxChipProps.HTML;
  }
}
