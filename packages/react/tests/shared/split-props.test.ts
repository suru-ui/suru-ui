import { describe, expectTypeOf, test } from "vitest";
import splitProps from "../../src/shared/split-props.js";

describe("単一のキーリストで分割する場合", () => {
  test("指定されたキーが抽出され、残りのプロパティーが最後の要素に含まれる", ({ expect }) => {
    // Arrange
    const props = {
      id: 1,
      title: "Hello",
      className: "test-class",
    };
    const keysList = [["id", "title"]] as const;

    // Act
    const result = splitProps(props, keysList);

    // Assert
    expectTypeOf<keyof typeof result[0]>().toEqualTypeOf<"id" | "title">();
    expectTypeOf<keyof typeof result[1]>().toEqualTypeOf<"className">();
    expect(result).toHaveLength(2);
    expect(result[0]).toStrictEqual({ id: 1, title: "Hello" });
    expect(result[1]).toStrictEqual({ className: "test-class" });
  });
});

describe("複数のキーリストで分割する場合", () => {
  test("キーリストの順序に従って順次分割される", ({ expect }) => {
    // Arrange
    const props = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    };
    const keysList = [["a"], ["b", "c"]] as const;

    // Act
    const result = splitProps(props, keysList);

    // Assert
    expectTypeOf<keyof typeof result[0]>().toEqualTypeOf<"a">();
    expectTypeOf<keyof typeof result[1]>().toEqualTypeOf<"b" | "c">();
    expectTypeOf<keyof typeof result[2]>().toEqualTypeOf<"d">();
    expect(result).toHaveLength(3);
    expect(result[0]).toStrictEqual({ a: 1 });
    expect(result[1]).toStrictEqual({ b: 2, c: 3 });
    expect(result[2]).toStrictEqual({ d: 4 });
  });

  test("先に指定されたキーリストに含まれるプロパティーは、後のリストには含まれない", ({ expect }) => {
    // Arrange
    const props = { a: 1 };
    const keysList = [["a"], ["a"]] as const;

    // Act
    const result = splitProps(props, keysList);

    // Assert
    expectTypeOf<keyof typeof result[0]>().toEqualTypeOf<"a">();
    expectTypeOf<keyof typeof result[1]>().toEqualTypeOf<never>();
    expectTypeOf<keyof typeof result[2]>().toEqualTypeOf<never>();
    expect(result).toHaveLength(3);
    expect(result[0]).toStrictEqual({ a: 1 });
    expect(result[1]).toStrictEqual({}); // 既に削除されているため空になる
    expect(result[2]).toStrictEqual({});
  });
});

describe("存在しないキーを指定した場合", () => {
  test("存在しないキーは無視され、存在するプロパティーのみが抽出される", ({ expect }) => {
    // Arrange
    const props = { id: 1 };
    const keysList = [["id", "missing"]] as const;

    // Act
    const result = splitProps(props, keysList);

    // Assert
    expectTypeOf<keyof typeof result[0]>().toEqualTypeOf<"id">();
    expectTypeOf<keyof typeof result[1]>().toEqualTypeOf<never>();
    expect(result).toHaveLength(2);
    expect(result[0]).toStrictEqual({ id: 1 });
    expect(result[0]).not.toHaveProperty("missing");
    expect(result[0]).toStrictEqual({ id: 1 });
  });
});

describe("特殊なプロパティー値の扱い", () => {
  test("undefined や null を持つプロパティーも正しく分割され、保持される", ({ expect }) => {
    // Arrange
    const props = {
      a: undefined,
      b: null,
    };
    const keysList = [["a"]] as const;

    // Act
    const result = splitProps(props, keysList);

    // Assert
    expect(result).toHaveLength(2);
    expect(result[0]).toHaveProperty("a", undefined);
    expect(result[1]).toHaveProperty("b", null);
  });
});

describe("不変性の検証", () => {
  test("元の props オブジェクトが変更されない", ({ expect }) => {
    // Arrange
    const props = { a: 1, b: 2 };
    const keysList = [["a"]] as const;

    // Act
    splitProps(props, keysList);

    // Assert
    expect(props).toStrictEqual({ a: 1, b: 2 });
  });
});
