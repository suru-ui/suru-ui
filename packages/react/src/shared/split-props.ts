/**
 * 汎用的なプロパティーオブジェクトの型を表します。キーは文字列で、値は任意の型である必要があります。
 */
type Props = { readonly [key: string]: unknown };

/**
 * プロパティーのキーのリスト（配列）の型を表します。要素は文字列（プロパティー名）である必要があります。
 */
type Keys = readonly string[];

/**
 * プロパティーキーのリスト（Keys）の配列の型を表します。このリストの各要素に対応するプロパティーのサブセットが分割されます。
 */
type KeysList = readonly Keys[];

// /**
//  * プロパティー型の中から、`undefined` が許容されている（つまり、オプショナルになり得る）プロパティーのキーを抽出します。
//  *
//  * @template TProps 処理対象のプロパティー型です。
//  */
// type OmitTarget<TProps extends Props> = {
//   [P in keyof TProps]: [Extract<TProps[P], undefined>] extends [never] ? never : P;
// }[keyof TProps];

// /**
//  * 指定されたターゲットキーをオプショナルに変更した新しい型を生成します。
//  *
//  * @template TProps 元となるプロパティー型です。
//  * @template TTarget オプショナルに変更する対象のキーです。
//  */
// type $Partialize<TProps extends Props, TTarget extends keyof TProps> =
//   & { -readonly [P in TTarget]?: Exclude<TProps[P], undefined> }
//   & { -readonly [P in Exclude<keyof TProps, TTarget>]: TProps[P] };

// /**
//  * `undefined` を含むプロパティーをオプショナルな形式に変換したプロパティー型です。
//  *
//  * @template TProps 変換対象のプロパティー型です。
//  */
// type SplittedProps<TProps extends Props> = $Partialize<TProps, OmitTarget<TProps>>;

/**
 * 与えられたプロパティーオブジェクト (TProps) を、キーのリストのリスト (TKeysList) に基づいて分割した結果のタプルの型を計算します。
 *
 * 再帰的な条件型を使用して、TKeysList の各 Keys に対応するプロパティーのサブセットの型と、残りのプロパティーの型を含むタプルを生成します。
 *
 * @template TProps 分割対象のプロパティーオブジェクトの型です。
 * @template TKeysList 分割に使用するキーのリストのリストの型です。
 */
// dprint-ignore
type $SplitProps<TProps extends Props, TKeysList extends KeysList> =
    TKeysList extends readonly [infer TKeys extends Keys, ...(infer TOthers extends KeysList)]
  ? [
      Pick<TProps, Extract<TKeys[number], keyof TProps>>,
      ...$SplitProps<Omit<TProps, TKeys[number]>, TOthers>
    ]
  : [TProps]

/**
 * プロパティーオブジェクトを、指定されたキーのリストに基づいて複数のサブセットに分割する関数です。
 *
 * 分割後の最後の要素には、どのキーリストにも含まれなかった残りのプロパティーが含まれます。
 *
 * 分割後のプロパティーオブジェクトの `undefined` プロパティーは、そのオブジェクトから削除されます。
 *
 * @template TProps 分割対象のプロパティーオブジェクトの型です。
 * @template TKeysList 分割に使用するキーのリストのリストの型です。
 * @param props 分割対象のプロパティーオブジェクトです。
 * @param keysList プロパティーを分割するためのキーのリストのリストです。このリストの順序に従ってプロパティーが分割されます。
 * @returns 分割されたプロパティーオブジェクトのサブセットと、残りのプロパティーを含むタプルを返します。
 */
export default function splitProps<TProps extends Props, const TKeysList extends KeysList>(
  props: TProps,
  keysList: TKeysList,
): $SplitProps<TProps, TKeysList> {
  const stack: Record<string, unknown>[] = [];
  const other: Record<string, unknown> = { ...props };
  for (const keys of keysList) {
    const subset: Record<string, unknown> = {};
    for (const key of keys) {
      if (key in other) {
        // if (other[key] !== undefined) {
        subset[key] = other[key];
        // }

        delete other[key];
      }
    }

    stack.push(subset);
  }

  stack.push(other);

  // @ts-expect-error
  return stack;
}
