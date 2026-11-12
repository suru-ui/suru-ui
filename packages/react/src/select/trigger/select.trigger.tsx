import type { NativeButtonProps } from "@base-ui/react/internals/types";
import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useSelectContext } from "../root/select.root.context.js";
import { SelectTriggerContext } from "./select.trigger.context.js";

/**
 * {@link SelectTrigger} が持つ状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectTriggerState<TValue = any> = SelectTriggerContext<TValue>;

export namespace SelectTriggerProps {
  export type Render<TValue = any> = RenderProps<SelectTriggerState<TValue>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof BaseSelect.Trigger>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // NativeButtonProps より :
      | keyof NativeButtonProps
      // SelectTriggerProps より :
      | "disabled"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.Trigger>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SelectTrigger} に渡す props です。
 */
export type SelectTriggerProps = SelectTriggerProps.Render &
  SelectTriggerProps.SuruUI &
  SelectTriggerProps.BaseUI &
  SelectTriggerProps.HTML;

export type ISelectTrigger = IComponent<SelectTriggerProps>;

/**
 * Select ポップアップを開閉するボタン要素です。
 *
 * Root のスタイルプロパティーがこの要素へ適用されます。
 * キーボードでは `Enter` や `Space`、`ArrowDown` で開きます。
 */
export const SelectTrigger: ISelectTrigger = (props) => {
  const ctx = useSelectContext();
  const {
    style,
    render,
    className,
    // @ts-expect-error data-scope は Base UI のコンポーネント型に含まれないため。
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <BaseSelect.Trigger
      {...otherProps}
      {...proxyRenderProps<BaseSelect.Trigger.State, SelectTriggerState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <SelectTriggerContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="button"
              />
            </SelectTriggerContext>
          ),
          className: cn<SelectTriggerState>(
            className,
            "sui_select",
            (state) => `sui_select-size_${state.size}`,
            (state) => `sui_select-radius_${state.radius}`,
            (state) => `sui_select-variant_${state.variant}`,
            (state) => state.outlined && "sui_select-outlined",
            (state) => state.valid === true && "sui_select-valid",
            (state) => state.valid === false && "sui_select-invalid",
            (state) => state.valid === null && "sui_select-unverified",
            (state) => state.disabled && "sui_select-disabled",
            (state) => state.open && "sui_select-open",
            (state) => state.readOnly && "sui_select-readonly",
            (state) => state.placeholder && "sui_select-placeholder",
            (state) => state.touched && "sui_select-touched",
            (state) => state.dirty && "sui_select-dirty",
            (state) => state.filled && "sui_select-filled",
            (state) => state.focused && "sui_select-focused",
            (state) =>
              state.popupSide !== null &&
              `sui_select-popup_side_${state.popupSide.replaceAll("-", "_")}`,
          ),
        },
      )}
      data-scope={dataScope}
    />
  );
};

export { SelectTrigger as Trigger };
export namespace Trigger {
  export type State<TValue = any> = SelectTriggerState<TValue>;

  export type Props<TValue = any> = Props.Render<TValue> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TValue = any> = SelectTriggerProps.Render<TValue>;

    export type SuruUI = SelectTriggerProps.SuruUI;

    export type BaseUI = SelectTriggerProps.BaseUI;

    export type HTML = SelectTriggerProps.HTML;
  }
}
