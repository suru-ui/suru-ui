import { useControlled } from "@base-ui/utils/useControlled";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import {
  type TextFieldRootSize,
  type TextFieldRootColor,
  type TextFieldRootProps,
  type TextFieldRootState,
  type TextFieldRootRadius,
  type TextFieldRootVariant,
  TextFieldRoot,
} from "../../text-field/text-field.parts.js";
import type { Override, IComponent } from "../../types.js";
import {
  type PasswordFieldContextState,
  PasswordFieldContext,
} from "./password-field.root.context.js";

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
 * - `"circle"`: 完全な円形
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
 *
 * スタイル情報は {@link TextFieldRoot} が持つため、その状態と合成します。
 */
export type PasswordFieldRootState = Override<PasswordFieldContextState, TextFieldRootState>;

export namespace PasswordFieldRootProps {
  export type Render = RenderProps<PasswordFieldRootState>;

  export type SuruUI = {
    /**
     * フォーカス時に枠線へ適用する色を指定します。
     *
     * @default "grey"
     */
    color?: PasswordFieldRootColor | undefined;

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
     * 枠線を表示するかどうかを指定します。
     *
     * @default true
     */
    outlined?: boolean | undefined;

    /**
     * パスワード入力欄の角丸を指定します。
     *
     * 既定値は {@link PasswordFieldRootProps.size|size} です。
     */
    radius?: PasswordFieldRootRadius | undefined;

    /**
     * パスワード入力欄のサイズを指定します。
     *
     * @default "md"
     */
    size?: PasswordFieldRootSize | undefined;

    /**
     * パスワード入力欄の主な外観を指定します。
     *
     * @default "naked"
     */
    variant?: PasswordFieldRootVariant | undefined;

    /**
     * パスワードを表示状態にします。
     *
     * 子パーツにはコンテキスト経由で伝播します。指定した場合は表示状態がこの値で固定され、内部の状態を使わなくなります。
     */
    visible?: boolean | undefined;
  };

  export type BaseUI = Omit<
    Pick<
      TextFieldRootProps.BaseUI,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // PasswordFieldRootProps より:
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<TextFieldRootProps.HTML, keyof Render | keyof SuruUI | keyof BaseUI>;
}

/**
 * {@link PasswordFieldRoot} に渡すプロパティーです。
 */
export type PasswordFieldRootProps = PasswordFieldRootProps.Render &
  PasswordFieldRootProps.SuruUI &
  PasswordFieldRootProps.BaseUI &
  PasswordFieldRootProps.HTML;

export type IPasswordFieldRoot = IComponent<PasswordFieldRootProps>;

/**
 * 文字入力欄のパスワード入力版である、パスワード入力欄のルート要素です。
 *
 * 指定したスタイルプロパティーは、子パーツへ継承されます。
 */
export const PasswordFieldRoot: IPasswordFieldRoot = function SuiPasswordFieldRoot(props) {
  const {
    size = "md",
    color = "grey",
    style,
    radius = size,
    render,
    variant = "naked",
    visible: visibleProp,
    outlined = true,
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
  const visibleRef = React.useRef(visible);
  visibleRef.current = visible;
  const onVisibleChangeRef = React.useRef(onVisibleChange);
  onVisibleChangeRef.current = onVisibleChange;
  const ctx = React.useMemo<PasswordFieldContext>(
    () => ({
      visible,
      setVisible(value) {
        const nextValue =
          typeof value === "function"
            ? (value as (prevValue: boolean) => boolean)(visibleRef.current)
            : value;

        if (nextValue !== visibleRef.current) {
          setVisible(nextValue);
          onVisibleChangeRef.current?.(nextValue);
        }
      },
    }),
    [visible, setVisible],
  );

  return (
    <PasswordFieldContext value={ctx}>
      <TextFieldRoot
        {...otherProps}
        size={size}
        color={color}
        radius={radius}
        variant={variant}
        outlined={outlined}
        {...proxyRenderProps<TextFieldRootState, PasswordFieldRootState>(
          (state) => ({ ...state, visible }),
          {
            style,
            render,
            className: cn<PasswordFieldRootState>(
              className,
              "sui_password_field",
              (state) => `sui_password_field-size_${state.size}`,
              (state) => `sui_password_field-color_${state.color}`,
              (state) => `sui_password_field-radius_${state.radius}`,
              (state) => `sui_password_field-variant_${state.variant}`,
              (state) => state.outlined && "sui_password_field-outlined",
              (state) => state.visible && "sui_password_field-visible",
            ),
          },
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
