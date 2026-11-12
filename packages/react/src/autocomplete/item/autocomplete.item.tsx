import { Autocomplete } from "@base-ui/react/autocomplete";
import type { NonNativeButtonProps } from "@base-ui/react/internals/types";
import * as React from "react";

import mergeProps from "../../_merge-props.js";
import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import * as Button from "../../button/button.parts.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { useAutocompleteGroupContext } from "../group/autocomplete.group.context.js";
import { useAutocompleteListContext } from "../list/autocomplete.list.context.js";
import { AutocompleteItemContext } from "./autocomplete.item.context.js";

/**
 * {@link AutocompleteItem} の状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type AutocompleteItemState<TValue = any> = AutocompleteItemContext<TValue>;

export namespace AutocompleteItemProps {
  export type Render<TValue = any> = RenderProps<AutocompleteItemState<TValue>>;

  export type SuruUI = {};

  export type BaseUI<TValue = any> = Override<
    Button.Root.Props.BaseUI,
    Override<
      Omit<
        Pick<
          React.ComponentProps<typeof Autocomplete.Item>,
          // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
          // NonNativeButtonProps より :
          | keyof NonNativeButtonProps
          // AutocompleteItemProps より :
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
    React.ComponentProps<typeof Autocomplete.Item>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteItem} に渡す props です。
 *
 * @template TValue 項目の値の型です。
 */
export type AutocompleteItemProps<TValue = any> = AutocompleteItemProps.Render<TValue> &
  AutocompleteItemProps.SuruUI &
  AutocompleteItemProps.BaseUI<TValue> &
  AutocompleteItemProps.HTML;

export interface IAutocompleteItem extends IComponent<AutocompleteItemProps> {
  /**
   * @template TValue 項目の値の型です。
   */
  <TValue = any>(props: AutocompleteItemProps<TValue>): IComponent.Return;
}

/** リストの個々の項目要素です。 */
export const AutocompleteItem: IAutocompleteItem = (props: AutocompleteItemProps) => {
  const listCtx = useAutocompleteListContext();
  const groupCtx = useAutocompleteGroupContext(true);
  const ctx = groupCtx ?? listCtx;
  const {
    index,
    style,
    value,
    render,
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

  return (
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
          thin: undefined,
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
                (buttonState) => ({
                  ...ctx,
                  value,
                  ...buttonState,
                  ...itemState,
                }),
                {
                  style,
                  render: (currentHtmlProps, state) => (
                    <AutocompleteItemContext value={state}>
                      <RenderElement
                        state={state}
                        render={render}
                        htmlProps={currentHtmlProps}
                        defaultTagName="div"
                      />
                    </AutocompleteItemContext>
                  ),
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
                    (state) => state.open && "sui_autocomplete_item-open",
                    (state) => state.empty && "sui_autocomplete_item-empty",
                    (state) => state.anchorHidden && "sui_autocomplete_item-anchor_hidden",
                    (state) => `sui_autocomplete_item-side_${state.side.replaceAll("-", "_")}`,
                    (state) => `sui_autocomplete_item-align_${state.align}`,
                    (state) =>
                      state.transitionStatus !== undefined &&
                      `sui_autocomplete_item-transition_status_${state.transitionStatus}`,
                  ),
                },
              ),
            ])}
          />
        );
      }}
    />
  );
};

export { AutocompleteItem as Item };
export namespace Item {
  export type State<TValue = any> = AutocompleteItemState<TValue>;

  export type Props<TValue = any> = Props.Render<TValue> &
    Props.SuruUI &
    Props.BaseUI<TValue> &
    Props.HTML;

  export namespace Props {
    export type Render<TValue = any> = AutocompleteItemProps.Render<TValue>;

    export type SuruUI = AutocompleteItemProps.SuruUI;

    export type BaseUI<TValue = any> = AutocompleteItemProps.BaseUI<TValue>;

    export type HTML = AutocompleteItemProps.HTML;
  }
}
