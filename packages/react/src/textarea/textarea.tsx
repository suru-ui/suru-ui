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

export type TextareaChangeEventDetails = TextareaRootChangeEventDetails;

export type TextareaChangeEventReason = TextareaRootChangeEventReason;

export type TextareaColor = TextareaRootColor;

export type TextareaRadius = TextareaRootRadius;

export type TextareaSize = TextareaRootSize;

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
  export type State = TextareaState;

  export type Props = TextareaProps;

  export type ChangeEventDetails = TextareaChangeEventDetails;

  export type ChangeEventReason = TextareaChangeEventReason;

  export type Color = TextareaColor;

  export type Radius = TextareaRadius;

  export type Size = TextareaSize;

  export type Variant = TextareaVariant;
}
