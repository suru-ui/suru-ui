import type { IComponent } from "../types.js";
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

// Types
// -----

/**
 * {@link TextareaRootChangeEventDetails}
 */
export type TextareaChangeEventDetails = TextareaRootChangeEventDetails;

/**
 * {@link TextareaRootChangeEventReason}
 */
export type TextareaChangeEventReason = TextareaRootChangeEventReason;

/**
 * {@link TextareaRootColor}
 */
export type TextareaColor = TextareaRootColor;

/**
 * {@link TextareaRootRadius}
 */
export type TextareaRadius = TextareaRootRadius;

/**
 * {@link TextareaRootSize}
 */
export type TextareaSize = TextareaRootSize;

/**
 * {@link TextareaRootVariant}
 */
export type TextareaVariant = TextareaRootVariant;

/**
 * {@link Textarea} が持つ状態です。
 */
export type TextareaState = TextareaRootState;

/**
 * {@link Textarea} に渡す props です。
 */
export type TextareaProps = TextareaRootProps;

// API
// ---

/**
 * {@link Textarea} を構成する各パーツの props を作成するための API です。
 */
export interface TextareaAPI {
  /**
   * {@link TextareaRoot} に渡す props を取得します。
   */
  getRootProps(): TextareaRootProps;
}

interface IUseTextareaAPI {
  /**
   * {@link TextareaAPI} を作成します。
   *
   * @param props {@link Textarea} の props です。
   * @returns テキストエリアの API です
   */
  (props: TextareaProps): TextareaAPI;
}

/**
 * {@link TextareaAPI} を作成するフックです。
 */
export const useTextareaAPI: IUseTextareaAPI = function useSuiTextareaAPI(props) {
  return {
    getRootProps() {
      return props;
    },
  };
};

export { type TextareaAPI as API, useTextareaAPI as useAPI };

// Component
// ---------

/**
 * 複数行のテキストを入力するテキストエリアを表示するコンポーネントです。
 */
export const Textarea: IComponent<TextareaProps> = function SuiTextarea(props) {
  const api = useTextareaAPI(props);

  return <TextareaRoot {...api.getRootProps()} />;
};

export namespace Textarea {
  /**
   * {@link TextareaState}
   */
  export type State = TextareaState;

  /**
   * {@link TextareaProps}
   */
  export type Props = TextareaProps;

  /**
   * {@link TextareaChangeEventDetails}
   */
  export type ChangeEventDetails = TextareaChangeEventDetails;

  /**
   * {@link TextareaChangeEventReason}
   */
  export type ChangeEventReason = TextareaChangeEventReason;

  /**
   * {@link TextareaColor}
   */
  export type Color = TextareaColor;

  /**
   * {@link TextareaRadius}
   */
  export type Radius = TextareaRadius;

  /**
   * {@link TextareaSize}
   */
  export type Size = TextareaSize;

  /**
   * {@link TextareaVariant}
   */
  export type Variant = TextareaVariant;
}
