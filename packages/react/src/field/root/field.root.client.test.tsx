import "@suru-ui/theme/suru.css";
import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "../field.parts.js";
import { FieldControl } from "../control/field.control.jsx";
import { FieldRoot } from "./field.root.jsx";
import "../../../tests/src/_locators.js";

describe("FieldRoot", () => {
  test("既定の基底クラスとスコープの始点を持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FieldRoot />);

    // 検証
    const root = screen.getByClassName("sui_field").element();
    expect(root.classList.contains("sui_field")).toBe(true);
    expect(root.getAttribute("data-scope")).toBe("");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FieldRoot className="custom" />);

    // 検証
    const root = screen.getByClassName("sui_field").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_field")).toBe(true);
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FieldRoot render={<section />} />);

    // 検証
    const root = screen.getByClassName("sui_field").element();
    expect(root.tagName).toBe("SECTION");
    expect(root.getAttribute("data-scope")).toBe("");
  });

  test("検証前は未検証の状態クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FieldRoot />);

    // 検証
    const root = screen.getByClassName("sui_field").element();
    expect(root.classList.contains("sui_field-unverified")).toBe(true);
    expect(root.classList.contains("sui_field-valid")).toBe(false);
    expect(root.classList.contains("sui_field-invalid")).toBe(false);
  });

  test("外部から無効を指定すると無効の状態クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FieldRoot invalid />);

    // 検証
    const root = screen.getByClassName("sui_field").element();
    expect(root.classList.contains("sui_field-invalid")).toBe(true);
    expect(root.classList.contains("sui_field-valid")).toBe(false);
  });

  test("無効時は無効と未検証の状態クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FieldRoot disabled />);

    // 検証
    const root = screen.getByClassName("sui_field").element();
    expect(root.classList.contains("sui_field-disabled")).toBe(true);
    expect(root.classList.contains("sui_field-unverified")).toBe(true);
  });

  test("編集済みと操作済みの状態クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FieldRoot dirty touched />);

    // 検証
    const root = screen.getByClassName("sui_field").element();
    expect(root.classList.contains("sui_field-dirty")).toBe(true);
    expect(root.classList.contains("sui_field-touched")).toBe(true);
  });

  test("入力があると入力済みの状態クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FieldRoot>
        <FieldControl defaultValue="すーるー" aria-label="名前" />
      </FieldRoot>,
    );

    // 検証
    const root = screen.getByClassName("sui_field").element();
    expect(root.classList.contains("sui_field-filled")).toBe(true);
  });
});
