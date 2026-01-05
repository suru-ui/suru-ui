import { Button } from "@base-ui/react/button";
import type { Color, ColorVariant, Height } from "@suru-ui/theme";
import * as React from "react";
import cn from "../../shared/cn.js";
import type { SuiComponentProps } from "../../shared/types.js";
import useBaseUiProps from "../../shared/use-base-ui-props.js";

import "./icon-button.css";

/**
 * ローディング中に表示されるインジケーターコンポーネントです。
 */
const Loader = /*#__PURE__*/ React.memo(function Loader() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="sui_icon_button_loader"
      aria-hidden="true"
    >
      <circle
        r={10}
        cx={12}
        cy={12}
        className="sui_icon_button_loader_ring"
      />
    </svg>
  );
}, () => true);

/**
 * ローダーコンポーネントの React 要素です。
 */
const loader = <Loader />;

/**
 * ボタンの状態を表す型です。
 */
export type IconButtonState = {
  /**
   * ボタンがユーザーの操作を無視するかどうかです。
   */
  disabled: boolean;
};

/**
 * 色の外観です。
 */
export type IconButtonColorScheme = Color;

/**
 * 大きさです。
 */
export type IconButtonSizing = Height;

/**
 * 外観のバリエーションです。
 */
export type IconButtonVariant = ColorVariant;

/**
 * ボタンコンポーネントの共通プロパティーです。
 */
export type IconButtonCommonProps = {
  /**
   * 色の外観です。
   *
   * @default "accent"
   */
  colorScheme?: IconButtonColorScheme | undefined;

  /**
   * ボタンがユーザーの操作を無視するかどうかです。
   *
   * @default false
   */
  disabled?: boolean | undefined;

  /**
   * 無効になっているときにボタンにフォーカスを当てることができるかどうかです。
   *
   * デフォルトでは `loading` が `true` のとき `true`、それ以外のときでは `false` になります。
   */
  focusableWhenDisabled?: boolean | undefined;

  /**
   * `true` にすると、ラベルやアイコンの代わりにローダーを表示します。また `focusableWhenDisabled` プロパティーがデフォルトで `true` になり、ボタンが無効になったときにフォーカスがボタンに保持されるようにします。これにより、フォーカスが失われるのを防ぎ、タブオーダーを維持できます。
   *
   * @default false
   */
  loading?: boolean | undefined;

  /**
   * `true` にすると、ボタンの周りに枠線が表示されます。
   *
   * @default false
   */
  outlined?: boolean | undefined;

  /**
   * 大きさです。
   *
   * @default "md"
   */
  sizing?: IconButtonSizing | undefined;

  /**
   * 外観のバリエーションです。
   *
   * @default "solid"
   */
  variant?: IconButtonVariant | undefined;
};

/**
 * ネイティブの `<button>` 要素としてレンダリングされるボタンのプロパティーです。
 */
export type IconButtonNativeProps =
  & Omit<SuiComponentProps<"button", IconButtonState>, keyof IconButtonCommonProps>
  & IconButtonCommonProps
  & {
    /**
     * コンポーネントが `render` プロパティを介して `<button>` 要素を置き換えるときにネイティブの `<button>` 要素をレンダリングするかどうかです。
     * レンダリングされる要素をネイティブボタンにする場合は `false` に設定します。
     */
    nonNativeButton?: false | undefined;
  };

/**
 * 非ネイティブボタンとしてレンダリングされる際に、除外すべきネイティブの `<button>` 要素の属性キーです。
 *
 * @see https://github.com/mui/base-ui/blob/v1.0.0/packages/react/src/button/IconButton.tsx#L67-L76
 */
type NonNativeAttributeKeys =
  | "form"
  | "formAction"
  | "formEncType"
  | "formMethod"
  | "formNoValidate"
  | "formTarget"
  | "name"
  | "type"
  | "value";

/**
 * 非ネイティブの `<button>` 要素としてレンダリングされるボタンのプロパティーです。
 */
export type IconButtonNonNativeProps =
  & Omit<
    SuiComponentProps<"button", IconButtonState>,
    keyof IconButtonCommonProps | NonNativeAttributeKeys
  >
  & IconButtonCommonProps
  & {
    /**
     * コンポーネントが `render` プロパティを介して `<button>` 要素を置き換えるときにネイティブの `<button>` 要素をレンダリングするかどうかです。
     * レンダリングされる要素を非ネイティブボタンにする場合は `true` に設定します。
     */
    nonNativeButton: true;
  };

/**
 * ボタンコンポーネントのプロパティーの型です。
 *
 * ネイティブボタンまたは非ネイティブボタンのプロパティーを持ちます。
 */
export type IconButtonProps = IconButtonNativeProps | IconButtonNonNativeProps;

/**
 * アイコンのみを表示するボタンコンポーネントです。
 */
export default function IconButton(props: IconButtonProps): React.ReactElement {
  const {
    sizing = "md",
    loading = false,
    variant = "solid",
    children,
    disabled = false,
    outlined = false,
    className,
    colorScheme = "accent",
    nonNativeButton = false,
    focusableWhenDisabled = loading,
    ...other
  } = props;
  const buttonProps = useBaseUiProps(other, {
    disabled: disabled || loading,
    className: cn(
      "sui_icon_button",
      `sui_icon_button-size_${sizing}`,
      `sui_icon_button-color_${colorScheme}`,
      `sui_icon_button-variant_${variant}`,
      loading && "sui_icon_button-loading",
      outlined && "sui_icon_button-outlined",
    ),
    nativeButton: !nonNativeButton,
    focusableWhenDisabled,
  });

  return (
    <Button {...buttonProps}>
      {children}
      {loading && loader}
    </Button>
  );
}
