// TODO(tai-kun): いつか複合コンポーネントの方に組み込む

import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link AutocompleteSeparator} が持つ状態です。
 */
export type AutocompleteSeparatorState = Autocomplete.Separator.State;

export namespace AutocompleteSeparatorProps {
  export type Render = RenderProps<AutocompleteSeparatorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.Separator>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // AutocompleteSeparatorProps:
      "orientation",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Separator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteSeparator} に渡す props です。
 */
export type AutocompleteSeparatorProps = AutocompleteSeparatorProps.Render &
  AutocompleteSeparatorProps.SuruUI &
  AutocompleteSeparatorProps.BaseUI &
  AutocompleteSeparatorProps.HTML;

export type IAutocompleteSeparator = IComponent<AutocompleteSeparatorProps>;

/**
 * 項目やグループを区切る要素です。
 */
export const AutocompleteSeparator: IAutocompleteSeparator = function SuiAutocompleteSeparator(
  props,
) {
  const { className, ...otherProps } = props;

  return (
    <Autocomplete.Separator
      {...otherProps}
      className={cn(className, "sui_autocomplete_separator")}
    />
  );
};

export { AutocompleteSeparator as Separator };

export namespace Separator {
  export type State = AutocompleteSeparatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteSeparatorProps.Render;

    export type SuruUI = AutocompleteSeparatorProps.SuruUI;

    export type BaseUI = AutocompleteSeparatorProps.BaseUI;

    export type HTML = AutocompleteSeparatorProps.HTML;
  }
}
