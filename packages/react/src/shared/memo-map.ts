/**
 * メモ化された値と、その値が再計算されるべきか判断するための依存関係のリストを保持する型です。
 */
type Value = Readonly<{
  /**
   * 値を再計算するトリガーとなる依存変数のリスト。この配列の要素が変更された場合、メモは破棄され再計算されます。
   */
  deps: readonly unknown[];

  /**
   * `factory` 関数によって計算され、メモ化された実際の値です。型は `any` ですが、`MemoMap.get` メソッドのジェネリック型 `T` によって型安全性が保証されます。
   */
  memo: any;
}>;

/**
 * メモ化されたデータを永続化または一時保存するための、汎用的な Key-Value ストアのインターフェースです。
 */
export interface KeyValueStore {
  /**
   * 指定されたキーに紐づく`Value`オブジェクトを取得します。
   *
   * @param key 取得する値の一意なキーです。
   * @returns キーに対応する `Value` オブジェクトです。存在しない場合は `null` を返します。
   */
  get(key: string): Value | null;

  /**
   * 指定されたキーに対して `Value` オブジェクトを保存または更新します。
   *
   * @param key 保存する値の一意なキーです。
   * @param value 保存する `Value` オブジェクトです。
   */
  set(key: string, value: Value): void;

  /**
   * ストアに保存されている全てのキーを取得するためのイテレータを返します。
   *
   * @returns キーのイテレータです。
   */
  keys(): Iterable<string>;

  /**
   * 指定されたキーに紐づく値をストアから削除します。
   *
   * @param key 削除する値の一意なキーです。
   */
  delete(key: string): void;
}

/**
 * 関数の実行結果をメモ化 (キャッシュ) するためのクラスです。
 *
 * 依存関係 (`deps`) が変更されない限り、高コストな計算 (`factory`) の再実行を防ぎます。
 *
 * `Disposable` インターフェースを実装しており、`using` 宣言と共に使用することで、不要になったキャッシュの自動的なクリーンアップが可能です。
 */
export default class MemoMap implements Disposable {
  /**
   * メモ化されたデータを実際に格納する Key-Value ストアです。
   */
  private readonly kvs: KeyValueStore;

  /**
   * この `MemoMap` インスタンスの有効期間中にアクセスされたキーを追跡するためのセットです。
   *
   * `dispose` メソッド実行時に、このセットに含まれないキー (=今回使われなかった古いキャッシュ) を `kvs` から削除するために使用されます。
   *
   * `dispose` 後は `null` になり、再利用を防ぎます。
   */
  private keys: Set<string> | null;

  /**
   * `MemoMap`の新しいインスタンスを構築します。
   *
   * @param kvs メモ化データを保存するためのストレージを指定します。
   */
  public constructor(kvs: KeyValueStore) {
    this.kvs = kvs;
    this.keys = new Set();
  }

  /**
   * 指定されたキーに対応する値を取得します。
   *
   * もし依存リスト (deps) に変更がなければ、キャッシュされた (メモ化された) 値を返します。変更があれば、`factory`関数を実行して新しい値を計算・キャッシュし、その値を返します。
   *
   * @template T 計算される値の型です。
   * @param key メモを一意に識別するためのキーです。
   * @param factory 値を計算するためのコールバック関数です。この関数の実行は高コストであることが想定されます。
   * @param deps 値の計算が依存する変数のリストです。このリストの要素が前回と変更されているか否かで、
   * `factory` を再実行するかを決定します。
   * @returns 計算またはキャッシュから取得された値です。
   */
  public get<T>(key: string, factory: () => T, deps: readonly unknown[]): T {
    if (!this.keys) {
      // TODO(tai-kun): カスタムエラーを投げます。
      throw new Error("MemoMap はすでに破棄され、使用できなくなっています。");
    }

    this.keys.add(key);

    const value = this.kvs.get(key);
    if (
      value
      && value.deps.length === deps.length
      // Object.is を使うことで、NaN === NaN が true になるなど、厳密な等価性比較を行います。
      && value.deps.every((v, i) => Object.is(v, deps[i]))
    ) {
      return value.memo;
    }

    const newValue: Value = {
      deps,
      memo: factory(),
    };
    this.kvs.set(key, newValue);

    return newValue.memo;
  }

  /**
   * `using` 構文などでこのオブジェクトのスコープが終了したときに自動的に呼び出されるメソッドです。
   *
   * このインスタンスの有効期間中にアクセスされなかった、古いキャッシュデータを `kvs` から削除 (ガベージコレクション) します。
   *
   * 実行後、このインスタンスは再利用できなくなります。
   */
  public [Symbol.dispose](): void {
    for (const key of this.kvs.keys()) {
      if (!this.keys!.has(key)) {
        this.kvs.delete(key);
      }
    }

    this.keys = null;
  }
}
