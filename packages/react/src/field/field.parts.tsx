import { Field } from "@base-ui/react/field";
import * as React from "react";

import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./field.css";

// Root
// ----

/**
 * {@link FieldRoot} を命令的に操作するためのオブジェクトです。
 */
export type FieldRootActions = Field.Root.Actions;

/**
 * {@link FieldRoot} の状態です。
 */
export type FieldRootState = Field.Root.State;

/**
 * {@link FieldRoot} に渡すプロパティーです。
 */
export type FieldRootProps = React.ComponentProps<typeof Field.Root>;

/**
 * フィールドのルートコンポーネントです。
 *
 * ラベル、入力欄、エラーメッセージ、説明文をグループ化し、検証状態を管理します。
 */
export const FieldRoot: IComponent<FieldRootProps> = function SuiFieldRoot(props) {
  const { className, ...otherProps } = props;

  return (
    <Field.Root
      {...otherProps}
      className={cn(className, "sui_field", (state) => state.disabled && "sui_field-disabled")}
    />
  );
};

/**
 * {@link FieldRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link FieldRootState} です。
   */
  export type State = FieldRootState;

  /**
   * {@link FieldRootProps} です。
   */
  export type Props = FieldRootProps;

  /**
   * {@link FieldRootActions} です。
   */
  export type Actions = FieldRootActions;
}

/**
 * {@link FieldRoot} です。
 */
export const Root: IComponent<Root.Props> = FieldRoot;

// Label
// -----

/**
 * {@link FieldLabel} の状態です。
 */
export type FieldLabelState = Field.Label.State;

/**
 * {@link FieldLabel} に渡すプロパティーです。
 */
export type FieldLabelProps = React.ComponentProps<typeof Field.Label>;

/**
 * フィールドのラベルコンポーネントです。
 *
 * 自動的に入力欄と関連付けられ、クリックで入力欄にフォーカスされます。
 */
export const FieldLabel: IComponent<FieldLabelProps> = function SuiFieldLabel(props) {
  const { className, ...otherProps } = props;

  return <Field.Label {...otherProps} className={cn(className, "sui_field_label")} />;
};

/**
 * {@link FieldLabel} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Label {
  /**
   * {@link FieldLabelState} です。
   */
  export type State = FieldLabelState;

  /**
   * {@link FieldLabelProps} です。
   */
  export type Props = FieldLabelProps;
}

/**
 * {@link FieldLabel} です。
 */
export const Label: IComponent<Label.Props> = FieldLabel;

// Control
// -------

/**
 * {@link FieldControl} の値が変更された理由です。
 */
export type FieldControlChangeEventReason = Field.Control.ChangeEventReason;

/**
 * {@link FieldControl} の値が変更されたイベントの詳細です。
 */
export type FieldControlChangeEventDetails = Field.Control.ChangeEventDetails;

/**
 * {@link FieldControl} の状態です。
 */
export type FieldControlState = Field.Control.State;

/**
 * {@link FieldControl} に渡すプロパティーです。
 */
export type FieldControlProps = React.ComponentProps<typeof Field.Control>;

/**
 * フィールドの入力欄コンポーネントです。
 */
export const FieldControl: IComponent<FieldControlProps> = function SuiFieldControl(props) {
  const { className, ...otherProps } = props;

  return <Field.Control {...otherProps} className={cn(className, "sui_field_control")} />;
};

/**
 * {@link FieldControl} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Control {
  /**
   * {@link FieldControlState} です。
   */
  export type State = FieldControlState;

  /**
   * {@link FieldControlProps} です。
   */
  export type Props = FieldControlProps;

  /**
   * {@link FieldControlChangeEventDetails} です。
   */
  export type ChangeEventDetails = FieldControlChangeEventDetails;

  /**
   * {@link FieldControlChangeEventReason} です。
   */
  export type ChangeEventReason = FieldControlChangeEventReason;
}

/**
 * {@link FieldControl} です。
 */
export const Control: IComponent<Control.Props> = FieldControl;

