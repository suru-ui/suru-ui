import type { IComponent } from "../types.js";
import {
  type CheckboxGroupContext,
  type CheckboxGroupRootSize,
  type CheckboxGroupRootColor,
  type CheckboxGroupRootProps,
  type CheckboxGroupRootState,
  type CheckboxGroupRootRadius,
  type CheckboxGroupRootVariant,
  type IUseCheckboxGroupContext,
  type CheckboxGroupRootOrientation,
  type CheckboxGroupRootChangeEventReason,
  type CheckboxGroupRootChangeEventDetails,
  CheckboxGroupRoot,
  useCheckboxGroupContext,
} from "./checkbox-group.parts.js";

// Types
// -----

export type CheckboxGroupChangeEventDetails = CheckboxGroupRootChangeEventDetails;

export type CheckboxGroupChangeEventReason = CheckboxGroupRootChangeEventReason;

export type CheckboxGroupColor = CheckboxGroupRootColor;

export type CheckboxGroupOrientation = CheckboxGroupRootOrientation;

export type CheckboxGroupRadius = CheckboxGroupRootRadius;

export type CheckboxGroupSize = CheckboxGroupRootSize;

export type CheckboxGroupVariant = CheckboxGroupRootVariant;

/**
 * {@link CheckboxGroup} が持つ状態です。
 */
export type CheckboxGroupState = CheckboxGroupRootState;

/**
 * {@link CheckboxGroup} に渡す props です。
 */
export type CheckboxGroupProps = CheckboxGroupRootProps;

export interface IUseCheckboxGroupAPI {
  /**
   * {@link CheckboxGroupAPI} を作成します。
   *
   * @param props {@link CheckboxGroup} の props です。
   * @returns チェックボックスグループの API です
   */
  (props: CheckboxGroupProps): CheckboxGroupAPI;
}

// API
// ---

/**
 * {@link CheckboxGroup} を構成する各パーツの props などを作成するための API です。
 */
export class CheckboxGroupAPI {
  private readonly rootProps: CheckboxGroupRootProps;

  /**
   * @param props {@link CheckboxGroup} の props です。
   * @internal
   */
  public constructor(props: CheckboxGroupProps) {
    this.rootProps = props;
  }

  /**
   * {@link CheckboxGroupRoot} に渡す props を取得します。
   */
  public getRootProps(): CheckboxGroupRootProps {
    return this.rootProps;
  }
}

/**
 * {@link CheckboxGroupAPI} を作成するフックです。
 */
export const useCheckboxGroupAPI: IUseCheckboxGroupAPI = function useSuiCheckboxGroupAPI(props) {
  return new CheckboxGroupAPI(props);
};

export { type CheckboxGroupAPI as API, useCheckboxGroupAPI as useAPI };

// Component
// ---------

export interface ICheckboxGroup extends IComponent<CheckboxGroupProps> {
  readonly useContext: IUseCheckboxGroupContext;
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
  export type State = CheckboxGroupState;

  export type Props = CheckboxGroupProps;

  export type Context = CheckboxGroupContext;

  export type ChangeEventDetails = CheckboxGroupChangeEventDetails;

  export type ChangeEventReason = CheckboxGroupChangeEventReason;

  export type Color = CheckboxGroupColor;

  export type Orientation = CheckboxGroupOrientation;

  export type Radius = CheckboxGroupRadius;

  export type Size = CheckboxGroupSize;

  export type Variant = CheckboxGroupVariant;
}
