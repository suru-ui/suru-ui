import type { Component } from "../../types.js";
import * as ToggleButtonParts from "./toggle-button.parts.jsx";

/**
 * {@link ToggleButton} コンポーネントのプロパティーです。
 */
export type ToggleButtonProps = ToggleButtonParts.Root.Props &
  Pick<ToggleButtonParts.Content.Props, "children"> & {
    /**
     * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
     */
    slotProps?:
      | {
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
          readonly circularProgressTrack?:
            | ToggleButtonParts.CircularProgressTrack.Props
            | undefined;

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
        }
      | undefined;

    /**
     * 進行状況をパーセンテージで指定します。
     *
     * 指定された場合、`pending` が `true` のときに円形プログレスバーが進捗を表示します。
     */
    percentage?: number | undefined;

    /**
     * プログレスバーを不定モード（回転するアニメーション）にするかどうかを指定します。
     *
     * @default false
     */
    indeterminate?: boolean | undefined;
  };

/**
 * トグルボタンを表示するコンポーネントです。
 *
 * @example 基本
 * ```tsx
 * <ToggleButton>切り替え</ToggleButton>
 * ```
 *
 * @example アクティブ初期値指定
 * ```tsx
 * <ToggleButton defaultPressed>有効</ToggleButton>
 * ```
 *
 * @example 制御
 * ```tsx
 * <ToggleButton pressed onPressedChange={(pressed) => setPressed(pressed)}>
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
      pending: pendingProps = {},
      circularProgress: circularProgressProps = {},
      circularProgressFill: circularProgressFillProps,
      circularProgressTrack: circularProgressTrackProps,
      circularProgressFillRotation: circularProgressFillRotationProps,
    } = {},
    percentage: percentageProp,
    indeterminate: indeterminateProp,
    ...rootProps
  } = props;
  const { overlay = true, ...otherPendingProps } = pendingProps;
  const {
    percentage = percentageProp,
    indeterminate = indeterminateProp,
    ...otherCircularProgressProps
  } = circularProgressProps;

  return (
    <ToggleButtonParts.Root {...rootProps}>
      <ToggleButtonParts.Content {...contentProps}>{children}</ToggleButtonParts.Content>
      <ToggleButtonParts.Pending {...otherPendingProps} overlay={overlay}>
        <ToggleButtonParts.CircularProgress
          {...otherCircularProgressProps}
          percentage={percentage}
          indeterminate={indeterminate}
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
