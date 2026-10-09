import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { DISABLE_FOCUS_ON_CLICK_DATA } from "../_number-field.jsx";
import { useNumberFieldGroupContext } from "../group/number-field.group.context.js";
import type { NumberFieldAddonContext } from "./number-field.addon.context.js";

/**
 * {@link NumberFieldAddon} が持つ状態です。
 */
export type NumberFieldAddonState = NumberFieldAddonContext;

export namespace NumberFieldAddonProps {
  export type Render = RenderProps<NumberFieldAddonState>;

  export type SuruUI = {
    /**
     * クリック時の入力欄への自動フォーカスを無効にするかどうかを指定します。
     *
     * @default false
     */
    disableFocusOnClick?: boolean | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"span", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link NumberFieldAddon} に渡す props です。
 */
export type NumberFieldAddonProps = NumberFieldAddonProps.Render &
  NumberFieldAddonProps.SuruUI &
  NumberFieldAddonProps.BaseUI &
  NumberFieldAddonProps.HTML;

export type INumberFieldAddon = IComponent<NumberFieldAddonProps>;

/**
 * 入力欄の左右に表示する補助コンポーネントです。
 *
 * 接頭辞、接尾辞、アイコンなどを表示できます。
 */
export const NumberFieldAddon: INumberFieldAddon = function SuiNumberFieldAddon(props) {
  const ctx = useNumberFieldGroupContext();
  const { disableFocusOnClick = false, ...otherSpanProps } = props;

  return useRender({
    props: [
      otherSpanProps,
      {
        className: cn<NumberFieldAddonState>(
          "sui_number_field_addon",
          (state) => `sui_number_field_addon-size_${state.size}`,
          (state) => `sui_number_field_addon-color_${state.color}`,
          (state) => `sui_number_field_addon-radius_${state.radius}`,
          (state) => `sui_number_field_addon-variant_${state.variant}`,
          (state) => state.outlined && "sui_number_field_addon-outlined",
          (state) => state.disabled && "sui_number_field_addon-disabled",
          (state) => state.readOnly && "sui_number_field_addon-readonly",
          (state) => state.required && "sui_number_field_addon-required",
          (state) => state.scrubbing && "sui_number_field_addon-scrubbing",
          (state) => state.touched && "sui_number_field_addon-touched",
          (state) => state.dirty && "sui_number_field_addon-dirty",
          (state) => state.filled && "sui_number_field_addon-filled",
          (state) => state.focused && "sui_number_field_addon-focused",
          (state) => state.valid === false && "sui_number_field_addon-invalid",
          (state) => state.valid === true && "sui_number_field_addon-valid",
          (state) => state.valid === null && "sui_number_field_addon-unverified",
        ),
        [DISABLE_FOCUS_ON_CLICK_DATA]: disableFocusOnClick ? "true" : undefined,
      },
    ],
    state: ctx,
    defaultTagName: "span",
  });
};

export { NumberFieldAddon as Addon };

export namespace Addon {
  export type State = NumberFieldAddonState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = NumberFieldAddonProps.Render;

    export type SuruUI = NumberFieldAddonProps.SuruUI;

    export type BaseUI = NumberFieldAddonProps.BaseUI;

    export type HTML = NumberFieldAddonProps.HTML;
  }
}
