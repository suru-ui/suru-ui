import type { Component } from "../../types.js";
import * as FormParts from "./form.parts.jsx";

/**
 * {@link Form} コンポーネントのプロパティーです。
 *
 * @template FormValues フォームの入力値を表す型です。
 */
export type FormProps<FormValues extends Record<string, any> = Record<string, any>> =
  FormParts.Root.Props<FormValues>;

/**
 * フォームを表示するコンポーネントです。
 *
 * 一括のエラーハンドリングとバリデーションを提供し、`<Field.Root>` と組み合わせて使用します。
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
