import type { IComponent } from "../types.js";
import {
  type InputRootSize,
  type InputRootType,
  type InputRootColor,
  type InputRootProps,
  type InputRootState,
  type InputRootRadius,
  type InputRootVariant,
  type InputRootChangeEventReason,
  type InputRootChangeEventDetails,
  InputRoot,
} from "./input.parts.jsx";

// Types
// -----

/**
 * {@link InputRootChangeEventDetails}
 */
export type InputChangeEventDetails = InputRootChangeEventDetails;

/**
 * {@link InputRootChangeEventReason}
 */
export type InputChangeEventReason = InputRootChangeEventReason;

/**
 * {@link InputRootColor}
 */
export type InputColor = InputRootColor;

/**
 * {@link InputRootRadius}
 */
export type InputRadius = InputRootRadius;

/**
 * {@link InputRootSize}
 */
export type InputSize = InputRootSize;

/**
 * {@link InputRootType}
 */
export type InputType = InputRootType;

/**
 * {@link InputRootVariant}
 */
export type InputVariant = InputRootVariant;

/**
 * {@link Input} が持つ状態です。
 */
export type InputState = InputRootState;

/**
 * {@link Input} に渡す props です。
 */
export type InputProps = InputRootProps;

// API
// ---

/**
 * {@link Input} を構成する各パーツの props を作成するための API です。
 */
export interface InputAPI {
  /**
   * {@link InputRoot} に渡す props を取得します。
   */
  getRootProps(): InputRootProps;
}

interface IUseInputAPI {
  /**
   * {@link InputAPI} を作成します。
   *
   * @param props {@link Input} の props です。
   * @returns テキスト入力欄の API です
   */
  (props: InputProps): InputAPI;
}

/**
 * {@link InputAPI} を作成するフックです。
 */
export const useInputAPI: IUseInputAPI = function useSuiInputAPI(props) {
  return {
    getRootProps() {
      return props;
    },
  };
};

export { type InputAPI as API, useInputAPI as useAPI };

// Component
// ---------

/**
 * テキスト入力欄を表示するコンポーネントです。
 */
export const Input: IComponent<InputProps> = function SuiInput(props) {
  const api = useInputAPI(props);

  return <InputRoot {...api.getRootProps()} />;
};

export namespace Input {
  /**
   * {@link InputState}
   */
  export type State = InputState;

  /**
   * {@link InputProps}
   */
  export type Props = InputProps;

  /**
   * {@link InputChangeEventDetails}
   */
  export type ChangeEventDetails = InputChangeEventDetails;

  /**
   * {@link InputChangeEventReason}
   */
  export type ChangeEventReason = InputChangeEventReason;

  /**
   * {@link InputColor}
   */
  export type Color = InputColor;

  /**
   * {@link InputRadius}
   */
  export type Radius = InputRadius;

  /**
   * {@link InputSize}
   */
  export type Size = InputSize;

  /**
   * {@link InputType}
   */
  export type Type = InputType;

  /**
   * {@link InputVariant}
   */
  export type Variant = InputVariant;
}
