import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { useComboboxContext } from "./combobox.context.js";

/**
 * {@link ComboboxInputGroup} が持つ状態です。
 */
export type ComboboxInputGroupState = Combobox.InputGroup.State;

export namespace ComboboxInputGroupProps {
  export type Render = RenderProps<ComboboxInputGroupState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.InputGroup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxInputGroupProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.InputGroup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxInputGroup} に渡す props です。
 */
export type ComboboxInputGroupProps = ComboboxInputGroupProps.Render &
  ComboboxInputGroupProps.SuruUI &
  ComboboxInputGroupProps.BaseUI &
  ComboboxInputGroupProps.HTML;

/**
 * 入力欄と付属コントロールをまとめるグループ要素です。
 *
 * Root のスタイルプロパティーがこの要素へ適用されます。
 */
export const ComboboxInputGroup: IComponent<ComboboxInputGroupProps> =
  function SuiComboboxInputGroup(props) {
    const { size, color, radius, variant, outlined } = useComboboxContext();
    const {
      className,
      // @ts-expect-error
      "data-scope": dataScope = "",
      ...otherProps
    } = props;

    return (
      <Combobox.InputGroup
        {...otherProps}
        className={cn(
          className,
          "sui_combobox_input_group",
          `sui_combobox_input_group-size_${size}`,
          `sui_combobox_input_group-color_${color}`,
          `sui_combobox_input_group-radius_${radius}`,
          `sui_combobox_input_group-variant_${variant}`,
          outlined && "sui_combobox_input_group-outlined",
          (state) => state.disabled && "sui_combobox_input_group-disabled",
          (state) => state.touched && "sui_combobox_input_group-touched",
          (state) => state.dirty && "sui_combobox_input_group-dirty",
          (state) => state.valid === false && "sui_combobox_input_group-invalid",
          (state) => state.valid === true && "sui_combobox_input_group-valid",
          (state) => state.valid === null && "sui_combobox_input_group-unverified",
          (state) => state.filled && "sui_combobox_input_group-filled",
          (state) => state.focused && "sui_combobox_input_group-focused",
          (state) => state.open && "sui_combobox_input_group-open",
          (state) => state.readOnly && "sui_combobox_input_group-readonly",
          (state) =>
            state.popupSide !== null &&
            `sui_combobox_input_group-popupside_${state.popupSide.replaceAll("-", "_")}`,
          (state) => state.listEmpty && "sui_combobox_input_group-listempty",
          (state) => state.placeholder && "sui_combobox_input_group-placeholder",
        )}
        data-scope={dataScope}
      />
    );
  };

export { ComboboxInputGroup as InputGroup };

export namespace InputGroup {
  export type State = ComboboxInputGroupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxInputGroupProps.Render;

    export type SuruUI = ComboboxInputGroupProps.SuruUI;

    export type BaseUI = ComboboxInputGroupProps.BaseUI;

    export type HTML = ComboboxInputGroupProps.HTML;
  }
}
