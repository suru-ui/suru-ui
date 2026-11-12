import "@suru-ui/theme/suru.css";
import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "../field.parts.js";
import { FieldControl } from "../control/field.control.jsx";
import { FieldRoot } from "../root/field.root.jsx";
import { FieldLabel } from "./field.label.jsx";
import "../../../tests/src/_locators.js";

describe("FieldLabel", () => {
  test("ラベルを描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <FieldRoot>
        <FieldLabel>名前</FieldLabel>
        <FieldControl />
      </FieldRoot>,
    );

    // 検証。
    const label = screen.getByText("名前").element();
    expect(label.tagName).toBe("LABEL");
    expect(label.classList.contains("sui_field_label")).toBe(true);
  });

  test("非ネイティブの要素で描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <FieldRoot>
        <FieldLabel render={<span />} nativeLabel={false}>
          名前
        </FieldLabel>
        <FieldControl />
      </FieldRoot>,
    );

    // 検証。
    const label = screen.getByText("名前").element();
    expect(label.tagName).toBe("SPAN");
    expect(label.classList.contains("sui_field_label")).toBe(true);
  });
});
