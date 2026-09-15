import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link MenuRadioGroup} の選択状態を変更されるイベントの詳細です。
 */
export type MenuRadioGroupChangeEventDetails = Menu.RadioGroup.ChangeEventDetails;

/**
 * {@link MenuRadioGroup} の選択状態が変更される理由です。
 */
export type MenuRadioGroupChangeEventReason = Menu.RadioGroup.ChangeEventReason;

/**
 * {@link MenuRadioGroup} が持つ状態です。
 */
export type MenuRadioGroupState = Menu.RadioGroup.State;

export namespace MenuRadioGroupProps {
  export type Render = RenderProps<MenuRadioGroupState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Menu.RadioGroup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuRadioGroupProps:
      "value" | "defaultValue" | "onValueChange" | "disabled",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.RadioGroup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuRadioGroup} に渡す props です。
 */
export type MenuRadioGroupProps = MenuRadioGroupProps.Render &
  MenuRadioGroupProps.SuruUI &
  MenuRadioGroupProps.BaseUI &
  MenuRadioGroupProps.HTML;

/**
 * ラジオ項目をまとめるグループ要素です。
 */
export const MenuRadioGroup: IComponent<MenuRadioGroupProps> = function SuiMenuRadioGroup(props) {
  const { className, ...otherProps } = props;

  return (
    <Menu.RadioGroup
      {...otherProps}
      className={cn(
        className,
        "sui_menu_radio_group",
        (state) => state.disabled && "sui_menu_radio_group-disabled",
      )}
    />
  );
};

export { MenuRadioGroup as RadioGroup };

export namespace RadioGroup {
  export type State = MenuRadioGroupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuRadioGroupProps.Render;

    export type SuruUI = MenuRadioGroupProps.SuruUI;

    export type BaseUI = MenuRadioGroupProps.BaseUI;

    export type HTML = MenuRadioGroupProps.HTML;
  }

  export type ChangeEventDetails = MenuRadioGroupChangeEventDetails;

  export type ChangeEventReason = MenuRadioGroupChangeEventReason;
}
