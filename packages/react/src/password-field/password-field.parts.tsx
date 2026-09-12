import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
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
  type TextFieldInputChangeEventReason,
  type TextFieldInputChangeEventDetails,
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

// Input
// -----

/**
 * {@link PasswordFieldInput} の値が変更されたイベントの詳細です。
 */
export type PasswordFieldInputChangeEventDetails = TextFieldInputChangeEventDetails;

/**
 * {@link PasswordFieldInput} の値が変更された理由です。
 */
export type PasswordFieldInputChangeEventReason = TextFieldInputChangeEventReason;

/**
 * {@link PasswordFieldInput} の状態です。
 */
export type PasswordFieldInputState = TextFieldInputState;

export namespace PasswordFieldInputProps {
  export type Render = RenderProps<PasswordFieldInputState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    TextFieldInputProps,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PasswordFieldInputProps: type は visible から決まるため除きます。
      keyof TextFieldInputProps,
      keyof Render | keyof SuruUI | "type"
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<"input">,
    keyof Render | keyof SuruUI | keyof BaseUI | "type"
  >;
}

/**
 * {@link PasswordFieldInput} に渡すプロパティーです。
 *
 * 入力項目の種類はルートの表示状態で自動的に切り替わるため、指定できません。
 */
export type PasswordFieldInputProps = PasswordFieldInputProps.Render &
  PasswordFieldInputProps.SuruUI &
  PasswordFieldInputProps.BaseUI &
  PasswordFieldInputProps.HTML;

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
  export type State = PasswordFieldInputState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PasswordFieldInputProps.Render;

    export type SuruUI = PasswordFieldInputProps.SuruUI;

    export type BaseUI = PasswordFieldInputProps.BaseUI;

    export type HTML = PasswordFieldInputProps.HTML;
  }

  export type ChangeEventDetails = PasswordFieldInputChangeEventDetails;

  export type ChangeEventReason = PasswordFieldInputChangeEventReason;
}

// Addon
// -----

/**
 * {@link PasswordFieldAddon} の状態です。
 */
export type PasswordFieldAddonState = {};

export namespace PasswordFieldAddonProps {
  export type Render = RenderProps<PasswordFieldAddonState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    TextFieldAddonProps,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PasswordFieldAddonProps: TextField の props をすべて継承します。
      keyof TextFieldAddonProps,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<React.ComponentProps<"span">, keyof Render | keyof SuruUI | keyof BaseUI>;
}

/**
 * {@link PasswordFieldAddon} に渡すプロパティーです。
 */
export type PasswordFieldAddonProps = PasswordFieldAddonProps.Render &
  PasswordFieldAddonProps.SuruUI &
  PasswordFieldAddonProps.BaseUI &
  PasswordFieldAddonProps.HTML;

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
  export type State = PasswordFieldAddonState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PasswordFieldAddonProps.Render;

    export type SuruUI = PasswordFieldAddonProps.SuruUI;

    export type BaseUI = PasswordFieldAddonProps.BaseUI;

    export type HTML = PasswordFieldAddonProps.HTML;
  }
}

// ToggleButton
// ------------

/**
 * {@link PasswordFieldToggleButton} の状態です。
 */
export type PasswordFieldToggleButtonState = {};

export namespace PasswordFieldToggleButtonProps {
  export type Render = RenderProps<PasswordFieldToggleButtonState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"button", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link PasswordFieldToggleButton} に渡すプロパティーです。
 */
export type PasswordFieldToggleButtonProps = PasswordFieldToggleButtonProps.Render &
  PasswordFieldToggleButtonProps.SuruUI &
  PasswordFieldToggleButtonProps.BaseUI &
  PasswordFieldToggleButtonProps.HTML;

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
  export type State = PasswordFieldToggleButtonState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PasswordFieldToggleButtonProps.Render;

    export type SuruUI = PasswordFieldToggleButtonProps.SuruUI;

    export type BaseUI = PasswordFieldToggleButtonProps.BaseUI;

    export type HTML = PasswordFieldToggleButtonProps.HTML;
  }
}
