import { Field } from "@base-ui/react/field";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link FieldLabel} が持つ状態です。
 */
export type FieldLabelState = Field.Label.State;

export namespace FieldLabelProps {
  export type Render = RenderProps<FieldLabelState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Field.Label>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // FieldLabelProps:
      "nativeLabel",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Field.Label>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link FieldLabel} に渡す props です。
 */
export type FieldLabelProps = FieldLabelProps.Render &
  FieldLabelProps.SuruUI &
  FieldLabelProps.BaseUI &
  FieldLabelProps.HTML;

export type IFieldLabel = IComponent<FieldLabelProps>;

/**
 * フィールドのラベルコンポーネントです。
 *
 * 自動的に入力欄と関連付けられ、クリックで入力欄にフォーカスされます。
 */
export const FieldLabel: IFieldLabel = function SuiFieldLabel(props) {
  const { className, ...otherProps } = props;

  return (
    <Field.Label
      {...otherProps}
      className={cn<FieldLabelState>(
        className,
        "sui_field_label",
        (state) => state.disabled && "sui_field_label-disabled",
        (state) => state.touched && "sui_field_label-touched",
        (state) => state.dirty && "sui_field_label-dirty",
        (state) => state.filled && "sui_field_label-filled",
        (state) => state.focused && "sui_field_label-focused",
        (state) => state.valid === false && "sui_field_label-invalid",
        (state) => state.valid === true && "sui_field_label-valid",
        (state) => state.valid === null && "sui_field_label-unverified",
      )}
    />
  );
};

export { FieldLabel as Label };

export namespace Label {
  export type State = FieldLabelState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = FieldLabelProps.Render;

    export type SuruUI = FieldLabelProps.SuruUI;

    export type BaseUI = FieldLabelProps.BaseUI;

    export type HTML = FieldLabelProps.HTML;
  }
}
