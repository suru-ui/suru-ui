import type { Component } from "../../types.js";
import * as ButtonParts from "./button.parts.jsx";

/**
 * {@link Button} の各パーツに渡すプロパティーです。
 */
export type ButtonSlotProps = {
  /**
   * {@link ButtonParts.CircularProgress|CircularProgress} に渡すプロパティーです。
   */
  readonly circularProgress?: ButtonParts.CircularProgress.Props | undefined;

  /**
   * {@link ButtonParts.CircularProgressFill|CircularProgressFill} に渡すプロパティーです。
   */
  readonly circularProgressFill?: ButtonParts.CircularProgressFill.Props | undefined;

  /**
   * {@link ButtonParts.CircularProgressFillRotation|CircularProgressFillRotation} に渡すプロパティーです。
   */
  readonly circularProgressFillRotation?:
    | ButtonParts.CircularProgressFillRotation.Props
    | undefined;

  /**
   * {@link ButtonParts.CircularProgressTrack|CircularProgressTrack} に渡すプロパティーです。
   */
  readonly circularProgressTrack?: ButtonParts.CircularProgressTrack.Props | undefined;

  /**
   * {@link ButtonParts.Content|Content} に渡すプロパティーです。
   */
  readonly content?: ButtonParts.Content.Props | undefined;

  /**
   * {@link ButtonParts.Pending|Pending} に渡すプロパティーです。
   */
  readonly pending?: ButtonParts.Pending.Props | undefined;
};

/**
 * {@link Button} コンポーネントのプロパティーです。
 */
export type ButtonProps = Omit<ButtonParts.Root.Props, "children"> &
  Pick<ButtonParts.Content.Props, "children"> &
  Pick<ButtonParts.CircularProgress.Props, "percentage" | "indeterminate"> & {
    /**
     * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
     *
     * 各パーツのプロパティーが優先されます。
     */
    slotProps?: ButtonSlotProps | undefined;
  };

/**
 * ボタンを表示するコンポーネントです。
 *
 * @example 基本
 * ```tsx
 * <Button variant="solid" color="blue" size="md" type="submit">送信</Button>
 * ```
 *
 * @example 進捗表示
 * ```tsx
 * <Button pending percentage={75}>処理中…</Button>
 * ```
 */
export const Button: Component<ButtonProps> = function SuiButton(props) {
  const {
    children,
    slotProps: {
      content: contentProps,
      pending: { overlay = true, ...otherPendingProps } = {},
      circularProgress: circularProgressProps,
      circularProgressFill: circularProgressFillProps,
      circularProgressTrack: circularProgressTrackProps,
      circularProgressFillRotation: circularProgressFillRotationProps,
    } = {},
    percentage,
    indeterminate,
    ...rootProps
  } = props;

  return (
    <ButtonParts.Root {...rootProps}>
      <ButtonParts.Content {...{ children, ...contentProps }} />
      <ButtonParts.Pending {...otherPendingProps} overlay={overlay}>
        <ButtonParts.CircularProgress
          percentage={percentage}
          indeterminate={indeterminate}
          {...circularProgressProps}
        >
          <ButtonParts.CircularProgressTrack {...circularProgressTrackProps} />
          <ButtonParts.CircularProgressFill {...circularProgressFillProps}>
            <ButtonParts.CircularProgressFillRotation {...circularProgressFillRotationProps} />
          </ButtonParts.CircularProgressFill>
        </ButtonParts.CircularProgress>
      </ButtonParts.Pending>
    </ButtonParts.Root>
  );
};
