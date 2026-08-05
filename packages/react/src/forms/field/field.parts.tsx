import { Field } from "@base-ui/react/field";
import * as React from "react";

import cn from "../../cn.js";
import type { Component } from "../../types.js";
import { type InputRootProps, InputRoot } from "../input/input.parts.jsx";

import "./field.css";

// Root
// ----

/**
 * {@link Root} の状態です。
 */
export type FieldRootState = Field.Root.State;

/**
 * {@link Root} に渡すプロパティーです。
 */
export type FieldRootProps = React.ComponentProps<typeof Field.Root>;

/**
 * フィールドのルート要素です。
 *
 * ラベル、入力欄、エラーメッセージ、説明文をグループ化し、バリデーション状態を管理します。
 *
 * @example
 * ```tsx
 * <FieldParts.Root name="email">
 *   <FieldParts.Label>メールアドレス</FieldParts.Label>
 *   <FieldParts.Control required />
 *   <FieldParts.Error match="valueMissing">メールアドレスを入力してください</FieldParts.Error>
 * </FieldParts.Root>
 * ```
 */
export const FieldRoot: Component<FieldRootProps> = function SuiFieldRoot(props) {
  const { className, ...otherProps } = props;

  return <Field.Root {...otherProps} className={cn(className, "sui_field")} />;
};

export namespace Root {
  export type State = FieldRootState;
  export type Props = FieldRootProps;
}

export const Root: Component<Root.Props> = FieldRoot;

// Label
// -----

/**
 * {@link Label} の状態です。
 */
export type FieldLabelState = Field.Label.State;

/**
 * {@link Label} に渡すプロパティーです。
 */
export type FieldLabelProps = React.ComponentProps<typeof Field.Label>;

/**
 * フィールドのラベル要素です。
 *
 * 自動的に入力欄と関連付けられ、クリックで入力欄にフォーカスされます。
 *
 * @example
 * ```tsx
 * <FieldParts.Label>名前</FieldParts.Label>
 * ```
 */
export const FieldLabel: Component<FieldLabelProps> = function SuiFieldLabel(props) {
  const { className, ...otherProps } = props;

  return <Field.Label {...otherProps} className={cn(className, "sui_field_label")} />;
};

export namespace Label {
  export type State = FieldLabelState;
  export type Props = FieldLabelProps;
}

export const Label: Component<Label.Props> = FieldLabel;

// Control
// -------

/**
 * {@link Control} の状態です。
 */
export type FieldControlState = Field.Control.State;

/**
 * {@link Control} に渡すプロパティーです。
 */
export type FieldControlProps = InputRootProps;

/**
 * フィールドの入力欄要素です。
 *
 * {@link Input} と同じ見た目とプロパティーを持ち、フィールドのバリデーション状態に連動します。
 *
 * @example
 * ```tsx
 * <FieldParts.Control required placeholder="例: 田中 太郎" />
 * ```
 */
export const FieldControl: Component<FieldControlProps> = InputRoot;

export namespace Control {
  export type State = FieldControlState;
  export type Props = FieldControlProps;
}

export const Control: Component<Control.Props> = FieldControl;

// Description
// -----------

/**
 * {@link Description} の状態です。
 */
export type FieldDescriptionState = Field.Description.State;

/**
 * {@link Description} に渡すプロパティーです。
 */
export type FieldDescriptionProps = React.ComponentProps<typeof Field.Description>;

/**
 * フィールドの補足説明要素です。
 *
 * 入力欄の補助情報を表示します。
 *
 * @example
 * ```tsx
 * <FieldParts.Description>プロフィールに表示されます</FieldParts.Description>
 * ```
 */
export const FieldDescription: Component<FieldDescriptionProps> = function SuiFieldDescription(
  props,
) {
  const { className, ...otherProps } = props;

  return <Field.Description {...otherProps} className={cn(className, "sui_field_description")} />;
};

export namespace Description {
  export type State = FieldDescriptionState;
  export type Props = FieldDescriptionProps;
}

export const Description: Component<Description.Props> = FieldDescription;

// Error
// -----

/**
 * {@link Error} の状態です。
 */
export type FieldErrorState = Field.Error.State;

/**
 * {@link Error} に渡すプロパティーです。
 */
export type FieldErrorProps = React.ComponentProps<typeof Field.Error>;

/**
 * フィールドのエラーメッセージ要素です。
 *
 * バリデーションに失敗したときに表示されます。
 *
 * @example
 * ```tsx
 * <FieldParts.Error match="valueMissing">名前を入力してください</FieldParts.Error>
 * ```
 */
export const FieldError: Component<FieldErrorProps> = function SuiFieldError(props) {
  const { className, ...otherProps } = props;

  return <Field.Error {...otherProps} className={cn(className, "sui_field_error")} />;
};

export namespace Error {
  export type State = FieldErrorState;
  export type Props = FieldErrorProps;
}

export const Error: Component<Error.Props> = FieldError;

// Item
// ----

/**
 * {@link Item} の状態です。
 */
export type FieldItemState = Field.Item.State;

/**
 * {@link Item} に渡すプロパティーです。
 */
export type FieldItemProps = React.ComponentProps<typeof Field.Item>;

/**
 * チェックボックスグループやラジオグループの個別項目をグループ化する要素です。
 *
 * ラベルと説明文をラップして 1 つの項目としてまとめます。
 *
 * @example
 * ```tsx
 * <FieldParts.Item>
 *   <Checkbox value="option-a" />
 *   <FieldParts.Label>選択肢 A</FieldParts.Label>
 *   <FieldParts.Description>説明文</FieldParts.Description>
 * </FieldParts.Item>
 * ```
 */
export const FieldItem: Component<FieldItemProps> = function SuiFieldItem(props) {
  const { className, ...otherProps } = props;

  return <Field.Item {...otherProps} className={cn(className, "sui_field_item")} />;
};

export namespace Item {
  export type State = FieldItemState;
  export type Props = FieldItemProps;
}

export const Item: Component<Item.Props> = FieldItem;

// Validity
// --------

/**
 * {@link Validity} の状態です。
 */
export type FieldValidityState = Field.Validity.State;

/**
 * {@link Validity} に渡すプロパティーです。
 */
export type FieldValidityProps = React.ComponentProps<typeof Field.Validity>;

/**
 * フィールドのバリデーション状態に応じてカスタムメッセージを表示する要素です。
 *
 * `children` にはバリデーション状態を受け取る関数を指定します。
 *
 * @example
 * ```tsx
 * <FieldParts.Validity>
 *   {({ validity }) => (validity.valueMissing ? "必須項目です" : null)}
 * </FieldParts.Validity>
 * ```
 */
export const FieldValidity: Component<FieldValidityProps> = function SuiFieldValidity(props) {
  return <Field.Validity {...props} />;
};

export namespace Validity {
  export type State = FieldValidityState;
  export type Props = FieldValidityProps;
}

export const Validity: Component<Validity.Props> = FieldValidity;
