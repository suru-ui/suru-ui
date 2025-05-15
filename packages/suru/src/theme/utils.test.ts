import { expect, test } from "vitest";
import { $ } from ".";

test("CSS カスタムプロパティを取得できる", () => {
  expect(`${$.sui.blue[50]}`).toBe("var(--sui-blue-50)");
  expect($.color.blue[50].$keys).toStrictEqual(["color", "blue", "50"]);
});

test("Object.hasOwn でプロパティの有無を確認できる", () => {
  expect(Object.hasOwn($.color.blue[100], "toString")).toBe(true);
  expect(Object.hasOwn($.color.blue[100], "$name")).toBe(true);
  expect(Object.hasOwn($.color.blue[100], "$keys")).toBe(true);
});
