import { Button } from "@base-ui/react/button";
import type { Color, ColorVariant, Height } from "@suru-ui/theme";
import * as React from "react";
import cn from "../../shared/cn.js";
import isMaybeVisibleNode from "../../shared/is-maybe-visible-node.js";

import "./action-button.css";
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
      className="sui_action_button_loader"
      aria-hidden="true"
    >
      <circle
        r={2}
        cx={4}
        cy={12}
        className="sui_action_button_loader_dot sui_action_button_loader_dot-1"
      />
      <circle
        r={2}
        cx={12}
        cy={12}
        className="sui_action_button_loader_dot sui_action_button_loader_dot-2"
      />
      <circle
        r={2}
        cx={20}
        cy={12}
        className="sui_action_button_loader_dot sui_action_button_loader_dot-3"
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
export type ActionButtonState = {
  /**
   * ボタンがユーザーの操作を無視するかどうかです。
   */
  disabled: boolean;
};

/**
 * 色の外観です。
 */
export type ActionButtonColorScheme = Color;

/**
 * 大きさです。
 */
export type ActionButtonSizing = Height;

/**
 * 外観のバリエーションです。
 */
export type ActionButtonVariant = ColorVariant;

/**
 * ボタンコンポーネントの共通プロパティーです。
 */
export type ActionButtonCommonProps = {
  /**
   * 色の外観です。
   *
   * @default "grey"
   */
  colorScheme?: ActionButtonColorScheme | undefined;

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
  sizing?: ActionButtonSizing | undefined;

  /**
   * 追加すると、ラベルの前にアイコンが表示されます。
   */
  startIcon?: React.ReactNode;

  /**
   * 外観のバリエーションです。
   *
   * @default "naked"
   */
  variant?: ActionButtonVariant | undefined;
};

/**
 * ネイティブの `<button>` 要素としてレンダリングされるボタンのプロパティーです。
 */
export type ActionButtonNativeProps =
  & Omit<SuiComponentProps<"button", ActionButtonState>, keyof ActionButtonCommonProps>
  & ActionButtonCommonProps
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
 * @see https://github.com/mui/base-ui/blob/v1.0.0/packages/react/src/button/ActionButton.tsx#L67-L76
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
export type ActionButtonNonNativeProps =
  & Omit<
    SuiComponentProps<"button", ActionButtonState>,
    keyof ActionButtonCommonProps | NonNativeAttributeKeys
  >
  & ActionButtonCommonProps
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
export type ActionButtonProps = ActionButtonNativeProps | ActionButtonNonNativeProps;

/**
 * アイコンとラベルを表示するアクション用のボタンコンポーネントです。
 */
export default function ActionButton(props: ActionButtonProps): React.ReactElement {
  const {
    sizing = "md",
    endIcon,
    loading = false,
    variant = "naked",
    children,
    disabled = false,
    className,
    noOutline = false,
    startIcon,
    colorScheme = "grey",
    nonNativeButton = false,
    focusableWhenDisabled = loading,
    ...other
  } = props;
  const buttonProps = useBaseUiProps(other, {
    disabled: disabled || loading,
    className: cn(
      "sui_action_button",
      `sui_action_button-size_${sizing}`,
      `sui_action_button-color_${colorScheme}`,
      `sui_action_button-variant_${variant}`,
      loading && "sui_action_button-loading",
      !noOutline && "sui_action_button-outlined",
    ),
    nativeButton: !nonNativeButton,
    focusableWhenDisabled,
  });

  return (
    <Button {...buttonProps}>
      {isMaybeVisibleNode(startIcon) && (
        <span className="sui_action_button_icon sui_action_button_icon-start">{startIcon}</span>
      )}
      <span className="sui_action_button_label">{children}</span>
      {isMaybeVisibleNode(endIcon) && (
        <span className="sui_action_button_icon sui_action_button_icon-end">{endIcon}</span>
      )}
      {loading && loader}
    </Button>
  );
}