// Description
// -----------

/**
 * {@link FieldDescription} の状態です。
 */
export type FieldDescriptionState = Field.Description.State;

/**
 * {@link FieldDescription} に渡すプロパティーです。
 */
export type FieldDescriptionProps = React.ComponentProps<typeof Field.Description>;

/**
 * フィールドの補足説明コンポーネントです。
 *
 * 入力欄の補助情報を表示します。
 */
export const FieldDescription: IComponent<FieldDescriptionProps> = function SuiFieldDescription(
  props,
) {
  const { className, ...otherProps } = props;

  return <Field.Description {...otherProps} className={cn(className, "sui_field_description")} />;
};

/**
 * {@link FieldDescription} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Description {
  /**
   * {@link FieldDescriptionState} です。
   */
  export type State = FieldDescriptionState;

  /**
   * {@link FieldDescriptionProps} です。
   */
  export type Props = FieldDescriptionProps;
}

/**
 * {@link FieldDescription} です。
 */
export const Description: IComponent<Description.Props> = FieldDescription;

// Error
// -----

/**
 * {@link FieldError} の状態です。
 */
export type FieldErrorState = Field.Error.State;

/**
 * {@link FieldError} に渡すプロパティーです。
 */
export type FieldErrorProps = React.ComponentProps<typeof Field.Error>;

/**
 * フィールドのエラーメッセージコンポーネントです。
 *
 * 検証に失敗したときに表示されます。
 */
export const FieldError: IComponent<FieldErrorProps> = function SuiFieldError(props) {
  const { className, ...otherProps } = props;

  return <Field.Error {...otherProps} className={cn(className, "sui_field_error")} />;
};

/**
 * {@link FieldError} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Error {
  /**
   * {@link FieldErrorState} です。
   */
  export type State = FieldErrorState;

  /**
   * {@link FieldErrorProps} です。
   */
  export type Props = FieldErrorProps;
}

/**
 * {@link FieldError} です。
 */
export const Error: IComponent<Error.Props> = FieldError;

// Item
// ----

/**
 * {@link FieldItem} の状態です。
 */
export type FieldItemState = Field.Item.State;

/**
 * {@link FieldItem} に渡すプロパティーです。
 */
export type FieldItemProps = React.ComponentProps<typeof Field.Item>;

/**
 * チェックボックスグループやラジオグループの個別項目をグループ化するコンポーネントです。
 *
 * ラベルと説明文をラップして 1 つの項目としてまとめます。
 */
export const FieldItem: IComponent<FieldItemProps> = function SuiFieldItem(props) {
  const { className, ...otherProps } = props;

  return <Field.Item {...otherProps} className={cn(className, "sui_field_item")} />;
};

/**
 * {@link FieldItem} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Item {
  /**
   * {@link FieldItemState} です。
   */
  export type State = FieldItemState;

  /**
   * {@link FieldItemProps} です。
   */
  export type Props = FieldItemProps;
}

/**
 * {@link FieldItem} です。
 */
export const Item: IComponent<Item.Props> = FieldItem;

// Validity
// --------

/**
 * {@link FieldValidity} の状態です。
 */
export type FieldValidityState = Field.Validity.State;

/**
 * {@link FieldValidity} に渡すプロパティーです。
 */
export type FieldValidityProps = React.ComponentProps<typeof Field.Validity>;

/**
 * フィールドの検証状態に応じてカスタムメッセージを表示するコンポーネントです。
 *
 * `children` には検証状態を受け取る関数を指定します。
 */
export const FieldValidity: IComponent<FieldValidityProps> = function SuiFieldValidity(props) {
  return <Field.Validity {...props} />;
};

/**
 * {@link FieldValidity} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Validity {
  /**
   * {@link FieldValidityState} です。
   */
  export type State = FieldValidityState;

  /**
   * {@link FieldValidityProps} です。
   */
  export type Props = FieldValidityProps;
}

/**
 * {@link FieldValidity} です。
 */
export const Validity: IComponent<Validity.Props> = FieldValidity;
