import { Field } from "@base-ui/react/field";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link FieldError} が持つ状態です。
 */
export type FieldErrorState = Field.Error.State;

export namespace FieldErrorProps {
  export type Render = RenderProps<FieldErrorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Field.Error>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // FieldErrorProps:
      "match",
      keyof Render | keyof SuruUI
    >
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

/**
 * フィールドのエラーメッセージコンポーネントです。
 *
 * 検証に失敗したときに表示されます。
 */
export const FieldError: IComponent<FieldErrorProps> = function SuiFieldError(props) {
  const { className, ...otherProps } = props;

  return <Field.Error {...otherProps} className={cn(className, "sui_field_error")} />;
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
