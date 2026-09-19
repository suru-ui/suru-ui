import { Combobox } from "@base-ui/react/combobox";
import type { NativeButtonProps } from "@base-ui/react/internals/types";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import { ClearIcon } from "../_icons.jsx";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { useComboboxContext } from "./combobox.context.js";
import { useComboboxItemContext } from "./combobox.item.context.js";

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
 * {@link ComboboxChipRemove} が持つ状態です。
 */
export type ComboboxChipRemoveState = Combobox.ChipRemove.State;

export namespace ComboboxChipRemoveProps {
  export type Render = RenderProps<ComboboxChipRemoveState>;

  export type SuruUI = {
    /**
     * チップの角丸を指定します。
     *
     * 省略時はチップの角丸を使います。
     */
    radius?: ComboboxChipRemoveRadius | undefined;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.ChipRemove>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // ComboboxChipRemoveProps:
      | never,
      keyof Render | keyof SuruUI
    >
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
  const ctx = useComboboxContext();
  const itemCtx = useComboboxItemContext();
  const label = ctx.itemToStringLabel(itemCtx.value);
  const {
    radius = ctx.radius,
    children = <ClearIcon />,
    className,
    "aria-label": ariaLabel = label ? `${label}を削除` : "選択値を削除",
    ...otherProps
  } = props;

  return (
    <Combobox.ChipRemove
      {...otherProps}
      className={cn(
        className,
        "sui_combobox_chip_remove",
        `sui_combobox_chip_remove-radius_${radius}`,
      )}
      aria-label={ariaLabel}
    >
      {children}
    </Combobox.ChipRemove>
  );
};

export { ComboboxChipRemove as ChipRemove };

export namespace ChipRemove {
  export type State = ComboboxChipRemoveState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxChipRemoveProps.Render;

    export type SuruUI = ComboboxChipRemoveProps.SuruUI;

    export type BaseUI = ComboboxChipRemoveProps.BaseUI;

    export type HTML = ComboboxChipRemoveProps.HTML;
  }

  export type Radius = ComboboxChipRemoveRadius;
}
