import * as React from "react";

import type { IComponent } from "../types.js";
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
  type IUseTextFieldContext,
  type TextFieldRootVariant,
  type TextFieldInputChangeEventReason,
  type TextFieldInputChangeEventDetails,
  TextFieldRoot,
  TextFieldAddon,
  TextFieldInput,
  useTextFieldContext,
} from "./text-field.parts.js";

// Types
// -----

export type TextFieldChangeEventDetails = TextFieldInputChangeEventDetails;

export type TextFieldChangeEventReason = TextFieldInputChangeEventReason;

export type TextFieldColor = TextFieldRootColor;

export type TextFieldRadius = TextFieldRootRadius;

export type TextFieldSize = TextFieldRootSize;

export type TextFieldType = TextFieldInputType;

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
   *
   * トップレベルに指定した入力欄の props より優先されます。
   */
  readonly input?: TextFieldInputProps | undefined;
};

/**
 * {@link TextField} が持つ状態です。
 */
export type TextFieldState = TextFieldRootState;

namespace TextFieldProps {
  export type Root = Omit<TextFieldRootProps, "children" | keyof TextField>;

  export type TextField = {
    /**
     * 入力欄の初期値です。
     *
     * {@link TextFieldProps.TextField.value|value} を指定しないときに使われます。
     */
    defaultValue?: TextFieldInputProps["defaultValue"] | undefined;

    /**
     * 入力欄を無効にするかどうかを指定します。
     */
    disabled?: TextFieldInputProps["disabled"] | undefined;

    /**
     * 入力欄の末尾に表示する内容です。
     */
    endAddons?: Iterable<React.ReactNode> | undefined;

    /**
     * フォーム送信時に使う入力欄の名前を指定します。
     */
    name?: TextFieldInputProps["name"] | undefined;

    /**
     * 入力値が変わったときに呼ばれます。
     */
    onValueChange?: TextFieldInputProps["onValueChange"] | undefined;

    /**
     * 入力欄に表示する案内文です。
     */
    placeholder?: TextFieldInputProps["placeholder"] | undefined;

    /**
     * 入力欄を読み取り専用にするかどうかを指定します。
     */
    readOnly?: TextFieldInputProps["readOnly"] | undefined;

    /**
     * 入力欄を必須にするかどうかを指定します。
     */
    required?: TextFieldInputProps["required"] | undefined;

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: TextFieldSlotProps | undefined;

    /**
     * 入力欄の先頭に表示する内容です。
     */
    startAddons?: Iterable<React.ReactNode> | undefined;

    /**
     * 入力項目です。
     *
     * @default "text"
     */
    type?: TextFieldInputProps["type"] | undefined;

    /**
     * 入力値を制御します。
     *
     * 入力値を確定するには {@link TextFieldProps.TextField.onValueChange|onValueChange} で更新してください。
     */
    value?: TextFieldInputProps["value"] | undefined;
  };
}

/**
 * {@link TextField} に渡す props です。
 */
export type TextFieldProps = TextFieldProps.TextField & TextFieldProps.Root;

// API
// ---

/**
 * {@link TextField} を構成する各パーツの props を作成するための API です。
 */
export class TextFieldAPI {
  private readonly textFieldProps: Required<Omit<TextFieldProps.TextField, "slotProps">>;

  private readonly rootProps: Omit<TextFieldRootProps, "children">;

  private readonly slotProps: TextFieldSlotProps;

  /**
   * @param props {@link TextField} の props です。
   * @internal
   */
  public constructor(props: TextFieldProps) {
    const {
      name,
      type,
      value,
      disabled,
      readOnly,
      required,
      endAddons = [],
      slotProps = {},
      placeholder,
      startAddons = [],
      defaultValue,
      onValueChange,
      ...rootProps
    } = props;
    this.textFieldProps = {
      name,
      type,
      value,
      disabled,
      readOnly,
      required,
      endAddons,
      placeholder,
      startAddons,
      defaultValue,
      onValueChange,
    };
    this.rootProps = rootProps;
    this.slotProps = slotProps;
  }

  /**
   * 末尾の {@link TextFieldAddon} に渡す props の一覧を取得します。
   */
  public getEndAddonsPropsList(): readonly TextFieldAddonProps[] {
    const { endAddons } = this.textFieldProps;
    const { addon: props = {} } = this.slotProps;

    return (
      React.Children.map(endAddons, (addon) => ({
        ...props,
        children: addon,
      })) ?? []
    );
  }

  /**
   * {@link TextFieldInput} に渡す props を取得します。
   */
  public getInputProps(): TextFieldInputProps {
    const {
      name,
      type,
      value,
      disabled,
      readOnly,
      required,
      placeholder,
      defaultValue,
      onValueChange,
    } = this.textFieldProps;
    const { input: props = {} } = this.slotProps;

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
      ...props,
    };
  }

  /**
   * {@link TextFieldRoot} に渡す props を取得します。
   */
  public getRootProps(): Omit<TextFieldRootProps, "children"> {
    return this.rootProps;
  }

  /**
   * 先頭の {@link TextFieldAddon} に渡す props の一覧を取得します。
   */
  public getStartAddonsPropsList(): readonly TextFieldAddonProps[] {
    const { startAddons } = this.textFieldProps;
    const { addon: props = {} } = this.slotProps;

    return (
      React.Children.map(startAddons, (addon) => ({
        ...props,
        children: addon,
      })) ?? []
    );
  }
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
  return new TextFieldAPI(props);
};

export { TextFieldAPI as API, useTextFieldAPI as useAPI };

// Component
// ---------

interface ITextField extends IComponent<TextFieldProps> {
  readonly useContext: IUseTextFieldContext;
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
  export type State = TextFieldState;

  export type Props = TextFieldProps;

  export type SlotProps = TextFieldSlotProps;

  export type Context = TextFieldContext;

  export type ChangeEventDetails = TextFieldChangeEventDetails;

  export type ChangeEventReason = TextFieldChangeEventReason;

  export type Color = TextFieldColor;

  export type Radius = TextFieldRadius;

  export type Size = TextFieldSize;

  export type Type = TextFieldType;

  export type Variant = TextFieldVariant;
}
