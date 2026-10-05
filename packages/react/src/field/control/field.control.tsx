import { Field } from "@base-ui/react/field";
import * as React from "react";

import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

/**
 * {@link FieldControl} の値が変更されたイベントの詳細です。
 */
export type FieldControlChangeEventDetails = Field.Control.ChangeEventDetails;

/**
 * {@link FieldControl} の値が変更された理由です。
 */
export type FieldControlChangeEventReason = Field.Control.ChangeEventReason;

/**
 * {@link FieldControl} が持つ状態です。
 */
export type FieldControlState = Field.Control.State;

export namespace FieldControlProps {
  export type Render = RenderProps<FieldControlState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Field.Control>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // FieldControlProps:
      "onValueChange" | "defaultValue",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Field.Control>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link FieldControl} に渡す props です。
 */
export type FieldControlProps = FieldControlProps.Render &
  FieldControlProps.SuruUI &
  FieldControlProps.BaseUI &
  FieldControlProps.HTML;

export type IFieldControl = IComponent<FieldControlProps>;

/**
 * フィールドの入力欄コンポーネントです。
 */
export const FieldControl: IFieldControl = function SuiFieldControl(props) {
  const { className, ...otherProps } = props;

  return (
    <Field.Control
      {...otherProps}
      className={cn<FieldControlState>(
        className,
        "sui_field_control",
        (state) => state.disabled && "sui_field_control-disabled",
        (state) => state.touched && "sui_field_control-touched",
        (state) => state.dirty && "sui_field_control-dirty",
        (state) => state.filled && "sui_field_control-filled",
        (state) => state.focused && "sui_field_control-focused",
        (state) => state.valid === false && "sui_field_control-invalid",
        (state) => state.valid === true && "sui_field_control-valid",
        (state) => state.valid === null && "sui_field_control-unverified",
      )}
    />
  );
};

export { FieldControl as Control };

export namespace Control {
  export type State = FieldControlState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = FieldControlProps.Render;

    export type SuruUI = FieldControlProps.SuruUI;

    export type BaseUI = FieldControlProps.BaseUI;

    export type HTML = FieldControlProps.HTML;
  }

  export type ChangeEventDetails = FieldControlChangeEventDetails;

  export type ChangeEventReason = FieldControlChangeEventReason;
}
