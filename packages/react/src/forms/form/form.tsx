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
 * {@link FormRootValues} です。
 */
export type FormValues<TValues extends FormRootValues = FormRootValues> = FormRootValues<TValues>;

/**
 * {@link FormRootActions} です。
 */
export type FormActions = FormRootActions;

/**
 * {@link FormRootValidationMode} です。
 */
export type FormValidationMode = FormRootValidationMode;

/**
 * {@link FormRootSubmitEventReason} です。
 */
export type FormSubmitEventReason = FormRootSubmitEventReason;

/**
 * {@link FormRootSubmitEventDetails} です。
 */
export type FormSubmitEventDetails = FormRootSubmitEventDetails;

/**
 * {@link FormRootState} です。
 */
export type FormState = FormRootState;

/**
 * {@link FormRootProps} です。
 */
export type FormProps<TValues extends FormValues = FormValues> = FormRootProps<TValues>;

interface FormComponentType extends IComponent<FormProps> {
  <TValues extends FormValues>(props: FormProps<TValues>): React.ReactElement | null;
}

/**
 * {@link FormRoot} です。
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
  export type Props<TValues extends Values = Values> = FormProps<TValues>;

  /**
   * {@link FormActions} です。
   */
  export type Actions = FormActions;

  /**
   * {@link FormSubmitEventDetails} です。
   */
  export type SubmitEventDetails = FormSubmitEventDetails;

  /**
   * {@link FormSubmitEventReason} です。
   */
  export type SubmitEventReason = FormSubmitEventReason;

  /**
   * {@link FormValidationMode} です。
   */
  export type ValidationMode = FormValidationMode;

  /**
   * {@link FormValues} です。
   */
  export type Values<TValues extends FormValues = FormValues> = FormValues<TValues>;
}
