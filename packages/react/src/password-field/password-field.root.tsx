import { useControlled } from "@base-ui/utils/useControlled";
import * as React from "react";

import { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import {
  type TextFieldRootSize,
  type TextFieldRootColor,
  type TextFieldRootProps,
  type TextFieldRootState,
  type TextFieldRootRadius,
  type TextFieldRootVariant,
  TextFieldRoot,
} from "../text-field/text-field.parts.js";
import type { IComponent } from "../types.js";
import { PasswordFieldContext } from "./password-field.context.js";

/**
 * パスワード入力欄の配色です。
 */
export type PasswordFieldRootColor = TextFieldRootColor;

/**
 * パスワード入力欄の角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type PasswordFieldRootRadius = TextFieldRootRadius;

/**
 * パスワード入力欄の大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type PasswordFieldRootSize = TextFieldRootSize;

/**
 * パスワード入力欄の主な外観の種類です。
 *
 * - `"naked"`: 背景のないパスワード入力欄
 * - `"liquid"`: 薄い塗りつぶし
 */
export type PasswordFieldRootVariant = TextFieldRootVariant;

/**
 * {@link PasswordFieldRoot} の状態です。
 */
export type PasswordFieldRootState = TextFieldRootState;

export namespace PasswordFieldRootProps {
  export type Render = RenderProps<PasswordFieldRootState>;

  export type SuruUI = {
    /**
     * パスワードの初期表示状態を指定します。
     *
     * {@link PasswordFieldRootProps.visible|visible} を指定しないときに使われます。
     *
     * @default false
     */
    defaultVisible?: boolean | undefined;

    /**
     * パスワードの表示状態が変わったときに呼ばれます。
     */
    onVisibleChange?: ((visible: boolean) => void) | undefined;

    /**
     * パスワードを表示状態にします。
     *
     * 子パーツにはコンテキスト経由で伝播します。指定した場合は表示状態がこの値で固定され、内部の状態を使わなくなります。
     */
    visible?: boolean | undefined;
  };

  export type BaseUI = Pick<
    TextFieldRootProps,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PasswordFieldRootProps: TextField の props をすべて継承します。
      keyof TextFieldRootProps,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render | keyof SuruUI | keyof BaseUI>;
}

/**
 * {@link PasswordFieldRoot} に渡すプロパティーです。
 */
export type PasswordFieldRootProps = PasswordFieldRootProps.Render &
  PasswordFieldRootProps.SuruUI &
  PasswordFieldRootProps.BaseUI &
  PasswordFieldRootProps.HTML;

/**
 * 文字入力欄のパスワード入力版である、パスワード入力欄のルート要素です。
 *
 * 指定したスタイルプロパティーは、子パーツへ継承されます。
 */
export const PasswordFieldRoot: IComponent<PasswordFieldRootProps> = function SuiPasswordFieldRoot(
  props,
) {
  const {
    size = "md",
    radius = size,
    variant = "liquid",
    visible: visibleProp,
    className,
    defaultVisible = false,
    onVisibleChange,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;
  const [visible, setVisible] = useControlled<boolean>({
    name: "PasswordField",
    state: "visible",
    default: defaultVisible,
    controlled: visibleProp,
  });
  const ctx = React.useMemo<PasswordFieldContext>(
    () => ({
      visible,
      setVisible(value) {
        const nextValue = typeof value === "function" ? value(visible) : value;

        if (nextValue !== visible) {
          setVisible(nextValue);
          onVisibleChange?.(nextValue);
        }
      },
    }),
    [visible, setVisible, onVisibleChange],
  );

  return (
    <PasswordFieldContext value={ctx}>
      <TextFieldRoot
        {...otherProps}
        size={size}
        radius={radius}
        variant={variant}
        className={cn<PasswordFieldRootState>(
          className,
          "sui_password_field",
          `sui_password_field-size_${size}`,
          `sui_password_field-radius_${radius}`,
          `sui_password_field-variant_${variant}`,
        )}
        data-scope={dataScope}
      />
    </PasswordFieldContext>
  );
};

export { PasswordFieldRoot as Root };

export namespace Root {
  export type State = PasswordFieldRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PasswordFieldRootProps.Render;

    export type SuruUI = PasswordFieldRootProps.SuruUI;

    export type BaseUI = PasswordFieldRootProps.BaseUI;

    export type HTML = PasswordFieldRootProps.HTML;
  }

  export type Color = PasswordFieldRootColor;

  export type Radius = PasswordFieldRootRadius;

  export type Size = PasswordFieldRootSize;

  export type Variant = PasswordFieldRootVariant;
}
