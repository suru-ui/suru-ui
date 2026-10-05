import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { FieldRoot } from "../../field/root/field.root.jsx";
import "../input.parts.js";
import { InputRoot } from "./input.root.jsx";
import "../../../tests/src/_locators.js";

describe("InputRoot", () => {
  test("input を既定の要素にして既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<InputRoot aria-label="名前" />);

    // 検証
    const root = screen.getByRole("textbox", { name: "名前" }).element() as HTMLInputElement;
    expect(root.tagName).toBe("INPUT");
    expect(root.type).toBe("text");
    expect(root.classList.contains("sui_input")).toBe(true);
    expect(root.classList.contains("sui_input-size_md")).toBe(true);
    expect(root.classList.contains("sui_input-color_grey")).toBe(true);
    expect(root.classList.contains("sui_input-radius_md")).toBe(true);
    expect(root.classList.contains("sui_input-variant_liquid")).toBe(true);
    expect(root.classList.contains("sui_input-outlined")).toBe(false);
  });

  test("指定した大きさと配色と角丸と外観のクラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <InputRoot size="lg" color="blue" variant="naked" aria-label="名前" />,
    );

    // 検証
    const root = screen.getByRole("textbox", { name: "名前" }).element();
    expect(root.classList.contains("sui_input-size_lg")).toBe(true);
    expect(root.classList.contains("sui_input-color_blue")).toBe(true);
    expect(root.classList.contains("sui_input-radius_lg")).toBe(true);
    expect(root.classList.contains("sui_input-variant_naked")).toBe(true);
  });

  test("角丸を指定しないときは大きさに追従させる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <InputRoot id="sm" size="sm" aria-label="小" />
        <InputRoot id="full" size="lg" radius="full" aria-label="大" />
      </>,
    );

    // 検証
    const sm = screen.container.querySelector<HTMLElement>("#sm")!;
    expect(sm.classList.contains("sui_input-radius_sm")).toBe(true);
    const full = screen.container.querySelector<HTMLElement>("#full")!;
    expect(full.classList.contains("sui_input-radius_full")).toBe(true);
  });

  test("枠線の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<InputRoot outlined aria-label="名前" />);

    // 検証
    const root = screen.getByRole("textbox", { name: "名前" }).element();
    expect(root.classList.contains("sui_input-outlined")).toBe(true);
  });

  test("スタイル起点として data-scope を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<InputRoot aria-label="名前" />);

    // 検証
    expect(screen.getByRole("textbox", { name: "名前" }).element().getAttribute("data-scope")).toBe(
      "",
    );
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<InputRoot className="custom" aria-label="名前" />);

    // 検証
    const root = screen.getByRole("textbox", { name: "名前" }).element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_input")).toBe(true);
  });

  test("利用者の props を input へ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <InputRoot
        name="email"
        type="email"
        required
        placeholder="taro@example.com"
        autoComplete="email"
        defaultValue="taro@example.com"
        aria-label="メールアドレス"
      />,
    );

    // 検証
    const root = screen
      .getByRole("textbox", { name: "メールアドレス" })
      .element() as HTMLInputElement;
    expect(root.type).toBe("email");
    expect(root.name).toBe("email");
    expect(root.value).toBe("taro@example.com");
    expect(root.placeholder).toBe("taro@example.com");
    expect(root.getAttribute("autocomplete")).toBe("email");
    expect(root.required).toBe(true);
  });

  test("無効時は状態クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<InputRoot disabled aria-label="名前" />);

    // 検証
    const root = screen.getByRole("textbox", { name: "名前" }).element();
    expect(root.classList.contains("sui_input-disabled")).toBe(true);
  });

  test("Field の検証状態をクラスへ反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <FieldRoot invalid>
          <InputRoot aria-label="不正" />
        </FieldRoot>
        <FieldRoot>
          <InputRoot aria-label="未検証" />
        </FieldRoot>
      </>,
    );

    // 検証
    const invalid = screen.getByRole("textbox", { name: "不正" }).element();
    expect(invalid.classList.contains("sui_input-invalid")).toBe(true);
    const unverified = screen.getByRole("textbox", { name: "未検証" }).element();
    expect(unverified.classList.contains("sui_input-unverified")).toBe(true);
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<InputRoot render={<textarea />} aria-label="名前" />);

    // 検証
    const root = screen.getByRole("textbox", { name: "名前" }).element();
    expect(root.tagName).toBe("TEXTAREA");
    expect(root.classList.contains("sui_input")).toBe(true);
  });
});
