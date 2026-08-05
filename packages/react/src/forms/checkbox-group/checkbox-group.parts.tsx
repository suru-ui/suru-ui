import { CheckboxGroup } from "@base-ui/react/checkbox-group";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import { ContextMissingError } from "../../errors.js";
import type { Component } from "../../types.js";

import "./checkbox-group.css";

// Context
// -------

/**
 * {@link CheckboxGroupContext} の値です。
 */
export type CheckboxGroupContext = {
  /**
   * チェックボックスのスタイルバリエーションです。
   */
  readonly variant: "naked" | "liquid";

  /**
   * チェックボックスの色です。
   */
  readonly color: Color;

  /**
   * チェックボックスのサイズです。
   */
  readonly size: Size;

  /**
   * チェックボックスの角丸です。
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
 * チェックボックスグループのスタイルを子要素へ伝播するコンテキストです。
 */
export const CheckboxGroupContext: React.Context<CheckboxGroupContext | null> =
  React.createContext<CheckboxGroupContext | null>(null);

/**
 * {@link CheckboxGroupContext} を読み取るフックです。
 *
 * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
 *
 * @returns コンテキストの値。`optional` が `true` でコンテキストがない場合は `null`。
 */
export function useCheckboxGroupContext(optional?: false): CheckboxGroupContext;
export function useCheckboxGroupContext(optional?: boolean): CheckboxGroupContext | null;
export function useCheckboxGroupContext(optional?: boolean): CheckboxGroupContext | null {
  const context = React.use(CheckboxGroupContext);
  if (context === null && !optional) {
    throw new ContextMissingError({
      contextName: "CheckboxGroupContext",
      providerName: "CheckboxGroupRoot",
    });
  }

  return context;
}

/**
 * {@link CheckboxGroupContext} のエイリアスです。
 */
export type Context = CheckboxGroupContext;

/**
 * {@link CheckboxGroupContext} のエイリアスです。
 */
export const Context: React.Context<CheckboxGroupContext | null> = CheckboxGroupContext;

/**
 * {@link useCheckboxGroupContext} のエイリアスです。
 *
 * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
 *
 * @returns コンテキストの値。`optional` が `true` でコンテキストがない場合は `null`。
 */
export function useContext(optional?: false): CheckboxGroupContext;
export function useContext(optional?: boolean): CheckboxGroupContext | null;
export function useContext(optional?: boolean): CheckboxGroupContext | null {
  return useCheckboxGroupContext(optional);
}

// Root
// ----

/**
 * {@link Root} の状態です。
 */
export type CheckboxGroupRootState = CheckboxGroup.State;

/**
 * {@link Root} に渡すプロパティーです。
 */
export type CheckboxGroupRootProps = React.ComponentProps<typeof CheckboxGroup> & {
  /**
   * チェックボックスのサイズを指定します。
   *
   * @default "md"
   */
  size?: Size | undefined;

  /**
   * チェックボックスの色を指定します。
   *
   * @default "grey"
   */
  color?: Color | undefined;

  /**
   * チェックボックスのスタイルバリエーションを指定します。
   *
   * - `"naked"`: 背景のないチェックマークのみ、枠線なし
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
   * チェックボックスの角丸を指定します。
   *
   * - `"none"`: 角を直角にする
   * - `"rounded"`: 標準的な角丸
   * - `"full"`: 完全な丸形
   *
   * @default "rounded"
   */
  radius?: "none" | "rounded" | "full" | undefined;

  /**
   * チェックボックス群の向きを指定します。
   *
   * - `"horizontal"`: 横並び
   * - `"vertical"`: 縦並び
   *
   * @default "vertical"
   */
  orientation?: "horizontal" | "vertical" | undefined;
};

/**
 * チェックボックスグループのルート要素です。
 *
 * 選択状態を管理し、子要素のチェックボックスにスタイルを伝播します。
 *
 * @example
 * ```tsx
 * <CheckboxGroupParts.Root defaultValue={["option-a"]} color="blue">
 *   <Checkbox value="option-a" />
 *   <Checkbox value="option-b" />
 * </CheckboxGroupParts.Root>
 * ```
 */
export const CheckboxGroupRoot: Component<CheckboxGroupRootProps> = function SuiCheckboxGroupRoot(
  props,
) {
  const {
    size: sizeProp = "md",
    color: colorProp = "grey",
    radius: radiusProp = "rounded",
    variant: variantProp = "naked",
    disabled,
    outlined = variantProp === "naked",
    orientation = "vertical",
    className,
    ...otherProps
  } = props;
  const context: CheckboxGroupContext = {
    size: sizeProp,
    color: colorProp,
    radius: radiusProp,
    variant: variantProp,
    outlined,
    disabled,
  };

  return (
    <Context value={context}>
      <CheckboxGroup
        {...otherProps}
        disabled={disabled}
        className={cn(
          className,
          "sui_checkbox_group",
          `sui_checkbox_group-orientation_${orientation}`,
        )}
      />
    </Context>
  );
};

export namespace Root {
  export type State = CheckboxGroupRootState;
  export type Props = CheckboxGroupRootProps;
}

export const Root: Component<Root.Props> = CheckboxGroupRoot;
