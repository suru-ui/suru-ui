import { Input as BaseInput } from "@base-ui/react/input";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import type { IComponent, IUseContext } from "../types.js";

import "./text-field.css";

// Context
// -------

/**
 * 文字入力欄の配色です。
 */
type TextFieldContextColor = Color;

/**
 * 文字入力欄の角丸です。
 */
type TextFieldContextRadius = "none" | Size | "full";

/**
 * 文字入力欄のサイズです。
 */
type TextFieldContextSize = Size;

/**
 * 文字入力欄の主な外観です。
 */
type TextFieldContextVariant = "naked" | "liquid";

/**
 * {@link TextFieldRoot} が子パーツへ提供するスタイルです。
 */
export type TextFieldContext = {
  /**
   * 文字入力欄の配色です。
   */
  readonly color: TextFieldContextColor;

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * 文字入力欄の角丸です。
   */
  readonly radius: TextFieldContextRadius;

  /**
   * 文字入力欄のサイズです。
   */
  readonly size: TextFieldContextSize;

  /**
   * 文字入力欄の主な外観です。
   */
  readonly variant: TextFieldContextVariant;
};

/**
 * TextField のスタイルを子パーツへ伝播するコンテキストです。
 */
export const TextFieldContext: React.Context<TextFieldContext | null> =
  React.createContext<TextFieldContext | null>(null);

function useSuiTextFieldContext(optional?: false): TextFieldContext;
function useSuiTextFieldContext(optional?: boolean): TextFieldContext | null;
function useSuiTextFieldContext(optional?: boolean): TextFieldContext | null {
  const ctx = React.use(TextFieldContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "TextFieldContext",
      providerName: "TextFieldRoot",
    });
  }

  return ctx;
}

/**
 * {@link TextFieldContext} を読み取るフックです。
 */
export const useTextFieldContext: IUseContext<TextFieldContext> = useSuiTextFieldContext;

export { TextFieldContext as Context, useTextFieldContext as useContext };

export namespace Context {
  /**
   * {@link TextFieldContextColor}
   */
  export type Color = TextFieldContextColor;

  /**
   * {@link TextFieldContextRadius}
   */
  export type Radius = TextFieldContextRadius;

  /**
   * {@link TextFieldContextSize}
   */
  export type Size = TextFieldContextSize;

  /**
   * {@link TextFieldContextVariant}
   */
  export type Variant = TextFieldContextVariant;
}

// Root
// ----

/**
 * 文字入力欄の配色です。
 */
export type TextFieldRootColor = Color;

/**
 * 文字入力欄の角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type TextFieldRootRadius = "none" | Size | "full";

/**
 * 文字入力欄の大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type TextFieldRootSize = Size;

/**
 * 文字入力欄の主な外観の種類です。
 *
 * - `"naked"`: 背景のない文字入力欄
 * - `"liquid"`: 薄い塗りつぶし
 */
export type TextFieldRootVariant = "naked" | "liquid";

/**
 * {@link TextFieldRoot} が持つ状態です。
 */
export type TextFieldRootState = {};

/**
 * {@link TextFieldRoot} に渡す props です。
 */
export type TextFieldRootProps = Omit<React.ComponentProps<"div">, keyof RenderProps<{}>> &
  RenderProps<TextFieldRootState> & {
    /**
     * フォーカス時に枠線へ適用する色を指定します。
     *
     * @default "grey"
     */
    color?: TextFieldRootColor | undefined;

    /**
     * 枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: boolean | undefined;

    /**
     * 文字入力欄の角丸を指定します。
     *
     * 既定値は {@link TextFieldRootProps.size|size}
     */
    radius?: TextFieldRootRadius | undefined;

    /**
     * 文字入力欄のサイズを指定します。
     *
     * @default "md"
     */
    size?: TextFieldRootSize | undefined;

    /**
     * 文字入力欄の主な外観を指定します。
     *
     * @default "liquid"
     */
    variant?: TextFieldRootVariant | undefined;
  };

const DISABLE_FOCUS_ON_CLICK_DATA = "data-suitextfielddisablefocusonclick";

/**
 * 文字入力欄の入力欄と Addon をまとめるルート要素です。
 *
 * 指定したスタイルプロパティーは、子パーツへ継承されます。
 */
export const TextFieldRoot: IComponent<TextFieldRootProps> = function SuiTextFieldRoot(props) {
  const {
    size = "md",
    color = "grey",
    radius = size,
    onClick,
    variant = "liquid",
    outlined = false,
    className,
    ...otherDivProps
  } = props;
  const handleClick: NonNullable<TextFieldRootProps["onClick"]> = (evt) => {
    onClick?.(evt);
    if (evt.defaultPrevented || !(evt.target instanceof Element)) {
      return;
    }

    if (
      evt.target.closest(".sui_text_field_input") !== null ||
      evt.target.closest(`[${DISABLE_FOCUS_ON_CLICK_DATA}="true"]`) !== null
    ) {
      return;
    }

    const input = evt.currentTarget.querySelector<HTMLInputElement>(".sui_text_field_input");
    if (input !== null && !input.disabled) {
      input.focus();
    }
  };
  const ctx = React.useMemo<TextFieldContext>(
    () => ({ size, color, radius, variant, outlined }),
    [size, color, radius, variant, outlined],
  );
  const element = useRender({
    defaultTagName: "div",
    props: [
      otherDivProps,
      {
        onClick: handleClick,
        className: cn(
          className,
          "sui_text_field",
          `sui_text_field-size_${size}`,
          `sui_text_field-color_${color}`,
          `sui_text_field-radius_${radius}`,
          `sui_text_field-variant_${variant}`,
          outlined && "sui_text_field-outlined",
        ),
        "data-scope": "",
      },
    ],
  });

  return <TextFieldContext value={ctx}>{element}</TextFieldContext>;
};

