import * as React from "react";

import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import type { IComponent } from "../types.js";
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
  type FieldRootValidityData,
  FieldItem,
  FieldRoot,
  FieldError,
  FieldLabel,
  FieldControl,
  FieldValidity,
  FieldDescription,
} from "./field.parts.js";

// Types
// -----

export type FieldActions = FieldRootActions;

/**
 * エラーを表示する検証状態です。
 *
 * @see https://developer.mozilla.org/docs/Web/API/ValidityState
 */
export type FieldErrorMatch = Extract<NonNullable<FieldErrorProps["match"]>, string>;

/**
 * {@link Field} に表示するエラーメッセージと検証状態の対応です。
 *
 * 文字列または文字列の配列を指定すると、対応する検証状態の既定メッセージを表示します。
 * オブジェクトを指定すると、検証状態ごとのメッセージを指定できます。
 */
export type FieldErrorMatches =
  | boolean
  | FieldErrorMatch
  | readonly FieldErrorMatch[]
  | { readonly [_ in FieldErrorMatch]?: React.ReactNode };

export type FieldValidityData = FieldRootValidityData;

/**
 * {@link Field} の各パーツに渡す props です。
 */
export type FieldSlotProps = {
  /**
   * {@link FieldDescription} に渡す props です。
   */
  readonly description?: Omit<FieldDescriptionProps, "children"> | undefined;

  /**
   * {@link FieldError} に渡す props です。
   *
   * すべてのエラーメッセージに同じ props が渡されます。
   * `children` と `match` は上書きされません。
   */
  readonly error?: Omit<FieldErrorProps, "children" | "match"> | undefined;

  /**
   * {@link FieldLabel} に渡す props です。
   */
  readonly label?: Omit<FieldLabelProps, "children"> | undefined;

  /**
   * {@link FieldValidity} に渡す props です。
   */
  readonly validity?: Omit<FieldValidityProps, "children"> | undefined;
};

/**
 * {@link Field} が持つ状態です。
 */
export type FieldState = FieldRootState;

/**
 * {@link Field} に渡す props です。
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
   * 各パーツに個別の props を渡すためのオブジェクトです。
   */
  slotProps?: FieldSlotProps | undefined;

  /**
   * 入力欄の検証状態に応じて表示する内容です。
   */
  validity?: FieldValidityProps["children"] | undefined;
};

// API
// ---

/**
 * {@link Field} を構成する各パーツの props を作成するための API です。
 */
export interface FieldAPI {
  /**
   * {@link FieldDescription} に渡す props を取得します。
   */
  getDescriptionProps(): FieldDescriptionProps | null;

  /**
   * {@link FieldError} に渡す props の一覧を取得します。
   */
  getErrorPropsList(): readonly FieldErrorProps[];

  /**
   * {@link FieldLabel} に渡す props を取得します。
   */
  getLabelProps(): FieldLabelProps | null;

  /**
   * {@link FieldRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<FieldRootProps, "children">;

  /**
   * {@link FieldValidity} に渡す props を取得します。
   */
  getValidityProps(): FieldValidityProps | null;
}

interface IUseFieldAPI {
  /**
   * {@link FieldAPI} を作成します。
   *
   * @param props {@link Field} の props です。
   * @returns フィールドの API です
   */
  (props: FieldProps): FieldAPI;
}

/**
 * {@link FieldAPI} を作成するフックです。
 */
export const useFieldAPI: IUseFieldAPI = function useSuiFieldAPI(props) {
  const {
    label,
    children: _children,
    validity,
    slotProps: {
      error: errorProps = {},
      label: labelProps = {},
      validity: validityProps = {},
      description: descriptionProps = {},
    } = {},
    description,
    errorMatches = true,
    ...otherRootProps
  } = props;

  return {
    getRootProps() {
      return otherRootProps;
    },
    getLabelProps() {
      if (isLikelyVisibleNode(label)) {
        return {
          ...labelProps,
          children: label,
        };
      }

      return null;
    },
    getValidityProps() {
      if (typeof validity === "function") {
        return {
          ...validityProps,
          children: validity,
        };
      }

      return null;
    },
    getErrorPropsList() {
      if (errorMatches === false) {
        return [];
      }

      if (typeof errorMatches === "boolean" || typeof errorMatches === "string") {
        return [{ ...errorProps, match: errorMatches }];
      }

      if (Array.isArray(errorMatches)) {
        const matches = [...new Set(errorMatches)];

        return matches.map((match) => ({ ...errorProps, match }));
      }

      const entries = Object.entries(errorMatches) as [FieldErrorMatch, React.ReactNode][];

      return entries.map(([match, children]) => ({
        ...errorProps,
        match,
        children,
      }));
    },
    getDescriptionProps() {
      if (isLikelyVisibleNode(description)) {
        return {
          ...descriptionProps,
          children: description,
        };
      }

      return null;
    },
  };
};

export { type FieldAPI as API, useFieldAPI as useAPI };

// Component
// ---------

interface IField extends IComponent<FieldProps> {
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
export const Field: IField = /*#__PURE__*/ Object.assign(
  function SuiField(props: FieldProps) {
    const { children } = props;
    const api = useFieldAPI(props);
    const labelProps = api.getLabelProps();
    const descriptionProps = api.getDescriptionProps();
    const validityProps = api.getValidityProps();

    return (
      <FieldRoot {...api.getRootProps()}>
        {labelProps && <FieldLabel {...labelProps} />}
        {children}
        {descriptionProps && <FieldDescription {...descriptionProps} />}
        {api.getErrorPropsList().map((errorProps) => (
          <FieldError key={String(errorProps.match)} {...errorProps} />
        ))}
        {validityProps && <FieldValidity {...validityProps} />}
      </FieldRoot>
    );
  },
  {
    Item: FieldItem,
    Control: FieldControl,
  },
);

export namespace Field {
  export type State = FieldState;

  export type Props = FieldProps;

  export type SlotProps = FieldSlotProps;

  export type Actions = FieldActions;

  export type ErrorMatch = FieldErrorMatch;

  export type ErrorMatches = FieldErrorMatches;

  export type ValidityData = FieldValidityData;
}
