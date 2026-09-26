import * as React from "react";

import type { IComponent } from "../types.js";
import {
  type PasswordFieldContext,
  type PasswordFieldRootSize,
  type PasswordFieldRootColor,
  type PasswordFieldRootProps,
  type PasswordFieldRootState,
  type PasswordFieldAddonProps,
  type PasswordFieldInputProps,
  type PasswordFieldRootRadius,
  type IUsePasswordFieldContext,
  type PasswordFieldRootVariant,
  type PasswordFieldToggleButtonProps,
  type PasswordFieldInputChangeEventReason,
  type PasswordFieldInputChangeEventDetails,
  PasswordFieldRoot,
  PasswordFieldAddon,
  PasswordFieldInput,
  usePasswordFieldContext,
  PasswordFieldToggleButton,
} from "./password-field.parts.js";

// Types
// -----

export type PasswordFieldChangeEventDetails = PasswordFieldInputChangeEventDetails;

export type PasswordFieldChangeEventReason = PasswordFieldInputChangeEventReason;

export type PasswordFieldColor = PasswordFieldRootColor;

export type PasswordFieldRadius = PasswordFieldRootRadius;

export type PasswordFieldSize = PasswordFieldRootSize;

export type PasswordFieldVariant = PasswordFieldRootVariant;

/**
 * {@link PasswordField} の各パーツに渡す props です。
 */
export type PasswordFieldSlotProps = {
  /**
   * {@link PasswordFieldAddon} に渡す props です。
   */
  readonly addon?: Omit<PasswordFieldAddonProps, "children"> | undefined;

  /**
   * {@link PasswordFieldInput} に渡す props です。
   *
   * トップレベルに指定した入力欄の props より優先されます。
   */
  readonly input?: PasswordFieldInputProps | undefined;

  /**
   * {@link PasswordFieldToggleButton} に渡す props です。
   */
  readonly toggle?: PasswordFieldToggleButtonProps | undefined;
};

/**
 * {@link PasswordField} が持つ状態です。
 */
export type PasswordFieldState = PasswordFieldRootState;

namespace PasswordFieldProps {
  export type PasswordField = {
    /**
     * 入力欄の初期値です。
     *
     * {@link PasswordFieldProps.PasswordField.value|value} を指定しないときに使われます。
     */
    defaultValue?: PasswordFieldInputProps["defaultValue"] | undefined;

    /**
     * パスワード入力欄を無効にするかどうかを指定します。
     */
    disabled?: PasswordFieldInputProps["disabled"] | undefined;

    /**
     * 入力欄の末尾に表示する内容です。
     */
    endAddons?: Iterable<React.ReactNode> | undefined;

    /**
     * フォーム送信時に使う入力欄の名前を指定します。
     */
    name?: PasswordFieldInputProps["name"] | undefined;

    /**
     * 入力値が変わったときに呼ばれます。
     */
    onValueChange?: PasswordFieldInputProps["onValueChange"] | undefined;

    /**
     * 入力欄に表示する案内文です。
     */
    placeholder?: PasswordFieldInputProps["placeholder"] | undefined;

    /**
     * 入力欄を読み取り専用にするかどうかを指定します。
     */
    readOnly?: PasswordFieldInputProps["readOnly"] | undefined;

    /**
     * 入力欄を必須にするかどうかを指定します。
     */
    required?: PasswordFieldInputProps["required"] | undefined;

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: PasswordFieldSlotProps | undefined;

    /**
     * 入力欄の先頭に表示する内容です。
     */
    startAddons?: Iterable<React.ReactNode> | undefined;

    /**
     * 入力値を制御します。
     *
     * 入力値を確定するには {@link PasswordFieldProps.PasswordField.onValueChange|onValueChange} で更新してください。
     */
    value?: PasswordFieldInputProps["value"] | undefined;

    /**
     * パスワードの表示と非表示を切り替えるボタンを表示するかどうかを指定します。
     *
     * `false` を指定しても {@link PasswordFieldProps.slotProps|slotProps.toggle} を指定したときは表示します。
     * ボタンの内容や props を変更するときは {@link PasswordFieldProps.slotProps|slotProps.toggle} を使います。
     *
     * @default true
     */
    visibilityToggle?: boolean | undefined;
  };

  export type Root = Omit<PasswordFieldRootProps, "children" | keyof PasswordField>;
}

/**
 * {@link PasswordField} に渡す props です。
 */
export type PasswordFieldProps = PasswordFieldProps.PasswordField & PasswordFieldProps.Root;

// API
// ---

/**
 * {@link PasswordField} を構成する各パーツの props などを作成するための API です。
 */
export class PasswordFieldAPI {
  private readonly passwordFieldProps: Required<
    Omit<PasswordFieldProps.PasswordField, "slotProps">
  >;

  private readonly rootProps: Omit<PasswordFieldRootProps, "children">;

  private readonly slotProps: PasswordFieldSlotProps;

