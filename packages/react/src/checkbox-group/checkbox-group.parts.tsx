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
export type CheckboxGroupContextColor = Color;

/**
 * チェックボックスの角丸です。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 */
export type CheckboxGroupContextRadius = "none" | Size | "full";

/**
 * チェックボックスの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type CheckboxGroupContextSize = Size;

/**
 * チェックボックスの主な外観です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type CheckboxGroupContextVariant = "naked" | "liquid";

/**
 * {@link CheckboxGroupRoot} が子パーツへ提供するコンテキストです。
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
   * チェックボックスの大きさです。
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
  const ctx = React.use(CheckboxGroupContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "CheckboxGroupContext",
      providerName: "CheckboxGroupRoot",
    });
  }

  return ctx;
}

/**
 * {@link CheckboxGroupContext} を読み取るフックです。
 */
export const useCheckboxGroupContext: IUseContext<CheckboxGroupContext> =
  useSuiCheckboxGroupContext;

export { CheckboxGroupContext as Context, useCheckboxGroupContext as useContext };

export namespace Context {
  /**
   * {@link CheckboxGroupContextColor}
   */
  export type Color = CheckboxGroupContextColor;

  /**
   * {@link CheckboxGroupContextRadius}
   */
  export type Radius = CheckboxGroupContextRadius;

  /**
   * {@link CheckboxGroupContextSize}
   */
  export type Size = CheckboxGroupContextSize;

  /**
   * {@link CheckboxGroupContextVariant}
   */
  export type Variant = CheckboxGroupContextVariant;
}

// Root
// ----

/**
 * チェックボックスグループの選択状態が変更されたイベントの詳細です。
 */
export type CheckboxGroupRootChangeEventDetails = CheckboxGroup.ChangeEventDetails;

/**
 * チェックボックスグループの選択状態が変更された理由です。
 */
export type CheckboxGroupRootChangeEventReason = CheckboxGroup.ChangeEventReason;

/**
 * チェックボックスの配色です。
 */
export type CheckboxGroupRootColor = Color;

/**
 * チェックボックス群の向きです。
 *
 * - `"horizontal"`: 横並び
 * - `"vertical"`: 縦並び
 */
export type CheckboxGroupRootOrientation = "horizontal" | "vertical";

/**
 * チェックボックスの角丸です。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 */
export type CheckboxGroupRootRadius = "none" | Size | "full";

/**
 * チェックボックスの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type CheckboxGroupRootSize = Size;

/**
 * チェックボックスの主な外観です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type CheckboxGroupRootVariant = "naked" | "liquid";

/**
 * {@link CheckboxGroupRoot} が持つ状態です。
 */
export type CheckboxGroupRootState = CheckboxGroup.State;

/**
 * {@link CheckboxGroupRoot} に渡す props です。
 */
export type CheckboxGroupRootProps = React.ComponentProps<typeof CheckboxGroup> & {
  /**
   * チェックボックスの配色を指定します。
   *
   * グループ内のチェックボックスより優先されます。
   *
   * @default "grey"
   */
  color?: CheckboxGroupRootColor | undefined;

  /**
   * チェックボックス群の向きを指定します。
   *
   * @default "vertical"
   */
  orientation?: CheckboxGroupRootOrientation | undefined;

  /**
   * チェックボックスに枠線を表示するかどうかを指定します。
   *
   * グループ内のチェックボックスより優先されます。
   */
  outlined?: boolean | undefined;

  /**
   * チェックボックスの角丸を指定します。
   *
   * グループ内のチェックボックスより優先されます。
   *
   * 既定値は {@link CheckboxGroupRootProps.size|size}
   */
  radius?: CheckboxGroupRootRadius | undefined;

  /**
   * チェックボックスの大きさを指定します。
   *
   * グループ内のチェックボックスより優先されます。
   *
   * @default "md"
   */
  size?: CheckboxGroupRootSize | undefined;

  /**
   * チェックボックスの主な外観を指定します。
   *
   * グループ内のチェックボックスより優先されます。
   *
   * @default "liquid"
   */
  variant?: CheckboxGroupRootVariant | undefined;
};

/**
 * チェックボックスグループのルートコンポーネントです。
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
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;
  const ctx = React.useMemo<CheckboxGroupContext>(
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
    <CheckboxGroupContext value={ctx}>
      <CheckboxGroup
        {...otherProps}
        disabled={disabled}
        className={cn(
          className,
          "sui_checkbox_group",
          `sui_checkbox_group-orientation_${orientation}`,
          (state) => state.disabled && "sui_checkbox_group-disabled",
        )}
        data-scope={dataScope}
      />
    </CheckboxGroupContext>
  );
};

export { CheckboxGroupRoot as Root };

export namespace Root {
  /**
   * {@link CheckboxGroupRootState}
   */
  export type State = CheckboxGroupRootState;

  /**
   * {@link CheckboxGroupRootProps}
   */
  export type Props = CheckboxGroupRootProps;

  /**
   * {@link CheckboxGroupRootChangeEventDetails}
   */
  export type ChangeEventDetails = CheckboxGroupRootChangeEventDetails;

  /**
   * {@link CheckboxGroupRootChangeEventReason}
   */
  export type ChangeEventReason = CheckboxGroupRootChangeEventReason;

  /**
   * {@link CheckboxGroupRootColor}
   */
  export type Color = CheckboxGroupRootColor;

  /**
   * {@link CheckboxGroupRootOrientation}
   */
  export type Orientation = CheckboxGroupRootOrientation;

  /**
   * {@link CheckboxGroupRootRadius}
   */
  export type Radius = CheckboxGroupRootRadius;

  /**
   * {@link CheckboxGroupRootSize}
   */
  export type Size = CheckboxGroupRootSize;

  /**
   * {@link CheckboxGroupRootVariant}
   */
  export type Variant = CheckboxGroupRootVariant;
}
