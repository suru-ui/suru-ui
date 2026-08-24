import { useControlled } from "@base-ui/utils/useControlled";
import * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import { ContextMissingError } from "../../errors.js";
import type { IComponent, IUseContext } from "../../types.js";
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

import "./password-field.css";

// Context
// -------

/**
 * {@link PasswordFieldRoot} が子パーツへ提供する表示状態です。
 */
export type PasswordFieldContext = {
  /**
   * パスワードを表示しているかどうかです。
   */
  readonly visible: boolean;

  /**
   * パスワードの表示状態を更新します。
   *
   * 関数を渡すと、現在の表示状態から次の表示状態を計算できます。
   */
  readonly setVisible: (value: boolean | ((prevValue: boolean) => boolean)) => void;
};

/**
 * PasswordField の表示状態を子パーツへ伝播するコンテキストです。
 */
export const PasswordFieldContext: React.Context<PasswordFieldContext | null> =
  React.createContext<PasswordFieldContext | null>(null);

function useSuiPasswordFieldContext(optional?: false): PasswordFieldContext;
function useSuiPasswordFieldContext(optional?: boolean): PasswordFieldContext | null;
function useSuiPasswordFieldContext(optional?: boolean): PasswordFieldContext | null {
  const context = React.use(PasswordFieldContext);
  if (context === null && !optional) {
    throw new ContextMissingError({
      contextName: "PasswordFieldContext",
      providerName: "PasswordFieldRoot",
    });
  }

  return context;
}

/**
 * {@link PasswordFieldContext} を読み取るフックです。
 */
export const usePasswordFieldContext: IUseContext<PasswordFieldContext> =
  useSuiPasswordFieldContext;

/**
 * {@link PasswordFieldContext} です。
 */
export type Context = PasswordFieldContext;

/**
 * {@link PasswordFieldContext} です。
 */
export const Context: React.Context<Context | null> = PasswordFieldContext;

/**
 * {@link usePasswordFieldContext} です。
 */
export const useContext: IUseContext<Context> = usePasswordFieldContext;

// Root
// ----

/**
 * パスワード入力欄の色です。
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
   * パスワードを表示状態にします。
   *
   * 子パーツにはコンテキスト経由で伝播します。指定した場合は表示状態がこの値で固定され、内部の状態を使わなくなります。
   */
  visible?: boolean | undefined;

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
    className,
    visible: visibleProp,
    defaultVisible = false,
    onVisibleChange,
    ...otherProps
  } = props;
  const [visible, setVisible] = useControlled<boolean>({
    controlled: visibleProp,
    default: defaultVisible,
    name: "PasswordField",
    state: "visible",
  });
  const context = React.useMemo<PasswordFieldContext>(
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
    <Context value={context}>
      <TextFieldRoot {...otherProps} className={cn(className, "sui_password_field")} />
    </Context>
  );
};

/**
 * {@link PasswordFieldRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link PasswordFieldRootState} です。
   */
  export type State = PasswordFieldRootState;

  /**
   * {@link PasswordFieldRootProps} です。
   */
  export type Props = PasswordFieldRootProps;

  /**
   * {@link PasswordFieldRootColor} です。
   */
  export type Color = PasswordFieldRootColor;

  /**
   * {@link PasswordFieldRootRadius} です。
   */
  export type Radius = PasswordFieldRootRadius;

  /**
   * {@link PasswordFieldRootSize} です。
   */
  export type Size = PasswordFieldRootSize;

  /**
   * {@link PasswordFieldRootVariant} です。
   */
  export type Variant = PasswordFieldRootVariant;
}

/**
 * {@link PasswordFieldRoot} です。
 */
export const Root: IComponent<Root.Props> = PasswordFieldRoot;

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
    const context = useSuiPasswordFieldContext();

    // 表示状態は必ずコンテキストから決まるため、利用者の指定より優先します。
    return <TextFieldInput {...props} type={context.visible ? "text" : "password"} />;
  };

/**
 * {@link PasswordFieldInput} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Input {
  /**
   * {@link PasswordFieldInputState} です。
   */
  export type State = PasswordFieldInputState;

  /**
   * {@link PasswordFieldInputProps} です。
   */
  export type Props = PasswordFieldInputProps;
}

/**
 * {@link PasswordFieldInput} です。
 */
export const Input: IComponent<Input.Props> = PasswordFieldInput;

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

/**
 * {@link PasswordFieldAddon} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Addon {
  /**
   * {@link PasswordFieldAddonState} です。
   */
  export type State = PasswordFieldAddonState;

  /**
   * {@link PasswordFieldAddonProps} です。
   */
  export type Props = PasswordFieldAddonProps;
}

/**
 * {@link PasswordFieldAddon} です。
 */
export const Addon: IComponent<Addon.Props> = PasswordFieldAddon;

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
  keyof RenderProps<PasswordFieldToggleButtonState>
> &
  RenderProps<PasswordFieldToggleButtonState>;

/**
 * パスワードの表示と非表示を切り替えるボタンです。
 *
 * アイコン、既定のラベル、押下状態はコンテキストから読み取った表示状態で切り替わります。
 */
export const PasswordFieldToggleButton: IComponent<PasswordFieldToggleButtonProps> =
  function SuiPasswordFieldToggleButton(props) {
    const context = useSuiPasswordFieldContext();
    const { visible } = context;
    const {
      type = "button",
      disabled = false,
      className,
      "aria-label": ariaLabel,
      ...otherProps
    } = props;
    const label = ariaLabel ?? (visible ? "パスワードを隠す" : "パスワードを表示");

    return useRender({
      defaultTagName: "button",
      props: [
        otherProps,
        {
          children: visible ? <SuiEyeOffIcon /> : <SuiEyeIcon />,
          disabled,
          type,
          "aria-label": label,
          "aria-pressed": visible,
        },
        {
          className: cn(
            className,
            "sui_password_field_toggle",
            visible && "sui_password_field_toggle-visible",
          ),
        },
      ],
    });
  };

/**
 * {@link PasswordFieldToggleButton} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace ToggleButton {
  /**
   * {@link PasswordFieldToggleButtonState} です。
   */
  export type State = PasswordFieldToggleButtonState;

  /**
   * {@link PasswordFieldToggleButtonProps} です。
   */
  export type Props = PasswordFieldToggleButtonProps;
}

/**
 * {@link PasswordFieldToggleButton} です。
 */
export const ToggleButton: IComponent<ToggleButton.Props> = PasswordFieldToggleButton;

function SuiEyeIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      fill="none"
      width={24}
      xmlns="http://www.w3.org/2000/svg"
      height={24}
      stroke="currentColor"
      viewBox="0 0 24 24"
      focusable="false"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle r="3" cx="12" cy="12" />
    </svg>
  );
}

function SuiEyeOffIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      fill="none"
      width={24}
      xmlns="http://www.w3.org/2000/svg"
      height={24}
      stroke="currentColor"
      viewBox="0 0 24 24"
      focusable="false"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
      <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
      <path d="m2 2 20 20" />
    </svg>
  );
}
