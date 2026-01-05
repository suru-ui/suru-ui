import { describe, test } from "vitest";
import { $ } from "../src/index.js";

describe("CSS カスタムプロパティープロキシー $", () => {
  describe("文字列への変換（toString）", () => {
    test("プロパティーをチェーンして文字列に変換したとき、var 関数形式の CSS 変数参照になる", ({ expect }) => {
      // Arrange & Act
      const result = `${$.sui.red[1]}`;

      // Assert
      expect(result).toBe("var(--sui-red-1)");
    });

    test("ネストされたプロパティーをチェーンしたとき、ハイフン区切りの CSS 変数参照になる", ({ expect }) => {
      // Arrange & Act
      const result = `${$.sui.grey.naked.normal}`;

      // Assert
      expect(result).toBe("var(--sui-grey-naked-normal)");
    });
  });

  describe("$name プロパティー", () => {
    test("$name にアクセスしたとき、var 関数を含まない CSS 変数名そのものになる", ({ expect }) => {
      // Arrange & Act
      const result = $.sui.blue[5].$name;

      // Assert
      expect(result).toBe("--sui-blue-5");
    });
  });

  describe("$keys プロパティー", () => {
    test("$keys にアクセスしたとき、アクセスしたパスの配列になる", ({ expect }) => {
      // Arrange & Act
      const result = $.sui.green[10].$keys;

      // Assert
      expect(result.length).toBe(3);
      expect(result[0]).toBe("sui");
      expect(result[1]).toBe("green");
      expect(result[2]).toBe("10");
    });
  });
});
