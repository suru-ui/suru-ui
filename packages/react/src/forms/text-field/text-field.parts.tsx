import { Input as BaseInput } from "@base-ui/react/input";
import type { Color, Size } from "@suru-ui/theme";
import * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import { ContextMissingError } from "../../errors.js";
import type { Component } from "../../types.js";

import "./text-field.css";

// Context
// -------

/**
 * {@link TextFieldRoot} が子パーツへ提供するスタイルです。
 */
export type TextFieldContext = {
  /**
   * テキストフィールドの色です。
   */
  readonly color: Color;

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * テキストフィールドの角丸です。
   */
  readonly radius: "none" | Size | "full";

  /**
   * テキストフィールドのサイズです。
   */
  readonly size: Size;

  /**
   * テキストフィールドのスタイルバリエーションです。
   */
  readonly variant: "naked" | "liquid";
};

/**
 * TextField のスタイルを子パーツへ伝播するコンテキストです。
 */
export const TextFieldContext: React.Context<TextFieldContext | null> =
  React.createContext<TextFieldContext | null>(null);

/**
 * {@link TextFieldContext} を読み取るフックです。
 *
 * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
 * @returns コンテキストです。`optional` が `true` でコンテキストがない場合は `null` です。
 */
export function useTextFieldContext(optional?: false): TextFieldContext;
export function useTextFieldContext(optional?: boolean): TextFieldContext | null;
export function useTextFieldContext(optional?: boolean): TextFieldContext | null {
  const context = React.use(TextFieldContext);
  if (context === null && !optional) {
    throw new ContextMissingError({
      contextName: "TextFieldContext",
      providerName: "TextFieldRoot",
    });
  }

  return context;
}

/**
 * {@link TextFieldContext} です。
 */
export type Context = TextFieldContext;

/**
 * {@link TextFieldContext} です。
 */
export const Context: React.Context<TextFieldContext | null> = TextFieldContext;

/**
 * {@link useTextFieldContext} です。
 */
export function useContext(optional?: false): TextFieldContext;
export function useContext(optional?: boolean): TextFieldContext | null;
export function useContext(optional?: boolean): TextFieldContext | null {
  return useTextFieldContext(optional);
}

// Root
// ----

/**
 * {@link TextFieldRoot} の状態です。
 */
export type TextFieldRootState = {};

/**
 * {@link TextFieldRoot} に渡すプロパティーです。
 */
export type TextFieldRootProps = Omit<React.ComponentProps<"div">, keyof RenderProps<{}>> &
  RenderProps<TextFieldRootState> & {
    /**
     * フォーカス時に枠線へ適用する色を指定します。
     *
     * @default "grey"
     */
    color?: Color | undefined;

    /**
     * 枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: boolean | undefined;

    /**
     * テキストフィールドの角丸を指定します。
     *
     * 省略時は {@link TextFieldRootProps.size|size} と同じ値になります。
     *
     * - `"none"`: 角を直角にする
     * - `"sm"`: 小さい角丸
     * - `"md"`: 標準的な角丸
     * - `"lg"`: 大きい角丸
     * - `"full"`: 完全な丸形
     */
    radius?: "none" | Size | "full" | undefined;

    /**
     * テキストフィールドのサイズを指定します。
     *
     * @default "md"
     */
    size?: Size | undefined;

    /**
     * テキストフィールドのスタイルバリエーションを指定します。
     *
     * - `"naked"`: 背景のないテキストフィールド
     * - `"liquid"`: 薄い塗りつぶし
     *
     * @default "liquid"
     */
    variant?: "naked" | "liquid" | undefined;
  };

const DISABLE_FOCUS_ON_CLICK_DATA = "data-suitextfielddisablefocusonclick";

/**
 * テキストフィールドの入力欄と Addon をまとめるルート要素です。
 *
 * 指定したスタイルプロパティーは、子パーツへ継承されます。
 *
 * @example
 * ```tsx
 * <TextFieldRoot>
 *   <TextFieldAddon>https://</TextFieldAddon>
 *   <TextFieldInput placeholder="example.com" />
 * </TextFieldRoot>
 * ```
 */
