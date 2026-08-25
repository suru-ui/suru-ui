import * as React from "react";

import { type TextFieldInputProps } from "../text-field/text-field.parts.jsx";
import type { IComponent } from "../types.js";
import {
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
  PasswordFieldToggleButton,
} from "./password-field.parts.jsx";

/**
 * {@link PasswordFieldRootColor} です。
 */
export type PasswordFieldColor = PasswordFieldRootColor;

/**
 * {@link PasswordFieldRootRadius} です。
 */
export type PasswordFieldRadius = PasswordFieldRootRadius;

/**
 * {@link PasswordFieldRootSize} です。
 */
export type PasswordFieldSize = PasswordFieldRootSize;

/**
 * {@link PasswordFieldRootVariant} です。
 */
export type PasswordFieldVariant = PasswordFieldRootVariant;

/**
 * {@link PasswordField} の各パーツに渡すプロパティーです。
 */
export type PasswordFieldSlotProps = {
  /**
   * {@link PasswordFieldAddon} に渡すプロパティーです。
   */
  readonly addon?: Omit<PasswordFieldAddonProps, "children"> | undefined;

  /**
   * {@link PasswordFieldInput} に渡すプロパティーです。
   */
  readonly input?: PasswordFieldInputProps | undefined;

  /**
   * {@link PasswordFieldToggleButton} に渡すプロパティーです。
   */
  readonly toggle?: PasswordFieldToggleButtonProps | undefined;
};

/**
 * {@link PasswordField} の状態です。
 */
export type PasswordFieldState = {
  /**
   * パスワードを表示しているかどうかです。
   */
  readonly visible: boolean;
};

/**
 * {@link PasswordField} コンポーネントのプロパティーです。
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
     * パスワードの初期表示状態を指定します。
     *
     * @default false
     */
    defaultVisible?: boolean | undefined;

    /**
     * 入力欄の末尾に表示する内容です。
     */
    endAddons?: Iterable<React.ReactNode> | undefined;

    /**
     * パスワードの表示状態が変わったときに呼ばれます。
     */
    onVisibleChange?: ((visible: boolean) => void) | undefined;

    /**
     * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
     *
     * 各パーツのプロパティーが優先されます。
     */
    slotProps?: PasswordFieldSlotProps | undefined;

    /**
     * 入力欄の先頭に表示する内容です。
     */
    startAddons?: Iterable<React.ReactNode> | undefined;

    /**
     * パスワードの表示と非表示を切り替えるボタンを表示するかどうかを指定します。
     *
     * ボタンの内容やプロパティーを変更するときは {@link PasswordFieldProps.slotProps|slotProps.toggle} を使います。
     *
     * @default true
     */
    visibilityToggle?: boolean | undefined;

    /**
     * パスワードを表示状態にします。
     *
     * 指定した場合は表示状態がこの値で固定され、内部の状態を使わなくなります。
     */
    visible?: boolean | undefined;
  };

/**
 * {@link PasswordField} の各パーツに渡すプロパティーです。
 */
export type PasswordFieldPartsProps = {
  /**
   * 入力欄の末尾に表示する {@link PasswordFieldAddon} の一覧です。
   *
   * 内容は `children` に入ります。
   */
  readonly endAddons: readonly PasswordFieldAddonProps[];

  /**
   * {@link PasswordFieldInput} に渡すプロパティーです。
   */
  readonly input: TextFieldInputProps;

  /**
   * {@link PasswordFieldRoot} に渡すプロパティーです。
   */
  readonly root: PasswordFieldRootProps;

  /**
   * 入力欄の先頭に表示する {@link PasswordFieldAddon} の一覧です。
   *
   * 内容は `children` に入ります。
   */
  readonly startAddons: readonly PasswordFieldAddonProps[];

  /**
   * 表示切替ボタンを包む {@link PasswordFieldAddon} に渡すプロパティーです。
   *
   * 表示切替ボタンを表示しないときは null になります。
   */
  readonly toggleAddon: Omit<PasswordFieldAddonProps, "children"> | null;

  /**
   * {@link PasswordFieldToggleButton} に渡すプロパティーです。
   *
   * 表示切替ボタンを表示しないときは null になります。
   */
  readonly toggleButton: PasswordFieldToggleButtonProps | null;
};

