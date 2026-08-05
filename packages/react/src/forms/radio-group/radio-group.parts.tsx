import { RadioGroup } from "@base-ui/react/radio-group";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import { ContextMissingError } from "../../errors.js";
import type { Component } from "../../types.js";

import "./radio-group.css";

// Context
// -------

/**
 * {@link RadioGroupContext} の値です。
 */
export type RadioGroupContext = {
  /**
   * ラジオボタンのスタイルバリエーションです。
   */
  readonly variant: "naked" | "liquid";

  /**
   * ラジオボタンの色です。
   */
  readonly color: Color;

  /**
   * ラジオボタンのサイズです。
   */
  readonly size: Size;

  /**
   * ラジオボタンの角丸です。
   */
  readonly radius: "none" | "rounded" | "full";

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * グループ全体を無効にするかどうかです。
   */
  readonly disabled: boolean | undefined;
};

/**
 * ラジオボタングループのスタイルを子要素へ伝播するコンテキストです。
 */
export const RadioGroupContext: React.Context<RadioGroupContext | null> =
  React.createContext<RadioGroupContext | null>(null);

/**
 * {@link RadioGroupContext} を読み取るフックです。
 *
 * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
 *
 * @returns コンテキストの値。`optional` が `true` でコンテキストがない場合は `null`。
 */
export function useRadioGroupContext(optional?: false): RadioGroupContext;
export function useRadioGroupContext(optional?: boolean): RadioGroupContext | null;
export function useRadioGroupContext(optional?: boolean): RadioGroupContext | null {
  const context = React.use(RadioGroupContext);
  if (context === null && !optional) {
    throw new ContextMissingError({
      contextName: "RadioGroupContext",
      providerName: "RadioGroupRoot",
    });
  }

  return context;
}

/**
 * {@link RadioGroupContext} のエイリアスです。
 */
export type Context = RadioGroupContext;

/**
 * {@link RadioGroupContext} のエイリアスです。
 */
export const Context: React.Context<RadioGroupContext | null> = RadioGroupContext;

/**
 * {@link useRadioGroupContext} のエイリアスです。
 *
 * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
 *
 * @returns コンテキストの値。`optional` が `true` でコンテキストがない場合は `null`。
 */
export function useContext(optional?: false): RadioGroupContext;
export function useContext(optional?: boolean): RadioGroupContext | null;
export function useContext(optional?: boolean): RadioGroupContext | null {
  return useRadioGroupContext(optional);
}

// Root
// ----

/**
 * {@link Root} の状態です。
 */
export type RadioGroupRootState = RadioGroup.State;

/**
 * {@link Root} に渡すプロパティーです。
 */
export type RadioGroupRootProps = React.ComponentProps<typeof RadioGroup> & {
  /**
   * ラジオボタンのサイズを指定します。
   *
   * @default "md"
   */
  size?: Size | undefined;

  /**
   * ラジオボタンの色を指定します。
   *
   * @default "grey"
   */
  color?: Color | undefined;

  /**
   * ラジオボタンのスタイルバリエーションを指定します。
   *
   * - `"naked"`: 背景のないインジケーターのみ、枠線なし
   * - `"liquid"`: 薄い塗りつぶし
   *
   * @default "naked"
   */
  variant?: "naked" | "liquid" | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   */
  outlined?: boolean | undefined;

  /**
   * ラジオボタンの角丸を指定します。
   *
   * - `"none"`: 角を直角にする
   * - `"rounded"`: 標準的な角丸
   * - `"full"`: 完全な丸形
   *
   * @default "full"
   */
  radius?: "none" | "rounded" | "full" | undefined;

  /**
   * ラジオボタン群の向きを指定します。
   *
   * - `"horizontal"`: 横並び
   * - `"vertical"`: 縦並び
   *
   * @default "vertical"
   */
  orientation?: "horizontal" | "vertical" | undefined;
};

/**
 * ラジオボタングループのルート要素です。
 *
 * 選択状態を管理し、子要素のラジオボタンにスタイルを伝播します。
 *
 * @example
 * ```tsx
 * <RadioGroupParts.Root defaultValue="option-a" color="blue">
 *   <Radio value="option-a" />
 *   <Radio value="option-b" />
 * </RadioGroupParts.Root>
 * ```
 */
export const RadioGroupRoot: Component<RadioGroupRootProps> = function SuiRadioGroupRoot(props) {
  const {
    size: sizeProp = "md",
    color: colorProp = "grey",
    radius: radiusProp = "full",
    variant: variantProp = "naked",
    disabled,
    outlined = variantProp === "naked",
    orientation = "vertical",
    "aria-orientation": ariaOrientation = orientation,
    className,
    ...otherProps
  } = props;
  const context: RadioGroupContext = {
    size: sizeProp,
    color: colorProp,
    radius: radiusProp,
    variant: variantProp,
    outlined,
    disabled,
  };

  return (
    <Context value={context}>
      <RadioGroup
        {...otherProps}
        disabled={disabled}
        className={cn(className, "sui_radio_group", `sui_radio_group-orientation_${orientation}`)}
        aria-orientation={ariaOrientation}
      />
    </Context>
  );
};

export namespace Root {
  export type State = RadioGroupRootState;
  export type Props = RadioGroupRootProps;
}

export const Root: Component<Root.Props> = RadioGroupRoot;
