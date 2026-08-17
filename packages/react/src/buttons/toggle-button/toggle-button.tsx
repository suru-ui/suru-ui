import type { IComponent, IUseContext } from "../../types.js";
import {
  type ToggleButtonContext,
  type ToggleButtonRootProps,
  type ToggleButtonRootState,
  type ToggleButtonContentProps,
  type ToggleButtonPendingProps,
  type ToggleButtonCircularProgressProps,
  type ToggleButtonCircularProgressFillProps,
  type ToggleButtonCircularProgressTrackProps,
  type ToggleButtonCircularProgressFillRotationProps,
  ToggleButtonRoot,
  ToggleButtonContent,
  ToggleButtonPending,
  useToggleButtonContext,
  ToggleButtonCircularProgress,
  ToggleButtonCircularProgressFill,
  ToggleButtonCircularProgressTrack,
  ToggleButtonCircularProgressFillRotation,
} from "./toggle-button.parts.jsx";

/**
 * {@link Button} の各パーツに渡すプロパティーです。
 */
export type ToggleButtonSlotProps = {
  /**
   * {@link ToggleButtonContent} に渡すプロパティーです。
   */
  readonly content?: ToggleButtonContentProps | undefined;

  /**
   * {@link ToggleButtonPending} に渡すプロパティーです。
   */
  readonly pending?: ToggleButtonPendingProps | undefined;

  /**
   * {@link ToggleButtonCircularProgress} に渡すプロパティーです。
   */
  readonly circularProgress?: ToggleButtonCircularProgressProps | undefined;

  /**
   * {@link ToggleButtonCircularProgressTrack} に渡すプロパティーです。
   */
  readonly circularProgressTrack?: ToggleButtonCircularProgressTrackProps | undefined;

  /**
   * {@link ToggleButtonCircularProgressFill} に渡すプロパティーです。
   */
  readonly circularProgressFill?: ToggleButtonCircularProgressFillProps | undefined;

  /**
   * {@link ToggleButtonCircularProgressFillRotation} に渡すプロパティーです。
   */
  readonly circularProgressFillRotation?: ToggleButtonCircularProgressFillRotationProps | undefined;
};

/**
 * {@link ToggleButton} の状態です。
 */
export type ToggleButtonState = ToggleButtonRootState;

/**
 * {@link ToggleButton} コンポーネントのプロパティーです。
 */
export type ToggleButtonProps = Omit<ToggleButtonRootProps, "children"> &
  Pick<ToggleButtonContentProps, "children"> &
  Pick<ToggleButtonCircularProgressProps, "percentage" | "indeterminate"> & {
    /**
     * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
     *
     * 各パーツのプロパティーが優先されます。
     */
    slotProps?: ToggleButtonSlotProps | undefined;
  };

interface ToggleButtonType extends IComponent<ToggleButtonProps> {
  /**
   * {@link useToggleButtonContext} です。
   */
  readonly useContext: IUseContext<ToggleButtonContext>;
}

/**
 * トグルボタンを表示するコンポーネントです。
 */
export const ToggleButton: ToggleButtonType = /*#__PURE__*/ Object.assign(
  function SuiToggleButton(props: ToggleButtonProps) {
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
      <ToggleButtonRoot {...rootProps}>
        <ToggleButtonContent {...{ children, ...contentProps }} />
        <ToggleButtonPending {...otherPendingProps} overlay={overlay}>
          <ToggleButtonCircularProgress
            percentage={percentage}
            indeterminate={indeterminate}
            {...circularProgressProps}
          >
            <ToggleButtonCircularProgressTrack {...circularProgressTrackProps} />
            <ToggleButtonCircularProgressFill {...circularProgressFillProps}>
              <ToggleButtonCircularProgressFillRotation {...circularProgressFillRotationProps} />
            </ToggleButtonCircularProgressFill>
          </ToggleButtonCircularProgress>
        </ToggleButtonPending>
      </ToggleButtonRoot>
    );
  },
  {
    useContext: useToggleButtonContext,
  },
);

/**
 * {@link ToggleButton} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace ToggleButton {
  /**
   * {@link ToggleButtonState} です。
   */
  export type State = ToggleButtonState;

  /**
   * {@link ToggleButtonProps} です。
   */
  export type Props = ToggleButtonProps;

  /**
   * {@link ToggleButtonSlotProps} です。
   */
  export type SlotProps = ToggleButtonSlotProps;

  /**
   * {@link ToggleButtonContext} です。
   */
  export type Context = ToggleButtonContext;
}
