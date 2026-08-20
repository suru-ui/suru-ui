import type { IComponent, IUseContext } from "../../types.js";
import {
  type ButtonContext,
  type ButtonRootSize,
  type ButtonRootColor,
  type ButtonRootProps,
  type ButtonRootState,
  type ButtonRootRadius,
  type ButtonRootVariant,
  type ButtonContentProps,
  type ButtonPendingProps,
  type ButtonCircularProgressProps,
  type ButtonCircularProgressFillProps,
  type ButtonCircularProgressTrackProps,
  type ButtonCircularProgressFillRotationProps,
  ButtonRoot,
  ButtonContent,
  ButtonPending,
  useButtonContext,
  ButtonCircularProgress,
  ButtonCircularProgressFill,
  ButtonCircularProgressTrack,
  ButtonCircularProgressFillRotation,
} from "./button.parts.jsx";

/**
 * {@link ButtonRootColor} です。
 */
export type ButtonColor = ButtonRootColor;

/**
 * {@link ButtonRootRadius} です。
 */
export type ButtonRadius = ButtonRootRadius;

/**
 * {@link ButtonRootSize} です。
 */
export type ButtonSize = ButtonRootSize;

/**
 * {@link ButtonRootVariant} です。
 */
export type ButtonVariant = ButtonRootVariant;

/**
 * {@link Button} の各パーツに渡すプロパティーです。
 */
export type ButtonSlotProps = {
  /**
   * {@link ButtonCircularProgress} に渡すプロパティーです。
   */
  readonly circularProgress?: ButtonCircularProgressProps | undefined;

  /**
   * {@link ButtonCircularProgressFill} に渡すプロパティーです。
   */
  readonly circularProgressFill?: ButtonCircularProgressFillProps | undefined;

  /**
   * {@link ButtonCircularProgressFillRotation} に渡すプロパティーです。
   */
  readonly circularProgressFillRotation?: ButtonCircularProgressFillRotationProps | undefined;

  /**
   * {@link ButtonCircularProgressTrack} に渡すプロパティーです。
   */
  readonly circularProgressTrack?: ButtonCircularProgressTrackProps | undefined;

  /**
   * {@link ButtonContent} に渡すプロパティーです。
   */
  readonly content?: ButtonContentProps | undefined;

  /**
   * {@link ButtonPending} に渡すプロパティーです。
   */
  readonly pending?: ButtonPendingProps | undefined;
};

/**
 * {@link Button} の状態です。
 */
export type ButtonState = ButtonRootState;

/**
 * {@link Button} コンポーネントのプロパティーです。
 */
export type ButtonProps = Omit<ButtonRootProps, "children"> &
  Pick<ButtonContentProps, "children"> &
  Pick<ButtonCircularProgressProps, "percentage" | "indeterminate"> & {
    /**
     * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
     *
     * 各パーツのプロパティーが優先されます。
     */
    slotProps?: ButtonSlotProps | undefined;
  };

interface ButtonType extends IComponent<ButtonProps> {
  /**
   * {@link useButtonContext} です。
   */
  readonly useContext: IUseContext<ButtonContext>;
}

/**
 * ボタンを表示するコンポーネントです。
 */
export const Button: ButtonType = /*#__PURE__*/ Object.assign(
  function SuiButton(props: ButtonProps) {
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
      <ButtonRoot {...rootProps}>
        <ButtonContent children={children} {...contentProps} />
        <ButtonPending {...otherPendingProps} overlay={overlay}>
          <ButtonCircularProgress
            percentage={percentage}
            indeterminate={indeterminate}
            {...circularProgressProps}
          >
            <ButtonCircularProgressTrack {...circularProgressTrackProps} />
            <ButtonCircularProgressFill {...circularProgressFillProps}>
              <ButtonCircularProgressFillRotation {...circularProgressFillRotationProps} />
            </ButtonCircularProgressFill>
          </ButtonCircularProgress>
        </ButtonPending>
      </ButtonRoot>
    );
  },
  {
    useContext: useButtonContext,
  },
);

/**
 * {@link Button} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Button {
  /**
   * {@link ButtonState} です。
   */
  export type State = ButtonState;

  /**
   * {@link ButtonProps} です。
   */
  export type Props = ButtonProps;

  /**
   * {@link ButtonContext} です。
   */
  export type Context = ButtonContext;

  /**
   * {@link ButtonSlotProps} です。
   */
  export type SlotProps = ButtonSlotProps;

  /**
   * {@link ButtonColor} です。
   */
  export type Color = ButtonColor;

  /**
   * {@link ButtonRadius} です。
   */
  export type Radius = ButtonRadius;

  /**
   * {@link ButtonSize} です。
   */
  export type Size = ButtonSize;

  /**
   * {@link ButtonVariant} です。
   */
  export type Variant = ButtonVariant;
}