export { TextFieldRoot as Root };

export namespace Root {
  /**
   * {@link TextFieldRootState}
   */
  export type State = TextFieldRootState;

  /**
   * {@link TextFieldRootProps}
   */
  export type Props = TextFieldRootProps;

  /**
   * {@link TextFieldRootColor}
   */
  export type Color = TextFieldRootColor;

  /**
   * {@link TextFieldRootRadius}
   */
  export type Radius = TextFieldRootRadius;

  /**
   * {@link TextFieldRootSize}
   */
  export type Size = TextFieldRootSize;

  /**
   * {@link TextFieldRootVariant}
   */
  export type Variant = TextFieldRootVariant;
}

// Input
// -----

/**
 * {@link TextFieldInput} で使用できる入力項目の種類です。
 */
export type TextFieldInputType = Exclude<
  React.HTMLInputTypeAttribute,
  "button" | "checkbox" | "color" | "image" | "radio" | "range" | "reset" | "submit"
>;

/**
 * {@link TextFieldInput} の値が変更された理由です。
 */
export type TextFieldInputChangeEventReason = BaseInput.ChangeEventReason;

/**
 * {@link TextFieldInput} の値が変更されたイベントの詳細です。
 */
export type TextFieldInputChangeEventDetails = BaseInput.ChangeEventDetails;

/**
 * {@link TextFieldInput} の状態です。
 */
export type TextFieldInputState = BaseInput.State;

/**
 * {@link TextFieldInput} に渡す props です。
 */
export type TextFieldInputProps = Omit<React.ComponentProps<typeof BaseInput>, "type"> & {
  /**
   * 入力項目です。
   *
   * @default "text"
   */
  type?: TextFieldInputType | undefined;
};

/**
 * Base UI の Input を使った文字入力欄の入力欄です。
 */
export const TextFieldInput: IComponent<TextFieldInputProps> = function SuiTextFieldInput(props) {
  const { type = "text", className, ...otherProps } = props;

  return (
    <BaseInput
      {...otherProps}
      type={type}
      className={cn(
        className,
        "sui_text_field_input",
        (state) => state.valid === true && "sui_text_field_input-valid",
        (state) => state.valid === false && "sui_text_field_input-invalid",
        (state) => state.valid === null && "sui_text_field_input-unverified",
        (state) => state.disabled && "sui_text_field_input-disabled",
      )}
    />
  );
};

export { TextFieldInput as Input };

export namespace Input {
  /**
   * {@link TextFieldInputState}
   */
  export type State = TextFieldInputState;

  /**
   * {@link TextFieldInputProps}
   */
  export type Props = TextFieldInputProps;

  /**
   * {@link TextFieldInputChangeEventDetails}
   */
  export type ChangeEventDetails = TextFieldInputChangeEventDetails;

  /**
   * {@link TextFieldInputChangeEventReason}
   */
  export type ChangeEventReason = TextFieldInputChangeEventReason;

  /**
   * {@link TextFieldInputType}
   */
  export type Type = TextFieldInputType;
}

// Addon
// -----

/**
 * {@link TextFieldAddon} の状態です。
 */
export type TextFieldAddonState = {};

/**
 * {@link TextFieldAddon} に渡す props です。
 */
export type TextFieldAddonProps = Omit<
  React.ComponentProps<"span">,
  keyof RenderProps<TextFieldAddonState>
> &
  RenderProps<TextFieldAddonState> & {
    /**
     * クリック時の入力欄への自動フォーカスを無効にするかどうかを指定します。
     *
     * @default false
     */
    disableFocusOnClick?: boolean | undefined;
  };

/**
 * 入力欄の左右に表示する補助コンポーネントです。
 *
 * 接頭辞、接尾辞、アイコンなどを表示できます。
 */
export const TextFieldAddon: IComponent<TextFieldAddonProps> = function SuiTextFieldAddon(props) {
  const { disableFocusOnClick = false, ...otherSpanProps } = props;

  return useRender({
    defaultTagName: "span",
    props: [
      otherSpanProps,
      {
        className: "sui_text_field_addon",
        [DISABLE_FOCUS_ON_CLICK_DATA]: disableFocusOnClick ? "true" : undefined,
      },
    ],
  });
};

export { TextFieldAddon as Addon };

export namespace Addon {
  /**
   * {@link TextFieldAddonState}
   */
  export type State = TextFieldAddonState;

  /**
   * {@link TextFieldAddonProps}
   */
  export type Props = TextFieldAddonProps;
}
