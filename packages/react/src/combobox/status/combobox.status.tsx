// TODO(tai-kun): いつか複合コンポーネントの方に組み込む

import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useComboboxPopupContext } from "../popup/combobox.popup.context.js";
import { ComboboxStatusContext } from "./combobox.status.context.js";

/**
 * {@link ComboboxStatus} の状態です。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxStatusState<TItem = any> = ComboboxStatusContext<TItem>;

export namespace ComboboxStatusProps {
  export type Render<TItem = any> = RenderProps<ComboboxStatusState<TItem>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Combobox.Status>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // ComboboxStatusProps より:
      never
    >,
    keyof Render | keyof SuruUI
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

export type IComboboxStatus = IComponent<ComboboxStatusProps>;

/**
 * 非同期検索などの状態を読み上げる要素です。
 */
export const ComboboxStatus: IComboboxStatus = function SuiComboboxStatus(props) {
  const ctx = useComboboxPopupContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Combobox.Status
      {...otherProps}
      {...proxyRenderProps<Combobox.Status.State, ComboboxStatusState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <ComboboxStatusContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </ComboboxStatusContext>
          ),
          className: cn<ComboboxStatusState>(
            className,
            "sui_combobox_status",
            (state) => `sui_combobox_status-size_${state.size}`,
            (state) => `sui_combobox_status-color_${state.color}`,
            (state) => `sui_combobox_status-radius_${state.radius}`,
            (state) => `sui_combobox_status-variant_${state.variant}`,
            (state) => state.outlined && "sui_combobox_status-outlined",
            (state) => state.multiple && "sui_combobox_status-multiple",
          ),
        },
      )}
    />
  );
};

export { ComboboxStatus as Status };

export namespace Status {
  export type State<TItem = any> = ComboboxStatusState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = ComboboxStatusProps.Render<TItem>;

    export type SuruUI = ComboboxStatusProps.SuruUI;

    export type BaseUI = ComboboxStatusProps.BaseUI;

    export type HTML = ComboboxStatusProps.HTML;
  }
}