  /**
   * @param props {@link PasswordField} の props です。
   * @internal
   */
  public constructor(props: PasswordFieldProps) {
    const {
      name,
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
      visibilityToggle,
      ...rootProps
    } = props;
    this.passwordFieldProps = {
      name,
      value,
      disabled,
      readOnly,
      required,
      endAddons,
      placeholder,
      startAddons,
      defaultValue,
      onValueChange,
      visibilityToggle,
    };
    this.rootProps = rootProps;
    this.slotProps = slotProps;
  }

  /**
   * 末尾の {@link PasswordFieldAddon} に渡す props の一覧を取得します。
   */
  public getEndAddonsPropsList(): readonly PasswordFieldAddonProps[] {
    const { endAddons } = this.passwordFieldProps;
    const { addon: props = {} } = this.slotProps;

    return (
      React.Children.map(endAddons, (addon) => ({
        ...props,
        children: addon,
      })) ?? []
    );
  }

  /**
   * {@link PasswordFieldInput} に渡す props を取得します。
   */
  public getInputProps(): PasswordFieldInputProps {
    const { name, value, disabled, readOnly, required, placeholder, defaultValue, onValueChange } =
      this.passwordFieldProps;
    const { input: props = {} } = this.slotProps;

    return {
      name,
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
   * {@link PasswordFieldRoot} に渡す props を取得します。
   */
  public getRootProps(): Omit<PasswordFieldRootProps, "children"> {
    return this.rootProps;
  }

  /**
   * 先頭の {@link PasswordFieldAddon} に渡す props の一覧を取得します。
   */
  public getStartAddonsPropsList(): readonly PasswordFieldAddonProps[] {
    const { startAddons } = this.passwordFieldProps;
    const { addon: props = {} } = this.slotProps;

    return (
      React.Children.map(startAddons, (addon) => ({
        ...props,
        children: addon,
      })) ?? []
    );
  }

  /**
   * {@link PasswordFieldToggleButton} に渡す props を取得します。
   *
   * 表示切替ボタンを表示しないときは `null` を返します。
   */
  public getToggleButtonProps(): PasswordFieldToggleButtonProps | null {
    const { disabled, visibilityToggle = true } = this.passwordFieldProps;
    const { toggle: props } = this.slotProps;

    if (visibilityToggle || Object.keys(props ?? {}).length > 0) {
      return {
        disabled,
        ...props,
      };
    }

    return null;
  }
}

export interface IUsePasswordFieldAPI {
  /**
   * {@link PasswordFieldAPI} を作成します。
   *
   * @param props {@link PasswordField} の props です。
   * @returns パスワード入力欄の API です
   */
  (props: PasswordFieldProps): PasswordFieldAPI;
}

/**
 * {@link PasswordFieldAPI} を作成するフックです。
 */
export const usePasswordFieldAPI: IUsePasswordFieldAPI = function useSuiPasswordFieldAPI(props) {
  return new PasswordFieldAPI(props);
};

export { PasswordFieldAPI as API, usePasswordFieldAPI as useAPI };

// Component
// ---------

export interface IPasswordField extends IComponent<PasswordFieldProps> {
  readonly useContext: IUsePasswordFieldContext;
}

/**
 * パスワードの入力欄を表示するコンポーネントです。
 *
 * 文字入力欄と同じ外観を持ち、既定で表示切替ボタン付きのパスワード入力欄として振る舞います。
 */
export const PasswordField: IPasswordField = /*#__PURE__*/ Object.assign(
  function SuiPasswordField(props: PasswordFieldProps) {
    const api = usePasswordFieldAPI(props);
    const toggleButtonProps = api.getToggleButtonProps();

    return (
      <PasswordFieldRoot {...api.getRootProps()}>
        {api.getStartAddonsPropsList().map((addonProps, index) => (
          <PasswordFieldAddon key={index} {...addonProps} />
        ))}
        <PasswordFieldInput {...api.getInputProps()} />
        {api.getEndAddonsPropsList().map((addonProps, index) => (
          <PasswordFieldAddon key={index} {...addonProps} />
        ))}
        {toggleButtonProps && (
          <PasswordFieldAddon disableFocusOnClick>
            <PasswordFieldToggleButton {...toggleButtonProps} />
          </PasswordFieldAddon>
        )}
      </PasswordFieldRoot>
    );
  },
  {
    useContext: usePasswordFieldContext,
  },
);

export namespace PasswordField {
  export type State = PasswordFieldState;

  export type Props = PasswordFieldProps;

  export type SlotProps = PasswordFieldSlotProps;

  export type Context = PasswordFieldContext;

  export type ChangeEventDetails = PasswordFieldChangeEventDetails;

  export type ChangeEventReason = PasswordFieldChangeEventReason;

  export type Color = PasswordFieldColor;

  export type Radius = PasswordFieldRadius;

  export type Size = PasswordFieldSize;

  export type Variant = PasswordFieldVariant;
}
