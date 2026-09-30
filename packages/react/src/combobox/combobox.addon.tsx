import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";
import { type ComboboxContext, useComboboxContext } from "./combobox.context.js";

/**
 * {@link ComboboxAddon} の状態です。
 */
export type ComboboxAddonState = ComboboxContext;

export namespace ComboboxAddonProps {
  export type Render = RenderProps<ComboboxAddonState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"span", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxAddon} に渡す props です。
 */
export type ComboboxAddonProps = ComboboxAddonProps.Render &
  ComboboxAddonProps.SuruUI &
  ComboboxAddonProps.BaseUI &
  ComboboxAddonProps.HTML;

export type IComboboxAddon = IComponent<ComboboxAddonProps>;

/**
 * 入力欄の左右に表示する補助コンポーネントです。
 *
 * 接頭辞、接尾辞、アイコンなどを表示できます。
 */
export const ComboboxAddon: IComboboxAddon = function SuiComboboxAddon(props) {
  const ctx = useComboboxContext();

  return useRender({
    props: [
      props,
      {
        className: "sui_combobox_addon",
      },
    ],
    state: ctx,
    defaultTagName: "span",
  });
};

export { ComboboxAddon as Addon };

export namespace Addon {
  export type State = ComboboxAddonState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxAddonProps.Render;

    export type SuruUI = ComboboxAddonProps.SuruUI;

    export type BaseUI = ComboboxAddonProps.BaseUI;

    export type HTML = ComboboxAddonProps.HTML;
  }
}
