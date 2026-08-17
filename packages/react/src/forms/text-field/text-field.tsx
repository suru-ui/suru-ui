import * as React from "react";

import type { Component } from "../../types.js";
import * as TextFieldParts from "./text-field.parts.jsx";

/**
 * {@link TextField} の各パーツに渡すプロパティーです。
 */
export type TextFieldSlotProps = {
  /**
   * {@link TextFieldParts.Addon|Addon} に渡すプロパティーです。
   */
  readonly addon?: Omit<TextFieldParts.Addon.Props, "children"> | undefined;

  /**
   * {@link TextFieldParts.Input|Input} に渡すプロパティーです。
   */
  readonly input?: TextFieldParts.Input.Props | undefined;
};

/**
 * {@link TextField} に渡すプロパティーです。
 */
export type TextFieldProps = TextFieldParts.Root.Props &
  Pick<
    TextFieldParts.Input.Props,
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

export const TextField: Component<TextFieldProps> = function SuiTextField(props) {
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
    <TextFieldParts.Root {...rootProps}>
      {startAddons.map((addon, i) => (
        <TextFieldParts.Addon
          {...addonProps}
          key={React.isValidElement(addon) ? (addon.key ?? i) : i}
        >
          {addon}
        </TextFieldParts.Addon>
      ))}
      <TextFieldParts.Input
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
        <TextFieldParts.Addon
          {...addonProps}
          key={React.isValidElement(addon) ? (addon.key ?? i) : i}
        >
          {addon}
        </TextFieldParts.Addon>
      ))}
    </TextFieldParts.Root>
  );
};
