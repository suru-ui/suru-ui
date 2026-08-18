import type * as React from "react";

import type { IComponent } from "../../types.js";
import {
  type FormRootProps,
  type FormRootState,
  type FormRootValues,
  type FormRootActions,
  type FormRootValidationMode,
  type FormRootSubmitEventReason,
  type FormRootSubmitEventDetails,
  FormRoot,
} from "./form.parts.jsx";

/**
 * {@link Form} の入力値を表す型です。
 *
 * @template TValues フォームの入力値を表す型です。
 */
export type FormValues<TValues extends FormRootValues = FormRootValues> = FormRootValues<TValues>;

/**
 * {@link Form} を命令的に操作するためのオブジェクトです。
 */
export type FormActions = FormRootActions;

/**
 * {@link Form} の検証を行うタイミングを決定します。
 *
 * - "onSubmit": フォーム送信時にフィールドを検証し、それ以降は値が変更されるたびに再検証を行います。
 * - "onBlur": フィールドからフォーカスが外れたときに検証を行います。
 * - "onChange": 値が変更されるたびに検証を行います。
 */
export type FormValidationMode = FormRootValidationMode;

/**
 * {@link Form} が送信された理由です。
 */
export type FormSubmitEventReason = FormRootSubmitEventReason;

/**
 * {@link Form} が送信されたイベントの詳細です。
 */
export type FormSubmitEventDetails = FormRootSubmitEventDetails;

/**
 * {@link Form} の状態です。
 */
export type FormState = FormRootState;

/**
 * {@link Form} に渡すプロパティーです。
 *
 * @template TValues フォームの入力値を表す型です。
 */
export type FormProps<TValues extends FormValues = FormValues> = FormRootProps<TValues>;

interface FormComponentType extends IComponent<FormProps> {
  <TValues extends FormValues>(props: FormProps<TValues>): React.ReactElement | null;
}

/**
 * フォームを表示するコンポーネントです。
 */
export const Form: FormComponentType = function SuiForm(props: FormProps) {
  return <FormRoot {...props} />;
};

/**
 * {@link Form} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Form {
  /**
   * {@link FormState} です。
   */
  export type State = FormState;

  /**
   * {@link FormProps} です。
   */
  export type Props = FormProps;

  /**
   * {@link FormValues} です。
   *
   * @template TValues フォームの入力値を表す型です。
   */
  export type Values<TValues extends FormValues = FormValues> = FormValues<TValues>;

  /**
   * {@link FormActions} です。
   */
  export type Actions = FormActions;

  /**
   * {@link FormValidationMode} です。
   */
  export type ValidationMode = FormValidationMode;

  /**
   * {@link FormSubmitEventReason} です。
   */
  export type SubmitEventReason = FormSubmitEventReason;

  /**
   * {@link FormSubmitEventDetails} です。
   */
  export type SubmitEventDetails = FormSubmitEventDetails;
}
