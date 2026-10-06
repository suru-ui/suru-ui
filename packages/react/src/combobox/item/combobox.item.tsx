import { Combobox } from "@base-ui/react/combobox";
import type { NonNativeButtonProps } from "@base-ui/react/internals/types";
import * as React from "react";

import mergeProps from "../../_merge-props.js";
import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import * as Button from "../../button/button.parts.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { type ComboboxContext, useComboboxContext } from "../root/combobox.root.context.js";
import { ComboboxItemContext } from "./combobox.item.context.js";

/**
 * {@link ComboboxItem} の状態です。
 */
export type ComboboxItemState = Override<
  ComboboxContext,
  Override<Button.Root.State, Combobox.Item.State>
>;

export namespace ComboboxItemProps {
  export type Render = RenderProps<ComboboxItemState>;

  export type SuruUI = {};

  export type BaseUI<TValue = any> = Override<
    Button.Root.Props.BaseUI,
    Override<
      Omit<
        Pick<
          React.ComponentProps<typeof Combobox.Item>,
          // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
          // NonNativeButtonProps より:
          | keyof NonNativeButtonProps
          // ComboboxItemProps より:
          | "children"
          | "onClick"
          | "index"
          | "value"
          | "disabled"
        >,
        keyof Render | keyof SuruUI
      >,
      {
        value?: TValue;
      }
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Item>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxItem} に渡す props です。
 */
export type ComboboxItemProps<TValue = any> = ComboboxItemProps.Render &
  ComboboxItemProps.SuruUI &
  ComboboxItemProps.BaseUI<TValue> &
  ComboboxItemProps.HTML;

export interface IComboboxItem extends IComponent<ComboboxItemProps> {
  /**
   * @template TValue 項目の値の型です。
   */
  <TValue = any>(props: ComboboxItemProps<TValue>): IComponent.Return;
}

/**
 * 候補リストの個々の項目要素です。
 */
export const ComboboxItem: IComboboxItem = function SuiComboboxItem(props: ComboboxItemProps) {
  const ctx = useComboboxContext();
  const {
    index,
    style,
    value,
    render = <div />,
    onClick,
    children,
    disabled,
    className,
    nativeButton = false,
    focusableWhenDisabled,
    ...otherProps
  } = props;
  const baseuiProps: Required<ComboboxItemProps.BaseUI> = {
    index,
    value,
    onClick,
    children,
    disabled,
    nativeButton,
    focusableWhenDisabled,
  };
  const itemCtx = React.useMemo<ComboboxItemContext>(() => ({ value }), [value]);

  return (
    <ComboboxItemContext value={itemCtx}>
      <Combobox.Item
        {...otherProps}
        {...baseuiProps}
        render={(htmlProps: {}, itemState) => {
          const buttonRootProps: Required<
            Button.Root.Props.SuruUI &
              Button.Root.Props.BaseUI &
              Pick<Button.Root.Props.HTML, "disabled">
          > = {
            item: true,
            size: ctx.size,
            color: "grey",
            muted: undefined,
            radius: undefined,
            pending: undefined,
            squared: undefined,
            variant: "naked",
            disabled: itemState.disabled,
            outlined: undefined,
            nativeButton,
            focusableWhenDisabled,
          };

          return (
            <Button.Root
              {...mergeProps<typeof Button.Root>([
                htmlProps,
                buttonRootProps,
                proxyRenderProps<Button.Root.State, ComboboxItemState>(
                  (state) => ({ ...ctx, ...state, ...itemState }),
                  {
                    style,
                    render,
                    className: cn<ComboboxItemState>(
                      className,
                      "sui_combobox_item",
                      (state) => state.disabled && "sui_combobox_item-disabled",
                      (state) => state.selected && "sui_combobox_item-selected",
                      (state) => state.highlighted && "sui_combobox_item-highlighted",
                      (state) => `sui_combobox_item-size_${state.size}`,
                      (state) => `sui_combobox_item-color_${state.color}`,
                      (state) => `sui_combobox_item-radius_${state.radius}`,
                      (state) => `sui_combobox_item-variant_${state.variant}`,
                      (state) => state.outlined && "sui_combobox_item-outlined",
                      (state) => state.multiple && "sui_combobox_item-multiple",
                    ),
                  },
                ),
              ])}
            />
          );
        }}
      />
    </ComboboxItemContext>
  );
};

export { ComboboxItem as Item };

export namespace Item {
  export type State = ComboboxItemState;

  export type Props<TValue = any> = Props.Render & Props.SuruUI & Props.BaseUI<TValue> & Props.HTML;

  export namespace Props {
    export type Render = ComboboxItemProps.Render;

    export type SuruUI = ComboboxItemProps.SuruUI;

    export type BaseUI<TValue = any> = ComboboxItemProps.BaseUI<TValue>;

    export type HTML = ComboboxItemProps.HTML;
  }
}
