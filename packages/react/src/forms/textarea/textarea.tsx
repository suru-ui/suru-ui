import type { IComponent } from "../../types.js";
import {
  type TextareaRootSize,
  type TextareaRootColor,
  type TextareaRootProps,
  type TextareaRootState,
  type TextareaRootRadius,
  type TextareaRootVariant,
  type TextareaRootChangeEventReason,
  type TextareaRootChangeEventDetails,
  TextareaRoot,
} from "./textarea.parts.jsx";

/**
 * {@link TextareaRootColor} です。
 */
export type TextareaColor = TextareaRootColor;

/**
 * {@link TextareaRootRadius} です。
 */
export type TextareaRadius = TextareaRootRadius;

/**
 * {@link TextareaRootSize} です。
 */
export type TextareaSize = TextareaRootSize;

/**
 * {@link TextareaRootVariant} です。
 */
export type TextareaVariant = TextareaRootVariant;

/**
 * {@link TextareaRootChangeEventReason} です。
 */
export type TextareaChangeEventReason = TextareaRootChangeEventReason;

/**
 * {@link TextareaRootChangeEventDetails} です。
 */
export type TextareaChangeEventDetails = TextareaRootChangeEventDetails;

/**
 * {@link Textarea} の状態です。
 */
export type TextareaState = TextareaRootState;

/**
 * {@link Textarea} コンポーネントのプロパティーです。
 */
export type TextareaProps = TextareaRootProps;

/**
 * {@link Textarea} の各パーツに渡すプロパティーです。
 */
export type TextareaPartsProps = {
  /**
   * {@link TextareaRoot} に渡すプロパティーです。
   */
  readonly root: TextareaRootProps;
};

/**
 * {@link Textarea} の各パーツに渡すプロパティーを作るフックです。
 */
export function useTextarea(props: TextareaProps): TextareaPartsProps {
  return { root: props };
}

/**
 * 複数行のテキストを入力するテキストエリアを表示するコンポーネントです。
 */
export const Textarea: IComponent<TextareaProps> = function SuiTextarea(props) {
  const partsProps = useTextarea(props);

  return <TextareaRoot {...partsProps.root} />;
};

/**
 * {@link Textarea} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Textarea {
  /**
   * {@link TextareaState} です。
   */
  export type State = TextareaState;

  /**
   * {@link TextareaProps} です。
   */
  export type Props = TextareaProps;

  /**
   * {@link TextareaChangeEventDetails} です。
   */
  export type ChangeEventDetails = TextareaChangeEventDetails;

  /**
   * {@link TextareaChangeEventReason} です。
   */
  export type ChangeEventReason = TextareaChangeEventReason;

  /**
   * {@link TextareaColor} です。
   */
  export type Color = TextareaColor;

  /**
   * {@link TextareaRadius} です。
   */
  export type Radius = TextareaRadius;

  /**
   * {@link TextareaSize} です。
   */
  export type Size = TextareaSize;

  /**
   * {@link TextareaVariant} です。
   */
  export type Variant = TextareaVariant;
}
