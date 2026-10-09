import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useInputGroupContext } from "../input-group/combobox.input-group.context.js";
import type { ComboboxAddonContext } from "./combobox.addon.context.js";

/**
 * {@link ComboboxAddon} の状態です。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxAddonState<TItem = any> = ComboboxAddonContext<TItem>;

export namespace ComboboxAddonProps {
  export type Render<TItem = any> = RenderProps<ComboboxAddonState<TItem>>;

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
  const ctx = useInputGroupContext();

  return useRender({
    props: [
      props,
      {
        className: cn<ComboboxAddonState>(
          "sui_combobox_addon",
          (state) => `sui_combobox_addon-size_${state.size}`,
          (state) => `sui_combobox_addon-color_${state.color}`,
          (state) => `sui_combobox_addon-radius_${state.radius}`,
          (state) => `sui_combobox_addon-variant_${state.variant}`,
          (state) => state.outlined && "sui_combobox_addon-outlined",
          (state) => state.multiple && "sui_combobox_addon-multiple",
        ),
      },
    ],
    state: ctx,
    defaultTagName: "span",
  });
};

export { ComboboxAddon as Addon };

export namespace Addon {
  export type State<TItem = any> = ComboboxAddonState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = ComboboxAddonProps.Render<TItem>;

    export type SuruUI = ComboboxAddonProps.SuruUI;

    export type BaseUI = ComboboxAddonProps.BaseUI;

    export type HTML = ComboboxAddonProps.HTML;
  }
}
