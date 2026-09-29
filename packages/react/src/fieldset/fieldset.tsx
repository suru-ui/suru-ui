import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import type { IComponent } from "../types.js";
import {
  type FieldsetRootProps,
  type FieldsetRootState,
  type FieldsetLegendProps,
  FieldsetRoot,
  FieldsetLegend,
} from "./fieldset.parts.js";

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
};

namespace FieldsetProps {
  export type Fieldset = {
    /**
     * フィールドセットの凡例です。
     */
    legend?: FieldsetLegendProps["children"] | undefined;

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: FieldsetSlotProps | undefined;
  };

  export type Root = Omit<FieldsetRootProps, keyof Fieldset>;
}

/**
 * {@link Fieldset} に渡す props です。
 */
export type FieldsetProps = FieldsetProps.Fieldset & FieldsetProps.Root;

export type IFieldset = IComponent<FieldsetProps>;

// API
// ---

/**
 * {@link Fieldset} を構成する各パーツの props などを作成するための API です。
 */
export class FieldsetAPI {
  private readonly legend: FieldsetProps.Fieldset["legend"];

  private readonly slotProps: FieldsetSlotProps;

  private readonly rootProps: FieldsetRootProps;

  /**
   * @param props {@link Fieldset} の props です。
   * @internal
   */
  public constructor(props: FieldsetProps) {
    const { legend, slotProps = {}, ...rootProps } = props;
    this.legend = legend;
    this.slotProps = slotProps;
    this.rootProps = rootProps;
  }

  /**
   * {@link FieldsetLegend} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getLegendProps(): FieldsetLegendProps | null {
    const { legend } = this;
    const { legend: props = {} } = this.slotProps;

    if (isLikelyVisibleNode(legend)) {
      return {
        ...props,
        children: legend,
      };
    }

    return null;
  }

  /**
   * {@link FieldsetRoot} に渡す props を取得します。
   */
  public getRootProps(): FieldsetRootProps {
    return this.rootProps;
  }
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
  return new FieldsetAPI(props);
};

export { FieldsetAPI as API, useFieldsetAPI as useAPI };

// Component
// ---------

/**
 * 関連するコントロールを凡例とともにグループ化するコンポーネントです。
 *
 * `disabled` を指定すると、グループ内のコントロールも無効になります。
 */
export const Fieldset: IFieldset = function SuiFieldset(props) {
  const api = useFieldsetAPI(props);
  const { children, ...otherRootProps } = api.getRootProps();
  const legendProps = api.getLegendProps();

  return (
    <FieldsetRoot {...otherRootProps}>
      {legendProps && <FieldsetLegend {...legendProps} />}
      {children}
    </FieldsetRoot>
  );
};

export namespace Fieldset {
  export type State = FieldsetState;

  export type Props = FieldsetProps;

  export type SlotProps = FieldsetSlotProps;
}
