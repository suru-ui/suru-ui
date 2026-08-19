import { CheckboxGroup } from "@base-ui/react/checkbox-group";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import { ContextMissingError } from "../../errors.js";
import type { IComponent, IUseContext } from "../../types.js";

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
   * チェックボックスの色です。
   */
  readonly color: CheckboxGroupRootColor;

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * チェックボックスの角丸です。
   */
  readonly radius: CheckboxGroupRootRadius;

  /**
   * チェックボックスのサイズです。
   */
  readonly size: CheckboxGroupRootSize;

  /**
   * チェックボックスのスタイルバリエーションです。
   */
  readonly variant: CheckboxGroupRootVariant;

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

function useSuiCheckboxGroupContext(optional?: false): CheckboxGroupContext;
function useSuiCheckboxGroupContext(optional?: boolean): CheckboxGroupContext | null;
function useSuiCheckboxGroupContext(optional?: boolean): CheckboxGroupContext | null {
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
 * {@link CheckboxGroupContext} です。
 */
export type Context = CheckboxGroupContext;

/**
 * {@link CheckboxGroupContext} です。
 */
export const Context: React.Context<CheckboxGroupContext | null> = CheckboxGroupContext;

/**
 * {@link CheckboxGroupContext} を読み取るフックです。
 */
export const useCheckboxGroupContext: IUseContext<CheckboxGroupContext> =
  useSuiCheckboxGroupContext;

/**
 * {@link useCheckboxGroupContext} です。
 */
export const useContext: IUseContext<Context> = useCheckboxGroupContext;

// Root
// ----

/**
 * チェックボックスグループの色です。
 */
export type CheckboxGroupRootColor = Color;

/**
 * チェックボックスグループの向きです。
 *
 * - `"horizontal"`: 横並び
 * - `"vertical"`: 縦並び
 */
export type CheckboxGroupRootOrientation = "horizontal" | "vertical";

/**
 * チェックボックスグループの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type CheckboxGroupRootRadius = "none" | Size | "full";

/**
 * チェックボックスグループの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type CheckboxGroupRootSize = Size;

/**
 * チェックボックスグループの主な外観の種類です。
 *
 * - `"naked"`: 背景のないチェックマークのみ、枠線なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type CheckboxGroupRootVariant = "naked" | "liquid";

/**
 * {@link CheckboxGroupRoot} の状態です。
 *
 * {@link CheckboxGroupRoot} が公開する状態です。
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
   * チェックボックスの色を指定します。
   *
   * {@link CheckboxGroupRoot} の子要素に指定した値より優先されます。
   * 値を変更すると、グループ内のチェックボックスも更新されます。
   *
   * @default "grey"
   */
  color?: CheckboxGroupRootColor | undefined;

  /**
   * チェックボックス群の向きを指定します。
   *
   * 値を変更すると、グループのレイアウトが更新されます。
   *
   * @default "vertical"
   */
  orientation?: CheckboxGroupRootOrientation | undefined;

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
   * デフォルト値は {@link CheckboxGroupRootProps.size|size} です。
   * {@link CheckboxGroupRoot} の子要素に指定した値より優先されます。
   * 値を変更すると、グループ内のチェックボックスも更新されます。
   */
  radius?: CheckboxGroupRootRadius | undefined;

  /**
   * チェックボックスのサイズを指定します。
   *
   * {@link CheckboxGroupRoot} の子要素に指定した値より優先されます。
   * 値を変更すると、グループ内のチェックボックスも更新されます。
   *
   * @default "md"
   */
  size?: CheckboxGroupRootSize | undefined;

  /**
   * チェックボックスのスタイルバリエーションを指定します。
   *
   * {@link CheckboxGroupRoot} の子要素に指定した値より優先されます。
   * 値を変更すると、グループ内のチェックボックスも更新されます。
   *
   * @default "naked"
   */
  variant?: CheckboxGroupRootVariant | undefined;
};

/**
 * チェックボックスグループのルート要素です。
 *
 * 選択状態を管理し、子要素のチェックボックスにスタイルを伝播します。
 * スタイル値が変わらない再レンダーでは、コンテキストの値を再生成しません。
 */
export const CheckboxGroupRoot: IComponent<CheckboxGroupRootProps> = function SuiCheckboxGroupRoot(
  props,
) {
  const {
    size: sizeProp = "md",
    color: colorProp = "grey",
    radius: radiusProp = sizeProp,
    variant: variantProp = "naked",
    disabled,
    outlined = variantProp === "naked",
    className,
    orientation = "vertical",
    ...otherProps
  } = props;
  const context = React.useMemo<CheckboxGroupContext>(
    () => ({
      color: colorProp,
      outlined,
      radius: radiusProp,
      size: sizeProp,
      variant: variantProp,
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
   * {@link CheckboxGroupRootState} です。
   */
  export type State = CheckboxGroupRootState;

  /**
   * {@link CheckboxGroupRootProps} です。
   */
  export type Props = CheckboxGroupRootProps;

  /**
   * {@link CheckboxGroupRootColor} です。
   */
  export type Color = CheckboxGroupRootColor;

  /**
   * {@link CheckboxGroupRootRadius} です。
   */
  export type Radius = CheckboxGroupRootRadius;

  /**
   * {@link CheckboxGroupRootSize} です。
   */
  export type Size = CheckboxGroupRootSize;

  /**
   * {@link CheckboxGroupRootVariant} です。
   */
  export type Variant = CheckboxGroupRootVariant;

  /**
   * {@link CheckboxGroupRootOrientation} です。
   */
  export type Orientation = CheckboxGroupRootOrientation;
}

/**
 * {@link CheckboxGroupRoot} です。
 */
export const Root: IComponent<Root.Props> = CheckboxGroupRoot;
