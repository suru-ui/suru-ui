import { describe, test, vi } from "vitest";
import toBaseUiProps, { type PropsCache } from "../../src/shared/to-base-ui-props.js";

// キャッシュを無効化するデフォルトの振る舞いを使用
const noCache: PropsCache = {
  get: (_key, factory) => factory(),
};

describe("単一の props オブジェクトを変換する場合", () => {
  test("イベントハンドラー以外のプロパティーはそのまま保持される", ({ expect }) => {
    // Arrange
    const props = { id: "test-id", "data-value": 123 };

    // Act
    const result = toBaseUiProps(props);

    // Assert
    expect(result).toEqual(props);
  });

  test("on で始まるイベントハンドラーが渡されたとき、引数のイベントが SuiEvent に変換される", ({ expect }) => {
    // Arrange
    const onEvent = vi.fn();
    const props = { onClick: onEvent };
    const baseUiEvent = { preventBaseUiHandler: vi.fn() };
    const result = toBaseUiProps(props, null, noCache);

    // Act
    result.onClick(baseUiEvent);

    // Assert
    const calledEvent = onEvent.mock.calls[0]![0];
    expect(calledEvent).toHaveProperty("preventSuiHandler");
    expect(typeof calledEvent.preventSuiHandler).toBe("function");
  });
});

describe("2 つの props オブジェクトを結合する場合", () => {
  test("通常のプロパティーは source が target を上書きする", ({ expect }) => {
    // Arrange
    const target = { id: "target", value: "old" };
    const source = { value: "new" };

    // Act
    const result = toBaseUiProps(target, source);

    // Assert
    expect(result.id).toBe("target");
    expect(result.value).toBe("new");
  });

  test("className が結合されるとき、source のクラスが優先（先頭）される", ({ expect }) => {
    // Arrange
    const target = { className: "target-class" };
    const source = { className: "source-class" };

    // Act
    const result = toBaseUiProps(target, source);

    // Assert
    expect(result.className).toContain("source-class");
    expect(result.className).toContain("target-class");
  });

  test("ref が結合されるとき、両方の ref が呼び出される", ({ expect }) => {
    // Arrange
    const targetRef = vi.fn();
    const sourceRef = { current: null };
    const target = { ref: targetRef };
    const source = { ref: sourceRef };
    const instance = { element: "dom" };

    // Act
    const result = toBaseUiProps(target, source);
    result.ref(instance);

    // Assert
    expect(targetRef).toHaveBeenCalledWith(instance);
    expect(sourceRef.current).toBe(instance);
  });

  test("イベントハンドラーが結合されるとき、source が先に実行される", ({ expect }) => {
    // Arrange
    const executionOrder: string[] = [];
    const targetHandler = vi.fn(() => executionOrder.push("target"));
    const sourceHandler = vi.fn(() => executionOrder.push("source"));
    const target = { onClick: targetHandler };
    const source = { onClick: sourceHandler };

    // Act
    const result = toBaseUiProps(target, source);
    // @ts-expect-error
    result.onClick({ preventBaseUiHandler: vi.fn() });

    // Assert
    expect(executionOrder).toEqual(["source", "target"]);
  });

  test("style が結合されるとき、オブジェクトプロパティーがマージされる", ({ expect }) => {
    // Arrange
    const target = { style: { color: "red", fontSize: "12px" } };
    const source = { style: { color: "blue" } };

    // Act
    const result = toBaseUiProps(target, source);

    // Assert
    expect(result.style).toEqual({ color: "blue", fontSize: "12px" });
  });
});

describe("関数形式のプロパティー（Render Props 等）の結合", () => {
  test("className が関数の場合、実行結果が結合される", ({ expect }) => {
    // Arrange
    const target = { className: (state: any) => (state.active ? "active" : "inactive") };
    const source = { className: "extra" };

    // Act
    const result = toBaseUiProps(target, source);
    const computed = result.className({ active: true });

    // Assert
    expect(computed).toContain("extra");
    expect(computed).toContain("active");
  });
});

describe("キャッシュの利用", () => {
  test("同じ値が渡されたとき、キャッシュから値が取得され factory は再実行されない", ({ expect }) => {
    // Arrange
    const cachedValue = { color: "cached" };
    const cache: PropsCache = {
      get: vi.fn().mockReturnValue(cachedValue),
    };
    const target = { style: { color: "red" } };
    const source = { style: { color: "blue" } };

    // Act
    const result = toBaseUiProps(target, source, cache);

    // Assert
    expect(result.style).toBe(cachedValue);
    expect(cache.get).toHaveBeenCalledWith("style", expect.any(Function), [
      target.style,
      source.style,
    ]);
  });
});

describe("エッジケース", () => {
  test("target と source が両方 null または undefined のとき、空のオブジェクトを返す", ({ expect }) => {
    // Act
    const result = toBaseUiProps(null, undefined);

    // Assert
    expect(result).toEqual({});
  });

  test("isEventHandlerPropKey が 'on' で始まる大文字以外のプロパティーを無視する", ({ expect }) => {
    // Arrange
    // "only" は on + 小文字なのでイベントハンドラーとはみなされない。
    const props = { only: vi.fn() };

    // Act
    const result = toBaseUiProps(props);

    // Assert
    // 変換（ラップ）されずにそのままの関数が返る。
    expect(result.only).toBe(props.only);
  });
});
