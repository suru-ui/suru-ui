import type { Color, ColorTemplate as Variant } from "@suru-ui/theme";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import { ContextMissingError } from "../../errors.js";
import type { Component } from "../../types.js";

import "./button-group.css";

// Context
// -------

/**
 * {@link ButtonGroupRoot} が子パーツへ提供する状態です。
 */
export type ButtonGroupContext = {
  /**
   * ボタンのスタイルバリエーションです。
   */
  readonly variant: Variant;

  /**
   * ボタンの色です。
   */
  readonly color: Color;

  /**
   * ボタンのサイズです。
   */
  readonly size: Size;

  /**
   * ボタンの角丸です。
   */
  readonly radius: "none" | "rounded" | "full";

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;
};

/**
 * {@link ButtonGroupRoot} のスタイルを子要素へ伝播するコンテキストです。
 */
export const ButtonGroupContext: React.Context<ButtonGroupContext | null> =
  React.createContext<ButtonGroupContext | null>(null);

/**
 * {@link ButtonGroupRoot} のコンテキストを読み取るフックです。
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
 * {@link ButtonGroupContext} の別名です。
 */
export type Context = ButtonGroupContext;

/**
 * {@link ButtonGroupContext} の別名です。
 */
export const Context: React.Context<ButtonGroupContext | null> = ButtonGroupContext;

/**
 * {@link useButtonGroupContext} の別名です。
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
export type ButtonGroupRootProps = Omit<React.ComponentProps<"div">, keyof RenderProps<{}>> &
  RenderProps<ButtonGroupRootState> & {
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
  const {
    ref,
    role = "group",
    size = "md",
    color = "grey",
    radius = "rounded",
    variant = "solid",
    outlined = false,
    className,
    orientation = "horizontal",
    "aria-orientation": ariaOrientation = orientation,
    ...otherProps
  } = props;
  const context = React.useMemo<ButtonGroupContext>(
    () => ({ size, color, radius, variant, outlined }),
    [color, outlined, radius, size, variant],
  );
  const element = useRender({
    defaultTagName: "div",
    ref,
    props: {
      ...otherProps,
      role,
      className: cn(
        className,
        "sui_button_group",
        `sui_button_group-orientation_${orientation}`,
        outlined && "sui_button_group-outlined",
      ),
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
