import { useControlled } from "@base-ui/utils/useControlled";
import * as React from "react";

import { EyeIcon, EyeOffIcon } from "../_icons.jsx";
import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import {
  type TextFieldRootSize,
  type TextFieldRootColor,
  type TextFieldRootProps,
  type TextFieldRootState,
  type TextFieldAddonProps,
  type TextFieldInputProps,
  type TextFieldInputState,
  type TextFieldRootRadius,
  type TextFieldRootVariant,
  TextFieldRoot,
  TextFieldAddon,
  TextFieldInput,
} from "../text-field/text-field.parts.jsx";
import type { IComponent, IUseContext } from "../types.js";

import "./password-field.css";

// Context
// -------

/**
 * {@link PasswordFieldRoot} が子パーツへ提供する表示状態です。
 */
export type PasswordFieldContext = {
  /**
   * パスワードの表示状態を更新します。
   *
   * 関数を渡すと、現在の表示状態から次の表示状態を計算できます。
   */
  readonly setVisible: (value: boolean | ((prevValue: boolean) => boolean)) => void;

  /**
   * パスワードを表示しているかどうかです。
   */
  readonly visible: boolean;
};

/**
 * PasswordField の表示状態を子パーツへ伝播するコンテキストです。
 */
export const PasswordFieldContext: React.Context<PasswordFieldContext | null> =
  React.createContext<PasswordFieldContext | null>(null);

function useSuiPasswordFieldContext(optional?: false): PasswordFieldContext;
function useSuiPasswordFieldContext(optional?: boolean): PasswordFieldContext | null;
function useSuiPasswordFieldContext(optional?: boolean): PasswordFieldContext | null {
  const ctx = React.use(PasswordFieldContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "PasswordFieldContext",
      providerName: "PasswordFieldRoot",
    });
  }

  return ctx;
}

/**
 * {@link PasswordFieldContext} を読み取るフックです。
 */
export const usePasswordFieldContext: IUseContext<PasswordFieldContext> =
  useSuiPasswordFieldContext;

export { PasswordFieldContext as Context, usePasswordFieldContext as useContext };

// Root
// ----

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

/**
 * {@link PasswordFieldRoot} に渡すプロパティーです。
 */
export type PasswordFieldRootProps = TextFieldRootProps & {
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
  /**
   * {@link PasswordFieldRootState}
   */
  export type State = PasswordFieldRootState;

  /**
   * {@link PasswordFieldRootProps}
   */
  export type Props = PasswordFieldRootProps;

  /**
   * {@link PasswordFieldRootColor}
   */
  export type Color = PasswordFieldRootColor;

  /**
   * {@link PasswordFieldRootRadius}
   */
  export type Radius = PasswordFieldRootRadius;

  /**
   * {@link PasswordFieldRootSize}
   */
  export type Size = PasswordFieldRootSize;

  /**
   * {@link PasswordFieldRootVariant}
   */
  export type Variant = PasswordFieldRootVariant;
}

// Input
// -----

/**
 * {@link PasswordFieldInput} の状態です。
 */
export type PasswordFieldInputState = TextFieldInputState;

/**
 * {@link PasswordFieldInput} に渡すプロパティーです。
 *
 * 入力項目の種類はルートの表示状態で自動的に切り替わるため、指定できません。
 */
export type PasswordFieldInputProps = Omit<TextFieldInputProps, "type">;

/**
 * Base UI の Input を使ったパスワード入力欄の入力欄です。
 *
 * 入力項目はコンテキストから読み取った表示状態で自動的に切り替わり、常に上書きされます。
 */
export const PasswordFieldInput: IComponent<PasswordFieldInputProps> =
  function SuiPasswordFieldInput(props) {
    const ctx = usePasswordFieldContext();

    // 表示状態は必ずコンテキストから決まるため、利用者の指定より優先します。
    return <TextFieldInput {...props} type={ctx.visible ? "text" : "password"} />;
  };

export { PasswordFieldInput as Input };

export namespace Input {
  /**
   * {@link PasswordFieldInputState}
   */
  export type State = PasswordFieldInputState;

  /**
   * {@link PasswordFieldInputProps}
   */
  export type Props = PasswordFieldInputProps;
}

// Addon
// -----

/**
 * {@link PasswordFieldAddon} の状態です。
 */
export type PasswordFieldAddonState = {};

/**
 * {@link PasswordFieldAddon} に渡すプロパティーです。
 */
export type PasswordFieldAddonProps = TextFieldAddonProps;

/**
 * パスワード入力欄の入力欄の左右に表示する補助コンポーネントです。
 *
 * 接頭辞、接尾辞、アイコンなどを表示できます。
 */
export const PasswordFieldAddon: IComponent<PasswordFieldAddonProps> =
  function SuiPasswordFieldAddon(props) {
    const { className, ...otherProps } = props;

    return <TextFieldAddon {...otherProps} className={cn(className, "sui_password_field_addon")} />;
  };

export { PasswordFieldAddon as Addon };

export namespace Addon {
  /**
   * {@link PasswordFieldAddonState}
   */
  export type State = PasswordFieldAddonState;

  /**
   * {@link PasswordFieldAddonProps}
   */
  export type Props = PasswordFieldAddonProps;
}

// ToggleButton
// ------------

/**
 * {@link PasswordFieldToggleButton} の状態です。
 */
export type PasswordFieldToggleButtonState = {};

/**
 * {@link PasswordFieldToggleButton} に渡すプロパティーです。
 */
export type PasswordFieldToggleButtonProps = Omit<
  React.ComponentProps<"button">,
  keyof RenderProps<PasswordFieldToggleButtonState> | "onClick" | "type"
> &
  RenderProps<PasswordFieldToggleButtonState>;

/**
 * パスワードの表示と非表示を切り替えるボタンです。
 *
 * アイコン、既定のラベル、押下状態はコンテキストから読み取った表示状態で切り替わります。
 */
export const PasswordFieldToggleButton: IComponent<PasswordFieldToggleButtonProps> =
  function SuiPasswordFieldToggleButton(props) {
    const ctx = usePasswordFieldContext();
    const { visible, setVisible } = ctx;
    const {
      children = visible ? <EyeOffIcon /> : <EyeIcon />,
      disabled = false,
      "aria-label": ariaLabel,
      ...otherButtonProps
    } = props;
    const label = ariaLabel ?? (visible ? "パスワードを隠す" : "パスワードを表示");

    return useRender({
      props: [
        otherButtonProps,
        {
          type: "button",
          onClick() {
            setVisible(!visible);
          },
          children,
          disabled,
          className: cn(
            "sui_password_field_toggle",
            visible && "sui_password_field_toggle-visible",
          ),
          "aria-label": label,
          "aria-pressed": visible,
        },
      ],
      defaultTagName: "button",
    });
  };

export { PasswordFieldToggleButton as ToggleButton };

export namespace ToggleButton {
  /**
   * {@link PasswordFieldToggleButtonState}
   */
  export type State = PasswordFieldToggleButtonState;

  /**
   * {@link PasswordFieldToggleButtonProps}
   */
  export type Props = PasswordFieldToggleButtonProps;
}
