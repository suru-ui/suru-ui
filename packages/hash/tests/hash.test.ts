import { describe, expect, test } from "vitest";
import hash from "../src/hash";

describe("文字列のハッシュ化", () => {
  test("空の文字列", () => {
    expect(hash("")).toBe("0");
  });

  test("エスケープが不要な文字列", () => {
    expect(hash("abc")).toMatch(/^[0-9a-z]+$/);
  });

  test("エスケープが必要な文字列", () => {
    expect(hash("a\"b\\c")).toMatch(/^[0-9a-z]+$/);
  });

  test("JSON に変換する", () => {
    expect(hash("a\nb")).toMatch(/^[0-9a-z]+$/);
  });
});

describe("数値のハッシュ化", () => {
  test("NaN", () => {
    expect(hash(NaN)).toMatch(/^[0-9a-z]+$/);
  });

  test("Infinity", () => {
    expect(hash(Infinity)).toMatch(/^[0-9a-z]+$/);
  });

  test("-Infinity", () => {
    expect(hash(-Infinity)).toMatch(/^[0-9a-z]+$/);
  });

  test("数値", () => {
    expect(hash(123)).toMatch(/^[0-9a-z]+$/);
  });
});

describe("真偽値のハッシュ化", () => {
  test("true", () => {
    expect(hash(true)).toMatch(/^[0-9a-z]+$/);
  });

  test("false", () => {
    expect(hash(false)).toMatch(/^[0-9a-z]+$/);
  });
});

describe("null のハッシュ化", () => {
  test("null", () => {
    expect(hash(null)).toMatch(/^[0-9a-z]+$/);
  });
});

describe("undefined のハッシュ化", () => {
  test("undefined", () => {
    expect(hash(undefined)).toMatch(/^[0-9a-z]+$/);
  });
});

describe("配列のハッシュ化", () => {
  test("空の配列", () => {
    expect(hash([])).toMatch(/^[0-9a-z]+$/);
  });

  test("配列", () => {
    expect(hash([1, "a", true, null, undefined])).toMatch(/^[0-9a-z]+$/);
  });
});

describe("オブジェクトのハッシュ化", () => {
  test("空のオブジェクト", () => {
    expect(hash({})).toMatch(/^[0-9a-z]+$/);
  });

  test("オブジェクト", () => {
    expect(hash({ a: 1, b: "a", c: true, d: null, e: undefined }))
      .toMatch(/^[0-9a-z]+$/);
  });
});

describe("プリミティブになれるオブジェクトのハッシュ化", () => {
  test("toPrimitive メソッドを持つオブジェクト", () => {
    const obj = {
      value: 123,
      toPrimitive() {
        return this.value;
      },
    };

    expect(hash(obj)).toMatch(/^[0-9a-z]+$/);
    expect(hash(obj)).toBe(hash(123));
  });

  test("toString メソッドを持つオブジェクト", () => {
    const obj = {
      value: "a",
      toString() {
        return this.value;
      },
    };

    expect(hash(obj)).toMatch(/^[0-9a-z]+$/);
    expect(hash(obj)).toBe(hash("a"));
  });
});

test("ハッシュが衝突しない", () => {
  const values = [
    "",
    "abc",
    "a\"b\\c",
    "a\nb",

    NaN,
    Infinity,
    -Infinity,
    true,
    false,
    null,
    undefined,

    "NaN",
    "Infinity",
    "-Infinity",
    "true",
    "false",
    "null",
    "undefined",

    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",

    [],
    [1, "a", true, null, undefined],
    {},
    { a: 1, b: "a", c: true, d: null, e: undefined },
  ];
  const hashList = values.map(value => hash(value));

  expect([...new Set(hashList)]).toStrictEqual(hashList);
});
