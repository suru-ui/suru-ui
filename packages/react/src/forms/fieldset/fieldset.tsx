import type { Component } from "../../types.js";
import * as FieldsetParts from "./fieldset.parts.jsx";

/**
 * {@link Fieldset} コンポーネントのプロパティーです。
 */
export type FieldsetProps = FieldsetParts.Root.Props;

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
