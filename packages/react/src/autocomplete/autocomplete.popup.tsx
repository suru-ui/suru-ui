import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { AutocompleteContext, useAutocompleteContext } from "./autocomplete.context.js";

/**
 * {@link AutocompletePopup} の状態です。
 */
export type AutocompletePopupState = Autocomplete.Popup.State;

export namespace AutocompletePopupProps {
  export type Render = RenderProps<AutocompletePopupState>;

  export type SuruUI = {
    /**
     * ポップアップに枠線を表示するかどうかを指定します。
     *
     * 省略時はコンテキストの `outlined` を使います。
     */
    outlined?: boolean | undefined;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.Popup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // AutocompletePopupProps:
      "finalFocus" | "initialFocus",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Popup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompletePopup} に渡す props です。
 */
export type AutocompletePopupProps = AutocompletePopupProps.Render &
  AutocompletePopupProps.SuruUI &
  AutocompletePopupProps.BaseUI &
  AutocompletePopupProps.HTML;

export type IAutocompletePopup = IComponent<AutocompletePopupProps>;

/**
 * 検索結果リストを表示するポップアップ要素です。
 */
export const AutocompletePopup: IAutocompletePopup = function SuiAutocompletePopup(props) {
  const ctx = useAutocompleteContext();
  const { outlined = ctx.outlined, className, ...otherProps } = props;
  const childCtx = React.useMemo<AutocompleteContext>(
    () => ({ ...ctx, outlined }),
    [ctx, outlined],
  );

  return (
    <AutocompleteContext value={childCtx}>
      <Autocomplete.Popup
        {...otherProps}
        className={cn(
          className,
          "sui_autocomplete_popup",
          outlined && "sui_autocomplete_popup-outlined",
        )}
      />
    </AutocompleteContext>
  );
};

export { AutocompletePopup as Popup };

export namespace Popup {
  export type State = AutocompletePopupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompletePopupProps.Render;

    export type SuruUI = AutocompletePopupProps.SuruUI;

    export type BaseUI = AutocompletePopupProps.BaseUI;

    export type HTML = AutocompletePopupProps.HTML;
  }
}
