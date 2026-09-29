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
} from "./form.parts.js";

// Types
// -----

export type FormActions = FormRootActions;

export type FormSubmitEventDetails = FormRootSubmitEventDetails;

export type FormSubmitEventReason = FormRootSubmitEventReason;

export type FormValidationMode = FormRootValidationMode;

export type FormValues<TValues extends FormRootValues = FormRootValues> = FormRootValues<TValues>;

/**
 * {@link Form} が持つ状態です。
 */
export type FormState = FormRootState;

/**
 * {@link Form} に渡す props です。
 *
 * @template TValues フォームの入力値を表す型です。
 */
export type FormProps<TValues extends FormValues = FormValues> = FormRootProps<TValues>;

// API
// ---

/**
 * {@link Form} を構成する各パーツの props を作成するための API です。
 *
 * @template TValues フォームの入力値を表す型です。
 */
export class FormAPI<TValues extends FormValues = FormValues> {
  private readonly rootProps: FormRootProps<TValues>;

  /**
   * @param props {@link Form} の props です。
   * @internal
   */
  public constructor(props: FormProps<TValues>) {
    this.rootProps = props;
  }

  /**
   * {@link FormRoot} に渡す props を取得します。
   */
  public getRootProps(): FormRootProps<TValues> {
    return this.rootProps;
  }
}

export interface IUseFormAPI {
  /**
   * {@link FormAPI} を作成します。
   *
   * @template TValues フォームの入力値を表す型です。
   * @param props {@link Form} の props です。
   * @returns フォームの API です
   */
  <TValues extends FormValues = FormValues>(props: FormProps<TValues>): FormAPI<TValues>;
}

/**
 * {@link FormAPI} を作成するフックです。
 */
export const useFormAPI: IUseFormAPI = function useSuiFormAPI<TValues extends FormValues>(
  props: FormProps<TValues>,
): FormAPI<TValues> {
  return new FormAPI(props);
};

export { FormAPI as API, useFormAPI as useAPI };

// Component
// ---------

export interface IForm extends IComponent<FormProps> {
  /**
   * @template TValues フォームの入力値を表す型です。
   */
  <TValues extends FormValues = FormValues>(props: FormProps<TValues>): IComponent.Return;
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
  export type State = FormState;

  export type Props<TValues extends Values = Values> = FormProps<TValues>;

  export type Actions = FormActions;

  export type SubmitEventDetails = FormSubmitEventDetails;

  export type SubmitEventReason = FormSubmitEventReason;

  export type ValidationMode = FormValidationMode;

  export type Values<TValues extends FormValues = FormValues> = FormValues<TValues>;
}
