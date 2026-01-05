/**
 * 汎用的なオブジェクトの型を表します。キーは文字列で、値は任意の型である必要があります。
 */
type ObjectType = { readonly [key: string]: unknown };

/**
 * オブジェクト型の中から、`undefined` が許容されている（つまり、オプショナルになり得る）プロパティーのキーを抽出します。
 *
 * @template TObject 処理対象のオブジェクト型です。
 */
type OmitTarget<TObject extends ObjectType> = {
  [P in keyof TObject]: [Extract<TObject[P], undefined>] extends [never] ? never : P;
}[keyof TObject];

/**
 * 指定されたターゲットキーをオプショナルに変更した新しい型を生成します。
 *
 * @template TObject 元となるオブジェクト型です。
 * @template TTarget オプショナルに変更する対象のキーです。
 */
type $Partialize<TObject extends ObjectType, TTarget extends keyof TObject> =
  & { -readonly [P in TTarget]?: Exclude<TObject[P], undefined> }
  & { -readonly [P in Exclude<keyof TObject, TTarget>]: TObject[P] };

/**
 * `undefined` を含むプロパティーをオプショナルな形式に変換したオブジェクト型です。
 *
 * @template TObject 変換対象のオブジェクト型です。
 */
export type Partialized<TObject extends ObjectType> = $Partialize<TObject, OmitTarget<TObject>>;

/**
 * `undefined` を含むプロパティーを取り除きます。
 *
 * @template TObject 対象のオブジェクト型です。
 * @param object オブジェクトです。
 * @returns `undefined` が取り除かれたオブジェクトです。
 */
export default function partialize<TObject extends ObjectType>(
  object: TObject,
): Partialized<TObject> {
  const out: Record<string, unknown> = {};
  for (const key of Object.keys(object)) {
    if (object[key] !== undefined) {
      out[key] = object[key];
    }
  }

  // @ts-expect-error
  return out;
}
