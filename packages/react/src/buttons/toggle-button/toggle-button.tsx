import type { Component } from "../../types.js";
import * as ToggleButtonParts from "./toggle-button.parts.jsx";

/**
 * {@link Button} の各パーツに渡すプロパティーです。
 */
export type ToggleButtonSlotProps = {
  /**
   * {@link ToggleButtonParts.Content|Content} に渡すプロパティーです。
   */
  readonly content?: ToggleButtonParts.Content.Props | undefined;

  /**
   * {@link ToggleButtonParts.Pending|Pending} に渡すプロパティーです。
   */
  readonly pending?: ToggleButtonParts.Pending.Props | undefined;

  /**
   * {@link ToggleButtonParts.CircularProgress|CircularProgress} に渡すプロパティーです。
   */
  readonly circularProgress?: ToggleButtonParts.CircularProgress.Props | undefined;

  /**
   * {@link ToggleButtonParts.CircularProgressTrack|CircularProgressTrack} に渡すプロパティーです。
   */
  readonly circularProgressTrack?: ToggleButtonParts.CircularProgressTrack.Props | undefined;

  /**
   * {@link ToggleButtonParts.CircularProgressFill|CircularProgressFill} に渡すプロパティーです。
   */
  readonly circularProgressFill?: ToggleButtonParts.CircularProgressFill.Props | undefined;

  /**
   * {@link ToggleButtonParts.CircularProgressFillRotation|CircularProgressFillRotation}
   * に渡すプロパティーです。
   */
  readonly circularProgressFillRotation?:
    | ToggleButtonParts.CircularProgressFillRotation.Props
    | undefined;
};

/**
 * {@link ToggleButton} コンポーネントのプロパティーです。
 */
export type ToggleButtonProps = Omit<ToggleButtonParts.Root.Props, "children"> &
  Pick<ToggleButtonParts.Content.Props, "children"> &
  Pick<ToggleButtonParts.CircularProgress.Props, "percentage" | "indeterminate"> & {
    /**
     * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
     *
     * 各パーツのプロパティーが優先されます。
     */
    slotProps?: ToggleButtonSlotProps | undefined;
  };

/**
 * トグルボタンを表示するコンポーネントです。
 *
 * @example 基本
 * ```tsx
 * <ToggleButton>切り替え</ToggleButton>
 * ```
 *
 * @example 初期値指定
 * ```tsx
 * <ToggleButton defaultPressed>有効</ToggleButton>
 * ```
 *
 * @example 制御
 * ```tsx
 * <ToggleButton pressed={pressed} onPressedChange={(pressed) => setPressed(pressed)}>
 *   有効
 * </ToggleButton>
 * ```
 *
 * @example 進捗表示
 * ```tsx
 * <ToggleButton pending percentage={75}>処理中…</ToggleButton>
 * ```
 */
export const ToggleButton: Component<ToggleButtonProps> = function SuiToggleButton(props) {
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
    <ToggleButtonParts.Root {...rootProps}>
      <ToggleButtonParts.Content {...{ children, ...contentProps }} />
      <ToggleButtonParts.Pending {...otherPendingProps} overlay={overlay}>
        <ToggleButtonParts.CircularProgress
          percentage={percentage}
          indeterminate={indeterminate}
          {...circularProgressProps}
        >
          <ToggleButtonParts.CircularProgressTrack {...circularProgressTrackProps} />
          <ToggleButtonParts.CircularProgressFill {...circularProgressFillProps}>
            <ToggleButtonParts.CircularProgressFillRotation
              {...circularProgressFillRotationProps}
            />
          </ToggleButtonParts.CircularProgressFill>
        </ToggleButtonParts.CircularProgress>
      </ToggleButtonParts.Pending>
    </ToggleButtonParts.Root>
  );
};
