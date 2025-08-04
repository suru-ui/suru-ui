import { test, vi } from "vitest";
import { Hash } from "../src";

function hashOf(value: any): number {
  return (new Hash()).update(value).digest();
}

test("空文字列をハッシュ化できる", ({ expect }) => {
  const h = new Hash();
  h.update("");
  const digest = h.digest();

  expect(typeof digest).toBe("number");
});

test("同じ値は同じハッシュになる", ({ expect }) => {
  const a = hashOf("foo");
  const b = hashOf("foo");

  expect(a).toBe(b);
});

test("異なる文字列は異なるハッシュになる", ({ expect }) => {
  const a = hashOf("foo");
  const b = hashOf("bar");

  expect(a).not.toBe(b);
});

test("文字コードが 0xFF を超える場合は警告がでる", ({ expect }) => {
  using spy = vi.spyOn(console, "error");
  const h = new Hash();

  expect(spy.mock.calls).toEqual([]);

  h.update("あ");

  expect(spy.mock.calls).toEqual([
    ["suru-ui(hash): 文字コードが 0xFF を超える文字が含まれています:", `"あ"`],
  ]);
});

test("undefined, null, boolean が区別される", ({ expect }) => {
  const a = hashOf(undefined);
  const b = hashOf(null);
  const c = hashOf(true);
  const d = hashOf(false);

  expect(new Set([a, b, c, d]).size).toBe(4);
});

test("数値 NaN, Infinity, -Infinity, その他で正しく処理される", ({ expect }) => {
  const values = [NaN, Infinity, -Infinity, 0, 1, -1];
  const digests = values.map(hashOf);
  const unique = new Set(digests);

  expect(unique.size).toBe(values.length);
});

test("bigint をハッシュ化できる", ({ expect }) => {
  const a = hashOf(123n);
  const b = hashOf(456n);

  expect(a).not.toBe(b);
});

test("空配列と空オブジェクトが区別される", ({ expect }) => {
  const arrHash = hashOf([]);
  const objHash = hashOf({});

  expect(arrHash).not.toBe(objHash);
});

test("配列の要素の順序が影響する", ({ expect }) => {
  const a = hashOf([1, 2, 3]);
  const b = hashOf([3, 2, 1]);

  expect(a).not.toBe(b);
});

test("オブジェクトのキーの順序が影響する", ({ expect }) => {
  const a = hashOf({ x: 1, y: 2 });
  const b = hashOf({ y: 2, x: 1 });

  expect(a).not.toBe(b);
});

test("toJSON, toString, toPrimitive を持つオブジェクトを処理できる", ({ expect }) => {
  const toJSON = hashOf({ toJSON: () => "json" });
  const toString = hashOf({ toString: () => "str" });
  const toPrimitive = hashOf({ toPrimitive: () => "prim" });
  const raw = hashOf("json");

  expect(toJSON).toBe(raw);
  expect(toString).toBe(hashOf("str"));
  expect(toPrimitive).toBe(hashOf("prim"));
});
