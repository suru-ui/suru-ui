import { CheckboxGroup } from "@base-ui/react/checkbox-group";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
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
  export type Color = CheckboxGroupContextColor;

  export type Radius = CheckboxGroupContextRadius;

  export type Size = CheckboxGroupContextSize;

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

export namespace CheckboxGroupRootProps {
  export type Render = RenderProps<CheckboxGroupRootState>;

  export type SuruUI = {
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

  export type BaseUI = Omit<
    React.ComponentProps<typeof CheckboxGroup>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof CheckboxGroup>
  >;
}

/**
 * {@link CheckboxGroupRoot} に渡す props です。
 */
export type CheckboxGroupRootProps = CheckboxGroupRootProps.Render &
  CheckboxGroupRootProps.SuruUI &
  CheckboxGroupRootProps.BaseUI &
  CheckboxGroupRootProps.HTML;

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
  export type State = CheckboxGroupRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = CheckboxGroupRootProps.Render;

    export type SuruUI = CheckboxGroupRootProps.SuruUI;

    export type BaseUI = CheckboxGroupRootProps.BaseUI;

    export type HTML = CheckboxGroupRootProps.HTML;
  }

  export type ChangeEventDetails = CheckboxGroupRootChangeEventDetails;

  export type ChangeEventReason = CheckboxGroupRootChangeEventReason;

  export type Color = CheckboxGroupRootColor;

  export type Orientation = CheckboxGroupRootOrientation;

  export type Radius = CheckboxGroupRootRadius;

  export type Size = CheckboxGroupRootSize;

  export type Variant = CheckboxGroupRootVariant;
}
