import { Form } from "@base-ui/react/form";
import * as React from "react";

import cn from "../../cn.js";
import type { Component } from "../../types.js";

import "./form.css";

/**
 * {@link Root} の状態です。
 */
export type FormRootState = Form.State;

/**
 * {@link Root} に渡すプロパティーです。
 *
 * @template FormValues フォームの入力値を表す型です。
 */
export type FormRootProps<FormValues extends Record<string, any> = Record<string, any>> =
  React.ComponentProps<typeof Form<FormValues>>;

/**
 * フォームのルート要素です。
 *
 * Base UI の {@link Form} をラップし、一括のエラーハンドリングと検証を提供します。
 * `<Field.Root>` と組み合わせて使用します。
 *
 * @example
 * ```tsx
 * <FormRoot
 *   errors={errors}
 *   onFormSubmit={(formValues) => {
 *     setErrors(validate(formValues));
 *   }}
 * >
 *   <Field.Root name="email">
 *     <Field.Control required />
 *     <Field.Error />
 *   </Field.Root>
 * </FormRoot>
 * ```
 */
export const FormRoot: Component<FormRootProps> = function SuiFormRoot(props) {
  const { className, ...otherProps } = props;

  return <Form {...otherProps} className={cn(className, "sui_form")} />;
};

export namespace Root {
  export type State = FormRootState;
  export type Props<FormValues extends Record<string, any> = Record<string, any>> =
    FormRootProps<FormValues>;
}

export const Root: Component<Root.Props> = FormRoot;
