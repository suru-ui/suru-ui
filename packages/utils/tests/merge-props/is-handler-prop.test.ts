import { expect, test } from "vitest";
import isHandlerProps from "../../src/merge-props/is-handler-prop-name";

test("ハンドラのプロパティ名の場合は true を返す", () => {
  expect(isHandlerProps("onClick")).toBe(true);
});

test("ハンドラのプロパティ名でない場合は false を返す", () => {
  expect.soft(isHandlerProps("on")).toBe(false);
  expect.soft(isHandlerProps("onclick")).toBe(false);
  expect.soft(isHandlerProps("on3")).toBe(false);
  expect.soft(isHandlerProps("style")).toBe(false);
});
