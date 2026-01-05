import { describe, test, vi } from "vitest";
import MemoMap, { type KeyValueStore } from "../../src/shared/memo-map.js";

function createMockKvs(): KeyValueStore {
  const store = new Map<string, any>();

  return {
    get: vi.fn((key) => store.get(key) ?? null),
    set: vi.fn((key, value) => store.set(key, value)),
    keys: vi.fn(() => store.keys()),
    delete: vi.fn((key) => store.delete(key)),
  };
}

describe("get", () => {
  test("初回呼び出しのとき、factory が実行され結果が保存される", ({ expect }) => {
    // Arrange
    const kvs = createMockKvs();
    const memoMap = new MemoMap(kvs);
    const factory = vi.fn(() => "computed value");
    const deps = [1, "a"];

    // Act
    const result = memoMap.get("key1", factory, deps);

    // Assert
    expect(result).toBe("computed value");
    expect(factory).toHaveBeenCalledTimes(1);
    expect(kvs.set).toHaveBeenCalledWith("key1", {
      deps,
      memo: "computed value",
    });
  });

  test("deps が前回と同じ場合、factory は実行されずキャッシュされた値が返る", ({ expect }) => {
    // Arrange
    const kvs = createMockKvs();
    const memoMap = new MemoMap(kvs);
    const factory = vi.fn(() => "computed value");
    const deps = [1, "a"];

    memoMap.get("key1", factory, deps);
    factory.mockClear();

    // Act
    const result = memoMap.get("key1", factory, deps);

    // Assert
    expect(result).toBe("computed value");
    expect(factory).not.toHaveBeenCalled();
  });

  test("deps が変更された場合、factory が再実行され値が更新される", ({ expect }) => {
    // Arrange
    const kvs = createMockKvs();
    const memoMap = new MemoMap(kvs);
    const factory = vi.fn()
      .mockReturnValueOnce("old value")
      .mockReturnValueOnce("new value");

    memoMap.get("key1", factory, [1]);

    // Act
    const result = memoMap.get("key1", factory, [2]);

    // Assert
    expect(result).toBe("new value");
    expect(factory).toHaveBeenCalledTimes(2);
  });

  test("dispose された後に呼び出すと、エラーを投げる", ({ expect }) => {
    // Arrange
    const kvs = createMockKvs();
    const memoMap = new MemoMap(kvs);
    memoMap[Symbol.dispose]();

    // Act & Assert
    expect(() => {
      memoMap.get("key", () => "value", []);
    }).toThrow("MemoMap はすでに破棄され、使用できなくなっています。");
  });
});

describe("dispose によるクリーンアップ", () => {
  test("インスタンスの生存期間中にアクセスされなかったキーが KVS から削除される", ({ expect }) => {
    // Arrange
    const kvs = createMockKvs();
    // 事前に古いデータが入っている状態をシミュレートする。
    kvs.set("old-key", { deps: [], memo: "old" });
    kvs.set("active-key", { deps: [], memo: "active" });

    const memoMap = new MemoMap(kvs);

    // Act
    // active-key だけにアクセスする。
    memoMap.get("active-key", () => "active", []);
    memoMap[Symbol.dispose]();

    // Assert
    expect(kvs.delete).toHaveBeenCalledWith("old-key");
    expect(kvs.delete).not.toHaveBeenCalledWith("active-key");
  });
});

describe("依存関係の比較", () => {
  test("deps の長さが異なる場合、別の依存関係として扱われる", ({ expect }) => {
    // Arrange
    const kvs = createMockKvs();
    const memoMap = new MemoMap(kvs);
    const factory = vi.fn(() => "value");

    memoMap.get("key", factory, [1, 2]);
    factory.mockClear();

    // Act
    memoMap.get("key", factory, [1, 2, 3]);

    // Assert
    expect(factory).toHaveBeenCalledTimes(1);
  });

  test("NaN の比較において Object.is が使用され、同一とみなされる", ({ expect }) => {
    // Arrange
    const kvs = createMockKvs();
    const memoMap = new MemoMap(kvs);
    const factory = vi.fn(() => "value");

    memoMap.get("key", factory, [NaN]);
    factory.mockClear();

    // Act
    memoMap.get("key", factory, [NaN]);

    // Assert
    expect(factory).not.toHaveBeenCalled();
  });
});
