import type { Component } from "../../types.js";
import * as FieldsetParts from "./fieldset.parts.jsx";

/**
 * {@link Fieldset} コンポーネントのプロパティーです。
 *
 * {@link Fieldset.Root} と同じプロパティーを受け取ります。`disabled` の既定値は
 * `false` で、指定した値が子孫のコントロールを無効化します。`className` と `render` は
 * 既定の値より優先され、`disabled` の変化は子孫の状態に反映されます。
 */
export type FieldsetProps = FieldsetParts.Root.Props;

/**
 * {@link Fieldset} の複合コンポーネント型です。
 *
 * {@link Fieldset.Root} と {@link Fieldset.Legend} をプロパティーとして公開します。
 */
interface FieldsetComponentType extends Component<FieldsetProps> {
  readonly Legend: Component<FieldsetParts.Legend.Props>;
  readonly Root: Component<FieldsetParts.Root.Props>;
}

/**
 * 関連するコントロールを凡例とともにグループ化するコンポーネントです。
 *
 * `disabled` を指定すると、グループ内のすべてのコントロールが無効になります。
 * `<Field.Root>` と組み合わせて使用します。
 *
 * @example 基本
 * ```tsx
 * <Fieldset disabled>
 *   <Fieldset.Legend>お支払い情報</Fieldset.Legend>
 *   <Field.Root name="company">
 *     <Field.Label>会社名</Field.Label>
 *     <Field.Control placeholder="会社名を入力" />
 *   </Field.Root>
 * </Fieldset>
 * ```
 */
export const Fieldset: FieldsetComponentType = /*#__PURE__*/ Object.assign(
  function SuiFieldset(props: FieldsetProps) {
    return <FieldsetParts.Root {...props} />;
  },
  {
    Legend: FieldsetParts.Legend,
    Root: FieldsetParts.Root,
  },
);
