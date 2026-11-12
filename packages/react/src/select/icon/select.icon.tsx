import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useSelectTriggerContext } from "../trigger/select.trigger.context.js";
import { SelectIconContext } from "./select.icon.context.js";

/**
 * {@link SelectIcon} が持つ状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectIconState<TValue = any> = SelectIconContext<TValue>;

export namespace SelectIconProps {
  export type Render<TValue = any> = RenderProps<SelectIconState<TValue>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof BaseSelect.Icon>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // SelectIconProps より :
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.Icon>,
    keyof Render | keyof SuruUI
  >;
}

/**
 * {@link SelectIcon} に渡す props です。
 */
export type SelectIconProps = SelectIconProps.Render &
  SelectIconProps.SuruUI &
  SelectIconProps.BaseUI &
  SelectIconProps.HTML;

export type ISelectIcon = IComponent<SelectIconProps>;

/** ポップアップの開閉を示すアイコンのラッパー要素です。 */
export const SelectIcon: ISelectIcon = (props) => {
  const ctx = useSelectTriggerContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <BaseSelect.Icon
      {...otherProps}
      {...proxyRenderProps<BaseSelect.Icon.State, SelectIconState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <SelectIconContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="span"
              />
            </SelectIconContext>
          ),
          className: cn<SelectIconState>(
            className,
            "sui_select_icon",
            (state) => `sui_select_icon-size_${state.size}`,
            (state) => `sui_select_icon-radius_${state.radius}`,
            (state) => `sui_select_icon-variant_${state.variant}`,
            (state) => state.outlined && "sui_select_icon-outlined",
            (state) => state.disabled && "sui_select_icon-disabled",
            (state) => state.touched && "sui_select_icon-touched",
            (state) => state.dirty && "sui_select_icon-dirty",
            (state) => state.valid === false && "sui_select_icon-invalid",
            (state) => state.valid === true && "sui_select_icon-valid",
            (state) => state.valid === null && "sui_select_icon-unverified",
            (state) => state.filled && "sui_select_icon-filled",
            (state) => state.focused && "sui_select_icon-focused",
            (state) => state.readOnly && "sui_select_icon-readonly",
            (state) => state.placeholder && "sui_select_icon-placeholder",
            (state) =>
              state.popupSide !== null &&
              `sui_select_icon-popup_side_${state.popupSide.replaceAll("-", "_")}`,
            (state) => state.open && "sui_select_icon-open",
          ),
        },
      )}
    />
  );
};

export { SelectIcon as Icon };
export namespace Icon {
  export type State<TValue = any> = SelectIconState<TValue>;

  export type Props<TValue = any> = Props.Render<TValue> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TValue = any> = SelectIconProps.Render<TValue>;

    export type SuruUI = SelectIconProps.SuruUI;

    export type BaseUI = SelectIconProps.BaseUI;

    export type HTML = SelectIconProps.HTML;
  }
}
