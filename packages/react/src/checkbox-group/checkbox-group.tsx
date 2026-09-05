import type { IComponent, IUseContext } from "../types.js";
import {
  type CheckboxGroupContext,
  type CheckboxGroupRootSize,
  type CheckboxGroupRootColor,
  type CheckboxGroupRootProps,
  type CheckboxGroupRootState,
  type CheckboxGroupRootRadius,
  type CheckboxGroupRootVariant,
  type CheckboxGroupRootOrientation,
  type CheckboxGroupRootChangeEventReason,
  type CheckboxGroupRootChangeEventDetails,
  CheckboxGroupRoot,
  useCheckboxGroupContext,
} from "./checkbox-group.parts.jsx";

// Types
// -----

/**
 * {@link CheckboxGroupRootChangeEventDetails}
 */
export type CheckboxGroupChangeEventDetails = CheckboxGroupRootChangeEventDetails;

/**
 * {@link CheckboxGroupRootChangeEventReason}
 */
export type CheckboxGroupChangeEventReason = CheckboxGroupRootChangeEventReason;

/**
 * {@link CheckboxGroupRootColor}
 */
export type CheckboxGroupColor = CheckboxGroupRootColor;

/**
 * {@link CheckboxGroupRootOrientation}
 */
export type CheckboxGroupOrientation = CheckboxGroupRootOrientation;

/**
 * {@link CheckboxGroupRootRadius}
 */
export type CheckboxGroupRadius = CheckboxGroupRootRadius;

/**
 * {@link CheckboxGroupRootSize}
 */
export type CheckboxGroupSize = CheckboxGroupRootSize;

/**
 * {@link CheckboxGroupRootVariant}
 */
export type CheckboxGroupVariant = CheckboxGroupRootVariant;

/**
 * {@link CheckboxGroup} が持つ状態です。
 */
export type CheckboxGroupState = CheckboxGroupRootState;

/**
 * {@link CheckboxGroup} に渡す props です。
 */
export type CheckboxGroupProps = CheckboxGroupRootProps;

// API
// ---

/**
 * {@link CheckboxGroup} を構成する各パーツの props を作成するための API です。
 */
export interface CheckboxGroupAPI {
  /**
   * {@link CheckboxGroupRoot} に渡す props を取得します。
   */
  getRootProps(): CheckboxGroupRootProps;
}

interface IUseCheckboxGroupAPI {
  /**
   * {@link CheckboxGroupAPI} を作成します。
   *
   * @param props {@link CheckboxGroup} の props です。
   * @returns チェックボックスグループの API です
   */
  (props: CheckboxGroupProps): CheckboxGroupAPI;
}

/**
 * {@link CheckboxGroupAPI} を作成するフックです。
 */
export const useCheckboxGroupAPI: IUseCheckboxGroupAPI = function useSuiCheckboxGroupAPI(props) {
  return {
    getRootProps() {
      return props;
    },
  };
};

export { type CheckboxGroupAPI as API, useCheckboxGroupAPI as useAPI };

// Component
// ---------

interface ICheckboxGroup extends IComponent<CheckboxGroupProps> {
  /**
   * {@link useCheckboxGroupContext}
   */
  readonly useContext: IUseContext<CheckboxGroupContext>;
}

/**
 * チェックボックスをグループ化するコンポーネントです。
 */
export const CheckboxGroup: ICheckboxGroup = /*#__PURE__*/ Object.assign(
  function SuiCheckboxGroup(props: CheckboxGroupProps) {
    const api = useCheckboxGroupAPI(props);

    return <CheckboxGroupRoot {...api.getRootProps()} />;
  },
  {
    useContext: useCheckboxGroupContext,
  },
);

export namespace CheckboxGroup {
  /**
   * {@link CheckboxGroupState}
   */
  export type State = CheckboxGroupState;

  /**
   * {@link CheckboxGroupProps}
   */
  export type Props = CheckboxGroupProps;

  /**
   * {@link CheckboxGroupContext}
   */
  export type Context = CheckboxGroupContext;

  /**
   * {@link CheckboxGroupChangeEventDetails}
   */
  export type ChangeEventDetails = CheckboxGroupChangeEventDetails;

  /**
   * {@link CheckboxGroupChangeEventReason}
   */
  export type ChangeEventReason = CheckboxGroupChangeEventReason;

  /**
   * {@link CheckboxGroupColor}
   */
  export type Color = CheckboxGroupColor;

  /**
   * {@link CheckboxGroupOrientation}
   */
  export type Orientation = CheckboxGroupOrientation;

  /**
   * {@link CheckboxGroupRadius}
   */
  export type Radius = CheckboxGroupRadius;

  /**
   * {@link CheckboxGroupSize}
   */
  export type Size = CheckboxGroupSize;

  /**
   * {@link CheckboxGroupVariant}
   */
  export type Variant = CheckboxGroupVariant;
}
