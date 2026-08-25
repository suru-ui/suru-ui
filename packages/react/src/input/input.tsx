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

/**
 * {@link InputRootColor} です。
 */
export type InputColor = InputRootColor;

/**
 * {@link InputRootRadius} です。
 */
export type InputRadius = InputRootRadius;

/**
 * {@link InputRootSize} です。
 */
export type InputSize = InputRootSize;

/**
 * {@link InputRootType} です。
 */
export type InputType = InputRootType;

/**
 * {@link InputRootVariant} です。
 */
export type InputVariant = InputRootVariant;

/**
 * {@link InputRootChangeEventReason} です。
 */
export type InputChangeEventReason = InputRootChangeEventReason;

/**
 * {@link InputRootChangeEventDetails} です。
 */
export type InputChangeEventDetails = InputRootChangeEventDetails;

/**
 * {@link Input} の状態です。
 */
export type InputState = InputRootState;

/**
 * {@link Input} コンポーネントのプロパティーです。
 */
export type InputProps = InputRootProps;

/**
 * {@link Input} の各パーツに渡すプロパティーです。
 */
export type InputPartsProps = {
  /**
   * {@link InputRoot} に渡すプロパティーです。
   */
  readonly root: InputRootProps;
};

/**
 * {@link Input} の各パーツに渡すプロパティーを作るフックです。
 */
export function useInput(props: InputProps): InputPartsProps {
  return { root: props };
}

/**
 * テキスト入力欄を表示するコンポーネントです。
 */
export const Input: IComponent<InputProps> = function SuiInput(props) {
  const partsProps = useInput(props);

  return <InputRoot {...partsProps.root} />;
};

/**
 * {@link Input} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Input {
  /**
   * {@link InputState} です。
   */
  export type State = InputState;

  /**
   * {@link InputProps} です。
   */
  export type Props = InputProps;

  /**
   * {@link InputChangeEventDetails} です。
   */
  export type ChangeEventDetails = InputChangeEventDetails;

  /**
   * {@link InputChangeEventReason} です。
   */
  export type ChangeEventReason = InputChangeEventReason;

  /**
   * {@link InputColor} です。
   */
  export type Color = InputColor;

  /**
   * {@link InputRadius} です。
   */
  export type Radius = InputRadius;

  /**
   * {@link InputSize} です。
   */
  export type Size = InputSize;

  /**
   * {@link InputType} です。
   */
  export type Type = InputType;

  /**
   * {@link InputVariant} です。
   */
  export type Variant = InputVariant;
}
