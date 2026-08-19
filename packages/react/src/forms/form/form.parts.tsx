import { Form } from "@base-ui/react/form";
import * as React from "react";

import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

import "./form.css";

// Root
// ----

/**
 * {@link FormRoot} の入力値を表す型です。
 *
 * @template TValues フォームの入力値を表す型です。
 */
export type FormRootValues<TValues extends Record<string, any> = Record<string, any>> = TValues;

/**
 * {@link FormRoot} を命令的に操作するためのオブジェクトです。
 */
export type FormRootActions = Form.Actions;

/**
 * {@link FormRoot} の検証を行うタイミングを決定します。
 *
 * - `"onBlur"`: フィールドからフォーカスが外れたときに検証を行います。
 * - `"onChange"`: 値が変更されるたびに検証を行います。
 * - `"onSubmit"`: フォーム送信時にフィールドを検証し、それ以降は値が変更されるたびに再検証を行います。
 */
export type FormRootValidationMode = Form.ValidationMode;

/**
 * {@link FormRoot} が送信された理由です。
 */
export type FormRootSubmitEventReason = Form.SubmitEventReason;

/**
 * {@link FormRoot} が送信されたイベントの詳細です。
 */
export type FormRootSubmitEventDetails = Form.SubmitEventDetails;

/**
 * {@link FormRoot} の状態です。
 */
export type FormRootState = Form.State;

/**
 * {@link FormRoot} に渡すプロパティーです。
 *
 * @template TValues フォームの入力値を表す型です。
 */
export type FormRootProps<TValues extends FormRootValues = FormRootValues> = React.ComponentProps<
  typeof Form<TValues>
>;

interface FormRootComponentType extends IComponent<FormRootProps> {
  <TValues extends FormRootValues>(props: FormRootProps<TValues>): React.ReactElement | null;
}

/**
 * フォームのルートコンポーネントです。
 */
export const FormRoot: FormRootComponentType = function SuiFormRoot(props: FormRootProps) {
  const { className, ...otherProps } = props;

  return <Form {...otherProps} className={cn(className, "sui_form")} />;
};

/**
 * {@link FormRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link FormRootState} です。
   */
  export type State = FormRootState;

  /**
   * {@link FormRootProps} です。
   */
  export type Props<TValues extends FormRootValues = FormRootValues> = FormRootProps<TValues>;

  /**
   * {@link FormRootValues} です。
   */
  export type Values<TValues extends FormRootValues = FormRootValues> = FormRootValues<TValues>;

  /**
   * {@link FormRootActions} です。
   */
  export type Actions = FormRootActions;

  /**
   * {@link FormRootValidationMode} です。
   */
  export type ValidationMode = FormRootValidationMode;

  /**
   * {@link FormRootSubmitEventReason} です。
   */
  export type SubmitEventReason = FormRootSubmitEventReason;

  /**
   * {@link FormRootSubmitEventDetails} です。
   */
  export type SubmitEventDetails = FormRootSubmitEventDetails;
}

/**
 * {@link FormRoot} です。
 */
export const Root: FormRootComponentType = FormRoot;
