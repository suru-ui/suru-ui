import * as React from "react";

import { type TextFieldInputProps } from "../text-field/text-field.parts.jsx";
import type { IComponent, IUseContext } from "../types.js";
import {
  type PasswordFieldContext,
  type PasswordFieldRootSize,
  type PasswordFieldRootColor,
  type PasswordFieldRootProps,
  type PasswordFieldAddonProps,
  type PasswordFieldInputProps,
  type PasswordFieldRootRadius,
  type PasswordFieldRootVariant,
  type PasswordFieldToggleButtonProps,
  PasswordFieldRoot,
  PasswordFieldAddon,
  PasswordFieldInput,
  usePasswordFieldContext,
  PasswordFieldToggleButton,
} from "./password-field.parts.jsx";

// Types
// -----

/**
 * {@link PasswordFieldRootColor}
 */
export type PasswordFieldColor = PasswordFieldRootColor;

/**
 * {@link PasswordFieldRootRadius}
 */
export type PasswordFieldRadius = PasswordFieldRootRadius;

/**
 * {@link PasswordFieldRootSize}
 */
export type PasswordFieldSize = PasswordFieldRootSize;

/**
 * {@link PasswordFieldRootVariant}
 */
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
export type PasswordFieldState = {
  /**
   * パスワードを表示しているかどうかです。
   */
  readonly visible: boolean;
};

/**
 * {@link PasswordField} に渡す props です。
 */
export type PasswordFieldProps = Omit<PasswordFieldRootProps, "children"> &
  Pick<
    TextFieldInputProps,
    | "defaultValue"
    | "disabled"
    | "name"
    | "onValueChange"
    | "placeholder"
    | "readOnly"
    | "required"
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
    slotProps?: PasswordFieldSlotProps | undefined;

    /**
     * 入力欄の先頭に表示する内容です。
     */
    startAddons?: Iterable<React.ReactNode> | undefined;

    /**
     * パスワードの表示と非表示を切り替えるボタンを表示するかどうかを指定します。
     *
     * ボタンの内容や props を変更するときは {@link PasswordFieldProps.slotProps|slotProps.toggle} を使います。
     *
     * @default true
     */
    visibilityToggle?: boolean | undefined;
  };

// API
// ---

/**
 * {@link PasswordField} を構成する各パーツの props を作成するための API です。
 */
export interface PasswordFieldAPI {
  /**
   * 末尾の {@link PasswordFieldAddon} に渡す props の一覧を取得します。
   */
  getEndAddonsPropsList(): readonly PasswordFieldAddonProps[];

  /**
   * {@link PasswordFieldInput} に渡す props を取得します。
   */
  getInputProps(): PasswordFieldInputProps;

  /**
   * {@link PasswordFieldRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<PasswordFieldRootProps, "children">;

  /**
   * 先頭の {@link PasswordFieldAddon} に渡す props の一覧を取得します。
   */
  getStartAddonsPropsList(): readonly PasswordFieldAddonProps[];

  /**
   * {@link PasswordFieldToggleButton} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  getToggleButtonProps(): PasswordFieldToggleButtonProps | null;
}

interface IUsePasswordFieldAPI {
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
  const {
    name,
    value,
    disabled,
    readOnly,
    required,
    endAddons = [],
    slotProps: { addon: addonProps = {}, input: inputProps = {}, toggle: toggleProps = {} } = {},
    placeholder,
    startAddons = [],
    defaultValue,
    onValueChange,
    visibilityToggle = true,
    ...otherRootProps
  } = props;
  const showToggle = visibilityToggle || Object.keys(toggleProps).length > 0;

  return {
    getRootProps() {
      return otherRootProps;
    },
    getInputProps() {
      return {
        name,
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
    getToggleButtonProps() {
      if (!showToggle) {
        return null;
      }

      return {
        disabled,
        ...toggleProps,
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

export { type PasswordFieldAPI as API, usePasswordFieldAPI as useAPI };

// Component
// ---------

interface IPasswordField extends IComponent<PasswordFieldProps> {
  /**
   * {@link usePasswordFieldContext}
   */
  readonly useContext: IUseContext<PasswordFieldContext>;
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
  /**
   * {@link PasswordFieldState}
   */
  export type State = PasswordFieldState;

  /**
   * {@link PasswordFieldProps}
   */
  export type Props = PasswordFieldProps;

  /**
   * {@link PasswordFieldSlotProps}
   */
  export type SlotProps = PasswordFieldSlotProps;

  /**
   * {@link PasswordFieldContext}
   */
  export type Context = PasswordFieldContext;

  /**
   * {@link PasswordFieldColor}
   */
  export type Color = PasswordFieldColor;

  /**
   * {@link PasswordFieldRadius}
   */
  export type Radius = PasswordFieldRadius;

  /**
   * {@link PasswordFieldSize}
   */
  export type Size = PasswordFieldSize;

  /**
   * {@link PasswordFieldVariant}
   */
  export type Variant = PasswordFieldVariant;
}
