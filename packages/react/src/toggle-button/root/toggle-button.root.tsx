import type { NativeButtonProps } from "@base-ui/react/internals/types";
import { Toggle } from "@base-ui/react/toggle";
import * as React from "react";

import mergeProps from "../../_merge-props.js";
import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import * as Button from "../../button/button.parts.js";
import type { Override, IComponent } from "../../types.js";
import {
  type ToggleButtonContextSize,
  type ToggleButtonContextColor,
  type ToggleButtonContextRadius,
  type ToggleButtonContextVariant,
  ToggleButtonContext,
} from "./toggle-button.root.context.js";

/** トグルボタンの押下状態が変更されたイベントの詳細です。 */
export type ToggleButtonRootChangeEventDetails = Toggle.ChangeEventDetails;

/** トグルボタンの押下状態が変更された理由です。 */
export type ToggleButtonRootChangeEventReason = Toggle.ChangeEventReason;

/** トグルボタンの配色です。 */
export type ToggleButtonRootColor = ToggleButtonContextColor;

/**
 * トグルボタンの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"xs"`: 極小の角丸
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 * - `"circle"`: 完全な丸形
 */
export type ToggleButtonRootRadius = ToggleButtonContextRadius;

/**
 * トグルボタンの大きさです。
 *
 * - `"xs"`: 極小
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type ToggleButtonRootSize = ToggleButtonContextSize;

/**
 * トグルボタンの主な外観です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ToggleButtonRootVariant = ToggleButtonContextVariant;

/**
 * {@link ToggleButtonRoot} が持つ状態です。
 */
export type ToggleButtonRootState = ToggleButtonContext;

export namespace ToggleButtonRootProps {
  export type Render = RenderProps<ToggleButtonRootState>;

  export type SuruUI = {
    /**
     * トグルボタンの配色を指定します。
     *
     * 押下状態でないときは grey で表示されます。
     *
     * @default "grey"
     */
    color?: ToggleButtonRootColor | undefined;

    /**
     * トグルボタンに枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: boolean | undefined;

    /**
     * トグルボタンを保留状態にするかどうかを指定します。
     *
     * `true` の場合、トグルボタンの押下が無効化され、{@link ToggleButtonPending} スロットが表示されます。`disabled` を `true` にしない限り、デフォルトでフォーカスが維持されます。
     *
     * @default false
     */
    pending?: boolean | undefined;

    /**
     * トグルボタンの角丸の大きさを指定します。
     *
     * 既定値 :
     * | {@link ButtonRootProps.size|size} | radius |
     * | ------ | ------ |
     * | `"xs"` | `"sm"` |
     * | `"sm"` | `"sm"` |
     * | `"md"` | `"md"` |
     * | `"lg"` | `"md"` |
     */
    radius?: ToggleButtonRootRadius | undefined;

    /**
     * トグルボタンの大きさを指定します。
     *
     * @default "md"
     */
    size?: ToggleButtonRootSize | undefined;

    /**
     * トグルボタンを正方形にするかどうかを指定します。
     *
     * `true` の場合、幅と高さが等しくなり、アイコンボタンなどに適した形状になります。
     *
     * @default false
     */
    squared?: boolean | undefined;

    /**
     * トグルボタンの主な外観を指定します。
     *
     * 押下状態では solid で表示されます。
     *
     * @default "liquid"
     */
    variant?: ToggleButtonRootVariant | undefined;
  };

  export type BaseUI<TValue extends string = string> = Override<
    Button.Root.Props.BaseUI,
    Omit<
      Pick<
        React.ComponentProps<typeof Toggle<TValue>>,
        // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
        // NativeButtonProps より :
        | keyof NativeButtonProps
        // ToggleProps より :
        | "pressed"
        | "defaultPressed"
        | "disabled"
        | "onPressedChange"
        | "value"
      >,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML<TValue extends string = string> = Omit<
    React.ComponentProps<typeof Toggle<TValue>>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ToggleButtonRoot} に渡す props です。
 *
 * @template TValue トグルボタンの値の型です。
 */
export type ToggleButtonRootProps<TValue extends string = string> = ToggleButtonRootProps.Render &
  ToggleButtonRootProps.SuruUI &
  ToggleButtonRootProps.BaseUI<TValue> &
  ToggleButtonRootProps.HTML<TValue>;

export type IToggleButtonRoot = IComponent<ToggleButtonRootProps>;

/** トグルボタンのルートコンポーネントです。 */
export const ToggleButtonRoot: IToggleButtonRoot = (props) => {
  const {
    size = "md",
    color = "grey",
    style,
    value,
    radius = size === "xs" || size === "sm" ? "sm" : "md",
    render,
    pending = false,
    pressed,
    squared = false,
    variant = "liquid",
    disabled,
    outlined = false,
    className,
    nativeButton,
    defaultPressed,
    onPressedChange,
    focusableWhenDisabled = disabled !== true && pending,
    ...otherProps
  } = props;
  const baseuiProps: Required<ToggleButtonRootProps.BaseUI> = {
    value,
    pressed,
    disabled,
    nativeButton,
    defaultPressed,
    onPressedChange,
    focusableWhenDisabled,
  };

  return (
    <Toggle
      {...otherProps}
      {...baseuiProps}
      render={(htmlProps: {}, toggleState) => {
        const state: ToggleButtonRootState = {
          ...toggleState,
          size,
          color,
          radius,
          pending,
          squared,
          variant,
          outlined,
        };
        const buttonRootProps: Required<
          Button.ButtonRootProps.SuruUI &
            Button.ButtonRootProps.BaseUI &
            Pick<Button.ButtonRootProps.HTML, "disabled">
        > = {
          item: false,
          size: state.size,
          thin: undefined,
          color: state.pressed ? state.color : "grey",
          muted: undefined,
          radius: state.radius,
          pending: state.pending,
          squared: state.squared,
          variant: state.pressed ? "solid" : state.variant,
          disabled: state.disabled,
          outlined: state.outlined,
          nativeButton,
          focusableWhenDisabled,
        };

        return (
          <ToggleButtonContext value={state}>
            <Button.Root
              {...mergeProps<typeof Button.Root>([
                htmlProps,
                buttonRootProps,
                proxyRenderProps(state, {
                  style,
                  render,
                  className,
                }),
              ])}
            />
          </ToggleButtonContext>
        );
      }}
    />
  );
};

export { ToggleButtonRoot as Root };
export namespace Root {
  export type State = ToggleButtonRootState;

  export type Props<TValue extends string = string> = Props.Render &
    Props.SuruUI &
    Props.BaseUI<TValue> &
    Props.HTML<TValue>;

  export namespace Props {
    export type Render = ToggleButtonRootProps.Render;

    export type SuruUI = ToggleButtonRootProps.SuruUI;

    export type BaseUI<TValue extends string = string> = ToggleButtonRootProps.BaseUI<TValue>;

    export type HTML<TValue extends string = string> = ToggleButtonRootProps.HTML<TValue>;
  }

  export type ChangeEventDetails = ToggleButtonRootChangeEventDetails;

  export type ChangeEventReason = ToggleButtonRootChangeEventReason;

  export type Color = ToggleButtonRootColor;

  export type Radius = ToggleButtonRootRadius;

  export type Size = ToggleButtonRootSize;

  export type Variant = ToggleButtonRootVariant;
}
