import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "./textarea.parts.js";
import { Textarea, TextareaAPI, useTextareaAPI } from "./textarea.jsx";
import "../../tests/src/_locators.js";

describe("TextareaAPI", () => {
  test("getRootProps は渡した props を返す", ({ expect }) => {
    // 準備
    const props = {
      rows: 4,
      size: "lg",
      color: "blue",
      outlined: true,
      "aria-label": "問い合わせ内容",
    } as const;

    // 実行
    const api = new TextareaAPI(props);

    // 検証
    expect(api.getRootProps()).toStrictEqual(props);
  });
});

describe("useTextareaAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useTextareaAPI({ rows: 4, size: "sm", variant: "naked" });
      const { rows, size, variant } = api.getRootProps();

      return <span>{`${size}/${variant}/${rows}`}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("sm/naked/4").query()?.textContent).toBe("sm/naked/4");
  });
});

describe("Textarea", () => {
  test("複数行の入力欄と修飾クラスを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Textarea size="lg" color="blue" aria-label="問い合わせ内容" />);

    // 検証
    const root = screen.getByRole("textbox", { name: "問い合わせ内容" }).element();
    expect(root.tagName).toBe("TEXTAREA");
    expect(root.classList.contains("sui_textarea")).toBe(true);
    expect(root.classList.contains("sui_textarea-size_lg")).toBe(true);
    expect(root.classList.contains("sui_textarea-color_blue")).toBe(true);
  });

  test("利用者の props を入力欄へ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Textarea rows={4} placeholder="入力してください" aria-label="問い合わせ内容" />,
    );

    // 検証
    const root = screen
      .getByRole("textbox", { name: "問い合わせ内容" })
      .element() as HTMLTextAreaElement;
    expect(root.placeholder).toBe("入力してください");
    expect(root.rows).toBe(4);
  });
});
