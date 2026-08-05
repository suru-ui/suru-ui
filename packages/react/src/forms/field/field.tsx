import * as React from "react";

import type { Component } from "../../types.js";
import * as FieldParts from "./field.parts.jsx";

/**
 * {@link Field} コンポーネントのプロパティーです。
 */
export type FieldProps = FieldParts.Root.Props;

interface FieldComponentType extends Component<FieldProps> {
  readonly Root: Component<FieldParts.Root.Props>;
  readonly Label: Component<FieldParts.Label.Props>;
  readonly Control: Component<FieldParts.Control.Props>;
  readonly Description: Component<FieldParts.Description.Props>;
  readonly Error: Component<FieldParts.Error.Props>;
  readonly Item: Component<FieldParts.Item.Props>;
  readonly Validity: Component<FieldParts.Validity.Props>;
}

/**
 * フィールドを表示するコンポーネントです。
 *
 * ラベル、入力欄、エラーメッセージ、説明文をグループ化し、検証状態を管理します。
 * `<Form>` と組み合わせて使用できます。
 *
 * @example 基本
 * ```tsx
 * <Field.Root name="email">
 *   <Field.Label>メールアドレス</Field.Label>
 *   <Field.Control required placeholder="you@example.com" />
 *   <Field.Error match="valueMissing">メールアドレスを入力してください</Field.Error>
 *   <Field.Description>連絡先に使用されます</Field.Description>
 * </Field.Root>
 * ```
 *
 * @example 検証
 * ```tsx
 * <Field.Root
 *   name="username"
 *   validate={(value) => (value ? null : "ユーザー名を入力してください")}
 * >
 *   <Field.Control required />
 *   <Field.Error match />
 * </Field.Root>
 * ```
 */
export const Field: FieldComponentType = /*#__PURE__*/ Object.assign(
  function SuiField(props: FieldProps) {
    return <FieldParts.Root {...props} />;
  },
  {
    Item: FieldParts.Item,
    Root: FieldParts.Root,
    Error: FieldParts.Error,
    Label: FieldParts.Label,
    Control: FieldParts.Control,
    Validity: FieldParts.Validity,
    Description: FieldParts.Description,
  },
);
