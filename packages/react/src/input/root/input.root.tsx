import { Input } from "@base-ui/react/input";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import {
  type InputContextSize,
  type InputContextColor,
  type InputContextRadius,
  type InputContextVariant,
  InputContext,
} from "./input.root.context.js";

/**
 * {@link InputRoot} の値が変更されたイベントの詳細です。
 */
export type InputRootChangeEventDetails = Input.ChangeEventDetails;

/**
 * {@link InputRoot} の値が変更された理由です。
 */
export type InputRootChangeEventReason = Input.ChangeEventReason;

/**
 * テキスト入力欄の配色です。
 */
export type InputRootColor = InputContextColor;

/**
 * テキスト入力欄の角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type InputRootRadius = InputContextRadius;

/**
 * テキスト入力欄の大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type InputRootSize = InputContextSize;

/**
 * 入力欄で使用できる入力項目の種類です。
 *
 * ボタンや選択系 (`"button"`、`"checkbox"`、`"radio"` など) は除きます。
 */
export type InputRootType = Exclude<
  React.HTMLInputTypeAttribute,
  "button" | "checkbox" | "color" | "image" | "radio" | "range" | "reset" | "submit"
>;

/**
 * テキスト入力欄の主な外観の種類です。
 *
 * - `"naked"`: 背景のないテキスト入力欄
 * - `"liquid"`: 薄い塗りつぶし
 */
export type InputRootVariant = InputContextVariant;

/**
 * {@link InputRoot} が持つ状態です。
 */
export type InputRootState = Override<InputContext, Input.State>;

export namespace InputRootProps {
  export type Render = RenderProps<InputRootState>;

  export type SuruUI = {
    /**
     * フォーカス時に枠線へ適用する色を指定します。
     *
     * @default "grey"
     */
    color?: InputRootColor | undefined;

    /**
     * 枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: boolean | undefined;

    /**
     * テキスト入力欄の角丸を指定します。
     *
     * 既定値は {@link InputRootProps.size|size}
     */
    radius?: InputRootRadius | undefined;

    /**
     * テキスト入力欄のサイズを指定します。
     *
     * @default "md"
     */
    size?: InputRootSize | undefined;

    /**
     * 入力項目です。
     *
     * @default "text"
     */
    type?: InputRootType | undefined;

    /**
     * テキスト入力欄の主な外観を指定します。
     *
     * @default "liquid"
     */
    variant?: InputRootVariant | undefined;
  };

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Input>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // InputProps より:
      "value" | "defaultValue" | "onValueChange"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Input>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link InputRoot} に渡す props です。
 */
export type InputRootProps = InputRootProps.Render &
  InputRootProps.SuruUI &
  InputRootProps.BaseUI &
  InputRootProps.HTML;

export type IInputRoot = IComponent<InputRootProps>;

/**
 * テキスト入力欄のルートコンポーネントです。
 */
export const InputRoot: IInputRoot = function SuiInputRoot(props) {
  const {
    size = "md",
    type = "text",
    color = "grey",
    style,
    radius = size,
    render,
    variant = "liquid",
    outlined = false,
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;
  const ctx = React.useMemo<InputContext>(
    () => ({ size, color, radius, variant, outlined }),
    [size, color, radius, variant, outlined],
  );

  return (
    <InputContext value={ctx}>
      <Input
        {...otherProps}
        type={type}
        {...proxyRenderProps<Input.State, InputRootState>((state) => ({ ...ctx, ...state }), {
          style,
          render,
          className: cn<InputRootState>(
            className,
            "sui_input",
            (state) => `sui_input-size_${state.size}`,
            (state) => `sui_input-color_${state.color}`,
            (state) => `sui_input-radius_${state.radius}`,
            (state) => `sui_input-variant_${state.variant}`,
            (state) => state.outlined && "sui_input-outlined",
            (state) => state.valid === true && "sui_input-valid",
            (state) => state.valid === false && "sui_input-invalid",
            (state) => state.valid === null && "sui_input-unverified",
            (state) => state.disabled && "sui_input-disabled",
            (state) => state.touched && "sui_input-touched",
            (state) => state.dirty && "sui_input-dirty",
            (state) => state.filled && "sui_input-filled",
            (state) => state.focused && "sui_input-focused",
          ),
        })}
        data-scope={dataScope}
      />
    </InputContext>
  );
};

export { InputRoot as Root };

export namespace Root {
  export type State = InputRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = InputRootProps.Render;

    export type SuruUI = InputRootProps.SuruUI;

    export type BaseUI = InputRootProps.BaseUI;

    export type HTML = InputRootProps.HTML;
  }

  export type ChangeEventDetails = InputRootChangeEventDetails;

  export type ChangeEventReason = InputRootChangeEventReason;

  export type Color = InputRootColor;

  export type Radius = InputRootRadius;

  export type Size = InputRootSize;

  export type Type = InputRootType;

  export type Variant = InputRootVariant;
}
