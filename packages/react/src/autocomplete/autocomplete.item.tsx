import { Autocomplete } from "@base-ui/react/autocomplete";
import type { NonNativeButtonProps } from "@base-ui/react/internals/types";
import * as React from "react";

import mergeProps from "../_merge-props.js";
import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import * as Button from "../button/button.parts.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type AutocompleteContext, useAutocompleteContext } from "./autocomplete.context.js";
import { AutocompleteItemContext } from "./autocomplete.item.context.js";

/**
 * {@link AutocompleteItem} の状態です。
 */
export type AutocompleteItemState = Override<
  AutocompleteContext,
  Override<Button.Root.State, Autocomplete.Item.State>
>;

export namespace AutocompleteItemProps {
  export type Render = RenderProps<AutocompleteItemState>;

  export type SuruUI = {};

  export type BaseUI<TValue = any> = Override<
    Button.Root.Props.BaseUI,
    Override<
      Pick<
        React.ComponentProps<typeof Autocomplete.Item>,
        Exclude<
          // Base UI の型を確認して取り出すプロパティーを決めます。
          // NonNativeButtonProps:
          | keyof NonNativeButtonProps
          // AutocompleteItemProps:
          | "children"
          | "onClick"
          | "index"
          | "value"
          | "disabled",
          keyof Render | keyof SuruUI
        >
      >,
      {
        value?: TValue;
      }
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Item>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteItem} に渡す props です。
 */
export type AutocompleteItemProps<TValue = any> = AutocompleteItemProps.Render &
  AutocompleteItemProps.SuruUI &
  AutocompleteItemProps.BaseUI<TValue> &
  AutocompleteItemProps.HTML;

export interface IAutocompleteItem extends IComponent<AutocompleteItemProps> {
  /**
   * @template TValue 項目の値の型です。
   */
  <TValue = any>(props: AutocompleteItemProps<TValue>): IComponent.Return;
}

/**
 * リストの個々の項目要素です。
 */
export const AutocompleteItem: IAutocompleteItem = function SuiAutocompleteItem(
  props: AutocompleteItemProps,
) {
  const ctx = useAutocompleteContext();
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
  const baseuiProps: Required<AutocompleteItemProps.BaseUI> = {
    index,
    value,
    onClick,
    children,
    disabled,
    nativeButton,
    focusableWhenDisabled,
  };
  const itemCtx = React.useMemo<AutocompleteItemContext>(() => ({ value }), [value]);

  return (
    <AutocompleteItemContext value={itemCtx}>
      <Autocomplete.Item
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
                proxyRenderProps<Button.Root.State, AutocompleteItemState>(
                  (state) => ({ ...ctx, ...state, ...itemState }),
                  {
                    style,
                    render,
                    className: cn<AutocompleteItemState>(
                      className,
                      "sui_autocomplete_item",
                      (state) => state.disabled && "sui_autocomplete_item-disabled",
                      (state) => state.highlighted && "sui_autocomplete_item-highlighted",
                      (state) => `sui_autocomplete_item-size_${state.size}`,
                      (state) => `sui_autocomplete_item-color_${state.color}`,
                      (state) => `sui_autocomplete_item-radius_${state.radius}`,
                      (state) => `sui_autocomplete_item-variant_${state.variant}`,
                      (state) => state.outlined && "sui_autocomplete_item-outlined",
                    ),
                  },
                ),
              ])}
            />
          );
        }}
      />
    </AutocompleteItemContext>
  );
};

export { AutocompleteItem as Item };

export namespace Item {
  export type State = AutocompleteItemState;

  export type Props<TValue = any> = Props.Render & Props.SuruUI & Props.BaseUI<TValue> & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteItemProps.Render;

    export type SuruUI = AutocompleteItemProps.SuruUI;

    export type BaseUI<TValue = any> = AutocompleteItemProps.BaseUI<TValue>;

    export type HTML = AutocompleteItemProps.HTML;
  }
}
