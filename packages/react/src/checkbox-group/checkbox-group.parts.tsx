import { CheckboxGroup } from "@base-ui/react/checkbox-group";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import type { IComponent, IUseContext } from "../types.js";

import "./checkbox-group.css";

// Context
// -------

/**
 * チェックボックスの配色です。
 */
type CheckboxGroupContextColor = Color;

/**
 * チェックボックスの角丸です。
 */
type CheckboxGroupContextRadius = "none" | Size | "full";

/**
 * チェックボックスのサイズです。
 */
type CheckboxGroupContextSize = Size;

/**
 * チェックボックスの主な外観です。
 */
type CheckboxGroupContextVariant = "naked" | "liquid";

/**
 * {@link CheckboxGroupRoot} が子パーツへ提供する状態です。
 */
export type CheckboxGroupContext = {
  /**
   * チェックボックスの配色です。
   */
  readonly color: CheckboxGroupContextColor;

  /**
   * グループ全体を無効にするかどうかです。
   */
  readonly disabled: boolean | undefined;

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * チェックボックスの角丸です。
   */
  readonly radius: CheckboxGroupContextRadius;

  /**
   * チェックボックスのサイズです。
   */
  readonly size: CheckboxGroupContextSize;

  /**
   * チェックボックスの主な外観です。
   */
  readonly variant: CheckboxGroupContextVariant;
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
 * {@link CheckboxGroupContext} を読み取るフックです。
 */
export const useCheckboxGroupContext: IUseContext<CheckboxGroupContext> =
  useSuiCheckboxGroupContext;

/**
 * {@link CheckboxGroupContext} です。
 */
export type Context = CheckboxGroupContext;

/**
 * {@link CheckboxGroupContext} です。
 */
export const Context: React.Context<Context | null> = CheckboxGroupContext;

/**
 * {@link Context} の型名前空間です。
 */
export namespace Context {
  /**
   * {@link CheckboxGroupContextColor} です。
   */
  export type Color = CheckboxGroupContextColor;

  /**
   * {@link CheckboxGroupContextRadius} です。
   */
  export type Radius = CheckboxGroupContextRadius;

  /**
   * {@link CheckboxGroupContextSize} です。
   */
  export type Size = CheckboxGroupContextSize;

  /**
   * {@link CheckboxGroupContextVariant} です。
   */
  export type Variant = CheckboxGroupContextVariant;
}

/**
 * {@link useCheckboxGroupContext} です。
 */
export const useContext: IUseContext<Context> = useCheckboxGroupContext;

// Root
// ----

/**
 * チェックボックスの配色です。
 */
export type CheckboxGroupRootColor = Color;

/**
 * チェックボックスの向きです。
 *
 * - `"horizontal"`: 横並び
 * - `"vertical"`: 縦並び
 */
export type CheckboxGroupRootOrientation = "horizontal" | "vertical";

/**
 * チェックボックスの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type CheckboxGroupRootRadius = "none" | Size | "full";

/**
 * チェックボックスの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type CheckboxGroupRootSize = Size;

/**
 * チェックボックスの主な外観の種類です。
 *
 * - `"naked"`: 背景のないチェックマークのみ、枠線なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type CheckboxGroupRootVariant = "naked" | "liquid";

/**
 * {@link CheckboxGroupRoot} の状態です。
 */
export type CheckboxGroupRootState = CheckboxGroup.State;

/**
 * {@link CheckboxGroupRoot} に渡すプロパティーです。
 *
 * グループに指定したスタイルプロパティーは、子要素のチェックボックス指定より優先されます。
 */
export type CheckboxGroupRootProps = React.ComponentProps<typeof CheckboxGroup> & {
  /**
   * チェックボックスの色を指定します。
   *
   * 子要素のチェックボックスのプロパティーを上書きします。
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
   * 子要素のチェックボックスのプロパティーを上書きします。
   */
  outlined?: boolean | undefined;

  /**
   * チェックボックスの角丸を指定します。
   *
   * 子要素のチェックボックスのプロパティーを上書きします。
   */
  radius?: CheckboxGroupRootRadius | undefined;

  /**
   * チェックボックスのサイズを指定します。
   *
   * 子要素のチェックボックスのプロパティーを上書きします。
   *
   * @default "md"
   */
  size?: CheckboxGroupRootSize | undefined;

  /**
   * チェックボックスの主な外観を指定します。
   *
   * 子要素のチェックボックスのプロパティーを上書きします。
   *
   * @default "liquid"
   */
  variant?: CheckboxGroupRootVariant | undefined;
};

/**
 * チェックボックスのルート要素です。
 *
 * 選択状態を管理し、子要素のチェックボックスにスタイルを伝播します。
 */
export const CheckboxGroupRoot: IComponent<CheckboxGroupRootProps> = function SuiCheckboxGroupRoot(
  props,
) {
  const {
    size = "md",
    color = "grey",
    radius = size,
    variant = "liquid",
    disabled,
    outlined = false,
    className,
    orientation = "vertical",
    ...otherProps
  } = props;
  const context = React.useMemo<CheckboxGroupContext>(
    () => ({
      size,
      color,
      radius,
      variant,
      disabled,
      outlined,
    }),
    [size, color, radius, variant, disabled, outlined],
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
   * {@link CheckboxGroupRootOrientation} です。
   */
  export type Orientation = CheckboxGroupRootOrientation;

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
}

/**
 * {@link CheckboxGroupRoot} です。
 */
export const Root: IComponent<Root.Props> = CheckboxGroupRoot;
