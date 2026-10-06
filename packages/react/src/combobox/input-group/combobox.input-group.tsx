import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import {
  type ComboboxContextSize,
  type ComboboxContextColor,
  type ComboboxContextRadius,
  type ComboboxContextVariant,
  useComboboxContext,
} from "../root/combobox.root.context.js";
import { ComboboxInputGroupContext } from "./combobox.input-group.context.js";

/**
 * {@link ComboboxInputGroup} の状態です。
 */
export type ComboboxInputGroupState = ComboboxInputGroupContext;

/**
 * 入力グループの配色です。
 */
export type ComboboxInputGroupColor = ComboboxContextColor;

/**
 * 入力グループの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 */
export type ComboboxInputGroupRadius = ComboboxContextRadius;

/**
 * 入力グループの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type ComboboxInputGroupSize = ComboboxContextSize;

/**
 * 入力グループの主な外観の種類です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ComboboxInputGroupVariant = ComboboxContextVariant;

export namespace ComboboxInputGroupProps {
  export type Render = RenderProps<ComboboxInputGroupState>;

  export type SuruUI = {
    /**
     * 入力グループの色を指定します。
     *
     * 省略時はコンボボックスの色を使います。
     */
    color?: ComboboxInputGroupColor | undefined;

    /**
     * 入力グループに枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: boolean | undefined;

    /**
     * 入力グループの角丸を指定します。
     *
     * 省略時はコンボボックスの角丸を使います。
     */
    radius?: ComboboxInputGroupRadius | undefined;

    /**
     * 入力グループのサイズを指定します。
     *
     * 省略時はコンボボックスのサイズを使います。
     */
    size?: ComboboxInputGroupSize | undefined;

    /**
     * 入力グループの主な外観を指定します。
     *
     * 省略時はコンボボックスの外観を使います。
     */
    variant?: ComboboxInputGroupVariant | undefined;
  };

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Combobox.InputGroup>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // ComboboxInputGroupProps より:
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.InputGroup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxInputGroup} に渡す props です。
 */
export type ComboboxInputGroupProps = ComboboxInputGroupProps.Render &
  ComboboxInputGroupProps.SuruUI &
  ComboboxInputGroupProps.BaseUI &
  ComboboxInputGroupProps.HTML;

export type IComboboxInputGroup = IComponent<ComboboxInputGroupProps>;

/**
 * 入力欄と付属コントロールをまとめるグループ要素です。
 *
 * Root のスタイルプロパティーがこの要素へ適用されます。
 */
export const ComboboxInputGroup: IComboboxInputGroup = function SuiComboboxInputGroup(props) {
  const ctx = useComboboxContext();
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
    <Combobox.InputGroup
      {...otherProps}
      {...proxyRenderProps<Combobox.InputGroup.State, ComboboxInputGroupState>(
        (state) => ({ ...ctx, size, color, radius, variant, outlined, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <ComboboxInputGroupContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </ComboboxInputGroupContext>
          ),
          className: cn<ComboboxInputGroupState>(
            className,
            "sui_combobox",
            (state) => `sui_combobox-size_${state.size}`,
            (state) => `sui_combobox-color_${state.color}`,
            (state) => `sui_combobox-radius_${state.radius}`,
            (state) => `sui_combobox-variant_${state.variant}`,
            (state) => state.outlined && "sui_combobox-outlined",
            (state) => state.disabled && "sui_combobox-disabled",
            (state) => state.touched && "sui_combobox-touched",
            (state) => state.dirty && "sui_combobox-dirty",
            (state) => state.valid === false && "sui_combobox-invalid",
            (state) => state.valid === true && "sui_combobox-valid",
            (state) => state.valid === null && "sui_combobox-unverified",
            (state) => state.filled && "sui_combobox-filled",
            (state) => state.focused && "sui_combobox-focused",
            (state) => state.open && "sui_combobox-open",
            (state) => state.readOnly && "sui_combobox-readonly",
            (state) =>
              state.popupSide !== null &&
              `sui_combobox-popup_side_${state.popupSide.replaceAll("-", "_")}`,
            (state) => state.listEmpty && "sui_combobox-list_empty",
            (state) => state.placeholder && "sui_combobox-placeholder",
          ),
        },
      )}
      data-scope={dataScope}
    />
  );
};

export { ComboboxInputGroup as InputGroup };

export namespace InputGroup {
  export type State = ComboboxInputGroupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxInputGroupProps.Render;

    export type SuruUI = ComboboxInputGroupProps.SuruUI;

    export type BaseUI = ComboboxInputGroupProps.BaseUI;

    export type HTML = ComboboxInputGroupProps.HTML;
  }

  export type Color = ComboboxInputGroupColor;

  export type Radius = ComboboxInputGroupRadius;

  export type Size = ComboboxInputGroupSize;

  export type Variant = ComboboxInputGroupVariant;
}
