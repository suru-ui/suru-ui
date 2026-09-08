import { Form } from "@base-ui/react/form";
import * as React from "react";

import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./form.css";

// Root
// ----

/**
 * {@link FormRoot} を命令的に操作するためのオブジェクトです。
 */
export type FormRootActions = Form.Actions;

/**
 * {@link FormRoot} が送信されたイベントの詳細です。
 */
export type FormRootSubmitEventDetails = Form.SubmitEventDetails;

/**
 * {@link FormRoot} が送信された理由です。
 */
export type FormRootSubmitEventReason = Form.SubmitEventReason;

/**
 * {@link FormRoot} の検証を行うタイミングを決定します。
 *
 * - `"onBlur"`: フィールドからフォーカスが外れたときに検証を行います。
 * - `"onChange"`: 値が変更されるたびに検証を行います。
 * - `"onSubmit"`: フォーム送信時にフィールドを検証し、それ以降は値が変更されるたびに再検証を行います。
 */
export type FormRootValidationMode = Form.ValidationMode;

/**
 * {@link FormRoot} の入力値を表す型です。
 *
 * @template TValues フォームの入力値を表す型です。
 */
export type FormRootValues<TValues extends Record<string, any> = Record<string, any>> =
  Form.Values<TValues>;

/**
 * {@link FormRoot} が持つ状態です。
 */
export type FormRootState = Form.State;

/**
 * {@link FormRoot} に渡す props です。
 *
 * @template TValues フォームの入力値を表す型です。
 */
export type FormRootProps<TValues extends FormRootValues = FormRootValues> = React.ComponentProps<
  typeof Form<TValues>
>;

interface IFormRoot extends IComponent<FormRootProps> {
  /**
   * @template TValues フォームの入力値を表す型です。
   */
  <TValues extends FormRootValues = FormRootValues>(props: FormRootProps<TValues>): IComponent.Return;
}

/**
 * フォームのルートコンポーネントです。
 */
export const FormRoot: IFormRoot = function SuiFormRoot(props: FormRootProps) {
  const { className, ...otherProps } = props;

  return <Form {...otherProps} className={cn(className, "sui_form")} data-scope="" />;
};

export { FormRoot as Root };

export namespace Root {
  /**
   * {@link FormRootState}
   */
  export type State = FormRootState;

  /**
   * {@link FormRootProps}
   */
  export type Props<TValues extends FormRootValues = FormRootValues> = FormRootProps<TValues>;

  /**
   * {@link FormRootActions}
   */
  export type Actions = FormRootActions;

  /**
   * {@link FormRootSubmitEventDetails}
   */
  export type SubmitEventDetails = FormRootSubmitEventDetails;

  /**
   * {@link FormRootSubmitEventReason}
   */
  export type SubmitEventReason = FormRootSubmitEventReason;

  /**
   * {@link FormRootValidationMode}
   */
  export type ValidationMode = FormRootValidationMode;

  /**
   * {@link FormRootValues}
   */
  export type Values<TValues extends FormRootValues = FormRootValues> = FormRootValues<TValues>;
}
