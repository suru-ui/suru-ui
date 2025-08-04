/**
 * `styled` の CSS で利用可能な、レンダリングされたコンポーネントのクラス名を埋め込むための定数です。
 * この定数が含まれている場合、`styled` は CSS テキストを自動でコンポーネントのセレクター (クラス) で囲いません。
 *
 * @example
 * ```ts
 * const StyledDiv = styled.div`
 *   .known-class > ${STYLED_SELECTOR} {
 *     margin-top: 16px;
 *   }
 * `;
 * ```
 */
export const STYLED_SELECTOR: string = "__SUI_STYLED_COMPONENT_SELECTOR__";
