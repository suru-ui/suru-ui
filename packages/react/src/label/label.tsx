import type { IComponent } from "../types.js";
import {
  type LabelRootSize,
  type LabelRootColor,
  type LabelRootProps,
  type LabelRootState,
  LabelRoot,
} from "./label.parts.js";

// Types
// -----

export type LabelColor = LabelRootColor;

export type LabelSize = LabelRootSize;

/**
 * {@link Label} が持つ状態です。
 */
export type LabelState = LabelRootState;

/**
 * {@link Label} に渡す props です。
 */
export type LabelProps = LabelRootProps;

export type ILabel = IComponent<LabelProps>;

// API
// ---

/**
 * {@link Label} を構成する各パーツの props を作成するための API です。
 */
export class LabelAPI {
  private readonly rootProps: LabelRootProps;

  /**
   * @param props {@link Label} の props です。
   * @internal
   */
  public constructor(props: LabelProps) {
    this.rootProps = props;
  }

  /**
   * {@link LabelRoot} に渡す props を取得します。
   */
  public getRootProps(): LabelRootProps {
    return this.rootProps;
  }
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
  return new LabelAPI(props);
};

export { LabelAPI as API, useLabelAPI as useAPI };

// Component
// ---------

/**
 * フォームコントロールに紐付けるラベルを表示するコンポーネントです。
 *
 * `htmlFor` でコントロールの `id` を指定するか、コントロールを子要素として配置します。
 */
export const Label: ILabel = function SuiLabel(props) {
  const api = useLabelAPI(props);

  return <LabelRoot {...api.getRootProps()} />;
};

export namespace Label {
  export type State = LabelState;

  export type Props = LabelProps;

  export type Color = LabelColor;

  export type Size = LabelSize;
}
