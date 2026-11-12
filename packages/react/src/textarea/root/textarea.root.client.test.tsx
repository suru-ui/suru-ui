import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { FieldRoot } from "../../field/root/field.root.jsx";
import { TextareaRoot } from "./textarea.root.jsx";
import "../textarea.parts.js";
import "../../../tests/src/_locators.js";

describe("TextareaRoot", () => {
  test("textarea を既定の要素にして既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<TextareaRoot aria-label="問い合わせ内容" />);

    // 検証。
    const root = screen
      .getByRole("textbox", { name: "問い合わせ内容" })
      .element() as HTMLTextAreaElement;
    expect(root.tagName).toBe("TEXTAREA");
    expect(root.classList.contains("sui_textarea")).toBe(true);
    expect(root.classList.contains("sui_textarea-size_md")).toBe(true);
    expect(root.classList.contains("sui_textarea-color_grey")).toBe(true);
    expect(root.classList.contains("sui_textarea-radius_md")).toBe(true);
    expect(root.classList.contains("sui_textarea-variant_naked")).toBe(true);
    expect(root.classList.contains("sui_textarea-outlined")).toBe(true);
  });

  test("指定した大きさと配色と角丸と外観のクラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TextareaRoot size="lg" color="blue" variant="naked" aria-label="問い合わせ内容" />,
    );

    // 検証。
    const root = screen.getByRole("textbox", { name: "問い合わせ内容" }).element();
    expect(root.classList.contains("sui_textarea-size_lg")).toBe(true);
    expect(root.classList.contains("sui_textarea-color_blue")).toBe(true);
    expect(root.classList.contains("sui_textarea-radius_lg")).toBe(true);
    expect(root.classList.contains("sui_textarea-variant_naked")).toBe(true);
  });

  test("角丸を指定しないときは大きさに追従させる", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <TextareaRoot id="sm" size="sm" aria-label="小" />
        <TextareaRoot id="lg" size="lg" aria-label="大" />
      </>,
    );

    // 検証。
    const sm = screen.container.querySelector<HTMLElement>("#sm")!;
    expect(sm.classList.contains("sui_textarea-radius_sm")).toBe(true);

    const lg = screen.container.querySelector<HTMLElement>("#lg")!;
    expect(lg.classList.contains("sui_textarea-radius_lg")).toBe(true);
  });

  test("枠線の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<TextareaRoot outlined aria-label="問い合わせ内容" />);

    // 検証。
    const root = screen.getByRole("textbox", { name: "問い合わせ内容" }).element();
    expect(root.classList.contains("sui_textarea-outlined")).toBe(true);
  });

  test("スタイル起点として data-scope を付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<TextareaRoot aria-label="問い合わせ内容" />);

    // 検証。
    expect(
      screen.getByRole("textbox", { name: "問い合わせ内容" }).element().getAttribute("data-scope"),
    ).toBe("");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<TextareaRoot className="custom" aria-label="問い合わせ内容" />);

    // 検証。
    const root = screen.getByRole("textbox", { name: "問い合わせ内容" }).element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_textarea")).toBe(true);
  });

  test("利用者の props を入力欄へ渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TextareaRoot
        name="message"
        rows={4}
        required
        maxLength={200}
        placeholder="入力してください"
        autoComplete="off"
        defaultValue="問い合わせの本文"
        aria-label="問い合わせ内容"
      />,
    );

    // 検証。
    const root = screen
      .getByRole("textbox", { name: "問い合わせ内容" })
      .element() as HTMLTextAreaElement;
    expect(root.name).toBe("message");
    expect(root.value).toBe("問い合わせの本文");
    expect(root.placeholder).toBe("入力してください");
    expect(root.rows).toBe(4);
    expect(root.maxLength).toBe(200);
    expect(root.getAttribute("autocomplete")).toBe("off");
    expect(root.required).toBe(true);
  });

  test("無効時は状態クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<TextareaRoot disabled aria-label="問い合わせ内容" />);

    // 検証。
    const root = screen.getByRole("textbox", { name: "問い合わせ内容" }).element();
    expect(root.classList.contains("sui_textarea-disabled")).toBe(true);
  });

  test("Field の検証状態をクラスへ反映する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <FieldRoot invalid>
          <TextareaRoot aria-label="不正" />
        </FieldRoot>
        <FieldRoot>
          <TextareaRoot aria-label="未検証" />
        </FieldRoot>
      </>,
    );

    // 検証。
    const invalid = screen.getByRole("textbox", { name: "不正" }).element();
    expect(invalid.classList.contains("sui_textarea-invalid")).toBe(true);

    const unverified = screen.getByRole("textbox", { name: "未検証" }).element();
    expect(unverified.classList.contains("sui_textarea-unverified")).toBe(true);
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<TextareaRoot render={<input />} aria-label="問い合わせ内容" />);

    // 検証。
    const root = screen.getByRole("textbox", { name: "問い合わせ内容" }).element();
    expect(root.tagName).toBe("INPUT");
    expect(root.classList.contains("sui_textarea")).toBe(true);
  });
});
