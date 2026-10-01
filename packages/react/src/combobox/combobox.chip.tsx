import { Combobox } from "@base-ui/react/combobox";
import type { Size, Color, ColorTemplate } from "@suru-ui/theme";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { ComboboxContext, useComboboxContext } from "./combobox.context.js";
import { ComboboxItemContext } from "./combobox.item.context.js";

/**
 * チップの配色です。
 */
export type ComboboxChipColor = Color;

/**
 * チップの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 */
export type ComboboxChipRadius = "none" | Size | "full";

/**
 * チップの主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ComboboxChipVariant = ColorTemplate;

/**
 * {@link ComboboxChip} の状態です。
 */
export type ComboboxChipState = Override<
  Override<ComboboxContext, Combobox.Chip.State>,
  {
    variant: ComboboxChipVariant;
  }
>;

export namespace ComboboxChipProps {
  export type Render = RenderProps<ComboboxChipState>;

  export type SuruUI<TValue = any> = {
    /**
     * チップの色を指定します。
     *
     * 省略時はコンボボックスの色を使います。
     */
    color?: ComboboxChipColor | undefined;

    /**
     * チップに枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: boolean | undefined;

    /**
     * チップの角丸を指定します。
     *
     * 省略時はコンボボックスの角丸を使います。
     */
    radius?: ComboboxChipRadius | undefined;

    /**
     * チップが表す項目の値です。
     *
     * 子要素へ伝播します。
     */
    value?: TValue;

    /**
     * チップの主な外観を指定します。
     *
     * @default "solid"
     */
    variant?: ComboboxChipVariant | undefined;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Chip>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxChipProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Chip>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxChip} に渡す props です。
 */
export type ComboboxChipProps<TValue = any> = ComboboxChipProps.Render &
  ComboboxChipProps.SuruUI<TValue> &
  ComboboxChipProps.BaseUI &
  ComboboxChipProps.HTML;

export interface IComboboxChip extends IComponent<ComboboxChipProps> {
  /**
   * @template TValue 項目の値の型です。
   */
  <TValue = any>(props: ComboboxChipProps<TValue>): IComponent.Return;
}

/**
 * 複数選択した値を表すチップ要素です。
 */
export const ComboboxChip: IComboboxChip = function SuiComboboxChip(props: ComboboxChipProps) {
  const ctx = useComboboxContext();
  const {
    color = ctx.color,
    style,
    value,
    radius = ctx.radius,
    render,
    variant = "solid",
    outlined = false,
    className,
    ...otherProps
  } = props;
  const childCtx = React.useMemo<ComboboxContext>(() => ({ ...ctx, radius }), [ctx, radius]);
  const itemCtx = React.useMemo<ComboboxItemContext>(() => ({ value }), [value]);

  return (
    <ComboboxContext value={childCtx}>
      <ComboboxItemContext value={itemCtx}>
        <Combobox.Chip
          {...otherProps}
          {...proxyRenderProps<Combobox.Chip.State, ComboboxChipState>(
            (state) => ({ ...ctx, color, radius, variant, outlined, ...state }),
            {
              style,
              render,
              className: cn<ComboboxChipState>(
                className,
                "sui_combobox_chip",
                (state) => `sui_combobox_chip-color_${state.color}`,
                (state) => `sui_combobox_chip-radius_${state.radius}`,
                (state) => `sui_combobox_chip-variant_${state.variant}`,
                (state) => state.outlined && "sui_combobox_chip-outlined",
                (state) => `sui_combobox_chip-size_${state.size}`,
                (state) => state.multiple && "sui_combobox_chip-multiple",
              ),
            },
          )}
        />
      </ComboboxItemContext>
    </ComboboxContext>
  );
};

export { ComboboxChip as Chip };

export namespace Chip {
  export type State = ComboboxChipState;

  export type Props<TValue = any> = Props.Render & Props.SuruUI<TValue> & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxChipProps.Render;

    export type SuruUI<TValue = any> = ComboboxChipProps.SuruUI<TValue>;

    export type BaseUI = ComboboxChipProps.BaseUI;

    export type HTML = ComboboxChipProps.HTML;
  }

  export type Color = ComboboxChipColor;

  export type Radius = ComboboxChipRadius;

  export type Variant = ComboboxChipVariant;
}
