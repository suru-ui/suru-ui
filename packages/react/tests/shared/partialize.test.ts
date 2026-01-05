import { describe, test } from "vitest";
import partialize from "../../src/shared/partialize.js";

describe("オブジェクトのプロパティーが undefined を含んでいる場合", () => {
  test("undefined の値を持つプロパティーが削除されるとき、結果にそのキーが含まれない", ({ expect }) => {
    // Arrange
    const input = {
      name: "Alice",
      age: undefined,
      location: "Tokyo",
    };

    // Act
    const result = partialize(input);

    // Assert
    expect(Object.keys(result)).toHaveLength(2);
    expect(result).toHaveProperty("name", "Alice");
    expect(result).toHaveProperty("location", "Tokyo");
    expect(result).not.toHaveProperty("age");
  });

  test("null は削除されず、そのまま保持される", ({ expect }) => {
    // Arrange
    const input = {
      id: 1,
      description: null,
    };

    // Act
    const result = partialize(input);

    // Assert
    expect(Object.keys(result)).toHaveLength(2);
    expect(result).toHaveProperty("description", null);
  });
});

describe("すべてのプロパティーが有効な値を持つ場合", () => {
  test("プロパティーが一つも削除されず、元の値がすべて維持される", ({ expect }) => {
    // Arrange
    const input = {
      status: "active",
      count: 0,
      isValid: false,
    };

    // Act
    const result = partialize(input);

    // Assert
    expect(Object.keys(result)).toHaveLength(3);
    expect(result).toEqual(input);
  });
});

describe("空のオブジェクトの場合", () => {
  test("空のオブジェクトを渡したとき、空のオブジェクトが返る", ({ expect }) => {
    // Arrange
    const input = {};

    // Act
    const result = partialize(input);

    // Assert
    expect(Object.keys(result)).toHaveLength(0);
    expect(result).toEqual({});
  });
});

describe("不変性の検証", () => {
  test("元のオブジェクトが変更されず、新しいオブジェクトが返る", ({ expect }) => {
    // Arrange
    const input = { a: 1, b: undefined };

    // Act
    const result = partialize(input);

    // Assert
    expect(result).not.toBe(input);
    expect(input).toHaveProperty("b", undefined);
  });
});
