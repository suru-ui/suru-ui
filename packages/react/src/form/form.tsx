import type { IComponent } from "../types.js";
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

// Types
// -----

/**
 * {@link FormRootActions}
 */
export type FormActions = FormRootActions;

/**
 * {@link FormRootSubmitEventDetails}
 */
export type FormSubmitEventDetails = FormRootSubmitEventDetails;

/**
 * {@link FormRootSubmitEventReason}
 */
export type FormSubmitEventReason = FormRootSubmitEventReason;

/**
 * {@link FormRootValidationMode}
 */
export type FormValidationMode = FormRootValidationMode;

/**
 * {@link FormRootValues}
 */
export type FormValues<TValues extends FormRootValues = FormRootValues> = FormRootValues<TValues>;

/**
 * {@link Form} が持つ状態です。
 */
export type FormState = FormRootState;

/**
 * {@link Form} に渡す props です。
 */
export type FormProps<TValues extends FormValues = FormValues> = FormRootProps<TValues>;

// API
// ---

/**
 * {@link Form} を構成する各パーツの props を作成するための API です。
 */
export interface FormAPI<TValues extends FormValues = FormValues> {
  /**
   * {@link FormRoot} に渡す props を取得します。
   */
  getRootProps(): FormRootProps<TValues>;
}

interface IUseFormAPI {
  /**
   * {@link FormAPI} を作成します。
   *
   * @param props {@link Form} の props です。
   * @returns フォームの API です
   */
  <TValues extends FormValues = FormValues>(props: FormProps<TValues>): FormAPI<TValues>;
}

/**
 * {@link FormAPI} を作成するフックです。
 */
export const useFormAPI: IUseFormAPI = function useSuiFormAPI(props) {
  return {
    getRootProps() {
      return props;
    },
  };
};

export { type FormAPI as API, useFormAPI as useAPI };

// Component
// ---------

interface IForm extends IComponent<FormProps> {
  /**
   * @template TValues フォームの入力値を表す型です。
   */
  <TValues extends FormValues>(props: FormProps<TValues>): IComponent.Return;
}

/**
 * フォームを表示するコンポーネントです。
 *
 * フィールドの検証状態をまとめ、送信時に値を集めます。
 */
export const Form: IForm = function SuiForm(props: FormProps) {
  const api = useFormAPI(props);

  return <FormRoot {...api.getRootProps()} />;
};

export namespace Form {
  /**
   * {@link FormState}
   */
  export type State = FormState;

  /**
   * {@link FormProps}
   */
  export type Props<TValues extends Values = Values> = FormProps<TValues>;

  /**
   * {@link FormActions}
   */
  export type Actions = FormActions;

  /**
   * {@link FormSubmitEventDetails}
   */
  export type SubmitEventDetails = FormSubmitEventDetails;

  /**
   * {@link FormSubmitEventReason}
   */
  export type SubmitEventReason = FormSubmitEventReason;

  /**
   * {@link FormValidationMode}
   */
  export type ValidationMode = FormValidationMode;

  /**
   * {@link FormValues}
   */
  export type Values<TValues extends FormValues = FormValues> = FormValues<TValues>;
}
