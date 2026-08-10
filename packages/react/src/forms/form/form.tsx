import type { Component } from "../../types.js";
import * as FormParts from "./form.parts.jsx";

/**
 * {@link Form} コンポーネントのプロパティーです。
 *
 * @template FormValues フォームの入力値を表す型です。
 *
 * `validationMode` は `"onSubmit"`、`"onBlur"`、`"onChange"` を指定でき、既定値は `"onSubmit"` です。
 * 子要素の {@link FormParts.Root.Props} にあるフィールド単位の設定がフォーム全体の設定より優先されます。
 * `errors`、`onFormSubmit`、`actionsRef` の変更は、それぞれ外部エラー、送信処理、命令的な検証操作に反映されます。
 */
export type FormProps<FormValues extends Record<string, unknown> = Record<string, string>> =
  FormParts.Root.Props<FormValues>;

/**
 * フォームを表示するコンポーネントです。
 *
 * 一括のエラーハンドリングと検証を提供し、`<Field.Root>` と組み合わせて使用します。
 *
 * @example サーバーエラーの表示
 * ```tsx
 * const [errors, setErrors] = React.useState({});
 *
 * <Form
 *   errors={errors}
 *   onFormSubmit={async (formValues) => {
 *     const response = await submit(formValues);
 *     setErrors(response.errors);
 *   }}
 * >
 *   <Field.Root name="username">
 *     <Field.Control required />
 *     <Field.Error />
 *   </Field.Root>
 *   <Button type="submit">送信</Button>
 * </Form>
 * ```
 */
export const Form: Component<FormProps> = function SuiForm(props) {
  return <FormParts.Root {...props} />;
};
