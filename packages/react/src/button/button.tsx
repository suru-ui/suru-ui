import type { IComponent, IUseContext } from "../types.js";
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

// Types
// -----

/**
 * {@link ButtonRootColor}
 */
export type ButtonColor = ButtonRootColor;

/**
 * {@link ButtonRootRadius}
 */
export type ButtonRadius = ButtonRootRadius;

/**
 * {@link ButtonRootSize}
 */
export type ButtonSize = ButtonRootSize;

/**
 * {@link ButtonRootVariant}
 */
export type ButtonVariant = ButtonRootVariant;

/**
 * {@link Button} の各パーツに渡す props です。
 */
export type ButtonSlotProps = {
  /**
   * {@link ButtonCircularProgress} に渡す props です。
   */
  readonly circularProgress?:
    | Omit<ButtonCircularProgressProps, "children" | "percentage" | "indeterminate">
    | undefined;

  /**
   * {@link ButtonCircularProgressFill} に渡す props です。
   */
  readonly circularProgressFill?: Omit<ButtonCircularProgressFillProps, "children"> | undefined;

  /**
   * {@link ButtonCircularProgressFillRotation} に渡す props です。
   */
  readonly circularProgressFillRotation?: ButtonCircularProgressFillRotationProps | undefined;

  /**
   * {@link ButtonCircularProgressTrack} に渡す props です。
   */
  readonly circularProgressTrack?: Omit<ButtonCircularProgressTrackProps, "children"> | undefined;

  /**
   * {@link ButtonContent} に渡す props です。
   */
  readonly content?: Omit<ButtonContentProps, "children"> | undefined;

  /**
   * {@link ButtonPending} に渡す props です。
   */
  readonly pending?: Omit<ButtonPendingProps, "children"> | undefined;
};

/**
 * {@link Button} が持つ状態です。
 */
export type ButtonState = ButtonRootState;

/**
 * {@link Button} に渡す props です。
 */
export type ButtonProps = Omit<ButtonRootProps, "children"> &
  Pick<ButtonContentProps, "children"> &
  Pick<ButtonCircularProgressProps, "percentage" | "indeterminate"> & {
    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     *
     * 各パーツの props が優先されます。
     */
    slotProps?: ButtonSlotProps | undefined;
  };

// API
// ---

/**
 * {@link Button} を構成する各パーツの props などを作成するための API です。
 */
export interface ButtonAPI {
  /**
   * {@link ButtonCircularProgressFill} に渡す props を取得します。
   */
  getCircularProgressFillProps(): Omit<ButtonCircularProgressFillProps, "children">;

  /**
   * {@link ButtonCircularProgressFillRotation} に渡す props を取得します。
   */
  getCircularProgressFillRotationProps(): ButtonCircularProgressFillRotationProps;

  /**
   * {@link ButtonCircularProgress} に渡す props を取得します。
   */
  getCircularProgressProps(): Omit<ButtonCircularProgressProps, "children">;

  /**
   * {@link ButtonCircularProgressTrack} に渡す props を取得します。
   */
  getCircularProgressTrackProps(): Omit<ButtonCircularProgressTrackProps, "children">;

  /**
   * {@link ButtonContent} に渡す props を取得します。
   */
  getContentProps(): ButtonContentProps;

  /**
   * {@link ButtonPending} に渡す props を取得します。
   */
  getPendingProps(): Omit<ButtonPendingProps, "children">;

  /**
   * {@link ButtonRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<ButtonRootProps, "children">;
}

interface IUseButtonAPI {
  /**
   * {@link ButtonAPI} を作成します。
   *
   * @param props {@link Button} の props です。
   * @returns ボタンの API です
   */
  (props: ButtonProps): ButtonAPI;
}

/**
 * {@link ButtonAPI} を作成するフックです。
 */
export const useButtonAPI: IUseButtonAPI = function useSuiButtonAPI(props) {
  const {
    children,
    slotProps: {
      content: contentProps = {},
      pending: { overlay = true, ...otherPendingProps } = {},
      circularProgress: circularProgressProps = {},
      circularProgressFill: circularProgressFillProps = {},
      circularProgressTrack: circularProgressTrackProps = {},
      circularProgressFillRotation: circularProgressFillRotationProps = {},
    } = {},
    percentage,
    indeterminate,
    ...otherRootProps
  } = props;

  return {
    getRootProps() {
      return otherRootProps;
    },
    getContentProps() {
      return {
        ...contentProps,
        children,
      };
    },
    getPendingProps() {
      return {
        ...otherPendingProps,
        overlay,
      };
    },
    getCircularProgressProps() {
      return {
        percentage,
        indeterminate,
        ...circularProgressProps,
      };
    },
    getCircularProgressFillProps() {
      return circularProgressFillProps;
    },
    getCircularProgressTrackProps() {
      return circularProgressTrackProps;
    },
    getCircularProgressFillRotationProps() {
      return circularProgressFillRotationProps;
    },
  };
};

export { type ButtonAPI as API, useButtonAPI as useAPI };

// Component
// ---------

interface IButton extends IComponent<ButtonProps> {
  /**
   * {@link useButtonContext}
   */
  readonly useContext: IUseContext<ButtonContext>;
}

/**
 * 複数の主な外観と状態を持つクリック可能なボタンコンポーネントです。
 */
export const Button: IButton = /*#__PURE__*/ Object.assign(
  function SuiButton(props: ButtonProps) {
    const api = useButtonAPI(props);

    return (
      <ButtonRoot {...api.getRootProps()}>
        <ButtonContent {...api.getContentProps()} />
        <ButtonPending {...api.getPendingProps()}>
          <ButtonCircularProgress {...api.getCircularProgressProps()}>
            <ButtonCircularProgressTrack {...api.getCircularProgressTrackProps()} />
            <ButtonCircularProgressFill {...api.getCircularProgressFillProps()}>
              <ButtonCircularProgressFillRotation {...api.getCircularProgressFillRotationProps()} />
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

export namespace Button {
  /**
   * {@link ButtonState}
   */
  export type State = ButtonState;

  /**
   * {@link ButtonProps}
   */
  export type Props = ButtonProps;

  /**
   * {@link ButtonSlotProps}
   */
  export type SlotProps = ButtonSlotProps;

  /**
   * {@link ButtonContext}
   */
  export type Context = ButtonContext;

  /**
   * {@link ButtonColor}
   */
  export type Color = ButtonColor;

  /**
   * {@link ButtonRadius}
   */
  export type Radius = ButtonRadius;

  /**
   * {@link ButtonSize}
   */
  export type Size = ButtonSize;

  /**
   * {@link ButtonVariant}
   */
  export type Variant = ButtonVariant;
}
