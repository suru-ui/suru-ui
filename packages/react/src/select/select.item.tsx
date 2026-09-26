import type { NonNativeButtonProps } from "@base-ui/react/internals/types";
import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import mergeProps from "../_merge-props.js";
import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import * as Button from "../button/button.parts.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { useSelectContext } from "./select.context.js";

/**
 * {@link SelectItem} が持つ状態です。
 */
export type SelectItemState = Override<Button.ButtonRootState, BaseSelect.Item.State>;

export namespace SelectItemProps {
  export type Render = RenderProps<SelectItemState>;

  export type SuruUI = {};

  export type BaseUI = Override<
    Button.ButtonRootProps.BaseUI,
    Pick<
      React.ComponentProps<typeof BaseSelect.Item>,
      Exclude<
        // Base UI の型を確認して取り出すプロパティーを決めます。
        // NonNativeButtonProps:
        | keyof NonNativeButtonProps
        // SelectItemProps:
        | "children"
        | "label"
        | "onClick"
        | "value"
        | "disabled",
        keyof Render | keyof SuruUI
      >
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

/**
 * 選択肢の個々の項目です。
 */
export const SelectItem: IComponent<SelectItemProps> = function SuiSelectItem(props) {
  const ctx = useSelectContext();
  const {
    label,
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
      render={(htmlProps: {}, state) => {
        const buttonRootProps: Required<
          Button.ButtonRootProps.SuruUI &
            Button.ButtonRootProps.BaseUI &
            Pick<Button.ButtonRootProps.HTML, "disabled">
        > = {
          item: true,
          size: ctx.size,
          color: "grey",
          muted: undefined,
          radius: undefined,
          pending: undefined,
          squared: undefined,
          variant: "naked",
          disabled: state.disabled,
          outlined: undefined,
          nativeButton,
          focusableWhenDisabled,
        };

        return (
          <Button.Root
            {...mergeProps<typeof Button.Root>([
              htmlProps,
              buttonRootProps,
              proxyRenderProps(state, {
                style,
                render,
                className: cn(
                  className,
                  "sui_select_item",
                  (state) => state.disabled && "sui_select_item-disabled",
                  (state) => state.selected && "sui_select_item-selected",
                  (state) => state.highlighted && "sui_select_item-highlighted",
                ),
              }),
            ])}
          />
        );
      }}
    />
  );
};

export { SelectItem as Item };

export namespace Item {
  export type State = SelectItemState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectItemProps.Render;

    export type SuruUI = SelectItemProps.SuruUI;

    export type BaseUI = SelectItemProps.BaseUI;

    export type HTML = SelectItemProps.HTML;
  }
}
