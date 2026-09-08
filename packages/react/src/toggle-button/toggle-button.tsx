import type { IComponent, IUseContext } from "../types.js";
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
} from "./toggle-button.parts.jsx";

// Types
// -----

/**
 * {@link ToggleButtonRootChangeEventDetails}
 */
export type ToggleButtonChangeEventDetails = ToggleButtonRootChangeEventDetails;

/**
 * {@link ToggleButtonRootChangeEventReason}
 */
export type ToggleButtonChangeEventReason = ToggleButtonRootChangeEventReason;

/**
 * {@link ToggleButtonRootColor}
 */
export type ToggleButtonColor = ToggleButtonRootColor;

/**
 * {@link ToggleButtonRootRadius}
 */
export type ToggleButtonRadius = ToggleButtonRootRadius;

/**
 * {@link ToggleButtonRootSize}
 */
export type ToggleButtonSize = ToggleButtonRootSize;

/**
 * {@link ToggleButtonRootVariant}
 */
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

/**
 * {@link ToggleButton} に渡す props です。
 */
export type ToggleButtonProps = Omit<ToggleButtonRootProps, "children"> &
  Pick<ToggleButtonContentProps, "children"> &
  Pick<ToggleButtonCircularProgressProps, "percentage" | "indeterminate"> & {
    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: ToggleButtonSlotProps | undefined;
  };

// API
// ---

/**
 * {@link ToggleButton} を構成する各パーツの props などを作成するための API です。
 */
export interface ToggleButtonAPI {
  /**
   * {@link ToggleButtonCircularProgress} に渡す props を取得します。
   */
  getCircularProgressProps(): Omit<ToggleButtonCircularProgressProps, "children">;

  /**
   * {@link ToggleButtonCircularProgressFill} に渡す props を取得します。
   */
  getCircularProgressFillProps(): Omit<ToggleButtonCircularProgressFillProps, "children">;

  /**
   * {@link ToggleButtonCircularProgressFillRotation} に渡す props を取得します。
   */
  getCircularProgressFillRotationProps(): ToggleButtonCircularProgressFillRotationProps;

  /**
   * {@link ToggleButtonCircularProgressTrack} に渡す props を取得します。
   */
  getCircularProgressTrackProps(): Omit<ToggleButtonCircularProgressTrackProps, "children">;

  /**
   * {@link ToggleButtonContent} に渡す props を取得します。
   */
  getContentProps(): ToggleButtonContentProps;

  /**
   * {@link ToggleButtonPending} に渡す props を取得します。
   */
  getPendingProps(): Omit<ToggleButtonPendingProps, "children">;

  /**
   * {@link ToggleButtonRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<ToggleButtonRootProps, "children">;
}

interface IUseToggleButtonAPI {
  /**
   * {@link ToggleButtonAPI} を作成します。
   *
   * @param props {@link ToggleButton} の props です。
   * @returns トグルボタンの API です
   */
  (props: ToggleButtonProps): ToggleButtonAPI;
}

/**
 * {@link ToggleButtonAPI} を作成するフックです。
 */
export const useToggleButtonAPI: IUseToggleButtonAPI = function useSuiToggleButtonAPI(props) {
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

export { type ToggleButtonAPI as API, useToggleButtonAPI as useAPI };

// Component
// ---------

interface IToggleButton extends IComponent<ToggleButtonProps> {
  /**
   * {@link useToggleButtonContext}
   */
  readonly useContext: IUseContext<ToggleButtonContext>;
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
  /**
   * {@link ToggleButtonState}
   */
  export type State = ToggleButtonState;

  /**
   * {@link ToggleButtonProps}
   */
  export type Props = ToggleButtonProps;

  /**
   * {@link ToggleButtonSlotProps}
   */
  export type SlotProps = ToggleButtonSlotProps;

  /**
   * {@link ToggleButtonContext}
   */
  export type Context = ToggleButtonContext;

  /**
   * {@link ToggleButtonChangeEventDetails}
   */
  export type ChangeEventDetails = ToggleButtonChangeEventDetails;

  /**
   * {@link ToggleButtonChangeEventReason}
   */
  export type ChangeEventReason = ToggleButtonChangeEventReason;

  /**
   * {@link ToggleButtonColor}
   */
  export type Color = ToggleButtonColor;

  /**
   * {@link ToggleButtonRadius}
   */
  export type Radius = ToggleButtonRadius;

  /**
   * {@link ToggleButtonSize}
   */
  export type Size = ToggleButtonSize;

  /**
   * {@link ToggleButtonVariant}
   */
  export type Variant = ToggleButtonVariant;
}
