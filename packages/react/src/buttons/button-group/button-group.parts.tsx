import {
  useRenderElement,
  type UseRenderElementComponentProps,
} from "@base-ui/react/internals/useRenderElement";
import type { Color, ColorTemplate as Variant } from "@suru-ui/theme";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import splitRenderProps from "../../_split-render-props.js";
import cn from "../../cn.js";

import "./button-group.css";
import { ContextMissingError } from "../../errors.js";
import type { Component } from "../../types.js";

// Context
// -------

export type ButtonGroupContext = {
  readonly variant: Variant;

  readonly color: Color;

  readonly size: Size;

  readonly radius: "none" | "rounded" | "full";

  readonly outlined: boolean;
};

export const ButtonGroupContext: React.Context<ButtonGroupContext | null> =
  React.createContext<ButtonGroupContext | null>(null);

export function useButtonGroupContext(optional?: false): ButtonGroupContext;
export function useButtonGroupContext(optional?: boolean): ButtonGroupContext | null;
export function useButtonGroupContext(optional?: boolean): ButtonGroupContext | null {
  const context = React.use(ButtonGroupContext);
  if (context === null && !optional) {
    throw new ContextMissingError({
      contextName: "ButtonGroupContext",
      providerName: "ButtonGroupRoot",
    });
  }

  return context;
}

export type Context = ButtonGroupContext;

export const Context: React.Context<ButtonGroupContext | null> = ButtonGroupContext;

export function useContext(optional?: false): ButtonGroupContext;
export function useContext(optional?: boolean): ButtonGroupContext | null;
export function useContext(optional?: boolean): ButtonGroupContext | null {
  return useButtonGroupContext(optional);
}

// Root
// ----

export type ButtonGroupRootState = {};

export type ButtonGroupRootProps = Omit<
  React.ComponentProps<"div">,
  keyof UseRenderElementComponentProps<{}>
> &
  UseRenderElementComponentProps<ButtonGroupRootState> & {
    /**
     * ボタンのスタイルバリエーションを指定します。
     */
    variant?: Variant | undefined;

    /**
     * ボタンの色を指定します。
     */
    color?: Color | undefined;

    /**
     * ボタンのサイズを指定します。
     *
     * @default "md"
     */
    size?: Size | undefined;

    /**
     * ボタンの角丸を指定します。
     */
    radius?: "none" | "rounded" | "full" | undefined;

    /**
     * 枠線を表示するかどうかを指定します。
     */
    outlined?: boolean | undefined;

    /**
     * ボタン群の向きを指定します。
     *
     * - `"horizontal"`: 横並び
     * - `"vertical"`: 縦並び
     *
     * @default "horizontal"
     */
    orientation?: "horizontal" | "vertical" | undefined;
  };

export const ButtonGroupRoot: Component<ButtonGroupRootProps> = function SuiButtonGroupRoot(props) {
  const [renderProps, componentProps] = splitRenderProps(props);
  const {
    role = "group",
    size = "md",
    color = "grey",
    radius = "rounded",
    variant = "solid",
    outlined = false,
    orientation = "horizontal",
    "aria-orientation": ariaOrientation = orientation,
    ...elementProps
  } = componentProps;
  const context: ButtonGroupContext = {
    size,
    color,
    radius,
    variant,
    outlined,
  };
  const element = useRenderElement("div", renderProps, {
    props: {
      ...elementProps,
      role,
      className: cn("sui_button_group", `sui_button_group-orientation_${orientation}`),
      "aria-orientation": ariaOrientation,
    },
  });

  return <Context value={context}>{element}</Context>;
};

export namespace Root {
  export type State = ButtonGroupRootState;
  export type Props = ButtonGroupRootProps;
}

export const Root: Component<Root.Props> = ButtonGroupRoot;
