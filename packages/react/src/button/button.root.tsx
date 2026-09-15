import { Button } from "@base-ui/react/button";
import type { NativeButtonProps } from "@base-ui/react/internals/types";
import type { Size, Color, ColorTemplate } from "@suru-ui/theme";
import * as React from "react";

import { type RenderProps } from "../_use-render.js";
import { useActionGroupContext } from "../action-group/action-group.parts.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { ButtonContext } from "./button.context.js";

/**
 * ボタンの配色です。
 */
export type ButtonRootColor = Color;

/**
 * ボタンの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 */
export type ButtonRootRadius = "none" | Size | "full";

/**
 * ボタンの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type ButtonRootSize = Size;

/**
 * ボタンの主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ButtonRootVariant = ColorTemplate;

/**
 * {@link ButtonRoot} が持つ状態です。
 */
export type ButtonRootState = Button.State;

export namespace ButtonRootProps {
  export type Render = RenderProps<ButtonRootState>;

  export type SuruUI = {
    /**
     * ボタンの配色を指定します。
     *
     * @default "grey"
     */
    color?: ButtonRootColor | undefined;

    /**
     * ボタンをメニューなどのリストアイテムとして使うかどうかを指定します。
     *
     * `true` の場合、左右の余白が狭くなり、内容が両端揃え (`space-between`) になります。
     *
     * @default false
     */
    item?: boolean | undefined;

    /**
     * ボタンの背景色を控えめにします。
     *
     * @default false
     */
    muted?: boolean | undefined;

    /**
     * ボタンに枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: boolean | undefined;

    /**
     * ボタンを保留状態にするかどうかを指定します。
     *
     * `true` の場合、ボタンの押下が無効化され、{@link ButtonPending} スロットが表示されます。`disabled` を `true` にしない限り、デフォルトでフォーカスが維持されます。
     *
     * @default false
     */
    pending?: boolean | undefined;

    /**
     * ボタンの角丸の大きさを指定します。
     *
     * 既定値は {@link ButtonRootProps.size|size}
     */
    radius?: ButtonRootRadius | undefined;

    /**
     * ボタンの大きさを指定します。
     *
     * @default "md"
     */
    size?: ButtonRootSize | undefined;

    /**
     * ボタンを正方形にするかどうかを指定します。
     *
     * `true` の場合、幅と高さが等しくなり、アイコンボタンなどに適した形状になります。
     *
     * @default false
     */
    squared?: boolean | undefined;

    /**
     * ボタンの主な外観を指定します。
     *
     * @default "solid"
     */
    variant?: ButtonRootVariant | undefined;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof Button>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // ButtonProps:
      | "focusableWhenDisabled",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Button>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ButtonRoot} に渡す props です。
 */
export type ButtonRootProps = ButtonRootProps.Render &
  ButtonRootProps.SuruUI &
  ButtonRootProps.BaseUI &
  ButtonRootProps.HTML;

/**
 * ボタンのルートコンポーネントです。
 */
export const ButtonRoot: IComponent<ButtonRootProps> = function SuiButtonRoot(props) {
  const actionGroupCtx = useActionGroupContext(true);
  const {
    item = false,
    size: sizeProp = "md",
    type = "button",
    color: colorProp = "grey",
    muted = false,
    radius: radiusProp = sizeProp,
    pending = false,
    squared = false,
    variant: variantProp = "solid",
    disabled = false,
    outlined: outlinedProp = false,
    className,
    focusableWhenDisabled = !disabled && pending,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;
  const size = actionGroupCtx?.size ?? sizeProp;
  const color = actionGroupCtx?.color ?? colorProp;
  const radius = actionGroupCtx?.radius ?? radiusProp;
  const variant = actionGroupCtx?.variant ?? variantProp;
  const outlined = actionGroupCtx?.outlined ?? outlinedProp;
  const ctx = React.useMemo<ButtonContext>(() => ({ pending }), [pending]);

  return (
    <ButtonContext value={ctx}>
      <Button
        {...otherProps}
        type={type}
        disabled={disabled || pending}
        className={cn(
          className,
          "sui_button",
          "sui_action_group_item",
          `sui_button-size_${size}`,
          `sui_button-color_${color}`,
          `sui_button-radius_${radius}`,
          `sui_button-variant_${variant}`,
          item && "sui_button-item",
          muted && "sui_button-muted",
          pending && "sui_button-pending",
          squared && "sui_button-squared",
          (state) => state.disabled && !pending && "sui_button-disabled",
          outlined && "sui_button-outlined",
        )}
        focusableWhenDisabled={focusableWhenDisabled}
        data-scope={dataScope}
      />
    </ButtonContext>
  );
};

export { ButtonRoot as Root };

export namespace Root {
  export type State = ButtonRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ButtonRootProps.Render;

    export type SuruUI = ButtonRootProps.SuruUI;

    export type BaseUI = ButtonRootProps.BaseUI;

    export type HTML = ButtonRootProps.HTML;
  }

  export type Color = ButtonRootColor;

  export type Radius = ButtonRootRadius;

  export type Size = ButtonRootSize;

  export type Variant = ButtonRootVariant;
}
