import type { IComponent } from "../types.js";
import {
  type ToggleButtonContext,
  type ToggleButtonRootSize,
  type ToggleButtonRootColor,
  type ToggleButtonRootProps,
  type ToggleButtonRootState,
  type ToggleButtonRootRadius,
  type IUseToggleButtonContext,
  type ToggleButtonRootVariant,
  type ToggleButtonContentProps,
  type ToggleButtonPendingProps,
  type ToggleButtonCircularProgressProps,
  type ToggleButtonRootChangeEventReason,
  type ToggleButtonRootChangeEventDetails,
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
} from "./toggle-button.parts.js";

// Types
// -----

export type ToggleButtonChangeEventDetails = ToggleButtonRootChangeEventDetails;

export type ToggleButtonChangeEventReason = ToggleButtonRootChangeEventReason;

export type ToggleButtonColor = ToggleButtonRootColor;

export type ToggleButtonRadius = ToggleButtonRootRadius;

export type ToggleButtonSize = ToggleButtonRootSize;

export type ToggleButtonVariant = ToggleButtonRootVariant;

/**
 * {@link ToggleButton} の各パーツに渡す props です。
 */
export type ToggleButtonSlotProps = {
  /**
   * {@link ToggleButtonCircularProgress} に渡す props です。
   */
  readonly circularProgress?:
    | Omit<ToggleButtonCircularProgressProps, "children" | "percentage" | "indeterminate">
    | undefined;

  /**
   * {@link ToggleButtonCircularProgressFill} に渡す props です。
   */
  readonly circularProgressFill?:
    | Omit<ToggleButtonCircularProgressFillProps, "children">
    | undefined;

  /**
   * {@link ToggleButtonCircularProgressFillRotation} に渡す props です。
   */
  readonly circularProgressFillRotation?: ToggleButtonCircularProgressFillRotationProps | undefined;

  /**
   * {@link ToggleButtonCircularProgressTrack} に渡す props です。
   */
  readonly circularProgressTrack?:
    | Omit<ToggleButtonCircularProgressTrackProps, "children">
    | undefined;

  /**
   * {@link ToggleButtonContent} に渡す props です。
   */
  readonly content?: Omit<ToggleButtonContentProps, "children"> | undefined;

  /**
   * {@link ToggleButtonPending} に渡す props です。
   */
  readonly pending?: Omit<ToggleButtonPendingProps, "children"> | undefined;
};

/**
 * {@link ToggleButton} が持つ状態です。
 */
export type ToggleButtonState = ToggleButtonRootState;

namespace ToggleButtonProps {
  export type Root = Omit<ToggleButtonRootProps, keyof ToggleButton>;

  export type ToggleButton = {
    /**
     * トグルボタンの内容です。
     */
    children?: ToggleButtonContentProps["children"] | undefined;

    /**
     * 不定モードで円形プログレスバーを表示するかどうかを指定します。
     *
     * 省略時は `percentage` が未定義または負の値のとき `true` になります。
     */
    indeterminate?: ToggleButtonCircularProgressProps["indeterminate"] | undefined;

    /**
     * 進行状況をパーセンテージ（0〜100）で指定します。
     *
     * 未定義または負の値の場合は不定モードになります。
     */
    percentage?: ToggleButtonCircularProgressProps["percentage"] | undefined;

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: ToggleButtonSlotProps | undefined;
  };
}

/**
 * {@link ToggleButton} に渡す props です。
 */
export type ToggleButtonProps = ToggleButtonProps.ToggleButton & ToggleButtonProps.Root;

export interface IUseToggleButtonAPI {
  /**
   * {@link ToggleButtonAPI} を作成します。
   *
   * @param props {@link ToggleButton} の props です。
   * @returns トグルボタンの API です。
   */
  (props: ToggleButtonProps): ToggleButtonAPI;
}

// API
// ---

/**
 * {@link ToggleButton} を構成する各パーツの props などを作成するための API です。
 */
export class ToggleButtonAPI {
  private readonly toggleButtonProps: Required<Omit<ToggleButtonProps.ToggleButton, "slotProps">>;

  private readonly slotProps: ToggleButtonSlotProps;

