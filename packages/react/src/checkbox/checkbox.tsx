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
} from "./checkbox.parts.jsx";

// Types
// -----

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
  readonly indicator?: CheckboxIndicatorProps | undefined;
};

/**
 * {@link Checkbox} が持つ状態です。
 */
export type CheckboxState = CheckboxRootState;

/**
 * {@link Checkbox} に渡す props です。
 */
export type CheckboxProps = Omit<CheckboxRootProps, "children"> &
  Pick<CheckboxIndicatorProps, "children"> & {
    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: CheckboxSlotProps | undefined;
  };

// API
// ---

/**
 * {@link Checkbox} を構成する各パーツの props を作成するための API です。
 */
export interface CheckboxAPI {
  /**
   * {@link CheckboxIndicator} に渡す props を取得します。
   */
  getIndicatorProps(): CheckboxIndicatorProps;

  /**
   * {@link CheckboxRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<CheckboxRootProps, "children">;
}

interface IUseCheckboxAPI {
  /**
   * {@link CheckboxAPI} を作成します。
   *
   * @param props {@link Checkbox} の props です。
   * @returns チェックボックスの API です
   */
  (props: CheckboxProps): CheckboxAPI;
}

/**
 * {@link CheckboxAPI} を作成するフックです。
 */
export const useCheckboxAPI: IUseCheckboxAPI = function useSuiCheckboxAPI(props) {
  const { children, slotProps: { indicator: indicatorProps = {} } = {}, ...otherRootProps } = props;

  return {
    getRootProps() {
      return otherRootProps;
    },
    getIndicatorProps() {
      return {
        children,
        ...indicatorProps,
      };
    },
  };
};

export { type CheckboxAPI as API, useCheckboxAPI as useAPI };

// Component
// ---------

/**
 * チェックボックスを表示するコンポーネントです。
 */
export const Checkbox: IComponent<CheckboxProps> = function SuiCheckbox(props) {
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
