import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { NumberField, NumberFieldAPI } from "../../../src/number-field/number-field.jsx";
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

  test("スクラブしていないときは描画しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<NumberField scrubArea="数量" />);

    // 検証
    expect(screen.container.querySelector(".sui_number_field_scrub_area_cursor")).toBe(null);
    expect(document.querySelector(".sui_number_field_scrub_area_cursor")).toBe(null);
  });
});
