import { Combobox } from "@base-ui/react/combobox";
import type { NativeButtonProps } from "@base-ui/react/internals/types";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import { ClearIcon } from "../../_icons.jsx";
import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useComboboxChipContext } from "../chip/combobox.chip.context.js";
import { useComboboxItemContext } from "../item/combobox.item.context.js";
import { ComboboxChipRemoveContext } from "./combobox.chip-remove.context.js";

/**
 * チップを選択値から削除するボタンの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 */
export type ComboboxChipRemoveRadius = "none" | Size | "full";

/**
 * {@link ComboboxChipRemove} の状態です。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxChipRemoveState<TItem = any> = ComboboxChipRemoveContext<TItem>;

export namespace ComboboxChipRemoveProps {
  export type Render<TItem = any> = RenderProps<ComboboxChipRemoveState<TItem>>;

  export type SuruUI = {
    /**
     * チップの角丸を指定します。
     *
     * 省略時はチップの角丸を使います。
     */
    radius?: ComboboxChipRemoveRadius | undefined;
  };

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Combobox.ChipRemove>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // NativeButtonProps より:
      | keyof NativeButtonProps
      // ComboboxChipRemoveProps より:
      | never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.ChipRemove>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxChipRemove} に渡す props です。
 */
export type ComboboxChipRemoveProps = ComboboxChipRemoveProps.Render &
  ComboboxChipRemoveProps.SuruUI &
  ComboboxChipRemoveProps.BaseUI &
  ComboboxChipRemoveProps.HTML;

export type IComboboxChipRemove = IComponent<ComboboxChipRemoveProps>;

/**
 * チップを選択値から削除するボタン要素です。
 */
export const ComboboxChipRemove: IComboboxChipRemove = function SuiComboboxChipRemove(props) {
  const ctx = useComboboxChipContext();
  const itemCtx = useComboboxItemContext();
  const label = ctx.itemToStringLabel(itemCtx.value);
  const {
    style,
    radius = ctx.radius,
    render,
    children = <ClearIcon strokeWidth={1.5} />,
    className,
    "aria-label": ariaLabel = label ? `${label}を削除` : "選択値を削除",
    ...otherProps
  } = props;

  return (
    <Combobox.ChipRemove
      {...otherProps}
      {...proxyRenderProps<Combobox.ChipRemove.State, ComboboxChipRemoveState>(
        (state) => ({ ...ctx, radius, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <ComboboxChipRemoveContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="button"
              />
            </ComboboxChipRemoveContext>
          ),
          className: cn<ComboboxChipRemoveState>(
            className,
            "sui_combobox_chip_remove",
            (state) => `sui_combobox_chip_remove-radius_${state.radius}`,
            (state) => `sui_combobox_chip_remove-size_${state.size}`,
            (state) => `sui_combobox_chip_remove-color_${state.color}`,
            (state) => `sui_combobox_chip_remove-variant_${state.variant}`,
            (state) => state.outlined && "sui_combobox_chip_remove-outlined",
            (state) => state.multiple && "sui_combobox_chip_remove-multiple",
            (state) => state.disabled && "sui_combobox_chip_remove-disabled",
          ),
        },
      )}
      aria-label={ariaLabel}
    >
      {children}
    </Combobox.ChipRemove>
  );
};

export { ComboboxChipRemove as ChipRemove };

export namespace ChipRemove {
  export type State<TItem = any> = ComboboxChipRemoveState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = ComboboxChipRemoveProps.Render<TItem>;

    export type SuruUI = ComboboxChipRemoveProps.SuruUI;

    export type BaseUI = ComboboxChipRemoveProps.BaseUI;

    export type HTML = ComboboxChipRemoveProps.HTML;
  }

  export type Radius = ComboboxChipRemoveRadius;
}
