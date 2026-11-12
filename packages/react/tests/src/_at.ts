/**
 * 配列の指定した位置の要素を返します。
 *
 * 要素が存在しない場合はエラーを投げます。
 *
 * @param values 対象の配列です。
 * @param index 取得する位置です。
 *
 * @returns 指定した位置の要素です。
 */
export function at<T>(values: ArrayLike<T>, index: number): T {
  const value = values[index];

  if (value === undefined) {
    throw new Error(`Expected a value at index ${index}.`);
  }

  return value;
}
