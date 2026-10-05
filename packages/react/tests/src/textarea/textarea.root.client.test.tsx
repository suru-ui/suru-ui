import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { FieldRoot } from "../../../src/field/root/field.root.jsx";
import { TextareaRoot } from "../../../src/textarea/root/textarea.root.jsx";
import "../../../src/textarea/textarea.parts.js";
import "../_locators.js";

describe("TextareaRoot", () => {
  test("textarea を既定の要素にして既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<TextareaRoot aria-label="問い合わせ内容" />);

    // 検証
    const root = screen
      .getByRole("textbox", { name: "問い合わせ内容" })
      .element() as HTMLTextAreaElement;
    expect(root.tagName).toBe("TEXTAREA");
    expect(root.classList.contains("sui_textarea")).toBe(true);
    expect(root.classList.contains("sui_textarea-size_md")).toBe(true);
    expect(root.classList.contains("sui_textarea-color_grey")).toBe(true);
    expect(root.classList.contains("sui_textarea-radius_md")).toBe(true);
    expect(root.classList.contains("sui_textarea-variant_liquid")).toBe(true);
    expect(root.classList.contains("sui_textarea-outlined")).toBe(false);
  });

  test("指定した大きさと配色と角丸と外観のクラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TextareaRoot aria-label="問い合わせ内容" color="blue" size="lg" variant="naked" />,
    );

    // 検証
    const root = screen.getByRole("textbox", { name: "問い合わせ内容" }).element();
    expect(root.classList.contains("sui_textarea-size_lg")).toBe(true);
    expect(root.classList.contains("sui_textarea-color_blue")).toBe(true);
    expect(root.classList.contains("sui_textarea-radius_lg")).toBe(true);
    expect(root.classList.contains("sui_textarea-variant_naked")).toBe(true);
  });

  test("角丸を指定しないときは大きさに追従させる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <TextareaRoot aria-label="小" id="sm" size="sm" />
        <TextareaRoot aria-label="大" id="lg" size="lg" />
      </>,
    );

    // 検証
    const sm = screen.container.querySelector<HTMLElement>("#sm")!;
    expect(sm.classList.contains("sui_textarea-radius_sm")).toBe(true);
    const lg = screen.container.querySelector<HTMLElement>("#lg")!;
    expect(lg.classList.contains("sui_textarea-radius_lg")).toBe(true);
  });

  test("枠線の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<TextareaRoot aria-label="問い合わせ内容" outlined />);

    // 検証
    const root = screen.getByRole("textbox", { name: "問い合わせ内容" }).element();
    expect(root.classList.contains("sui_textarea-outlined")).toBe(true);
  });

  test("スタイル起点として data-scope を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<TextareaRoot aria-label="問い合わせ内容" />);

    // 検証
    expect(
      screen.getByRole("textbox", { name: "問い合わせ内容" }).element().getAttribute("data-scope"),
    ).toBe("");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<TextareaRoot aria-label="問い合わせ内容" className="custom" />);

    // 検証
    const root = screen.getByRole("textbox", { name: "問い合わせ内容" }).element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_textarea")).toBe(true);
  });

  test("利用者の props を入力欄へ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TextareaRoot
        aria-label="問い合わせ内容"
        autoComplete="off"
        defaultValue="問い合わせの本文"
        maxLength={200}
        name="message"
        placeholder="入力してください"
        required
        rows={4}
      />,
    );

    // 検証
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
    // 準備と実行
    const screen = await render(<TextareaRoot aria-label="問い合わせ内容" disabled />);

    // 検証
    const root = screen.getByRole("textbox", { name: "問い合わせ内容" }).element();
    expect(root.classList.contains("sui_textarea-disabled")).toBe(true);
  });

  test("Field の検証状態をクラスへ反映する", async ({ expect }) => {
    // 準備と実行
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

    // 検証
    const invalid = screen.getByRole("textbox", { name: "不正" }).element();
    expect(invalid.classList.contains("sui_textarea-invalid")).toBe(true);
    const unverified = screen.getByRole("textbox", { name: "未検証" }).element();
    expect(unverified.classList.contains("sui_textarea-unverified")).toBe(true);
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<TextareaRoot aria-label="問い合わせ内容" render={<input />} />);

    // 検証
    const root = screen.getByRole("textbox", { name: "問い合わせ内容" }).element();
    expect(root.tagName).toBe("INPUT");
    expect(root.classList.contains("sui_textarea")).toBe(true);
  });
});
