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

export type RadioGroupChangeEventDetails = RadioGroupRootChangeEventDetails;

export type RadioGroupChangeEventReason = RadioGroupRootChangeEventReason;

export type RadioGroupColor = RadioGroupRootColor;

export type RadioGroupOrientation = RadioGroupRootOrientation;

export type RadioGroupRadius = RadioGroupRootRadius;

export type RadioGroupSize = RadioGroupRootSize;

export type RadioGroupVariant = RadioGroupRootVariant;

/**
 * {@link RadioGroup} が持つ状態です。
 */
export type RadioGroupState = RadioGroupRootState;

/**
 * {@link RadioGroup} に渡す props です。
 *
 * @template TValue 項目の値の型です。
 */
export type RadioGroupProps<TValue = any> = RadioGroupRootProps<TValue>;

// API
// ---

/**
 * {@link RadioGroup} を構成する各パーツの props を作成するための API です。
 *
 * @template TValue 項目の値の型です。
 */
export interface RadioGroupAPI<TValue = any> {
  /**
   * {@link RadioGroupRoot} に渡す props を取得します。
   */
  getRootProps(): RadioGroupRootProps<TValue>;
}

interface IUseRadioGroupAPI {
  /**
   * {@link RadioGroupAPI} を作成します。
   *
   * @template TValue 項目の値の型です。
   * @param props {@link RadioGroup} の props です。
   * @returns ラジオボタングループの API です
   */
  <TValue = any>(props: RadioGroupProps<TValue>): RadioGroupAPI<TValue>;
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
   * @template TValue 項目の値の型です。
   */
  <TValue = any>(props: RadioGroupProps<TValue>): IComponent.Return;

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
  export type State = RadioGroupState;

  export type Props<TValue = any> = RadioGroupProps<TValue>;

  export type Context = RadioGroupContext;

  export type ChangeEventDetails = RadioGroupChangeEventDetails;

  export type ChangeEventReason = RadioGroupChangeEventReason;

  export type Color = RadioGroupColor;

  export type Orientation = RadioGroupOrientation;

  export type Radius = RadioGroupRadius;

  export type Size = RadioGroupSize;

  export type Variant = RadioGroupVariant;
}
