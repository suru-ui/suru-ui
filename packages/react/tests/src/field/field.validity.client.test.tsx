import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/field/field.parts.js";
import { FieldControl } from "../../../src/field/field.control.jsx";
import { FieldRoot } from "../../../src/field/field.root.jsx";
import { FieldValidity } from "../../../src/field/field.validity.jsx";

describe("FieldValidity", () => {
  test("検証前の状態を関数へ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FieldRoot>
        <FieldValidity>
          {(state) => <span>有効性: {String(state.validity.valid)}</span>}
        </FieldValidity>
      </FieldRoot>,
    );

    // 検証
    expect(screen.getByText("有効性: null").query()).not.toBe(null);
  });

  test("外部から無効を指定すると無効な状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FieldRoot invalid>
        <FieldValidity>
          {(state) => <span>有効性: {String(state.validity.valid)}</span>}
        </FieldValidity>
      </FieldRoot>,
    );

    // 検証
    expect(screen.getByText("有効性: false").query()).not.toBe(null);
  });

  test("独自検証のエラー一覧を関数へ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <FieldRoot validationMode="onBlur" validate={() => ["一つ目", "二つ目"]}>
          <FieldControl aria-label="名前" defaultValue="すーるー" />
          <FieldValidity>{(state) => <span>エラー: {state.errors.join("、")}</span>}</FieldValidity>
        </FieldRoot>
        <button type="button">外側</button>
      </>,
    );
    const input = screen.getByRole("textbox", { name: "名前" }).element();
    input.focus();
    await Promise.resolve();
    input.blur();

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByText("エラー: 一つ目、二つ目").query()).not.toBe(null);
    });
  });
});
