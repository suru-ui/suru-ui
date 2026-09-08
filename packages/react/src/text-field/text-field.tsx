import * as React from "react";

import type { IComponent, IUseContext } from "../types.js";
import {
  type TextFieldContext,
  type TextFieldRootSize,
  type TextFieldInputType,
  type TextFieldRootColor,
  type TextFieldRootProps,
  type TextFieldRootState,
  type TextFieldAddonProps,
  type TextFieldInputProps,
  type TextFieldRootRadius,
  type TextFieldRootVariant,
  type TextFieldInputChangeEventReason,
  type TextFieldInputChangeEventDetails,
  TextFieldRoot,
  TextFieldAddon,
  TextFieldInput,
  useTextFieldContext,
} from "./text-field.parts.jsx";

// Types
// -----

/**
 * {@link TextFieldInputChangeEventDetails}
 */
export type TextFieldChangeEventDetails = TextFieldInputChangeEventDetails;

/**
 * {@link TextFieldInputChangeEventReason}
 */
export type TextFieldChangeEventReason = TextFieldInputChangeEventReason;

/**
 * {@link TextFieldRootColor}
 */
export type TextFieldColor = TextFieldRootColor;

/**
 * {@link TextFieldRootRadius}
 */
export type TextFieldRadius = TextFieldRootRadius;

/**
 * {@link TextFieldRootSize}
 */
export type TextFieldSize = TextFieldRootSize;

/**
 * {@link TextFieldInputType}
 */
export type TextFieldType = TextFieldInputType;

/**
 * {@link TextFieldRootVariant}
 */
export type TextFieldVariant = TextFieldRootVariant;

/**
 * {@link TextField} の各パーツに渡す props です。
 */
export type TextFieldSlotProps = {
  /**
   * {@link TextFieldAddon} に渡す props です。
   */
  readonly addon?: Omit<TextFieldAddonProps, "children"> | undefined;

  /**
   * {@link TextFieldInput} に渡す props です。
   */
  readonly input?:
    | Omit<
        TextFieldInputProps,
        | "defaultValue"
        | "disabled"
        | "name"
        | "onValueChange"
        | "placeholder"
        | "readOnly"
        | "required"
        | "type"
        | "value"
      >
    | undefined;
};

/**
 * {@link TextField} が持つ状態です。
 */
export type TextFieldState = TextFieldRootState;

/**
 * {@link TextField} に渡す props です。
 */
export type TextFieldProps = Omit<TextFieldRootProps, "children"> &
  Pick<
    TextFieldInputProps,
    | "defaultValue"
    | "disabled"
    | "name"
    | "onValueChange"
    | "placeholder"
    | "readOnly"
    | "required"
    | "type"
    | "value"
  > & {
    /**
     * 入力欄の末尾に表示する内容です。
     */
    endAddons?: Iterable<React.ReactNode> | undefined;

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     *
     * 各パーツの props が優先されます。
     */
    slotProps?: TextFieldSlotProps | undefined;

    /**
     * 入力欄の先頭に表示する内容です。
     */
    startAddons?: Iterable<React.ReactNode> | undefined;
  };

// API
// ---

/**
 * {@link TextField} を構成する各パーツの props を作成するための API です。
 */
export interface TextFieldAPI {
  /**
   * 末尾の {@link TextFieldAddon} に渡す props の一覧を取得します。
   */
  getEndAddonsPropsList(): readonly TextFieldAddonProps[];

  /**
   * {@link TextFieldInput} に渡す props を取得します。
   */
  getInputProps(): TextFieldInputProps;

  /**
   * {@link TextFieldRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<TextFieldRootProps, "children">;

  /**
   * 先頭の {@link TextFieldAddon} に渡す props の一覧を取得します。
   */
  getStartAddonsPropsList(): readonly TextFieldAddonProps[];
}

interface IUseTextFieldAPI {
  /**
   * {@link TextFieldAPI} を作成します。
   *
   * @param props {@link TextField} の props です。
   * @returns 文字入力欄の API です
   */
  (props: TextFieldProps): TextFieldAPI;
}

/**
 * {@link TextFieldAPI} を作成するフックです。
 */
export const useTextFieldAPI: IUseTextFieldAPI = function useSuiTextFieldAPI(props) {
  const {
    name,
    type,
    value,
    disabled,
    readOnly,
    required,
    endAddons = [],
    slotProps: { addon: addonProps = {}, input: inputProps = {} } = {},
    placeholder,
    startAddons = [],
    defaultValue,
    onValueChange,
    ...otherRootProps
  } = props;

  return {
    getRootProps() {
      return otherRootProps;
    },
    getInputProps() {
      return {
        name,
        type,
        value,
        disabled,
        readOnly,
        required,
        placeholder,
        defaultValue,
        onValueChange,
        ...inputProps,
      };
    },
    getEndAddonsPropsList() {
      return (
        React.Children.map(endAddons, (addon) => ({
          ...addonProps,
          children: addon,
        })) ?? []
      );
    },
    getStartAddonsPropsList() {
      return (
        React.Children.map(startAddons, (addon) => ({
          ...addonProps,
          children: addon,
        })) ?? []
      );
    },
  };
};

export { type TextFieldAPI as API, useTextFieldAPI as useAPI };

// Component
// ---------

interface ITextField extends IComponent<TextFieldProps> {
  /**
   * {@link useTextFieldContext}
   */
  readonly useContext: IUseContext<TextFieldContext>;
}

/**
 * 文字入力欄を表示するコンポーネントです。
 *
 * 枠線の内側に入力欄と補助表示を並べ、枠線全体への操作で入力欄へ焦点を移します。
 */
export const TextField: ITextField = /*#__PURE__*/ Object.assign(
  function SuiTextField(props: TextFieldProps) {
    const api = useTextFieldAPI(props);

    return (
      <TextFieldRoot {...api.getRootProps()}>
        {api.getStartAddonsPropsList().map((addonProps, index) => (
          <TextFieldAddon key={index} {...addonProps} />
        ))}
        <TextFieldInput {...api.getInputProps()} />
        {api.getEndAddonsPropsList().map((addonProps, index) => (
          <TextFieldAddon key={index} {...addonProps} />
        ))}
      </TextFieldRoot>
    );
  },
  {
    useContext: useTextFieldContext,
  },
);

export namespace TextField {
  /**
   * {@link TextFieldState}
   */
  export type State = TextFieldState;

  /**
   * {@link TextFieldProps}
   */
  export type Props = TextFieldProps;

  /**
   * {@link TextFieldSlotProps}
   */
  export type SlotProps = TextFieldSlotProps;

  /**
   * {@link TextFieldContext}
   */
  export type Context = TextFieldContext;

  /**
   * {@link TextFieldChangeEventDetails}
   */
  export type ChangeEventDetails = TextFieldChangeEventDetails;

  /**
   * {@link TextFieldChangeEventReason}
   */
  export type ChangeEventReason = TextFieldChangeEventReason;

  /**
   * {@link TextFieldColor}
   */
  export type Color = TextFieldColor;

  /**
   * {@link TextFieldRadius}
   */
  export type Radius = TextFieldRadius;

  /**
   * {@link TextFieldSize}
   */
  export type Size = TextFieldSize;

  /**
   * {@link TextFieldType}
   */
  export type Type = TextFieldType;

  /**
   * {@link TextFieldVariant}
   */
  export type Variant = TextFieldVariant;
}
