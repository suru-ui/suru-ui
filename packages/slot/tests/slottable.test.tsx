import * as React from "react";
import { expect, test } from "vitest";
import Slottable from "../src/slottable";

test("React 要素になる", () => {
  expect(React.isValidElement(<Slottable>CHILD</Slottable>)).toBe(true);
});
