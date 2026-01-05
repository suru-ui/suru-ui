import { Button as BuiButton } from "@base-ui/react/button";
import type { Color, ColorVariant, Height } from "@suru-ui/theme";
import * as React from "react";
import cn from "../../shared/cn.js";
import isMaybeVisibleNode from "../../shared/is-maybe-visible-node.js";
import type { SuiComponentProps } from "../../shared/types.js";
import useBaseUiProps from "../../shared/use-base-ui-props.js";

import "./button.css";

/**************************************************************************************************/

/**
 * ローディング中に表示されるインジケーターコンポーネントです。
 */
const Loader = /*#__PURE__*/ React.memo(function Loader() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="sui_button_loader"
      aria-hidden="true"
    >
      <circle r={2} cx={4} cy={12} className="sui_button_loader_dot sui_button_loader_dot-1" />
      <circle r={2} cx={12} cy={12} className="sui_button_loader_dot sui_button_loader_dot-2" />
      <circle r={2} cx={20} cy={12} className="sui_button_loader_dot sui_button_loader_dot-3" />
    </svg>
  );
}, () => true);

/**
 * ローダーコンポーネントの React 要素です。
 */
const loader = <Loader />;

/**************************************************************************************************/

/**
 * ボタンの状態を表す型です。
 */
export type ButtonState = {
  /**
   * ボタンがユーザーの操作を無視するかどうかです。
   */
  disabled: boolean;
};

/**
 * 色の外観です。
 */
export type ButtonColorScheme = Color;

/**
 * 大きさです。
 */
export type ButtonSizing = Height;

/**
 * 外観のバリエーションです。
 */
export type ButtonVariant = ColorVariant;

/**
 * ボタンコンポーネントの共通プロパティーです。
 */
export type ButtonCommonProps = {
  /**
   * 色の外観です。
   *
   * @default "accent"
   */
  colorScheme?: ButtonColorScheme | undefined;

  /**
   * ボタンがユーザーの操作を無視するかどうかです。
   *
   * @default false
   */
  disabled?: boolean | undefined;

  /**
   * 追加すると、ラベルの後にアイコンが表示されます。
   */
  endIcon?: React.ReactNode;

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
   * `true` にすると、ラベルがボタンの描画領域に収まらないとき、自動で改行されます。
   *
   * @default false
   */
  multiline?: boolean | undefined;

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
  sizing?: ButtonSizing | undefined;

  /**
   * 追加すると、ラベルの前にアイコンが表示されます。
   */
  startIcon?: React.ReactNode;

  /**
   * 外観のバリエーションです。
   *
   * @default "solid"
   */
  variant?: ButtonVariant | undefined;
};

/**
 * ネイティブの `<button>` 要素としてレンダリングされるボタンのプロパティーです。
 */
export type ButtonNativeProps =
  & Omit<SuiComponentProps<"button", ButtonState>, keyof ButtonCommonProps>
  & ButtonCommonProps
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
 * @see https://github.com/mui/base-ui/blob/v1.0.0/packages/react/src/button/Button.tsx#L67-L76
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
export type ButtonNonNativeProps =
  & Omit<SuiComponentProps<"button", ButtonState>, keyof ButtonCommonProps | NonNativeAttributeKeys>
  & ButtonCommonProps
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
export type ButtonProps = ButtonNativeProps | ButtonNonNativeProps;

/**
 * アイコンとラベルを表示するボタンコンポーネントです。
 */
export default function Button(props: ButtonProps): React.ReactElement {
  const {
    sizing = "md",
    endIcon,
    loading = false,
    variant = "solid",
    children,
    disabled = false,
    outlined = false,
    multiline = false,
    startIcon,
    colorScheme = "accent",
    nonNativeButton = false,
    focusableWhenDisabled = loading,
    ...other
  } = props;
  const buttonProps = useBaseUiProps(other, {
    disabled: disabled || loading,
    className: cn(
      "sui_button",
      `sui_button-size_${sizing}`,
      `sui_button-color_${colorScheme}`,
      `sui_button-variant_${variant}`,
      loading && "sui_button-loading",
      outlined && "sui_button-outlined",
      multiline && "sui_button-multiline",
    ),
    nativeButton: !nonNativeButton,
    focusableWhenDisabled,
  });

  return (
    <BuiButton {...buttonProps}>
      {isMaybeVisibleNode(startIcon) && (
        <span className="sui_button_icon sui_button_icon-start">{startIcon}</span>
      )}
      <span className={cn("sui_button_label", multiline && "sui_button_label-multiline")}>
        {children}
      </span>
      {isMaybeVisibleNode(endIcon) && (
        <span className="sui_button_icon sui_button_icon-end">{endIcon}</span>
      )}
      {loading && loader}
    </BuiButton>
  );
}
