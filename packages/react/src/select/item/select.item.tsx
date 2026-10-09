import type { NonNativeButtonProps } from "@base-ui/react/internals/types";
import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import mergeProps from "../../_merge-props.js";
import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import * as Button from "../../button/button.parts.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { useSelectGroupContext } from "../group/select.group.context.js";
import { useSelectListContext } from "../list/select.list.context.js";
import { SelectItemContext } from "./select.item.context.js";

/**
 * {@link SelectItem} が持つ状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectItemState<TValue = any> = SelectItemContext<TValue>;

export namespace SelectItemProps {
  export type Render<TValue = any> = RenderProps<SelectItemState<TValue>>;

  export type SuruUI = {};

  export type BaseUI = Override<
    Button.Root.Props.BaseUI,
    Omit<
      Pick<
        React.ComponentProps<typeof BaseSelect.Item>,
        // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
        // NonNativeButtonProps より:
        | keyof NonNativeButtonProps
        // SelectItemProps より:
        | "children"
        | "label"
        | "onClick"
        | "value"
        | "disabled"
      >,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.Item>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SelectItem} に渡す props です。
 */
export type SelectItemProps = SelectItemProps.Render &
  SelectItemProps.SuruUI &
  SelectItemProps.BaseUI &
  SelectItemProps.HTML;

export type ISelectItem = IComponent<SelectItemProps>;

/**
 * 選択肢の個々の項目です。
 */
export const SelectItem: ISelectItem = function SuiSelectItem(props) {
  const listCtx = useSelectListContext();
  const groupCtx = useSelectGroupContext(true);
  const ctx = groupCtx || listCtx;
  const {
    label,
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
  const baseuiProps: Required<SelectItemProps.BaseUI> = {
    label,
    value,
    onClick,
    children,
    disabled,
    nativeButton,
    focusableWhenDisabled,
  };

  return (
    <BaseSelect.Item
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
              proxyRenderProps<Button.Root.State, SelectItemState>(
                (state) => ({ ...ctx, ...state, ...itemState }),
                {
                  style,
                  render: (htmlProps, state) => (
                    <SelectItemContext value={state}>
                      <RenderElement
                        state={state}
                        render={render}
                        htmlProps={htmlProps}
                        defaultTagName="div"
                      />
                    </SelectItemContext>
                  ),
                  className: cn<SelectItemState>(
                    className,
                    "sui_select_item",
                    (state) => state.disabled && "sui_select_item-disabled",
                    (state) => state.selected && "sui_select_item-selected",
                    (state) => state.highlighted && "sui_select_item-highlighted",
                    (state) => `sui_select_item-size_${state.size}`,
                    (state) => `sui_select_item-radius_${state.radius}`,
                    (state) => `sui_select_item-variant_${state.variant}`,
                    (state) => state.outlined && "sui_select_item-outlined",
                    (state) => state.open && "sui_select_item-open",
                    (state) => state.anchorHidden && "sui_select_item-anchor_hidden",
                    (state) => `sui_select_item-side_${state.side.replaceAll("-", "_")}`,
                    (state) => `sui_select_item-align_${state.align}`,
                    (state) =>
                      state.transitionStatus !== undefined &&
                      `sui_select_item-transition_status_${state.transitionStatus}`,
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

export { SelectItem as Item };

export namespace Item {
  export type State<TValue = any> = SelectItemState<TValue>;

  export type Props<TValue = any> = Props.Render<TValue> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TValue = any> = SelectItemProps.Render<TValue>;

    export type SuruUI = SelectItemProps.SuruUI;

    export type BaseUI = SelectItemProps.BaseUI;

    export type HTML = SelectItemProps.HTML;
  }
}
