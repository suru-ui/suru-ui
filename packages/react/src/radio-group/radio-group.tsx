import type { IComponent } from "../types.js";
import {
  type RadioGroupContext,
  type RadioGroupRootSize,
  type RadioGroupRootColor,
  type RadioGroupRootProps,
  type RadioGroupRootState,
  type RadioGroupRootRadius,
  type IUseRadioGroupContext,
  type RadioGroupRootVariant,
  type RadioGroupRootOrientation,
  type RadioGroupRootChangeEventReason,
  type RadioGroupRootChangeEventDetails,
  RadioGroupRoot,
  useRadioGroupContext,
} from "./radio-group.parts.js";

// Types.

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

export interface IUseRadioGroupAPI {
  /**
   * {@link RadioGroupAPI} を作成します。
   *
   * @template TValue 項目の値の型です。
   *
   * @param props {@link RadioGroup} の props です。
   *
   * @returns ラジオボタングループの API です
   */
  <TValue = any>(props: RadioGroupProps<TValue>): RadioGroupAPI<TValue>;
}

// API.

/**
 * {@link RadioGroup} を構成する各パーツの props などを作成するための API です。
 *
 * @template TValue 項目の値の型です。
 */
export class RadioGroupAPI<TValue = any> {
  private readonly rootProps: RadioGroupRootProps<TValue>;

  /**
   * @param props {@link RadioGroup} の props です。
   *
   * @internal
   */
  public constructor(props: RadioGroupProps<TValue>) {
    this.rootProps = props;
  }

  /**
   * {@link RadioGroupRoot} に渡す props を取得します。
   */
  public getRootProps(): RadioGroupRootProps<TValue> {
    return this.rootProps;
  }
}

/**
 * {@link RadioGroupAPI} を作成するフックです。
 */
export const useRadioGroupAPI: IUseRadioGroupAPI = <TValue,>(props: RadioGroupProps<TValue>) =>
  new RadioGroupAPI(props);

export { type RadioGroupAPI as API, useRadioGroupAPI as useAPI };

// Component.

export interface IRadioGroup extends IComponent<RadioGroupProps> {
  /**
   * @template TValue 項目の値の型です。
   */
  <TValue = any>(props: RadioGroupProps<TValue>): IComponent.Return;
  readonly useContext: IUseRadioGroupContext;
}

/** ラジオボタンをグループ化するコンポーネントです。 */
export const RadioGroup: IRadioGroup = /*#__PURE__*/ Object.assign(
  (props: RadioGroupProps) => {
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
