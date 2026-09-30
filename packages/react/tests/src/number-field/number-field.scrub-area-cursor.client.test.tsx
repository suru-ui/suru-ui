import * as React from "react";
import { describe, test } from "vitest";

import { NumberFieldAPI } from "../../../src/number-field/number-field.jsx";
import "../_locators.js";

describe("NumberFieldScrubAreaCursor", () => {
  test("既定のカーソルアイコンを持つ", ({ expect }) => {
    // 準備と実行
    const api = new NumberFieldAPI({});

    // 検証
    const props = api.getScrubAreaCursorProps();
    expect(React.isValidElement(props.children)).toBe(true);
  });

  test("slotProps の指定を既定のアイコンへ重ねる", ({ expect }) => {
    // 準備と実行
    const api = new NumberFieldAPI({ slotProps: { scrubAreaCursor: { id: "cursor" } } });

    // 検証
    expect(api.getScrubAreaCursorProps().id).toBe("cursor");
    expect(React.isValidElement(api.getScrubAreaCursorProps().children)).toBe(true);
  });
});
