import type { IComponent } from "../types.js";
import {
  type ButtonContext,
  type ButtonRootSize,
  type ButtonRootColor,
  type ButtonRootProps,
  type ButtonRootState,
  type ButtonRootRadius,
  type ButtonRootVariant,
  type IUseButtonContext,
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
} from "./button.parts.js";

// Types
// -----

export type ButtonColor = ButtonRootColor;

export type ButtonRadius = ButtonRootRadius;

export type ButtonSize = ButtonRootSize;

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

namespace ButtonProps {
  export type Button = {
    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: ButtonSlotProps | undefined;
  };

  export type CircularProgress = Pick<ButtonCircularProgressProps, "indeterminate" | "percentage">;

  export type Content = Pick<ButtonContentProps, "children">;

  export type Root = Omit<ButtonRootProps, keyof Button | keyof Content | keyof CircularProgress>;
}

/**
 * {@link Button} に渡す props です。
 */
export type ButtonProps = ButtonProps.Button &
  ButtonProps.Root &
  ButtonProps.Content &
  ButtonProps.CircularProgress;

// API
// ---

/**
 * {@link Button} を構成する各パーツの props などを作成するための API です。
 */
export class ButtonAPI {
  private readonly contentProps: Required<ButtonProps.Content>;

  private readonly circularProgressProps: Required<ButtonProps.CircularProgress>;

  private readonly slotProps: ButtonSlotProps;

  private readonly rootProps: ButtonProps.Root;

  /**
   * @param props {@link Button} の props です。
   * @internal
   */
  public constructor(props: ButtonProps) {
    const { children, slotProps = {}, percentage, indeterminate, ...rootProps } = props;
    this.contentProps = { children };
    this.circularProgressProps = { percentage, indeterminate };
    this.slotProps = slotProps;
    this.rootProps = rootProps;
  }

  /**
   * {@link ButtonCircularProgressFill} に渡す props を取得します。
   */
  public getCircularProgressFillProps(): Omit<ButtonCircularProgressFillProps, "children"> {
    const { circularProgressFill: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link ButtonCircularProgressFillRotation} に渡す props を取得します。
   */
  public getCircularProgressFillRotationProps(): ButtonCircularProgressFillRotationProps {
    const { circularProgressFillRotation: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link ButtonCircularProgress} に渡す props を取得します。
   */
  public getCircularProgressProps(): Omit<ButtonCircularProgressProps, "children"> {
    const { circularProgress: props = {} } = this.slotProps;

    return {
      ...props,
      ...this.circularProgressProps,
    };
  }

  /**
   * {@link ButtonCircularProgressTrack} に渡す props を取得します。
   */
  public getCircularProgressTrackProps(): Omit<ButtonCircularProgressTrackProps, "children"> {
    const { circularProgressTrack: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link ButtonContent} に渡す props を取得します。
   */
  public getContentProps(): ButtonContentProps {
    const { content: props = {} } = this.slotProps;

    return {
      ...props,
      ...this.contentProps,
    };
  }

  /**
   * {@link ButtonPending} に渡す props を取得します。
   */
  public getPendingProps(): Omit<ButtonPendingProps, "children"> {
    const { pending: { overlay = true, ...props } = {} } = this.slotProps;

    return {
      ...props,
      overlay,
    };
  }

  /**
   * {@link ButtonRoot} に渡す props を取得します。
   */
  public getRootProps(): Omit<ButtonRootProps, "children"> {
    return this.rootProps;
  }
}

export interface IUseButtonAPI {
  /**
   * {@link ButtonAPI} を作成します。
   *
   * @param props {@link Button} の props です。
   * @returns ボタンの API です。
   */
  (props: ButtonProps): ButtonAPI;
}

/**
 * {@link ButtonAPI} を作成するフックです。
 */
export const useButtonAPI: IUseButtonAPI = function useSuiButtonAPI(props) {
  return new ButtonAPI(props);
};

export { ButtonAPI as API, useButtonAPI as useAPI };

// Component
// ---------

export interface IButton extends IComponent<ButtonProps> {
  readonly useContext: IUseButtonContext;
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
  export type State = ButtonState;

  export type Props = ButtonProps;

  export type SlotProps = ButtonSlotProps;

  export type Context = ButtonContext;

  export type Color = ButtonColor;

  export type Radius = ButtonRadius;

  export type Size = ButtonSize;

  export type Variant = ButtonVariant;
}
