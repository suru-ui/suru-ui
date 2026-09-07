import type { IComponent } from "../types.js";
import {
  type LabelRootSize,
  type LabelRootProps,
  type LabelRootState,
  LabelRoot,
} from "./label.parts.jsx";

// Types
// -----

/**
 * {@link LabelRootSize}
 */
export type LabelSize = LabelRootSize;

/**
 * {@link Label} が持つ状態です。
 */
export type LabelState = LabelRootState;

/**
 * {@link Label} に渡す props です。
 */
export type LabelProps = LabelRootProps;

// API
// ---

/**
 * {@link Label} を構成する各パーツの props を作成するための API です。
 */
export interface LabelAPI {
  /**
   * {@link LabelRoot} に渡す props を取得します。
   */
  getRootProps(): LabelRootProps;
}

interface IUseLabelAPI {
  /**
   * {@link LabelAPI} を作成します。
   *
   * @param props {@link Label} の props です。
   * @returns ラベルの API です
   */
  (props: LabelProps): LabelAPI;
}

/**
 * {@link LabelAPI} を作成するフックです。
 */
export const useLabelAPI: IUseLabelAPI = function useSuiLabelAPI(props) {
  return {
    getRootProps() {
      return props;
    },
  };
};

export { type LabelAPI as API, useLabelAPI as useAPI };

// Component
// ---------

/**
 * フォームコントロールに紐付けるラベルコンポーネントです。
 *
 * `htmlFor` でコントロールの `id` を指定するか、コントロールを子要素として配置します。
 */
export const Label: IComponent<LabelProps> = function SuiLabel(props) {
  const api = useLabelAPI(props);

  return <LabelRoot {...api.getRootProps()} />;
};

export namespace Label {
  /**
   * {@link LabelState}
   */
  export type State = LabelState;

  /**
   * {@link LabelProps}
   */
  export type Props = LabelProps;

  /**
   * {@link LabelSize}
   */
  export type Size = LabelSize;
}
