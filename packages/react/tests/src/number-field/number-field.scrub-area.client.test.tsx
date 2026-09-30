import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { NumberFieldRoot } from "../../../src/number-field/number-field.root.jsx";
import { NumberFieldScrubArea } from "../../../src/number-field/number-field.scrub-area.jsx";
import "../_locators.js";

describe("NumberFieldScrubArea", () => {
  test("ドラッグ領域を表示して修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <NumberFieldRoot>
        <NumberFieldScrubArea>数量</NumberFieldScrubArea>
      </NumberFieldRoot>,
    );

    // 検証
    const area = screen.getByClassName("sui_number_field_scrub_area").element();
    expect(area.tagName).toBe("SPAN");
    expect(area.textContent).toBe("数量");
    expect(area.getAttribute("role")).toBe("presentation");
    expect(getComputedStyle(area).touchAction).toBe("none");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <NumberFieldRoot>
        <NumberFieldScrubArea className="custom">数量</NumberFieldScrubArea>
      </NumberFieldRoot>,
    );

    // 検証
    const area = screen.getByClassName("sui_number_field_scrub_area").element();
    expect(area.classList.contains("custom")).toBe(true);
    expect(area.classList.contains("sui_number_field_scrub_area")).toBe(true);
  });

  test("render の関数へスタイル情報とスクラブの状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <NumberFieldRoot color="blue" size="lg">
        <NumberFieldScrubArea
          render={(props, state) => (
            <span
              {...props}
              data-probe={`${state.size}/${state.color}/${String(state.scrubbing)}`}
            />
          )}
        >
          数量
        </NumberFieldScrubArea>
      </NumberFieldRoot>,
    );

    // 検証
    expect(
      screen.getByClassName("sui_number_field_scrub_area").element().getAttribute("data-probe"),
    ).toBe("lg/blue/false");
  });
});
