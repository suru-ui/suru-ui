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
} from "./input.parts.js";

// Types
// -----

export type InputChangeEventDetails = InputRootChangeEventDetails;

export type InputChangeEventReason = InputRootChangeEventReason;

export type InputColor = InputRootColor;

export type InputRadius = InputRootRadius;

export type InputSize = InputRootSize;

export type InputType = InputRootType;

export type InputVariant = InputRootVariant;

/**
 * {@link Input} が持つ状態です。
 */
export type InputState = InputRootState;

/**
 * {@link Input} に渡す props です。
 */
export type InputProps = InputRootProps;

export type IInput = IComponent<InputProps>;

// API
// ---

/**
 * {@link Input} を構成する各パーツの props を作成するための API です。
 */
export class InputAPI {
  private readonly rootProps: InputRootProps;

  /**
   * @param props {@link Input} の props です。
   * @internal
   */
  public constructor(props: InputProps) {
    this.rootProps = props;
  }

  /**
   * {@link InputRoot} に渡す props を取得します。
   */
  public getRootProps(): InputRootProps {
    return this.rootProps;
  }
}

export interface IUseInputAPI {
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
  return new InputAPI(props);
};

export { InputAPI as API, useInputAPI as useAPI };

// Component
// ---------

/**
 * テキスト入力欄を表示するコンポーネントです。
 */
export const Input: IInput = function SuiInput(props) {
  const api = useInputAPI(props);

  return <InputRoot {...api.getRootProps()} />;
};

export namespace Input {
  export type State = InputState;

  export type Props = InputProps;

  export type ChangeEventDetails = InputChangeEventDetails;

  export type ChangeEventReason = InputChangeEventReason;

  export type Color = InputColor;

  export type Radius = InputRadius;

  export type Size = InputSize;

  export type Type = InputType;

  export type Variant = InputVariant;
}
