import type { IComponent, IUseContext } from "../../types.js";
import {
  type ToggleButtonContext,
  type ToggleButtonRootSize,
  type ToggleButtonRootColor,
  type ToggleButtonRootProps,
  type ToggleButtonRootState,
  type ToggleButtonRootRadius,
  type ToggleButtonRootVariant,
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
 * {@link ToggleButtonRootColor} です。
 */
export type ToggleButtonColor = ToggleButtonRootColor;

/**
 * {@link ToggleButtonRootRadius} です。
 */
export type ToggleButtonRadius = ToggleButtonRootRadius;

/**
 * {@link ToggleButtonRootSize} です。
 */
export type ToggleButtonSize = ToggleButtonRootSize;

/**
 * {@link ToggleButtonRootVariant} です。
 */
export type ToggleButtonVariant = ToggleButtonRootVariant;

/**
 * {@link ToggleButton} の各パーツに渡すプロパティーです。
 */
export type ToggleButtonSlotProps = {
  /**
   * {@link ToggleButtonCircularProgress} に渡すプロパティーです。
   */
  readonly circularProgress?: ToggleButtonCircularProgressProps | undefined;

  /**
   * {@link ToggleButtonCircularProgressFill} に渡すプロパティーです。
   */
  readonly circularProgressFill?: ToggleButtonCircularProgressFillProps | undefined;

  /**
   * {@link ToggleButtonCircularProgressFillRotation} に渡すプロパティーです。
   */
  readonly circularProgressFillRotation?: ToggleButtonCircularProgressFillRotationProps | undefined;

  /**
   * {@link ToggleButtonCircularProgressTrack} に渡すプロパティーです。
   */
  readonly circularProgressTrack?: ToggleButtonCircularProgressTrackProps | undefined;

  /**
   * {@link ToggleButtonContent} に渡すプロパティーです。
   */
  readonly content?: ToggleButtonContentProps | undefined;

  /**
   * {@link ToggleButtonPending} に渡すプロパティーです。
   */
  readonly pending?: ToggleButtonPendingProps | undefined;
};

/**
 * {@link ToggleButton} の各パーツに渡すプロパティーです。
 */
export type ToggleButtonPartsProps = {
  /**
   * {@link ToggleButtonRoot} に渡すプロパティーです。
   */
  readonly root: ToggleButtonRootProps;

  /**
   * {@link ToggleButtonContent} に渡すプロパティーです。
   *
   * `children` にはボタンの内容が設定されています。
   */
  readonly content: ToggleButtonContentProps;

  /**
   * {@link ToggleButtonPending} に渡すプロパティーです。
   */
  readonly pending: ToggleButtonPendingProps;

  /**
   * {@link ToggleButtonCircularProgress} に渡すプロパティーです。
   */
  readonly circularProgress: ToggleButtonCircularProgressProps;

  /**
   * {@link ToggleButtonCircularProgressTrack} に渡すプロパティーです。
   */
  readonly circularProgressTrack: ToggleButtonCircularProgressTrackProps | undefined;

  /**
   * {@link ToggleButtonCircularProgressFill} に渡すプロパティーです。
   */
  readonly circularProgressFill: ToggleButtonCircularProgressFillProps | undefined;

  /**
   * {@link ToggleButtonCircularProgressFillRotation} に渡すプロパティーです。
   */
  readonly circularProgressFillRotation: ToggleButtonCircularProgressFillRotationProps | undefined;
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
 * {@link ToggleButton} の各パーツに渡すプロパティーを作るフックです。
 */
export function useToggleButton(props: ToggleButtonProps): ToggleButtonPartsProps {
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

  return {
    root: rootProps,
    content: {
      children,
      ...contentProps,
    },
    pending: {
      ...otherPendingProps,
      overlay,
    },
    circularProgress: {
      percentage,
      indeterminate,
      ...circularProgressProps,
    },
    circularProgressTrack: circularProgressTrackProps,
    circularProgressFill: circularProgressFillProps,
    circularProgressFillRotation: circularProgressFillRotationProps,
  };
}

/**
 * トグルボタンを表示するコンポーネントです。
 */
export const ToggleButton: ToggleButtonType = /*#__PURE__*/ Object.assign(
  function SuiToggleButton(props: ToggleButtonProps) {
    const partsProps = useToggleButton(props);

    return (
      <ToggleButtonRoot {...partsProps.root}>
        <ToggleButtonContent {...partsProps.content} />
        <ToggleButtonPending {...partsProps.pending}>
          <ToggleButtonCircularProgress {...partsProps.circularProgress}>
            <ToggleButtonCircularProgressTrack {...partsProps.circularProgressTrack} />
            <ToggleButtonCircularProgressFill {...partsProps.circularProgressFill}>
              <ToggleButtonCircularProgressFillRotation
                {...partsProps.circularProgressFillRotation}
              />
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
   * {@link ToggleButtonContext} です。
   */
  export type Context = ToggleButtonContext;

  /**
   * {@link ToggleButtonSlotProps} です。
   */
  export type SlotProps = ToggleButtonSlotProps;

  /**
   * {@link ToggleButtonColor} です。
   */
  export type Color = ToggleButtonColor;

  /**
   * {@link ToggleButtonRadius} です。
   */
  export type Radius = ToggleButtonRadius;

  /**
   * {@link ToggleButtonSize} です。
   */
  export type Size = ToggleButtonSize;

  /**
   * {@link ToggleButtonVariant} です。
   */
  export type Variant = ToggleButtonVariant;
}
