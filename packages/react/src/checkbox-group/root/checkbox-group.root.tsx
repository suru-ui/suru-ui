import { CheckboxGroup } from "@base-ui/react/checkbox-group";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import {
  type CheckboxGroupContextSize,
  type CheckboxGroupContextColor,
  type CheckboxGroupContextRadius,
  type CheckboxGroupContextVariant,
  type CheckboxGroupContextOrientation,
  CheckboxGroupContext,
} from "./checkbox-group.root.context.js";

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
export type CheckboxGroupRootColor = CheckboxGroupContextColor;

/**
 * チェックボックス群の向きです。
 *
 * - `"horizontal"`: 横並び
 * - `"vertical"`: 縦並び
 */
export type CheckboxGroupRootOrientation = CheckboxGroupContextOrientation;

/**
 * チェックボックスの角丸です。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 * - `"circle"`: 完全な丸形
 */
export type CheckboxGroupRootRadius = CheckboxGroupContextRadius;

/**
 * チェックボックスの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type CheckboxGroupRootSize = CheckboxGroupContextSize;

/**
 * チェックボックスの主な外観です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type CheckboxGroupRootVariant = CheckboxGroupContextVariant;

/**
 * {@link CheckboxGroupRoot} が持つ状態です。
 */
export type CheckboxGroupRootState = Override<CheckboxGroupContext, CheckboxGroup.State>;

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

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof CheckboxGroup>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // CheckboxGroupProps より:
      "value" | "defaultValue" | "onValueChange" | "allValues" | "disabled"
    >,
    keyof Render | keyof SuruUI
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

export type ICheckboxGroupRoot = IComponent<CheckboxGroupRootProps>;

/**
 * チェックボックスグループのルートコンポーネントです。
 */
export const CheckboxGroupRoot: ICheckboxGroupRoot = function SuiCheckboxGroupRoot(props) {
  const {
    size = "md",
    color = "grey",
    style,
    radius = size,
    render,
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
      orientation,
    }),
    [size, color, radius, variant, disabled, outlined, orientation],
  );

  return (
    <CheckboxGroupContext value={ctx}>
      <CheckboxGroup
        {...otherProps}
        {...proxyRenderProps<CheckboxGroup.State, CheckboxGroupRootState>(
          (state) => ({ ...ctx, ...state }),
          {
            style,
            render,
            className: cn<CheckboxGroupRootState>(
              className,
              "sui_checkbox_group",
              (state) => `sui_checkbox_group-size_${state.size}`,
              (state) => `sui_checkbox_group-color_${state.color}`,
              (state) => `sui_checkbox_group-radius_${state.radius}`,
              (state) => `sui_checkbox_group-variant_${state.variant}`,
              (state) => state.outlined && "sui_checkbox_group-outlined",
              (state) => `sui_checkbox_group-orientation_${state.orientation}`,
              (state) => state.disabled && "sui_checkbox_group-disabled",
              (state) => state.touched && "sui_checkbox_group-touched",
              (state) => state.dirty && "sui_checkbox_group-dirty",
              (state) => state.valid === false && "sui_checkbox_group-invalid",
              (state) => state.valid === true && "sui_checkbox_group-valid",
              (state) => state.valid === null && "sui_checkbox_group-unverified",
              (state) => state.filled && "sui_checkbox_group-filled",
              (state) => state.focused && "sui_checkbox_group-focused",
            ),
          },
        )}
        disabled={disabled}
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
