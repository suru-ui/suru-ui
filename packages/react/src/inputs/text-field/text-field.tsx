import { Field } from "@base-ui/react/field";
import * as React from "react";
import cn from "../../shared/cn.js";
import isMaybeVisibleNode from "../../shared/is-maybe-visible-node.js";
import partialize from "../../shared/partialize.js";
import splitProps from "../../shared/split-props.js";
import useBaseUiProps from "../../shared/use-base-ui-props.js";
import CharacterCountContext from "../character-count/character-count-context.js";
import type { InputProps } from "../input/input.jsx";
import Input from "../input/input.jsx";

import "./text-field.css";

function ErrorRenderer(props: React.HTMLProps<any>) {
  const {
    children,
    ...other
  } = props;
  if (!Array.isArray(children)) {
    return <div {...props} />;
  }

  return (
    <div {...other}>
      <ul>
        {children.map((child, i) => <li key={i}>{child}</li>)}
      </ul>
    </div>
  );
}

export interface ValidateFunction {
  (value: unknown): string | string[] | null | Promise<string | string[] | null>;
}

type SuiTextFieldProps = {
  description?: React.ReactNode;

  /**
   * コンポーネントがユーザーの操作を無視するかどうかです。
   *
   * @default false
   */
  disabled?: boolean | undefined;

  label: React.ReactNode;

  /**
   * フォーム送信時にフィールドを識別するための名前です。
   */
  name?: string | undefined;

  /**
   * カスタム検証用の関数です。
   *
   * 値が無効な場合はエラーメッセージ（文字列または文字列の配列）を返し、有効な場合は `null` を返します。
   *
   * 非同期関数もサポートされていますが、`validationMode="onSubmit"` 使用時のフォーム送信自体を止めることはできません。
   */
  validate?: ValidateFunction | undefined;

  /**
   * `validationMode="onChange"` を使用している場合に、`validate` コールバックを実行するまでの待機時間です。ミリ秒単位で指定します。
   *
   * @default 0
   */
  validationDebounceTime?: number | undefined;

  /**
   * フィールドを検証するタイミングを決定します。
   *
   * - `onBlur`: コントロールからフォーカスが外れたときに検証を実行します。
   * - `onChange`: コントロールの値が変更されるたびに検証を実行します。
   * - `onSubmit`: フォーム送信時に検証を実行し、送信後は値が変更されるたびに再検証します。
   *
   * @default "onBlur"
   */
  validationMode?: "onBlur" | "onChange" | "onSubmit" | undefined;
};

export type TextFieldProps =
  & Omit<InputProps, keyof SuiTextFieldProps>
  & SuiTextFieldProps;

export default function TextField(props: TextFieldProps) {
  const [
    {
      validate,
      validationMode = "onBlur",
      ...rootPropsInput
    },
    {
      label,
      value,
      sizing = "md",
      required = false,
      description,
      ...inputPropsInput
    },
  ] = splitProps(props, [
    [
      "name",
      "disabled",
      "validate",
      "validationMode",
      "validationDebounceTime",
    ],
  ]);
  const rootProps: Field.Root.Props = partialize({
    ...rootPropsInput,
    validate: React.useMemo(() => validate && ((value: unknown) => validate(value)), [validate]),
    className: `sui_text_field sui_text_field-size_${sizing}`,
    validationMode,
  });
  const labelProps: Field.Label.Props = {
    className: cn(
      "sui_text_field_label",
      `sui_text_field_label-size_${sizing}`,
      required && "sui_text_field_label-required",
    ),
  };
  const descriptionProps: Field.Description.Props = {
    className: `sui_text_field_description sui_text_field_description-size_${sizing}`,
  };
  const [charCount, setCharCount] = React.useState(0);
  const inputRef = React.useCallback<React.RefCallback<HTMLInputElement>>(input => {
    if (!input) {
      return;
    }

    const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" });
    const handleChange = () => {
      setCharCount([...segmenter.segment(input.value)].length);
    };
    input.addEventListener("change", handleChange);

    return () => {
      input.removeEventListener("change", handleChange);
    };
  }, []);
  const inputProps: InputProps = useBaseUiProps(inputPropsInput, {
    ref: inputRef,
    value,
    sizing,
    required,
    className: "sui_text_field_input",
  });
  const errorProps: Field.Error.Props = {
    render: ErrorRenderer,
    className: `sui_text_field_error sui_text_field_error-size_${sizing}`,
  };

  return (
    <CharacterCountContext value={charCount}>
      <Field.Root {...rootProps}>
        <Field.Label {...labelProps}>{label}</Field.Label>
        {isMaybeVisibleNode(description) && (
          <Field.Description {...descriptionProps}>{description}</Field.Description>
        )}
        <Input {...inputProps} />
        <Field.Error {...errorProps} />
      </Field.Root>
    </CharacterCountContext>
  );
}