/**
 * {@link PasswordField} の各パーツに渡すプロパティーを作るフックです。
 */
export function usePasswordField(props: PasswordFieldProps): PasswordFieldPartsProps {
  const {
    name,
    value,
    disabled,
    readOnly,
    required,
    endAddons = [],
    slotProps: { addon: addonProps, input: inputProps, toggle: toggleProps } = {},
    placeholder,
    startAddons = [],
    defaultValue,
    onValueChange,
    visibilityToggle = true,
    visible: visibleProp,
    defaultVisible = false,
    onVisibleChange,
    ...rootProps
  } = props;
  const [defaultVisibleState, setDefaultVisibleState] = React.useState(defaultVisible);
  const visible = visibleProp ?? defaultVisibleState;
  const handleToggleClick = () => {
    const nextVisible = !visible;

    if (visibleProp === undefined) {
      setDefaultVisibleState(nextVisible);
    }
    onVisibleChange?.(nextVisible);
  };

  return {
    root: {
      visible,
      ...rootProps,
    },
    startAddons: React.Children.map(startAddons, (addon) => ({
      ...addonProps,
      children: addon,
    }))!,
    input: {
      name,
      value,
      disabled,
      readOnly,
      required,
      placeholder,
      defaultValue,
      onValueChange,
      type: visible ? "text" : "password",
      ...inputProps,
    },
    endAddons: React.Children.map(endAddons, (addon) => ({
      ...addonProps,
      children: addon,
    }))!,
    toggleAddon: visibilityToggle
      ? {
          disableFocusOnClick: true,
          ...addonProps,
        }
      : null,
    toggleButton: visibilityToggle
      ? {
          disabled,
          onClick: handleToggleClick,
          ...toggleProps,
        }
      : null,
  };
}

/**
 * パスワードの入力欄を表示するコンポーネントです。
 *
 * 文字入力欄と同じ外観を持ち、既定で表示切替ボタン付きのパスワード入力欄として振る舞います。
 */
export const PasswordField: IComponent<PasswordFieldProps> = function SuiPasswordField(props) {
  const partsProps = usePasswordField(props);

  return (
    <PasswordFieldRoot {...partsProps.root}>
      {partsProps.startAddons.map((addonProps, index) => (
        <PasswordFieldAddon key={index} {...addonProps} />
      ))}
      <PasswordFieldInput {...partsProps.input} />
      {partsProps.endAddons.map((addonProps, index) => (
        <PasswordFieldAddon key={index} {...addonProps} />
      ))}
      {partsProps.toggleAddon !== null && partsProps.toggleButton !== null && (
        <PasswordFieldAddon {...partsProps.toggleAddon}>
          <PasswordFieldToggleButton {...partsProps.toggleButton} />
        </PasswordFieldAddon>
      )}
    </PasswordFieldRoot>
  );
};

/**
 * {@link PasswordField} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace PasswordField {
  /**
   * {@link PasswordFieldState} です。
   */
  export type State = PasswordFieldState;

  /**
   * {@link PasswordFieldProps} です。
   */
  export type Props = PasswordFieldProps;

  /**
   * {@link PasswordFieldSlotProps} です。
   */
  export type SlotProps = PasswordFieldSlotProps;

  /**
   * {@link PasswordFieldColor} です。
   */
  export type Color = PasswordFieldColor;

  /**
   * {@link PasswordFieldRadius} です。
   */
  export type Radius = PasswordFieldRadius;

  /**
   * {@link PasswordFieldSize} です。
   */
  export type Size = PasswordFieldSize;

  /**
   * {@link PasswordFieldVariant} です。
   */
  export type Variant = PasswordFieldVariant;
}
