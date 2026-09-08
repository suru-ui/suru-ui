import type { IComponent } from "../types.js";
import {
  type SwitchRootSize,
  type SwitchRootColor,
  type SwitchRootProps,
  type SwitchRootState,
  type SwitchRootRadius,
  type SwitchThumbProps,
  type SwitchRootVariant,
  type SwitchRootChangeEventReason,
  type SwitchRootChangeEventDetails,
  SwitchRoot,
  SwitchThumb,
} from "./switch.parts.jsx";

// Types
// -----

/**
 * {@link SwitchRootChangeEventDetails}
 */
export type SwitchChangeEventDetails = SwitchRootChangeEventDetails;

/**
 * {@link SwitchRootChangeEventReason}
 */
export type SwitchChangeEventReason = SwitchRootChangeEventReason;

/**
 * {@link SwitchRootColor}
 */
export type SwitchColor = SwitchRootColor;

/**
 * {@link SwitchRootRadius}
 */
export type SwitchRadius = SwitchRootRadius;

/**
 * {@link SwitchRootSize}
 */
export type SwitchSize = SwitchRootSize;

/**
 * {@link SwitchRootVariant}
 */
export type SwitchVariant = SwitchRootVariant;

/**
 * {@link Switch} の各パーツに渡す props です。
 */
export type SwitchSlotProps = {
  /**
   * {@link SwitchThumb} に渡す props です。
   */
  readonly thumb?: SwitchThumbProps | undefined;
};

/**
 * {@link Switch} が持つ状態です。
 */
export type SwitchState = SwitchRootState;

/**
 * {@link Switch} に渡す props です。
 */
export type SwitchProps = Omit<SwitchRootProps, "children"> & {
  /**
   * 各パーツに個別の props を渡すためのオブジェクトです。
   */
  slotProps?: SwitchSlotProps | undefined;
};

// API
// ---

/**
 * {@link Switch} を構成する各パーツの props を作成するための API です。
 */
export interface SwitchAPI {
  /**
   * {@link SwitchRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<SwitchRootProps, "children">;

  /**
   * {@link SwitchThumb} に渡す props を取得します。
   */
  getThumbProps(): SwitchThumbProps;
}

interface IUseSwitchAPI {
  /**
   * {@link SwitchAPI} を作成します。
   *
   * @param props {@link Switch} の props です。
   * @returns スイッチの API です
   */
  (props: SwitchProps): SwitchAPI;
}

/**
 * {@link SwitchAPI} を作成するフックです。
 */
export const useSwitchAPI: IUseSwitchAPI = function useSuiSwitchAPI(props) {
  const { slotProps: { thumb: thumbProps = {} } = {}, ...otherRootProps } = props;

  return {
    getRootProps() {
      return otherRootProps;
    },
    getThumbProps() {
      return thumbProps;
    },
  };
};

export { type SwitchAPI as API, useSwitchAPI as useAPI };

// Component
// ---------

/**
 * スイッチを表示するコンポーネントです。
 */
export const Switch: IComponent<SwitchProps> = function SuiSwitch(props) {
  const api = useSwitchAPI(props);

  return (
    <SwitchRoot {...api.getRootProps()}>
      <SwitchThumb {...api.getThumbProps()} />
    </SwitchRoot>
  );
};

export namespace Switch {
  /**
   * {@link SwitchState}
   */
  export type State = SwitchState;

  /**
   * {@link SwitchProps}
   */
  export type Props = SwitchProps;

  /**
   * {@link SwitchSlotProps}
   */
  export type SlotProps = SwitchSlotProps;

  /**
   * {@link SwitchChangeEventDetails}
   */
  export type ChangeEventDetails = SwitchChangeEventDetails;

  /**
   * {@link SwitchChangeEventReason}
   */
  export type ChangeEventReason = SwitchChangeEventReason;

  /**
   * {@link SwitchColor}
   */
  export type Color = SwitchColor;

  /**
   * {@link SwitchRadius}
   */
  export type Radius = SwitchRadius;

  /**
   * {@link SwitchSize}
   */
  export type Size = SwitchSize;

  /**
   * {@link SwitchVariant}
   */
  export type Variant = SwitchVariant;
}
