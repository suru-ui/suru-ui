import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useComboboxPopupContext } from "../popup/combobox.popup.context.js";
import { ComboboxEmptyContext } from "./combobox.empty.context.js";

/**
 * {@link ComboboxEmpty} の状態です。
 */
export type ComboboxEmptyState = ComboboxEmptyContext;

export namespace ComboboxEmptyProps {
  export type Render = RenderProps<ComboboxEmptyState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Combobox.Empty>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // ComboboxEmptyProps より:
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Empty>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxEmpty} に渡す props です。
 */
export type ComboboxEmptyProps = ComboboxEmptyProps.Render &
  ComboboxEmptyProps.SuruUI &
  ComboboxEmptyProps.BaseUI &
  ComboboxEmptyProps.HTML;

export type IComboboxEmpty = IComponent<ComboboxEmptyProps>;

/**
 * 候補リストが空のときに内容を表示する要素です。
 */
export const ComboboxEmpty: IComboboxEmpty = function SuiComboboxEmpty(props) {
  const ctx = useComboboxPopupContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Combobox.Empty
      {...otherProps}
      {...proxyRenderProps<Combobox.Empty.State, ComboboxEmptyState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <ComboboxEmptyContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </ComboboxEmptyContext>
          ),
          className: cn<ComboboxEmptyState>(
            className,
            "sui_combobox_empty",
            (state) => `sui_combobox_empty-size_${state.size}`,
            (state) => `sui_combobox_empty-color_${state.color}`,
            (state) => `sui_combobox_empty-radius_${state.radius}`,
            (state) => `sui_combobox_empty-variant_${state.variant}`,
            (state) => state.outlined && "sui_combobox_empty-outlined",
            (state) => state.multiple && "sui_combobox_empty-multiple",
          ),
        },
      )}
    />
  );
};

export { ComboboxEmpty as Empty };

export namespace Empty {
  export type State = ComboboxEmptyState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxEmptyProps.Render;

    export type SuruUI = ComboboxEmptyProps.SuruUI;

    export type BaseUI = ComboboxEmptyProps.BaseUI;

    export type HTML = ComboboxEmptyProps.HTML;
  }
}
