import type { IComponent } from "../../types.js";
import { type InputRootProps, type InputRootState, InputRoot } from "./input.parts.jsx";

/**
 * {@link Input} の状態です。
 */
export type InputState = InputRootState;

/**
 * {@link Input} に渡すプロパティーです。
 */
export type InputProps = InputRootProps;

/**
 * テキスト入力欄を表示するコンポーネントです。
 */
export const Input: IComponent<InputProps> = function SuiInput(props) {
  return <InputRoot {...props} />;
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
}
