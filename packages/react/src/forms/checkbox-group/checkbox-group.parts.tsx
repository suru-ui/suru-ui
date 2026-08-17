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
 * {@link CheckboxGroupRoot} が子パーツへ提供する状態です。
 *
 * {@link CheckboxGroupRoot} に指定したスタイル値を子要素へ伝播します。
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
 * Provider は {@link CheckboxGroupRoot} の配下に必要です。
 * Provider がない場合、`optional` が `true` でなければ {@link ContextMissingError} を投げます。
 * `optional` に `true` を指定すると、Provider がない場合に `null` を返します。
 *
 * @param optional Provider がなくても `null` を返すかどうかを指定します。
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
 * {@link CheckboxGroupContext} の別名です。
 */
export type Context = CheckboxGroupContext;

/**
 * {@link CheckboxGroupContext} の別名です。
 */
export const Context: React.Context<CheckboxGroupContext | null> = CheckboxGroupContext;

/**
 * {@link useCheckboxGroupContext} の別名です。
 *
 * Provider は {@link CheckboxGroupRoot} の配下に必要です。
 * Provider がない場合、`optional` が `true` でなければ {@link ContextMissingError} を投げます。
 * `optional` に `true` を指定すると、Provider がない場合に `null` を返します。
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
 * {@link CheckboxGroupRoot} の状態です。
 *
 * {@link CheckboxGroupRoot} が公開する状態型の別名です。
 */
export type CheckboxGroupRootState = CheckboxGroup.State;

/**
 * {@link CheckboxGroupRoot} に渡すプロパティーです。
 *
 * グループに指定したスタイルプロパティーは、子要素のチェックボックス指定より優先されます。
 * 指定後に値を変更すると、グループと子要素のスタイルも更新されます。
 */
export type CheckboxGroupRootProps = React.ComponentProps<typeof CheckboxGroup> & {
  /**
   * チェックボックスのサイズを指定します。
   *
   * {@link CheckboxGroupRoot} の子要素に指定した値より優先されます。
   * 値を変更すると、グループ内のチェックボックスも更新されます。
   *
   * @default "md"
   */
  size?: Size | undefined;

  /**
   * チェックボックスの色を指定します。
   *
   * {@link CheckboxGroupRoot} の子要素に指定した値より優先されます。
   * 値を変更すると、グループ内のチェックボックスも更新されます。
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
   * {@link CheckboxGroupRoot} の子要素に指定した値より優先されます。
   * 値を変更すると、グループ内のチェックボックスも更新されます。
   *
   * @default "naked"
   */
  variant?: "naked" | "liquid" | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   *
   * {@link CheckboxGroupRoot} の子要素に指定した値より優先されます。
   * 値を変更すると、グループ内のチェックボックスも更新されます。
   */
  outlined?: boolean | undefined;

  /**
   * チェックボックスの角丸を指定します。
   *
   * - `"none"`: 角を直角にする
   * - `"rounded"`: 標準的な角丸
   * - `"full"`: 完全な丸形
   *
   * {@link CheckboxGroupRoot} の子要素に指定した値より優先されます。
   * 値を変更すると、グループ内のチェックボックスも更新されます。
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
   * 値を変更すると、グループのレイアウトが更新されます。
   *
   * @default "vertical"
   */
  orientation?: "horizontal" | "vertical" | undefined;
};

/**
 * チェックボックスグループのルート要素です。
 *
 * 選択状態を管理し、子要素のチェックボックスにスタイルを伝播します。
 * スタイル値が変わらない再レンダーでは、コンテキストの値を再生成しません。
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
  const context = React.useMemo<CheckboxGroupContext>(
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

/**
 * {@link CheckboxGroupRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link CheckboxGroupRoot} の状態型です。
   */
  export type State = CheckboxGroupRootState;

  /**
   * {@link CheckboxGroupRoot} のプロパティー型です。
   */
  export type Props = CheckboxGroupRootProps;
}

/**
 * {@link CheckboxGroupRoot} の別名です。
 */
export const Root: Component<Root.Props> = CheckboxGroupRoot;
