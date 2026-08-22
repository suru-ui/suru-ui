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

/**
 * {@link Form} の各パーツに渡すプロパティーです。
 */
export type FormPartsProps<TValues extends FormValues = FormValues> = {
  /**
   * {@link FormRoot} に渡すプロパティーです。
   */
  readonly root: FormRootProps<TValues>;
};

/**
 * {@link Form} の各パーツに渡すプロパティーを作るフックです。
 */
export function useForm<TValues extends FormValues = FormValues>(
  props: FormProps<TValues>,
): FormPartsProps<TValues> {
  return { root: props };
}

interface FormComponentType extends IComponent<FormProps> {
  <TValues extends FormValues>(props: FormProps<TValues>): React.ReactElement | null;
}

/**
 * {@link FormRoot} です。
 */
export const Form: FormComponentType = function SuiForm(props: FormProps) {
  const partsProps = useForm(props);

  return <FormRoot {...partsProps.root} />;
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
