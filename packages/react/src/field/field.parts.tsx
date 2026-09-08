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
 * {@link FieldRoot} の妥当性の詳細です。
 */
export type FieldRootValidityData = Field.ValidityData;

/**
 * {@link FieldRoot} が持つ状態です。
 */
export type FieldRootState = Field.Root.State;

/**
 * {@link FieldRoot} に渡す props です。
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
      data-scope=""
    />
  );
};

export { FieldRoot as Root };

/**
 * {@link FieldRoot} の状態や props をまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link FieldRootState}
   */
  export type State = FieldRootState;

  /**
   * {@link FieldRootProps}
   */
  export type Props = FieldRootProps;

  /**
   * {@link FieldRootActions}
   */
  export type Actions = FieldRootActions;

  /**
   * {@link FieldRootValidityData}
   */
  export type ValidityData = FieldRootValidityData;
}

// Label
// -----

/**
 * {@link FieldLabel} が持つ状態です。
 */
export type FieldLabelState = Field.Label.State;

/**
 * {@link FieldLabel} に渡す props です。
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

export { FieldLabel as Label };

/**
 * {@link FieldLabel} の状態や props をまとめた型名前空間です。
 */
export namespace Label {
  /**
   * {@link FieldLabelState}
   */
  export type State = FieldLabelState;

  /**
   * {@link FieldLabelProps}
   */
  export type Props = FieldLabelProps;
}

// Control
// -------

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

/**
 * {@link FieldControl} に渡す props です。
 */
export type FieldControlProps = React.ComponentProps<typeof Field.Control>;

/**
 * フィールドの入力欄コンポーネントです。
 */
export const FieldControl: IComponent<FieldControlProps> = function SuiFieldControl(props) {
  const { className, ...otherProps } = props;

  return <Field.Control {...otherProps} className={cn(className, "sui_field_control")} />;
};

export { FieldControl as Control };

/**
 * {@link FieldControl} の状態や props をまとめた型名前空間です。
 */
export namespace Control {
  /**
   * {@link FieldControlState}
   */
  export type State = FieldControlState;

  /**
   * {@link FieldControlProps}
   */
  export type Props = FieldControlProps;

  /**
   * {@link FieldControlChangeEventDetails}
   */
  export type ChangeEventDetails = FieldControlChangeEventDetails;

  /**
   * {@link FieldControlChangeEventReason}
   */
  export type ChangeEventReason = FieldControlChangeEventReason;
}

// Description
// -----------

/**
 * {@link FieldDescription} が持つ状態です。
 */
export type FieldDescriptionState = Field.Description.State;

/**
 * {@link FieldDescription} に渡す props です。
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

export { FieldDescription as Description };

/**
 * {@link FieldDescription} の状態や props をまとめた型名前空間です。
 */
export namespace Description {
  /**
   * {@link FieldDescriptionState}
   */
  export type State = FieldDescriptionState;

  /**
   * {@link FieldDescriptionProps}
   */
  export type Props = FieldDescriptionProps;
}

// Error
// -----

/**
 * {@link FieldError} が持つ状態です。
 */
export type FieldErrorState = Field.Error.State;

/**
 * {@link FieldError} に渡す props です。
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

export { FieldError as Error };

/**
 * {@link FieldError} の状態や props をまとめた型名前空間です。
 */
export namespace Error {
  /**
   * {@link FieldErrorState}
   */
  export type State = FieldErrorState;

  /**
   * {@link FieldErrorProps}
   */
  export type Props = FieldErrorProps;
}

// Item
// ----

/**
 * {@link FieldItem} が持つ状態です。
 */
export type FieldItemState = Field.Item.State;

/**
 * {@link FieldItem} に渡す props です。
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

export { FieldItem as Item };

/**
 * {@link FieldItem} の状態や props をまとめた型名前空間です。
 */
export namespace Item {
  /**
   * {@link FieldItemState}
   */
  export type State = FieldItemState;

  /**
   * {@link FieldItemProps}
   */
  export type Props = FieldItemProps;
}

// Validity
// --------

/**
 * {@link FieldValidity} が持つ状態です。
 */
export type FieldValidityState = Field.Validity.State;

/**
 * {@link FieldValidity} に渡す props です。
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

export { FieldValidity as Validity };

/**
 * {@link FieldValidity} の状態や props をまとめた型名前空間です。
 */
export namespace Validity {
  /**
   * {@link FieldValidityState}
   */
  export type State = FieldValidityState;

  /**
   * {@link FieldValidityProps}
   */
  export type Props = FieldValidityProps;
}