export const TextFieldRoot: Component<TextFieldRootProps> = function SuiTextFieldRoot(props) {
  const {
    size = "md",
    color = "grey",
    radius = size,
    variant = "liquid",
    outlined = false,
    ...otherProps
  } = props;
  const focusInput: NonNullable<TextFieldRootProps["onClick"]> = (evt) => {
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
  const context = React.useMemo<TextFieldContext>(
    () => ({ size, color, radius, variant, outlined }),
    [size, color, radius, variant, outlined],
  );
  const element = useRender({
    defaultTagName: "div",
    props: [
      otherProps,
      {
        onClick: focusInput,
        className: cn(
          "sui_text_field",
          `sui_text_field-size_${size}`,
          `sui_text_field-color_${color}`,
          `sui_text_field-radius_${radius}`,
          `sui_text_field-variant_${variant}`,
          outlined && "sui_text_field-outlined",
        ),
      },
    ],
  });

  return <Context value={context}>{element}</Context>;
};

/**
 * {@link TextFieldRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link TextFieldRoot} の状態型です。
   */
  export type State = TextFieldRootState;

  /**
   * {@link TextFieldRoot} のプロパティー型です。
   */
  export type Props = TextFieldRootProps;
}

/**
 * {@link TextFieldRoot} の別名です。
 */
export const Root: Component<Root.Props> = TextFieldRoot;

// Input
// -----

/**
 * {@link TextFieldInput} の状態です。
 */
export type TextFieldInputState = BaseInput.State;

/**
 * {@link TextFieldInput} に渡すプロパティーです。
 */
export type TextFieldInputProps = Omit<React.ComponentProps<typeof BaseInput>, "type"> & {
  /**
   * 入力項目です。
   *
   * @default "text"
   */
  type?:
    | Exclude<
        React.HTMLInputTypeAttribute,
        "button" | "checkbox" | "color" | "image" | "radio" | "range" | "reset" | "submit"
      >
    | undefined;
};

/**
 * Base UI の Input を使ったテキストフィールドの入力欄です。
 *
 * @example
 * ```tsx
 * <TextFieldRoot>
 *   <TextFieldInput placeholder="example.com" />
 * </TextFieldRoot>
 * ```
 */
export const TextFieldInput: Component<TextFieldInputProps> = function SuiTextFieldInput(props) {
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

/**
 * {@link TextFieldInput} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Input {
  /**
   * {@link TextFieldInput} の状態型です。
   */
  export type State = TextFieldInputState;

  /**
   * {@link TextFieldInput} のプロパティー型です。
   */
  export type Props = TextFieldInputProps;
}

/**
 * {@link TextFieldInput} の別名です。
 */
export const Input: Component<Input.Props> = TextFieldInput;

// Addon
// -----

/**
 * {@link TextFieldAddon} の状態です。
 */
export type TextFieldAddonState = {};

/**
 * {@link TextFieldAddon} に渡すプロパティーです。
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
 *
 * @example
 * ```tsx
 * <TextFieldRoot>
 *   <TextFieldAddon>https://</TextFieldAddon>
 *   <TextFieldInput />
 *   <TextFieldAddon aria-label="検索">
 *     <SearchIcon />
 *   </TextFieldAddon>
 * </TextFieldRoot>
 * ```
 */
export const TextFieldAddon: Component<TextFieldAddonProps> = function SuiTextFieldAddon(props) {
  const { disableFocusOnClick = false, ...otherProps } = props;

  return useRender({
    defaultTagName: "span",
    props: [
      otherProps,
      {
        className: "sui_text_field_addon",
        [DISABLE_FOCUS_ON_CLICK_DATA]: disableFocusOnClick ? "true" : undefined,
      },
    ],
  });
};

/**
 * {@link TextFieldAddon} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Addon {
  /**
   * {@link TextFieldAddon} の状態型です。
   */
  export type State = TextFieldAddonState;

  /**
   * {@link TextFieldAddon} のプロパティー型です。
   */
  export type Props = TextFieldAddonProps;
}

/**
 * {@link TextFieldAddon} の別名です。
 */
export const Addon: Component<Addon.Props> = TextFieldAddon;
