import type { IComponent } from "../types.js";
import {
  type CheckboxRootSize,
  type CheckboxRootColor,
  type CheckboxRootProps,
  type CheckboxRootState,
  type CheckboxRootRadius,
  type CheckboxRootVariant,
  type CheckboxIndicatorProps,
  type CheckboxRootChangeEventReason,
  type CheckboxRootChangeEventDetails,
  CheckboxRoot,
  CheckboxIndicator,
} from "./checkbox.parts.js";

// Types.

export type CheckboxChangeEventDetails = CheckboxRootChangeEventDetails;

export type CheckboxChangeEventReason = CheckboxRootChangeEventReason;

export type CheckboxColor = CheckboxRootColor;

export type CheckboxRadius = CheckboxRootRadius;

export type CheckboxSize = CheckboxRootSize;

export type CheckboxVariant = CheckboxRootVariant;

/**
 * {@link Checkbox} の各パーツに渡す props です。
 */
export type CheckboxSlotProps = {
  /**
   * {@link CheckboxIndicator} に渡す props です。
   */
  readonly indicator?: Omit<CheckboxIndicatorProps, "children"> | undefined;
};

/**
 * {@link Checkbox} が持つ状態です。
 */
export type CheckboxState = CheckboxRootState;

namespace CheckboxProps {
  export type Checkbox = {
    /** 各パーツに個別の props を渡すためのオブジェクトです。 */
    slotProps?: CheckboxSlotProps | undefined;
  };

  export type Indicator = Pick<CheckboxIndicatorProps, "children">;

  export type Root = Omit<CheckboxRootProps, keyof Checkbox | keyof Indicator>;
}

/**
 * {@link Checkbox} に渡す props です。
 */
export type CheckboxProps = CheckboxProps.Checkbox & CheckboxProps.Root & CheckboxProps.Indicator;

export type ICheckbox = IComponent<CheckboxProps>;

export interface IUseCheckboxAPI {
  /**
   * {@link CheckboxAPI} を作成します。
   *
   * @param props {@link Checkbox} の props です。
   *
   * @returns チェックボックスの API です。
   */
  (props: CheckboxProps): CheckboxAPI;
}

// API.

/**
 * {@link Checkbox} を構成する各パーツの props などを作成するための API です。
 */
export class CheckboxAPI {
  private readonly indicatorProps: Required<CheckboxProps.Indicator>;

  private readonly slotProps: CheckboxSlotProps;

  private readonly rootProps: CheckboxProps.Root;

  /**
   * @param props {@link Checkbox} の props です。
   *
   * @internal
   */
  public constructor(props: CheckboxProps) {
    const { children, slotProps = {}, ...rootProps } = props;
    this.indicatorProps = {
      children,
    };
    this.slotProps = slotProps;
    this.rootProps = rootProps;
  }

  /**
   * {@link CheckboxIndicator} に渡す props を取得します。
   */
  public getIndicatorProps(): CheckboxIndicatorProps {
    const { indicator: props = {} } = this.slotProps;

    return {
      ...props,
      ...this.indicatorProps,
    };
  }

  /**
   * {@link CheckboxRoot} に渡す props を取得します。
   */
  public getRootProps(): Omit<CheckboxRootProps, "children"> {
    return this.rootProps;
  }
}

/**
 * {@link CheckboxAPI} を作成するフックです。
 */
export const useCheckboxAPI: IUseCheckboxAPI = (props) => new CheckboxAPI(props);

export { CheckboxAPI as API, useCheckboxAPI as useAPI };

// Component.

/**
 * チェックボックスを表示するコンポーネントです。
 *
 * ラベルのテキストは `label` 要素で囲んで指定します。
 */
export const Checkbox: ICheckbox = (props) => {
  const api = useCheckboxAPI(props);

  return (
    <CheckboxRoot {...api.getRootProps()}>
      <CheckboxIndicator {...api.getIndicatorProps()} />
    </CheckboxRoot>
  );
};

export namespace Checkbox {
  export type State = CheckboxState;

  export type Props = CheckboxProps;

  export type SlotProps = CheckboxSlotProps;

  export type ChangeEventDetails = CheckboxChangeEventDetails;

  export type ChangeEventReason = CheckboxChangeEventReason;

  export type Color = CheckboxColor;

  export type Radius = CheckboxRadius;

  export type Size = CheckboxSize;

  export type Variant = CheckboxVariant;
}
