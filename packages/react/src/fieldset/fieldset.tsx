import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import type { IComponent } from "../types.js";
import {
  type FieldsetRootProps,
  type FieldsetRootState,
  type FieldsetLegendProps,
  FieldsetRoot,
  FieldsetLegend,
} from "./fieldset.parts.jsx";

// Types
// -----

/**
 * {@link Fieldset} が持つ状態です。
 */
export type FieldsetState = FieldsetRootState;

/**
 * {@link Fieldset} の各パーツに渡す props です。
 */
export type FieldsetSlotProps = {
  /**
   * {@link FieldsetLegend} に渡す props です。
   */
  readonly legend?: Omit<FieldsetLegendProps, "children"> | undefined;

  /**
   * {@link FieldsetRoot} に渡す props です。
   */
  readonly root?: Omit<FieldsetRootProps, "children"> | undefined;
};

/**
 * {@link Fieldset} に渡す props です。
 */
export type FieldsetProps = Omit<FieldsetRootProps, "children"> & {
  /**
   * フィールドセットに含める内容です。
   */
  children?: FieldsetRootProps["children"] | undefined;

  /**
   * フィールドセットの凡例です。
   */
  legend?: FieldsetLegendProps["children"] | undefined;

  /**
   * 各パーツに個別の props を渡すためのオブジェクトです。
   *
   * 各パーツの props が優先されます。
   */
  slotProps?: FieldsetSlotProps | undefined;
};

// API
// ---

/**
 * {@link Fieldset} を構成する各パーツの props を作成するための API です。
 */
export interface FieldsetAPI {
  /**
   * {@link FieldsetLegend} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  getLegendProps(): FieldsetLegendProps | null;

  /**
   * {@link FieldsetRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<FieldsetRootProps, "children">;
}

interface IUseFieldsetAPI {
  /**
   * {@link FieldsetAPI} を作成します。
   *
   * @param props {@link Fieldset} の props です。
   * @returns フィールドセットの API です
   */
  (props: FieldsetProps): FieldsetAPI;
}

/**
 * {@link FieldsetAPI} を作成するフックです。
 */
export const useFieldsetAPI: IUseFieldsetAPI = function useSuiFieldsetAPI(props) {
  const {
    legend,
    // children は合成側でそのまま描画するため、ルートの props から取り除きます。
    children: _children,
    slotProps: { root: rootProps = {}, legend: legendProps = {} } = {},
    ...otherRootProps
  } = props;

  return {
    getRootProps() {
      return {
        ...rootProps,
        ...otherRootProps,
      };
    },
    getLegendProps() {
      if (isLikelyVisibleNode(legend)) {
        return {
          ...legendProps,
          children: legend,
        };
      }

      return null;
    },
  };
};

export { type FieldsetAPI as API, useFieldsetAPI as useAPI };

// Component
// ---------

/**
 * 関連するコントロールを凡例とともにグループ化するコンポーネントです。
 *
 * `disabled` を指定すると、グループ内のコントロールも無効になります。
 */
export const Fieldset: IComponent<FieldsetProps> = function SuiFieldset(props) {
  const api = useFieldsetAPI(props);
  const legendProps = api.getLegendProps();

  return (
    <FieldsetRoot {...api.getRootProps()}>
      {legendProps && <FieldsetLegend {...legendProps} />}
      {props.children}
    </FieldsetRoot>
  );
};

export namespace Fieldset {
  /**
   * {@link FieldsetState}
   */
  export type State = FieldsetState;

  /**
   * {@link FieldsetProps}
   */
  export type Props = FieldsetProps;

  /**
   * {@link FieldsetSlotProps}
   */
  export type SlotProps = FieldsetSlotProps;
}
