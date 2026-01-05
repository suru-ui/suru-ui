import { Button } from "@base-ui/react/button";
import type { Color, ColorVariant, Height } from "@suru-ui/theme";
import * as React from "react";
import cn from "../../shared/cn.js";

import "./action-icon-button.css";
import { SuiComponentProps } from "../../shared/types.js";
import useBaseUiProps from "../../shared/use-base-ui-props.js";

/**
 * ローディング中に表示されるインジケーターコンポーネントです。
 */
const Loader = /*#__PURE__*/ React.memo(function Loader() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="sui_action_icon_button_loader"
      aria-hidden="true"
    >
      <circle
        r={10}
        cx={12}
        cy={12}
        className="sui_action_icon_button_loader_ring"
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
export type ActionIconButtonState = {
  /**
   * ボタンがユーザーの操作を無視するかどうかです。
   */
  disabled: boolean;
};

/**
 * 色の外観です。
 */
export type ActionIconButtonColorScheme = Color;

/**
 * 大きさです。
 */
export type ActionIconButtonSizing = Height;

/**
 * 外観のバリエーションです。
 */
export type ActionIconButtonVariant = ColorVariant;

/**
 * ボタンコンポーネントの共通プロパティーです。
 */
export type ActionIconButtonCommonProps = {
  /**
   * 色の外観です。
   *
   * @default "grey"
   */
  colorScheme?: ActionIconButtonColorScheme | undefined;

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
   * `true` にすると、ボタンの周りに枠線が非表示になります。
   *
   * @default false
   */
  noOutline?: boolean | undefined;

  /**
   * 大きさです。
   *
   * @default "md"
   */
  sizing?: ActionIconButtonSizing | undefined;

  /**
   * 外観のバリエーションです。
   *
   * @default "naked"
   */
  variant?: ActionIconButtonVariant | undefined;
};

/**
 * ネイティブの `<button>` 要素としてレンダリングされるボタンのプロパティーです。
 */
export type ActionIconButtonNativeProps =
  & Omit<SuiComponentProps<"button", ActionIconButtonState>, keyof ActionIconButtonCommonProps>
  & ActionIconButtonCommonProps
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
 * @see https://github.com/mui/base-ui/blob/v1.0.0/packages/react/src/button/ActionIconButton.tsx#L67-L76
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
export type ActionIconButtonNonNativeProps =
  & Omit<
    SuiComponentProps<"button", ActionIconButtonState>,
    keyof ActionIconButtonCommonProps | NonNativeAttributeKeys
  >
  & ActionIconButtonCommonProps
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
export type ActionIconButtonProps = ActionIconButtonNativeProps | ActionIconButtonNonNativeProps;

/**
 * アイコンのみを表示するアクション用のボタンコンポーネントです。
 */
export default function ActionIconButton(props: ActionIconButtonProps): React.ReactElement {
  const {
    sizing = "md",
    loading = false,
    variant = "naked",
    children,
    disabled = false,
    className,
    noOutline = false,
    colorScheme = "grey",
    nonNativeButton = false,
    focusableWhenDisabled = loading,
    ...other
  } = props;
  const buttonProps = useBaseUiProps(other, {
    disabled: disabled || loading,
    className: cn(
      "sui_action_icon_button",
      `sui_action_icon_button-size_${sizing}`,
      `sui_action_icon_button-color_${colorScheme}`,
      `sui_action_icon_button-variant_${variant}`,
      loading && "sui_action_icon_button-loading",
      !noOutline && "sui_action_icon_button-outlined",
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
