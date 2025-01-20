import { expect, test } from "vitest";
import isSlottable from "../src/is-slottable";
import Slottable from "../src/slottable";

test("Slottable と判定できる", () => {
  expect(isSlottable(<Slottable>{null}</Slottable>)).toBe(true);
  expect(isSlottable(<div />)).toBe(false);
});
