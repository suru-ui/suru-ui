import { CheckboxGroup } from "@base-ui/react/checkbox-group";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { CheckboxGroupContext } from "./checkbox-group.context.js";

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
     * 既定値は {@link CheckboxGroupRootProps.size|size} です。
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

  export type BaseUI = Pick<
    React.ComponentProps<typeof CheckboxGroup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // CheckboxGroupProps:
      "value" | "defaultValue" | "onValueChange" | "allValues" | "disabled",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof CheckboxGroup>,
    keyof Render | keyof SuruUI | keyof BaseUI
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
          (state) => state.dirty && "sui_checkbox_group-dirty",
          (state) => state.valid && "sui_checkbox_group-valid",
          (state) => state.filled && "sui_checkbox_group-filled",
          (state) => state.focused && "sui_checkbox_group-focused",
          (state) => state.touched && "sui_checkbox_group-touched",
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
