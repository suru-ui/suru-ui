import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "./input.parts.js";
import { Input, InputAPI, useInputAPI } from "./input.jsx";
import "../../tests/src/_locators.js";

describe("InputAPI", () => {
  test("getRootProps は渡した props を返す", ({ expect }) => {
    // 準備。
    const props = {
      size: "lg",
      color: "blue",
      outlined: true,
      "aria-label": "名前",
    } as const;

    // 実行。
    const api = new InputAPI(props);

    // 検証。
    expect(api.getRootProps()).toStrictEqual(props);
  });
});

describe("useInputAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備。
    function Probe() {
      const api = useInputAPI({
        size: "sm",
        variant: "naked",
      });
      const { size, variant } = api.getRootProps();

      return <span>{`${size}/${variant}`}</span>;
    }

    // 実行。
    const screen = await render(<Probe />);

    // 検証。
    expect(screen.getByText("sm/naked").query()?.textContent).toBe("sm/naked");
  });
});

describe("Input", () => {
  test("テキスト入力欄と修飾クラスを描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Input size="lg" color="blue" aria-label="名前" />);

    // 検証。
    const root = screen.getByRole("textbox", { name: "名前" }).element();
    expect(root.tagName).toBe("INPUT");
    expect(root.classList.contains("sui_input")).toBe(true);
    expect(root.classList.contains("sui_input-size_lg")).toBe(true);
    expect(root.classList.contains("sui_input-color_blue")).toBe(true);
  });

  test("利用者の props をルートへ渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Input placeholder="田中 太郎" aria-label="名前" />);

    // 検証。
    const root = screen.getByRole("textbox", { name: "名前" }).element();
    expect(root.getAttribute("placeholder")).toBe("田中 太郎");
  });
});
