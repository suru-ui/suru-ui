/**
 * メモのストレージ
 */
export type MemoKV = {
  [key: string]: Readonly<{
    deps: readonly unknown[];
    memo: unknown;
  }>;
};

export default class MemoMap implements Disposable {
  private readonly kv: MemoKV;
  private keys: Set<string> | null = new Set<string>();

  /**
   * @param kv メモのストレージ
   */
  constructor(kv: MemoKV) {
    this.kv = kv;
  }

  /**
   * 必要に応じてメモも更新しつつ値を収録する。
   *
   * @param key メモを示す一意のキー
   * @param factory 値を計算する関数
   * @param deps 値の計算に依存する変数のリスト
   * @returns 値
   */
  get(key: string, factory: () => unknown, deps: readonly unknown[]): any {
    this.keys!.add(key);
    const v = this.kv[key];

    if (v && v.deps.length === deps.length && v.deps.every((v, i) => Object.is(v, deps[i]))) {
      return v.memo;
    }

    const memo = factory();
    this.kv[key] = { deps, memo };

    return memo;
  }

  /**
   * 更新
   */
  [Symbol.dispose](): void {
    for (const key in this.kv) {
      if (!this.keys!.has(key)) {
        delete this.kv[key];
      }
    }

    this.keys = null;
  }
}
