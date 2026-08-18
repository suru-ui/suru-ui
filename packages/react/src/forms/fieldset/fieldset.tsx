import type { IComponent } from "../../types.js";
import {
  type FieldsetRootProps,
  type FieldsetRootState,
  type FieldsetLegendProps,
  FieldsetRoot,
  FieldsetLegend,
} from "./fieldset.parts.jsx";

/**
 * {@link Fieldset} の状態です。
 */
export type FieldsetState = FieldsetRootState;

/**
 * {@link Fieldset} コンポーネントのプロパティーです。
 *
 * {@link Fieldset.Root} と同じプロパティーを受け取ります。`disabled` の既定値は
 * `false` で、指定した値が子孫のコントロールを無効化します。`className` と `render` は
 * 既定の値より優先され、`disabled` の変化は子孫の状態に反映されます。
 */
export type FieldsetProps = FieldsetRootProps;

/**
 * {@link Fieldset} の複合コンポーネント型です。
 *
 * {@link Fieldset.Root} と {@link Fieldset.Legend} をプロパティーとして公開します。
 */
interface FieldsetComponentType extends IComponent<FieldsetProps> {
  readonly Legend: IComponent<FieldsetLegendProps>;
  readonly Root: IComponent<FieldsetRootProps>;
}

/**
 * 関連するコントロールを凡例とともにグループ化するコンポーネントです。
 *
 * `disabled` を指定すると、グループ内のすべてのコントロールが無効になります。
 * `<Field.Root>` と組み合わせて使用します。
 */
export const Fieldset: FieldsetComponentType = /*#__PURE__*/ Object.assign(
  function SuiFieldset(props: FieldsetProps) {
    return <FieldsetRoot {...props} />;
  },
  {
    Legend: FieldsetLegend,
    Root: FieldsetRoot,
  },
);

/**
 * {@link Fieldset} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Fieldset {
  /**
   * {@link FieldsetState} です。
   */
  export type State = FieldsetState;

  /**
   * {@link FieldsetProps} です。
   */
  export type Props = FieldsetProps;
}
