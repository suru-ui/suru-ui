import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import {
  type AutocompleteContextSize,
  type AutocompleteContextColor,
  type AutocompleteContextRadius,
  type AutocompleteContextVariant,
  useAutocompleteContext,
} from "../root/autocomplete.root.context.js";
import { AutocompleteInputGroupContext } from "./autocomplete.input-group.context.js";

/**
 * {@link AutocompleteInputGroup} の状態です。
 */
export type AutocompleteInputGroupState = AutocompleteInputGroupContext;

/**
 * 入力グループの配色です。
 */
export type AutocompleteInputGroupColor = AutocompleteContextColor;

/**
 * 入力グループの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 */
export type AutocompleteInputGroupRadius = AutocompleteContextRadius;

/**
 * 入力グループの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type AutocompleteInputGroupSize = AutocompleteContextSize;

/**
 * 入力グループの主な外観の種類です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type AutocompleteInputGroupVariant = AutocompleteContextVariant;

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
     * 入力グループに枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: boolean | undefined;

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

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Autocomplete.InputGroup>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // AutocompleteInputGroupProps より:
      never
    >,
    keyof Render | keyof SuruUI
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
    style,
    radius = ctx.radius,
    render,
    variant = ctx.variant,
    outlined = false,
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <Autocomplete.InputGroup
      {...otherProps}
      {...proxyRenderProps<Autocomplete.InputGroup.State, AutocompleteInputGroupState>(
        (state) => ({ ...ctx, size, color, radius, variant, outlined, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <AutocompleteInputGroupContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </AutocompleteInputGroupContext>
          ),
          className: cn<AutocompleteInputGroupState>(
            className,
            "sui_autocomplete",
            (state) => `sui_autocomplete-size_${state.size}`,
            (state) => `sui_autocomplete-color_${state.color}`,
            (state) => `sui_autocomplete-radius_${state.radius}`,
            (state) => `sui_autocomplete-variant_${state.variant}`,
            (state) => state.outlined && "sui_autocomplete-outlined",
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
              `sui_autocomplete-popup_side_${state.popupSide.replaceAll("-", "_")}`,
            (state) => state.listEmpty && "sui_autocomplete-list_empty",
          ),
        },
      )}
      data-scope={dataScope}
    />
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
