import { RadioGroup } from "@base-ui/react/radio-group";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import { ContextMissingError } from "../../errors.js";
import type { Component } from "../../types.js";
import type { RadioRadius, RadioVariant } from "../radio/radio.parts.jsx";

import "./radio-group.css";

// Context
// -------

/**
 * {@link RadioGroupRoot} が子パーツへ提供する状態です。
 */
export type RadioGroupContext = {
  /**
   * ラジオボタンのスタイルバリエーションです。
   */
  readonly variant: RadioVariant;

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
  readonly radius: RadioRadius;

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
 * Provider は {@link RadioGroupRoot} の配下に必要です。
 * Provider がない場合、`optional` が `true` でなければ {@link ContextMissingError} を投げます。
 * `optional` に `true` を指定すると、Provider がない場合に `null` を返します。
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
 * {@link RadioGroupContext} の別名です。
 */
export type Context = RadioGroupContext;

/**
 * {@link RadioGroupContext} の別名です。
 */
export const Context: React.Context<RadioGroupContext | null> = RadioGroupContext;

/**
 * {@link useRadioGroupContext} の別名です。
 *
 * Provider は {@link RadioGroupRoot} の配下に必要です。
 * Provider がない場合、`optional` が `true` でなければ {@link ContextMissingError} を投げます。
 * `optional` に `true` を指定すると、Provider がない場合に `null` を返します。
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
 * {@link RadioGroupRoot} の状態です。
 */
export type RadioGroupRootState = RadioGroup.State;

/**
 * {@link RadioGroupRoot} に渡すプロパティーです。
 *
 * グループに指定したスタイルプロパティーは、子要素のラジオボタン指定より優先されます。
 * 指定後に値を変更すると、グループと子要素のスタイルも更新されます。
 */
export type RadioGroupRootProps = React.ComponentProps<typeof RadioGroup> & {
  /**
   * ラジオボタンのサイズを指定します。
   *
   * {@link RadioGroupRoot} の子要素に指定した値より優先されます。
   * 値を変更すると、グループ内のラジオボタンも更新されます。
   *
   * @default "md"
   */
  size?: Size | undefined;

  /**
   * ラジオボタンの色を指定します。
   *
   * {@link RadioGroupRoot} の子要素に指定した値より優先されます。
   * 値を変更すると、グループ内のラジオボタンも更新されます。
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
   * {@link RadioGroupRoot} の子要素に指定した値より優先されます。
   * 値を変更すると、グループ内のラジオボタンも更新されます。
   *
   * @default "naked"
   */
  variant?: RadioVariant | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   *
   * {@link RadioGroupRoot} の子要素に指定した値より優先されます。
   * 値を変更すると、グループ内のラジオボタンも更新されます。
   */
  outlined?: boolean | undefined;

  /**
   * ラジオボタンの角丸を指定します。
   *
   * - `"none"`: 角を直角にする
   * - `"rounded"`: 標準的な角丸
   * - `"full"`: 完全な丸形
   *
   * {@link RadioGroupRoot} の子要素に指定した値より優先されます。
   * 値を変更すると、グループ内のラジオボタンも更新されます。
   *
   * @default "full"
   */
  radius?: RadioRadius | undefined;

  /**
   * ラジオボタン群の向きを指定します。
   *
   * - `"horizontal"`: 横並び
   * - `"vertical"`: 縦並び
   *
   * 値を変更すると、グループのレイアウトと `aria-orientation` が更新されます。
   * `aria-orientation` を指定した場合は、その値が `orientation` より優先されます。
   *
   * @default "vertical"
   */
  orientation?: "horizontal" | "vertical" | undefined;
};

/**
 * ラジオボタングループのルート要素です。
 *
 * 選択状態を管理し、子要素のラジオボタンにスタイルを伝播します。
 * スタイル値が変わらない再レンダーでは、コンテキストの値を再生成しません。
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
  const context = React.useMemo<RadioGroupContext>(
    () => ({
      size: sizeProp,
      color: colorProp,
      radius: radiusProp,
      variant: variantProp,
      outlined,
      disabled,
    }),
    [colorProp, disabled, outlined, radiusProp, sizeProp, variantProp],
  );

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

/**
 * {@link RadioGroupRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link RadioGroupRoot} の状態型です。
   */
  export type State = RadioGroupRootState;

  /**
   * {@link RadioGroupRoot} のプロパティー型です。
   */
  export type Props = RadioGroupRootProps;
}

/**
 * {@link RadioGroupRoot} の別名です。
 */
export const Root: Component<Root.Props> = RadioGroupRoot;
