import * as React from "react";

import type { IComponent } from "../../types.js";
import {
  type FieldItemProps,
  type FieldRootProps,
  type FieldRootState,
  type FieldErrorProps,
  type FieldLabelProps,
  type FieldRootActions,
  type FieldControlProps,
  type FieldValidityProps,
  type FieldDescriptionProps,
  FieldItem,
  FieldRoot,
  FieldError,
  FieldLabel,
  FieldControl,
  FieldValidity,
  FieldDescription,
} from "./field.parts.jsx";

/**
 * {@link Field} を命令的に操作するためのオブジェクトです。
 */
export type FieldActions = FieldRootActions;

/**
 * エラーを表示する検証状態です。
 *
 * @see https://developer.mozilla.org/docs/Web/API/ValidityState
 */
export type FieldErrorMatch = Extract<NonNullable<FieldErrorProps["match"]>, string>;

/**
 * {@link Field} に表示するエラーメッセージと検証状態の対応を指定します。
 *
 * 文字列または文字列の配列を指定すると、対応する検証状態の既定メッセージを表示します。オブジェクトを指定すると、検証状態ごとのメッセージを指定できます。
 */
export type FieldErrorMatches =
  | boolean
  | FieldErrorMatch
  | readonly FieldErrorMatch[]
  | { readonly [_ in FieldErrorMatch]?: React.ReactNode };

/**
 * {@link Field} の各パーツに渡すプロパティーです。
 */
export type FieldSlotProps = {
  /**
   * {@link FieldDescription} に渡すプロパティーです。
   */
  readonly description?: FieldDescriptionProps | undefined;

  /**
   * {@link FieldError} に渡すプロパティーです。
   */
  readonly error?: FieldErrorProps | undefined;

  /**
   * {@link FieldLabel} に渡すプロパティーです。
   */
  readonly label?: FieldLabelProps | undefined;
};

/**
 * {@link Field} の状態です。
 */
export type FieldState = FieldRootState;

/**
 * {@link Field} コンポーネントのプロパティーです。
 */
export type FieldProps = FieldRootProps & {
  /**
   * 入力欄の下に表示する説明文です。
   */
  description?: FieldDescriptionProps["children"] | undefined;

  /**
   * 表示するエラーメッセージの検証状態を指定します。
   *
   * `false` を指定すると、エラーメッセージを表示しません。
   *
   * @default true
   */
  errorMatches?: FieldErrorMatches | undefined;

  /**
   * 入力欄の上に表示するラベルです。
   */
  label?: FieldLabelProps["children"] | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   *
   * 各パーツのプロパティーが優先されます。
   */
  slotProps?: FieldSlotProps | undefined;

  /**
   * 入力欄の検証状態に応じて表示する内容です。
   */
  validity?: FieldValidityProps["children"] | undefined;
};

interface FieldComponentType extends IComponent<FieldProps> {
  /**
   * {@link FieldControl} です。
   */
  readonly Control: IComponent<FieldControlProps>;

  /**
   * {@link FieldItem} です。
   */
  readonly Item: IComponent<FieldItemProps>;
}

/**
 * フィールドを表示するコンポーネントです。
 *
 * ラベル、入力欄、エラーメッセージ、説明文をグループ化し、検証状態を管理します。
 */
export const Field: FieldComponentType = /*#__PURE__*/ Object.assign(
  function SuiField(props: FieldProps) {
    const {
      label,
      children,
      validity,
      slotProps: { error: errorProps, label: labelProps, description: descriptionProps } = {},
      description,
      errorMatches = true,
      ...rootProps
    } = props;

    return (
      <FieldRoot {...rootProps}>
        {("label" in props || !!labelProps) && <FieldLabel children={label} {...labelProps} />}
        {children}
        {("description" in props || !!descriptionProps) && (
          <FieldDescription children={description} {...descriptionProps} />
        )}
        {(errorMatches !== false || !!errorProps) &&
          ((matches, props) => {
            if (typeof matches === "boolean" || typeof matches === "string") {
              return <FieldError match={matches} {...props} />;
            }

            if (Array.isArray(matches)) {
              matches = [...new Set(matches)];
              return matches.length > 0
                ? matches.map((match) => <FieldError key={match} match={match} {...props} />)
                : null;
            }

            const entries = Object.entries(matches) as [FieldErrorMatch, React.ReactNode][];
            return entries.map(([match, children]) => (
              <FieldError key={match} match={match} children={children} {...props} />
            ));
          })(errorMatches, errorProps)}
        {typeof validity === "function" && <FieldValidity>{validity}</FieldValidity>}
      </FieldRoot>
    );
  },
  {
    Item: FieldItem,
    Control: FieldControl,
  },
);

/**
 * {@link Field} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Field {
  /**
   * {@link FieldState} です。
   */
  export type State = FieldState;

  /**
   * {@link FieldProps} です。
   */
  export type Props = FieldProps;

  /**
   * {@link FieldSlotProps} です。
   */
  export type SlotProps = FieldSlotProps;

  /**
   * {@link FieldActions} です。
   */
  export type Actions = FieldActions;

  /**
   * {@link FieldErrorMatch} です。
   */
  export type ErrorMatch = FieldErrorMatch;

  /**
   * {@link FieldErrorMatches} です。
   */
  export type ErrorMatches = FieldErrorMatches;
}
