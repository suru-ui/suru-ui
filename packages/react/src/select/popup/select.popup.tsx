import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useSelectPositionerContext } from "../positioner/select.positioner.context.js";
import { SelectPopupContext } from "./select.popup.context.js";

/**
 * {@link SelectPopup} が持つ状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectPopupState<TValue = any> = SelectPopupContext<TValue>;

export namespace SelectPopupProps {
  export type Render<TValue = any> = RenderProps<SelectPopupState<TValue>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof BaseSelect.Popup>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // SelectPopupProps より :
      "finalFocus"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.Popup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SelectPopup} に渡す props です。
 */
export type SelectPopupProps = SelectPopupProps.Render &
  SelectPopupProps.SuruUI &
  SelectPopupProps.BaseUI &
  SelectPopupProps.HTML;

export type ISelectPopup = IComponent<SelectPopupProps>;

/** 選択項目を表示するポップアップ要素です。 */
export const SelectPopup: ISelectPopup = (props) => {
  const ctx = useSelectPositionerContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <BaseSelect.Popup
      {...otherProps}
      {...proxyRenderProps<BaseSelect.Popup.State, SelectPopupState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <SelectPopupContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </SelectPopupContext>
          ),
          className: cn<SelectPopupState>(
            className,
            "sui_select_popup",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_select_popup-transition_status_${state.transitionStatus}`,
            (state) => `sui_select_popup-size_${state.size}`,
            (state) => `sui_select_popup-radius_${state.radius}`,
            (state) => `sui_select_popup-variant_${state.variant}`,
            (state) => state.outlined && "sui_select_popup-outlined",
            (state) => state.anchorHidden && "sui_select_popup-anchor_hidden",
            (state) => state.open && "sui_select_popup-open",
            (state) => `sui_select_popup-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_select_popup-align_${state.align}`,
          ),
        },
      )}
    />
  );
};

export { SelectPopup as Popup };
export namespace Popup {
  export type State<TValue = any> = SelectPopupState<TValue>;

  export type Props<TValue = any> = Props.Render<TValue> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TValue = any> = SelectPopupProps.Render<TValue>;

    export type SuruUI = SelectPopupProps.SuruUI;

    export type BaseUI = SelectPopupProps.BaseUI;

    export type HTML = SelectPopupProps.HTML;
  }
}