  private readonly rootProps: ToggleButtonProps.Root;

  /**
   * @param props {@link ToggleButton} の props です。
   * @internal
   */
  public constructor(props: ToggleButtonProps) {
    const { children, slotProps = {}, percentage, indeterminate, ...rootProps } = props;
    this.toggleButtonProps = { children, percentage, indeterminate };
    this.slotProps = slotProps;
    this.rootProps = rootProps;
  }

  /**
   * {@link ToggleButtonCircularProgressFill} に渡す props を取得します。
   */
  public getCircularProgressFillProps(): Omit<ToggleButtonCircularProgressFillProps, "children"> {
    const { circularProgressFill: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link ToggleButtonCircularProgressFillRotation} に渡す props を取得します。
   */
  public getCircularProgressFillRotationProps(): ToggleButtonCircularProgressFillRotationProps {
    const { circularProgressFillRotation: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link ToggleButtonCircularProgress} に渡す props を取得します。
   */
  public getCircularProgressProps(): Omit<ToggleButtonCircularProgressProps, "children"> {
    const { percentage, indeterminate } = this.toggleButtonProps;
    const { circularProgress: props = {} } = this.slotProps;

    return {
      ...props,
      percentage,
      indeterminate,
    };
  }

  /**
   * {@link ToggleButtonCircularProgressTrack} に渡す props を取得します。
   */
  public getCircularProgressTrackProps(): Omit<ToggleButtonCircularProgressTrackProps, "children"> {
    const { circularProgressTrack: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link ToggleButtonContent} に渡す props を取得します。
   */
  public getContentProps(): ToggleButtonContentProps {
    const { children } = this.toggleButtonProps;
    const { content: props = {} } = this.slotProps;

    return {
      ...props,
      children,
    };
  }

  /**
   * {@link ToggleButtonPending} に渡す props を取得します。
   */
  public getPendingProps(): Omit<ToggleButtonPendingProps, "children"> {
    const { pending: { overlay = true, ...props } = {} } = this.slotProps;

    return {
      ...props,
      overlay,
    };
  }

  /**
   * {@link ToggleButtonRoot} に渡す props を取得します。
   */
  public getRootProps(): Omit<ToggleButtonRootProps, "children"> {
    return this.rootProps;
  }
}

/**
 * {@link ToggleButtonAPI} を作成するフックです。
 */
export const useToggleButtonAPI: IUseToggleButtonAPI = function useSuiToggleButtonAPI(props) {
  return new ToggleButtonAPI(props);
};

export { ToggleButtonAPI as API, useToggleButtonAPI as useAPI };

// Component
// ---------

export interface IToggleButton extends IComponent<ToggleButtonProps> {
  readonly useContext: IUseToggleButtonContext;
}

/**
 * 押すたびに押下状態を切り替えるボタンコンポーネントです。
 */
export const ToggleButton: IToggleButton = /*#__PURE__*/ Object.assign(
  function SuiToggleButton(props: ToggleButtonProps) {
    const api = useToggleButtonAPI(props);

    return (
      <ToggleButtonRoot {...api.getRootProps()}>
        <ToggleButtonContent {...api.getContentProps()} />
        <ToggleButtonPending {...api.getPendingProps()}>
          <ToggleButtonCircularProgress {...api.getCircularProgressProps()}>
            <ToggleButtonCircularProgressTrack {...api.getCircularProgressTrackProps()} />
            <ToggleButtonCircularProgressFill {...api.getCircularProgressFillProps()}>
              <ToggleButtonCircularProgressFillRotation
                {...api.getCircularProgressFillRotationProps()}
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

export namespace ToggleButton {
  export type State = ToggleButtonState;

  export type Props = ToggleButtonProps;

  export type SlotProps = ToggleButtonSlotProps;

  export type Context = ToggleButtonContext;

  export type ChangeEventDetails = ToggleButtonChangeEventDetails;

  export type ChangeEventReason = ToggleButtonChangeEventReason;

  export type Color = ToggleButtonColor;

  export type Radius = ToggleButtonRadius;

  export type Size = ToggleButtonSize;

  export type Variant = ToggleButtonVariant;
}
