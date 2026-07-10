import type { $OverrideProps, ReactComponent } from "../../shared/types.js";
import * as ButtonParts from "./button.parts.jsx";

/**
 * {@link Button} コンポーネントのプロパティーです。
 */
export type ButtonProps = $OverrideProps<
  ButtonParts.Root.Props,
  Pick<ButtonParts.Content.Props, "children" | "direction"> & {
    /**
     * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
     */
    slotProps?:
      | {
          /**
           * {@link ButtonParts.Content|Content} に渡すプロパティーです。
           */
          readonly content?: ButtonParts.Content.Props | undefined;

          /**
           * {@link ButtonParts.Progress|Progress} に渡すプロパティーです。
           */
          readonly progress?: ButtonParts.Progress.Props | undefined;

          /**
           * {@link ButtonParts.CircularProgress|CircularProgress} に渡すプロパティーです。
           */
          readonly circularProgress?: ButtonParts.CircularProgress.Props | undefined;

          /**
           * {@link ButtonParts.CircularProgressTrack|CircularProgressTrack} に渡すプロパティーです。
           */
          readonly circularProgressTrack?: ButtonParts.CircularProgressTrack.Props | undefined;

          /**
           * {@link ButtonParts.CircularProgressFill|CircularProgressFill} に渡すプロパティーです。
           */
          readonly circularProgressFill?: ButtonParts.CircularProgressFill.Props | undefined;

          /**
           * {@link ButtonParts.CircularProgressFillAnimation|CircularProgressFillAnimation} に渡すプロパティーです。
           */
          readonly circularProgressFillAnimation?:
            | ButtonParts.CircularProgressFillAnimation.Props
            | undefined;
        }
      | undefined;

    progressValue?: number | undefined;

    progressMinValue?: number | undefined;

    progressMaxValue?: number | undefined;

    isIndeterminate?: boolean | undefined;
  }
>;

/**
 * スタイル付きボタンコンポーネントです。
 *
 * 子要素としてテキストやアイコンを受け取り、`direction` でレイアウト方向を制御できます。またプログレスバーを内蔵し、非同期処理の進行状況を表示できます。
 *
 * @example テキストのみのボタン
 * ```tsx
 * <Button>送信</Button>
 * ```
 *
 * @example アイコンとテキストを縦並びに配置
 * ```tsx
 * <Button direction="column">
 *   <Icon />
 *   保存
 * </Button>
 * ```
 *
 * @example プログレスバー付きボタン
 * ```tsx
 * <Button progressValue={50} progressMaxValue={100}>
 *   送信
 * </Button>
 * ```
 */
export const Button: ReactComponent<ButtonProps> = function SuiButton(props) {
  const {
    children,
    direction: directionProp,
    slotProps: {
      content: contentProps = {},
      progress: progressProps = {},
      circularProgress: circularProgressProps,
      circularProgressFill: circularProgressFillProps,
      circularProgressTrack: circularProgressTrackProps,
      circularProgressFillAnimation: circularProgressFillAnimationProps,
    } = {},
    progressValue: progressValueProp,
    isIndeterminate: isIndeterminateProp = true,
    progressMaxValue: maxProgressValueProp,
    progressMinValue: minProgressValueProp,
    ...rootProps
  } = props;
  const { direction = directionProp, ...otherContentprops } = contentProps;
  const {
    value: progressValue = progressValueProp,
    maxValue: progressMaxValue = maxProgressValueProp,
    minValue: progressMinValue = minProgressValueProp,
    isIndeterminate = isIndeterminateProp,
    ...otherProgressProps
  } = progressProps;

  return (
    <ButtonParts.Root {...rootProps}>
      <ButtonParts.Content direction={direction} {...otherContentprops}>
        {children}
      </ButtonParts.Content>
      <ButtonParts.Progress
        {...otherProgressProps}
        value={progressValue!}
        maxValue={progressMaxValue!}
        minValue={progressMinValue!}
        isIndeterminate={isIndeterminate && progressValue == null}
      >
        <ButtonParts.CircularProgress {...circularProgressProps}>
          <ButtonParts.CircularProgressTrack {...circularProgressTrackProps} />
          <ButtonParts.CircularProgressFill {...circularProgressFillProps}>
            <ButtonParts.CircularProgressFillAnimation {...circularProgressFillAnimationProps} />
          </ButtonParts.CircularProgressFill>
        </ButtonParts.CircularProgress>
      </ButtonParts.Progress>
    </ButtonParts.Root>
  );
};
