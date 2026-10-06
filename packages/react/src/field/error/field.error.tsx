import { Field } from "@base-ui/react/field";
import * as React from "react";

import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

/**
 * {@link FieldError} が持つ状態です。
 */
export type FieldErrorState = Field.Error.State;

export namespace FieldErrorProps {
  export type Render = RenderProps<FieldErrorState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Field.Error>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // FieldErrorProps より:
      "match"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Field.Error>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link FieldError} に渡す props です。
 */
export type FieldErrorProps = FieldErrorProps.Render &
  FieldErrorProps.SuruUI &
  FieldErrorProps.BaseUI &
  FieldErrorProps.HTML;

export type IFieldError = IComponent<FieldErrorProps>;

/**
 * フィールドのエラーメッセージコンポーネントです。
 *
 * 検証に失敗したときに表示されます。
 */
export const FieldError: IFieldError = function SuiFieldError(props) {
  const { className, ...otherProps } = props;

  return (
    <Field.Error
      {...otherProps}
      className={cn<FieldErrorState>(
        className,
        "sui_field_error",
        (state) => state.disabled && "sui_field_error-disabled",
        (state) => state.touched && "sui_field_error-touched",
        (state) => state.dirty && "sui_field_error-dirty",
        (state) => state.filled && "sui_field_error-filled",
        (state) => state.focused && "sui_field_error-focused",
        (state) => state.valid === false && "sui_field_error-invalid",
        (state) => state.valid === true && "sui_field_error-valid",
        (state) => state.valid === null && "sui_field_error-unverified",
        (state) =>
          state.transitionStatus !== undefined &&
          `sui_field_error-transition_status_${state.transitionStatus}`,
      )}
    />
  );
};

export { FieldError as Error };

export namespace Error {
  export type State = FieldErrorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = FieldErrorProps.Render;

    export type SuruUI = FieldErrorProps.SuruUI;

    export type BaseUI = FieldErrorProps.BaseUI;

    export type HTML = FieldErrorProps.HTML;
  }
}
