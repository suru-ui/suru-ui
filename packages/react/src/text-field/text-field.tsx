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

/**
 * {@link TextFieldRootColor} です。
 */
export type TextFieldColor = TextFieldRootColor;

/**
 * {@link TextFieldRootRadius} です。
 */
export type TextFieldRadius = TextFieldRootRadius;

/**
 * {@link TextFieldRootSize} です。
 */
export type TextFieldSize = TextFieldRootSize;

/**
 * {@link TextFieldRootVariant} です。
 */
export type TextFieldVariant = TextFieldRootVariant;

/**
 * {@link TextFieldInputType} です。
 */
export type TextFieldType = TextFieldInputType;

/**
 * {@link TextFieldInputChangeEventReason} です。
 */
export type TextFieldChangeEventReason = TextFieldInputChangeEventReason;

/**
 * {@link TextFieldInputChangeEventDetails} です。
 */
export type TextFieldChangeEventDetails = TextFieldInputChangeEventDetails;

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
 * {@link TextField} コンポーネントのプロパティーです。
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
     * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
     *
     * 各パーツのプロパティーが優先されます。
     */
    slotProps?: TextFieldSlotProps | undefined;

    /**
     * 入力欄の先頭に表示する内容です。
     */
    startAddons?: Iterable<React.ReactNode> | undefined;
  };

/**
 * {@link TextField} の各パーツに渡すプロパティーです。
 */
export type TextFieldPartsProps = {
  /**
   * 入力欄の末尾に表示する {@link TextFieldAddon} の一覧です。
   *
   * 内容は `children` に入ります。
   */
  readonly endAddons: readonly TextFieldAddonProps[];

  /**
   * {@link TextFieldInput} に渡すプロパティーです。
   */
  readonly input: TextFieldInputProps;

  /**
   * {@link TextFieldRoot} に渡すプロパティーです。
   */
  readonly root: TextFieldRootProps;

  /**
   * 入力欄の先頭に表示する {@link TextFieldAddon} の一覧です。
   *
   * 内容は `children` に入ります。
   */
  readonly startAddons: readonly TextFieldAddonProps[];
};

/**
 * {@link TextField} の各パーツに渡すプロパティーを作るフックです。
 */
export function useTextField(props: TextFieldProps): TextFieldPartsProps {
  const {
    name,
    type,
    value,
    disabled,
    readOnly,
    required,
    endAddons = null,
    slotProps: { addon: addonProps, input: inputProps } = {},
    placeholder,
    startAddons = null,
    defaultValue,
    onValueChange,
    ...rootProps
  } = props;

  return {
    root: rootProps,
    startAddons: React.Children.map(startAddons, (addon) => ({
      ...addonProps,
      children: addon,
    }))!,
    input: {
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
    },
    endAddons: React.Children.map(endAddons, (addon) => ({
      ...addonProps,
      children: addon,
    }))!,
  };
}

interface TextFieldComponentType extends IComponent<TextFieldProps> {
  /**
   * {@link useTextFieldContext} です。
   */
  readonly useContext: IUseContext<TextFieldContext>;
}

/**
 * 文字入力欄を表示するコンポーネントです。
 */
export const TextField: TextFieldComponentType = /*#__PURE__*/ Object.assign(
  function SuiTextField(props: TextFieldProps) {
    const partsProps = useTextField(props);

    return (
      <TextFieldRoot {...partsProps.root}>
        {partsProps.startAddons.map((addonProps, index) => (
          <TextFieldAddon key={index} {...addonProps} />
        ))}
        <TextFieldInput {...partsProps.input} />
        {partsProps.endAddons.map((addonProps, index) => (
          <TextFieldAddon key={index} {...addonProps} />
        ))}
      </TextFieldRoot>
    );
  },
  {
    useContext: useTextFieldContext,
  },
);

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
   * {@link TextFieldContext} です。
   */
  export type Context = TextFieldContext;

  /**
   * {@link TextFieldSlotProps} です。
   */
  export type SlotProps = TextFieldSlotProps;

  /**
   * {@link TextFieldChangeEventDetails} です。
   */
  export type ChangeEventDetails = TextFieldChangeEventDetails;

  /**
   * {@link TextFieldChangeEventReason} です。
   */
  export type ChangeEventReason = TextFieldChangeEventReason;

  /**
   * {@link TextFieldColor} です。
   */
  export type Color = TextFieldColor;

  /**
   * {@link TextFieldRadius} です。
   */
  export type Radius = TextFieldRadius;

  /**
   * {@link TextFieldSize} です。
   */
  export type Size = TextFieldSize;

  /**
   * {@link TextFieldType} です。
   */
  export type Type = TextFieldType;

  /**
   * {@link TextFieldVariant} です。
   */
  export type Variant = TextFieldVariant;
}
