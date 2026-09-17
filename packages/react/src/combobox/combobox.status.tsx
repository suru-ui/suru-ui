import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ComboboxStatus} が持つ状態です。
 */
export type ComboboxStatusState = Combobox.Status.State;

export namespace ComboboxStatusProps {
  export type Render = RenderProps<ComboboxStatusState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Status>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxStatusProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Status>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxStatus} に渡す props です。
 */
export type ComboboxStatusProps = ComboboxStatusProps.Render &
  ComboboxStatusProps.SuruUI &
  ComboboxStatusProps.BaseUI &
  ComboboxStatusProps.HTML;

/**
 * 非同期検索などの状態を読み上げる要素です。
 */
export const ComboboxStatus: IComponent<ComboboxStatusProps> = function SuiComboboxStatus(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Status {...otherProps} className={cn(className, "sui_combobox_status")} />;
};

export { ComboboxStatus as Status };

export namespace Status {
  export type State = ComboboxStatusState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxStatusProps.Render;

    export type SuruUI = ComboboxStatusProps.SuruUI;

    export type BaseUI = ComboboxStatusProps.BaseUI;

    export type HTML = ComboboxStatusProps.HTML;
  }
}
