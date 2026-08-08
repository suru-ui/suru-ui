import {
  useRenderElement,
  type UseRenderElementComponentProps,
} from "@base-ui/react/internals/useRenderElement";
import type { Color, ColorTemplate as Variant } from "@suru-ui/theme";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import splitRenderProps from "../../_split-render-props.js";
import cn from "../../cn.js";
import { ContextMissingError } from "../../errors.js";
import type { Component } from "../../types.js";

import "./button-group.css";

// Context
// -------

/**
 * {@link ButtonGroupContext} が保持するボタンのスタイルです。
 */
export type ButtonGroupContext = {
  readonly variant: Variant;

  readonly color: Color;

  readonly size: Size;

  readonly radius: "none" | "rounded" | "full";

  readonly outlined: boolean;
};

/**
 * {@link ButtonGroupRoot} のスタイルを子要素へ伝播するコンテキストです。
 */
export const ButtonGroupContext: React.Context<ButtonGroupContext | null> =
  React.createContext<ButtonGroupContext | null>(null);

/**
 * {@link ButtonGroupContext} を読み取るフックです。
 *
 * Provider は {@link ButtonGroupRoot} の配下に必要です。
 * Provider がない場合、`optional` が `true` でなければ {@link ContextMissingError} を投げます。
 * `optional` に `true` を指定すると、Provider がない場合に `null` を返します。
 *
 * @param optional Provider がなくても `null` を返すかどうかを指定します。
 * @returns コンテキストの値。`optional` が `true` で Provider がない場合は `null` です。
 */
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

/**
 * {@link ButtonGroupContext} の型別名です。
 */
export type Context = ButtonGroupContext;

/**
 * {@link ButtonGroupContext} の別名です。
 */
export const Context: React.Context<ButtonGroupContext | null> = ButtonGroupContext;

/**
 * {@link useButtonGroupContext} の別名です。
 *
 * Provider は {@link ButtonGroupRoot} の配下に必要です。
 * Provider がない場合、`optional` が `true` でなければ {@link ContextMissingError} を投げます。
 * `optional` に `true` を指定すると、Provider がない場合に `null` を返します。
 *
 * @param optional Provider がなくても `null` を返すかどうかを指定します。
 * @returns コンテキストの値。`optional` が `true` で Provider がない場合は `null` です。
 */
export function useContext(optional?: false): ButtonGroupContext;
export function useContext(optional?: boolean): ButtonGroupContext | null;
export function useContext(optional?: boolean): ButtonGroupContext | null {
  return useButtonGroupContext(optional);
}

// Root
// ----

/**
 * {@link ButtonGroupRoot} が公開する状態です。
 */
export type ButtonGroupRootState = {};

/**
 * {@link ButtonGroupRoot} に渡すプロパティーです。
 *
 * グループに指定したスタイルプロパティーは、子要素のボタン指定より優先されます。
 * 指定後に値を変更すると、グループと子要素のスタイルも更新されます。
 */
export type ButtonGroupRootProps = Omit<
  React.ComponentProps<"div">,
  keyof UseRenderElementComponentProps<{}>
> &
  UseRenderElementComponentProps<ButtonGroupRootState> & {
    /**
     * ボタンのスタイルバリエーションを指定します。
     *
     * `"solid"`、`"naked"`、`"liquid"` のいずれかを指定できます。
     *
     * @default "solid"
     */
    variant?: Variant | undefined;

    /**
     * ボタンの色を指定します。
     *
     * {@link Color} で定義された色を指定できます。
     *
     * @default "grey"
     */
    color?: Color | undefined;

    /**
     * ボタンのサイズを指定します。
     *
     * {@link Size} で定義されたサイズを指定できます。
     *
     * @default "md"
     */
    size?: Size | undefined;

    /**
     * ボタンの角丸を指定します。
     *
     * `"none"`、`"rounded"`、`"full"` のいずれかを指定できます。
     *
     * @default "rounded"
     */
    radius?: "none" | "rounded" | "full" | undefined;

    /**
     * 枠線を表示するかどうかを指定します。
     *
     * `true` の場合に枠線を表示します。
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

/**
 * ボタングループのルート要素です。
 *
 * グループに指定したスタイルを {@link ButtonGroupContext} を通じて子要素へ伝播します。
 * スタイル値が変わらない再レンダーでは、コンテキストの値を再生成しません。
 *
 * @example
 * ```tsx
 * <ButtonGroupParts.Root color="blue">
 *   <Button>保存</Button>
 * </ButtonGroupParts.Root>
 * ```
 */
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
  const context = React.useMemo<ButtonGroupContext>(
    () => ({ size, color, radius, variant, outlined }),
    [color, outlined, radius, size, variant],
  );
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
  /**
   * {@link ButtonGroupRoot} の状態型です。
   */
  export type State = ButtonGroupRootState;

  /**
   * {@link ButtonGroupRoot} のプロパティー型です。
   */
  export type Props = ButtonGroupRootProps;
}

/**
 * {@link ButtonGroupRoot} の別名です。
 */
export const Root: Component<Root.Props> = ButtonGroupRoot;
