import type { IComponent } from "../../types.js";
import {
  type LabelRootSize,
  type LabelRootProps,
  type LabelRootState,
  LabelRoot,
} from "./label.parts.jsx";

/**
 * {@link LabelRootSize} です。
 */
export type LabelSize = LabelRootSize;

/**
 * {@link Label} の各パーツに渡すプロパティーです。
 */
export type LabelPartsProps = {
  /**
   * {@link LabelRoot} に渡すプロパティーです。
   */
  readonly root: LabelRootProps;
};

/**
 * {@link Label} の状態です。
 */
export type LabelState = LabelRootState;

/**
 * {@link Label} コンポーネントのプロパティーです。
 */
export type LabelProps = LabelRootProps;

/**
 * {@link Label} の各パーツに渡すプロパティーを作るフックです。
 */
export function useLabel(props: LabelProps): LabelPartsProps {
  return {
    root: props,
  };
}

/**
 * フォームコントロールに紐付けるラベルコンポーネントです。
 *
 * `htmlFor` プロパティーでコントロールの `id` を指定するか、コントロールを子要素として配置します。
 */
export const Label: IComponent<LabelProps> = function SuiLabel(props) {
  const partsProps = useLabel(props);

  return <LabelRoot {...partsProps.root} />;
};

/**
 * {@link Label} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Label {
  /**
   * {@link LabelState} です。
   */
  export type State = LabelState;

  /**
   * {@link LabelProps} です。
   */
  export type Props = LabelProps;

  /**
   * {@link LabelSize} です。
   */
  export type Size = LabelSize;
}
