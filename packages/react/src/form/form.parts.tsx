import { Form } from "@base-ui/react/form";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
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

export namespace FormRootProps {
  export type Render = RenderProps<FormRootState>;

  export type SuruUI = {};

  export type BaseUI<TValues extends FormRootValues = FormRootValues> = Omit<
    React.ComponentProps<typeof Form<TValues>>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"form">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof Form<any>>
  >;
}

/**
 * {@link FormRoot} に渡す props です。
 *
 * @template TValues フォームの入力値を表す型です。
 */
export type FormRootProps<TValues extends FormRootValues = FormRootValues> = FormRootProps.Render &
  FormRootProps.SuruUI &
  FormRootProps.BaseUI<TValues> &
  FormRootProps.HTML;

interface IFormRoot extends IComponent<FormRootProps> {
  /**
   * @template TValues フォームの入力値を表す型です。
   */
  <TValues extends FormRootValues = FormRootValues>(
    props: FormRootProps<TValues>,
  ): IComponent.Return;
}

/**
 * フォームのルートコンポーネントです。
 */
export const FormRoot: IFormRoot = function SuiFormRoot(props: FormRootProps) {
  const {
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return <Form {...otherProps} className={cn(className, "sui_form")} data-scope={dataScope} />;
};

export { FormRoot as Root };

export namespace Root {
  export type State = FormRootState;

  export type Props<TValues extends FormRootValues = FormRootValues> = Props.Render &
    Props.SuruUI &
    Props.BaseUI<TValues> &
    Props.HTML;

  export namespace Props {
    export type Render = FormRootProps.Render;

    export type SuruUI = FormRootProps.SuruUI;

    export type BaseUI<TValues extends FormRootValues = FormRootValues> =
      FormRootProps.BaseUI<TValues>;

    export type HTML = FormRootProps.HTML;
  }

  export type Actions = FormRootActions;

  export type SubmitEventDetails = FormRootSubmitEventDetails;

  export type SubmitEventReason = FormRootSubmitEventReason;

  export type ValidationMode = FormRootValidationMode;

  export type Values<TValues extends FormRootValues = FormRootValues> = FormRootValues<TValues>;
}
