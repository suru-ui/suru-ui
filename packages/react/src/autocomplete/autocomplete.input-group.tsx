import { Autocomplete } from "@base-ui/react/autocomplete";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { AutocompleteContext, useAutocompleteContext } from "./autocomplete.context.js";

/**
 * {@link AutocompleteInputGroup} の状態です。
 */
export type AutocompleteInputGroupState = Autocomplete.InputGroup.State;

/**
 * 入力グループの配色です。
 */
export type AutocompleteInputGroupColor = Color;

/**
 * 入力グループの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 */
export type AutocompleteInputGroupRadius = "none" | Size | "full";

/**
 * 入力グループの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type AutocompleteInputGroupSize = Size;

/**
 * 入力グループの主な外観の種類です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type AutocompleteInputGroupVariant = "naked" | "liquid";

export namespace AutocompleteInputGroupProps {
  export type Render = RenderProps<AutocompleteInputGroupState>;

  export type SuruUI = {
    /**
     * 入力グループの色を指定します。
     *
     * 省略時はオートコンプリートの色を使います。
     */
    color?: AutocompleteInputGroupColor | undefined;

    /**
     * 入力グループの角丸を指定します。
     *
     * 省略時はオートコンプリートの角丸を使います。
     */
    radius?: AutocompleteInputGroupRadius | undefined;

    /**
     * 入力グループのサイズを指定します。
     *
     * 省略時はオートコンプリートのサイズを使います。
     */
    size?: AutocompleteInputGroupSize | undefined;

    /**
     * 入力グループの主な外観を指定します。
     *
     * 省略時はオートコンプリートの外観を使います。
     */
    variant?: AutocompleteInputGroupVariant | undefined;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.InputGroup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // AutocompleteInputGroupProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.InputGroup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteInputGroup} に渡す props です。
 */
export type AutocompleteInputGroupProps = AutocompleteInputGroupProps.Render &
  AutocompleteInputGroupProps.SuruUI &
  AutocompleteInputGroupProps.BaseUI &
  AutocompleteInputGroupProps.HTML;

export type IAutocompleteInputGroup = IComponent<AutocompleteInputGroupProps>;

/**
 * 入力欄とその付属コントロールをまとめるグループ要素です。
 *
 * Root のスタイルプロパティーがこの要素へ適用されます。
 */
export const AutocompleteInputGroup: IAutocompleteInputGroup = function SuiAutocompleteInputGroup(
  props,
) {
  const ctx = useAutocompleteContext();
  const {
    size = ctx.size,
    color = ctx.color,
    radius = ctx.radius,
    variant = ctx.variant,
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;
  const childCtx = React.useMemo<AutocompleteContext>(
    () => ({ ...ctx, size, color, radius, variant }),
    [ctx, size, color, radius, variant],
  );

  return (
    <AutocompleteContext value={childCtx}>
      <Autocomplete.InputGroup
        {...otherProps}
        className={cn(
          className,
          "sui_autocomplete",
          `sui_autocomplete-size_${size}`,
          `sui_autocomplete-color_${color}`,
          `sui_autocomplete-radius_${radius}`,
          `sui_autocomplete-variant_${variant}`,
          childCtx.outlined && "sui_autocomplete-outlined",
          (state) => state.disabled && "sui_autocomplete-disabled",
          (state) => state.touched && "sui_autocomplete-touched",
          (state) => state.dirty && "sui_autocomplete-dirty",
          (state) => state.valid === false && "sui_autocomplete-invalid",
          (state) => state.valid === true && "sui_autocomplete-valid",
          (state) => state.valid === null && "sui_autocomplete-unverified",
          (state) => state.filled && "sui_autocomplete-filled",
          (state) => state.focused && "sui_autocomplete-focused",
          (state) => state.open && "sui_autocomplete-open",
          (state) => state.readOnly && "sui_autocomplete-readonly",
          (state) =>
            state.popupSide !== null &&
            `sui_autocomplete-popupside_${state.popupSide.replaceAll("-", "_")}`,
          (state) => state.listEmpty && "sui_autocomplete-listempty",
        )}
        data-scope={dataScope}
      />
    </AutocompleteContext>
  );
};

export { AutocompleteInputGroup as InputGroup };

export namespace InputGroup {
  export type State = AutocompleteInputGroupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteInputGroupProps.Render;

    export type SuruUI = AutocompleteInputGroupProps.SuruUI;

    export type BaseUI = AutocompleteInputGroupProps.BaseUI;

    export type HTML = AutocompleteInputGroupProps.HTML;
  }

  export type Color = AutocompleteInputGroupColor;

  export type Radius = AutocompleteInputGroupRadius;

  export type Size = AutocompleteInputGroupSize;

  export type Variant = AutocompleteInputGroupVariant;
}
