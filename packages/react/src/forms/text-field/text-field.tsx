import * as React from "react";

import type { IComponent } from "../../types.js";
import {
  type TextFieldRootProps,
  type TextFieldRootState,
  type TextFieldAddonProps,
  type TextFieldInputProps,
  TextFieldRoot,
  TextFieldAddon,
  TextFieldInput,
} from "./text-field.parts.jsx";

/**
 * {@link TextField} の各パーツに渡すプロパティーです。
 */
export type TextFieldSlotProps = {
  /**
   * {@link TextFieldAddon} に渡すプロパティーです。
   */
  readonly addon?: Omit<TextFieldAddonProps, "children"> | undefined;

  /**
   * {@link TextFieldInput} に渡すプロパティーです。
   */
  readonly input?: TextFieldInputProps | undefined;
};

/**
 * {@link TextField} の状態です。
 */
export type TextFieldState = TextFieldRootState;

/**
 * {@link} に渡すプロパティーです。
 */
export type TextFieldProps = TextFieldRootProps &
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
    endAddons?: readonly React.ReactNode[] | undefined;

    /**
     * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
     *
     * 各パーツのプロパティーが優先されます。
     */
    slotProps?: TextFieldSlotProps | undefined;

    startAddons?: readonly React.ReactNode[] | undefined;
  };

export const TextField: IComponent<TextFieldProps> = function SuiTextField(props) {
  const {
    name,
    type,
    value,
    disabled,
    readOnly,
    required,
    endAddons = [],
    slotProps: { addon: addonProps, input: inputProps } = {},
    placeholder,
    startAddons = [],
    defaultValue,
    onValueChange,
    ...rootProps
  } = props;

  return (
    <TextFieldRoot {...rootProps}>
      {startAddons.map((addon, i) => (
        <TextFieldAddon {...addonProps} key={React.isValidElement(addon) ? (addon.key ?? i) : i}>
          {addon}
        </TextFieldAddon>
      ))}
      <TextFieldInput
        {...{
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
        }}
      />
      {endAddons.map((addon, i) => (
        <TextFieldAddon {...addonProps} key={React.isValidElement(addon) ? (addon.key ?? i) : i}>
          {addon}
        </TextFieldAddon>
      ))}
    </TextFieldRoot>
  );
};

/**
 * {@link TextField} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace TextField {
  /**
   * {@link TextFieldState} です。
   */
  export type State = TextFieldState;

  /**
   * {@link TextFieldProps} です。
   */
  export type Props = TextFieldProps;

  /**
   * {@link TextFieldSlotProps} です。
   */
  export type SlotProps = TextFieldSlotProps;
}
