import { Form } from "@base-ui/react/form";
import * as React from "react";

import cn from "../../cn.js";
import type { Component } from "../../types.js";

import "./form.css";

/**
 * {@link FormRoot} が公開する状態です。
 *
 * Form 自体には追加の状態がなく、Base UI の {@link Form.State} をそのまま利用します。
 */
export type FormRootState = Form.State;

/**
 * {@link FormRoot} に渡すプロパティーです。
 *
 * @template FormValues フォームの入力値を表す型です。
 *
 * `validationMode` は `"onSubmit"`、`"onBlur"`、`"onChange"` を指定できます。
 * 既定値は `"onSubmit"` で、{@link FormRoot} の子要素である {@link Field.Root} に指定した値が優先されます。
 * `errors` を変更すると外部から渡したフィールドエラーが更新され、`onFormSubmit` は送信時にフォームの値と詳細を通知します。
 */
export type FormRootProps<FormValues extends Record<string, unknown> = Record<string, string>> =
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

/**
 * {@link FormRoot} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link FormRoot} の状態型です。
   */
  export type State = FormRootState;

  /**
   * {@link FormRoot} のプロパティー型です。
   *
   * {@link FormRootProps} と同じ型です。
   */
  export type Props<FormValues extends Record<string, unknown> = Record<string, string>> =
    FormRootProps<FormValues>;
}

/**
 * {@link FormRoot} の別名です。
 */
export const Root: Component<Root.Props> = FormRoot;
