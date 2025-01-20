import { beforeEach, expect, test, vi } from "vitest";
import MemoMap, { type MemoKV } from "../../src/use-memo-map/memo-map";

let kv: MemoKV;

beforeEach(() => {
  kv = {};
});

test("依存関係が同じ場合、メモ化された値を返す", () => {
  const factory = vi.fn((i => () => ++i)(0));
  const deps = [1, 2, 3];

  using mm = new MemoMap(kv);

  const result1 = mm.get("key1", factory, deps);
  const result2 = mm.get("key1", factory, deps);

  expect(result1).toBe(1);
  expect(result2).toBe(1);
  expect(factory).toHaveBeenCalledTimes(1);
});

test("依存関係が変更された場合、新しい値を計算する", () => {
  const factory = vi.fn((i => () => ++i)(0));
  const deps1 = [1, 2, 3];
  const deps2 = [4, 5, 6];

  using mm = new MemoMap(kv);

  const result1 = mm.get("key1", factory, deps1);
  const result2 = mm.get("key1", factory, deps2);

  expect(result1).toBe(1);
  expect(result2).toBe(2);
  expect(factory).toHaveBeenCalledTimes(2);
});

test("未使用のキーは dispose 時に削除される", () => {
  {
    using mm = new MemoMap(kv);

    mm.get("key1", () => "値1", [1]);
    mm.get("key2", () => "値2", [2]);
  }

  expect(kv).toHaveProperty("key1");
  expect(kv).toHaveProperty("key2");

  {
    using mm = new MemoMap(kv);

    mm.get("key1", () => "値1", [1]);
  }

  expect(kv).toHaveProperty("key1");
  expect(kv).not.toHaveProperty("key2");
});

test("dispose 後に keys が null になる", () => {
  let memoMap: MemoMap;

  {
    using mm = new MemoMap(kv);

    mm.get("key1", () => "値1", [1]);
    mm.get("key2", () => "値2", [2]);

    memoMap = mm;
    expect(memoMap["keys"]).not.toBeNull();
  }

  expect(memoMap["keys"]).toBeNull();
});
