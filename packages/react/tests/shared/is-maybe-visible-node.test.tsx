import { describe, test } from "vitest";
import isMaybeVisibleNode from "../../src/shared/is-maybe-visible-node.js";

describe("React が描画を無視する値の場合", () => {
  test("null を渡したとき、false になる", ({ expect }) => {
    // Arrange
    const input = null;

    // Act
    const result = isMaybeVisibleNode(input);

    // Assert
    expect(result).toBe(false);
  });

  test("undefined を渡したとき、false になる", ({ expect }) => {
    // Arrange
    const input = undefined;

    // Act
    const result = isMaybeVisibleNode(input);

    // Assert
    expect(result).toBe(false);
  });

  test("true を渡したとき、false になる", ({ expect }) => {
    // Arrange
    const input = true;

    // Act
    const result = isMaybeVisibleNode(input);

    // Assert
    expect(result).toBe(false);
  });

  test("false を渡したとき、false になる", ({ expect }) => {
    // Arrange
    const input = false;

    // Act
    const result = isMaybeVisibleNode(input);

    // Assert
    expect(result).toBe(false);
  });
});

describe("描画対象となる値の場合", () => {
  test("文字列を渡したとき、true になる", ({ expect }) => {
    // Arrange
    const input = "Hello World";

    // Act
    const result = isMaybeVisibleNode(input);

    // Assert
    expect(result).toBe(true);
  });

  test("空文字列を渡したとき、true になる", ({ expect }) => {
    // Arrange
    const input = "";

    // Act
    const result = isMaybeVisibleNode(input);

    // Assert
    expect(result).toBe(true);
  });

  test("数値の 0 を渡したとき、true になる", ({ expect }) => {
    // Arrange
    const input = 0;

    // Act
    const result = isMaybeVisibleNode(input);

    // Assert
    expect(result).toBe(true);
  });

  test("React 要素（オブジェクト）を渡したとき、true になる", ({ expect }) => {
    // Arrange
    const input = <div />;

    // Act
    const result = isMaybeVisibleNode(input);

    // Assert
    expect(result).toBe(true);
  });

  test("配列を渡したとき、true になる", ({ expect }) => {
    // Arrange
    const input: any[] = [];

    // Act
    const result = isMaybeVisibleNode(input);

    // Assert
    expect(result).toBe(true);
  });
});
