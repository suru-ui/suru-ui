import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { type SelectContext, useSelectContext } from "../root/select.root.context.js";
import { SelectContentContext } from "./select.content.context.js";

/**
 * {@link SelectContent} が持つ状態です。
 */
export type SelectContentState = Override<SelectContext, BaseSelect.Popup.State>;

export namespace SelectContentProps {
  export type Render = RenderProps<SelectContentState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseSelect.Popup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SelectContentProps:
      "finalFocus",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.Popup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SelectContent} に渡す props です。
 */
export type SelectContentProps = SelectContentProps.Render &
  SelectContentProps.SuruUI &
  SelectContentProps.BaseUI &
  SelectContentProps.HTML;

export type ISelectContent = IComponent<SelectContentProps>;

/**
 * 選択項目を表示するポップアップ要素です。
 */
export const SelectContent: ISelectContent = function SuiSelectContent(props) {
  const ctx = useSelectContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <BaseSelect.Popup
      {...otherProps}
      {...proxyRenderProps<BaseSelect.Popup.State, SelectContentState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <SelectContentContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </SelectContentContext>
          ),
          className: cn<SelectContentState>(
            className,
            "sui_select_content",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_select_content-transition_status_${state.transitionStatus}`,
            (state) => `sui_select_content-size_${state.size}`,
            (state) => `sui_select_content-radius_${state.radius}`,
            (state) => `sui_select_content-variant_${state.variant}`,
            (state) => state.outlined && "sui_select_content-outlined",
            (state) => state.open && "sui_select_content-open",
            (state) => `sui_select_content-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_select_content-align_${state.align}`,
          ),
        },
      )}
    />
  );
};

export { SelectContent as Content };

export namespace Content {
  export type State = SelectContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectContentProps.Render;

    export type SuruUI = SelectContentProps.SuruUI;

    export type BaseUI = SelectContentProps.BaseUI;

    export type HTML = SelectContentProps.HTML;
  }
}
