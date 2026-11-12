import "@suru-ui/theme/suru.css";
import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "../fieldset.parts.js";
import { FieldsetRoot } from "./fieldset.root.jsx";
import "../../../tests/src/_locators.js";

describe("FieldsetRoot", () => {
  test("既定の基底クラスとスコープの始点を持つ", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<FieldsetRoot />);

    // 検証。
    const root = screen.getByClassName("sui_fieldset").element();
    expect(root.classList.contains("sui_fieldset")).toBe(true);
    expect(root.getAttribute("data-scope")).toBe("");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<FieldsetRoot className="custom" />);

    // 検証。
    const root = screen.getByClassName("sui_fieldset").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_fieldset")).toBe(true);
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<FieldsetRoot render={<section />} />);

    // 検証。
    const root = screen.getByClassName("sui_fieldset").element();
    expect(root.tagName).toBe("SECTION");
    expect(root.getAttribute("data-scope")).toBe("");
  });

  test("無効を指定すると無効の状態クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<FieldsetRoot disabled />);

    // 検証。
    const root = screen.getByClassName("sui_fieldset").element();
    expect(root.classList.contains("sui_fieldset-disabled")).toBe(true);
  });
});
