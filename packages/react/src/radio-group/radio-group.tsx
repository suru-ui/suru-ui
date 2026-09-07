import type { IComponent, IUseContext } from "../types.js";
import {
  type RadioGroupContext,
  type RadioGroupRootSize,
  type RadioGroupRootColor,
  type RadioGroupRootProps,
  type RadioGroupRootState,
  type RadioGroupRootRadius,
  type RadioGroupRootVariant,
  type RadioGroupRootOrientation,
  type RadioGroupRootChangeEventReason,
  type RadioGroupRootChangeEventDetails,
  RadioGroupRoot,
  useRadioGroupContext,
} from "./radio-group.parts.jsx";

// Types
// -----

/**
 * {@link RadioGroupRootChangeEventDetails}
 */
export type RadioGroupChangeEventDetails = RadioGroupRootChangeEventDetails;

/**
 * {@link RadioGroupRootChangeEventReason}
 */
export type RadioGroupChangeEventReason = RadioGroupRootChangeEventReason;

/**
 * {@link RadioGroupRootColor}
 */
export type RadioGroupColor = RadioGroupRootColor;

/**
 * {@link RadioGroupRootOrientation}
 */
export type RadioGroupOrientation = RadioGroupRootOrientation;

/**
 * {@link RadioGroupRootRadius}
 */
export type RadioGroupRadius = RadioGroupRootRadius;

/**
 * {@link RadioGroupRootSize}
 */
export type RadioGroupSize = RadioGroupRootSize;

/**
 * {@link RadioGroupRootVariant}
 */
export type RadioGroupVariant = RadioGroupRootVariant;

/**
 * {@link RadioGroup} が持つ状態です。
 */
export type RadioGroupState = RadioGroupRootState;

/**
 * {@link RadioGroup} に渡す props です。
 */
export type RadioGroupProps = RadioGroupRootProps;

// API
// ---

/**
 * {@link RadioGroup} を構成する各パーツの props を作成するための API です。
 */
export interface RadioGroupAPI {
  /**
   * {@link RadioGroupRoot} に渡す props を取得します。
   */
  getRootProps(): RadioGroupRootProps;
}

interface IUseRadioGroupAPI {
  /**
   * {@link RadioGroupAPI} を作成します。
   *
   * @param props {@link RadioGroup} の props です。
   * @returns ラジオボタングループの API です
   */
  (props: RadioGroupProps): RadioGroupAPI;
}

/**
 * {@link RadioGroupAPI} を作成するフックです。
 */
export const useRadioGroupAPI: IUseRadioGroupAPI = function useSuiRadioGroupAPI(props) {
  return {
    getRootProps() {
      return props;
    },
  };
};

export { type RadioGroupAPI as API, useRadioGroupAPI as useAPI };

// Component
// ---------

interface IRadioGroup extends IComponent<RadioGroupProps> {
  /**
   * {@link useRadioGroupContext}
   */
  readonly useContext: IUseContext<RadioGroupContext>;
}

/**
 * ラジオボタンをグループ化するコンポーネントです。
 */
export const RadioGroup: IRadioGroup = /*#__PURE__*/ Object.assign(
  function SuiRadioGroup(props: RadioGroupProps) {
    const api = useRadioGroupAPI(props);

    return <RadioGroupRoot {...api.getRootProps()} />;
  },
  {
    useContext: useRadioGroupContext,
  },
);

export namespace RadioGroup {
  /**
   * {@link RadioGroupState}
   */
  export type State = RadioGroupState;

  /**
   * {@link RadioGroupProps}
   */
  export type Props = RadioGroupProps;

  /**
   * {@link RadioGroupContext}
   */
  export type Context = RadioGroupContext;

  /**
   * {@link RadioGroupChangeEventDetails}
   */
  export type ChangeEventDetails = RadioGroupChangeEventDetails;

  /**
   * {@link RadioGroupChangeEventReason}
   */
  export type ChangeEventReason = RadioGroupChangeEventReason;

  /**
   * {@link RadioGroupColor}
   */
  export type Color = RadioGroupColor;

  /**
   * {@link RadioGroupOrientation}
   */
  export type Orientation = RadioGroupOrientation;

  /**
   * {@link RadioGroupRadius}
   */
  export type Radius = RadioGroupRadius;

  /**
   * {@link RadioGroupSize}
   */
  export type Size = RadioGroupSize;

  /**
   * {@link RadioGroupVariant}
   */
  export type Variant = RadioGroupVariant;
}
