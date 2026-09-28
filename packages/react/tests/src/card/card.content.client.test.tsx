import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { CardContent } from "../../../src/card/card.content.jsx";
import "../_locators.js";

describe("CardContent", () => {
  test("本文として描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CardContent>本文です。</CardContent>);

    // 検証
    const content = screen.getByClassName("sui_card_content").element();
    expect(content.tagName).toBe("DIV");
    expect(content.textContent).toBe("本文です。");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CardContent className="custom">本文</CardContent>);

    // 検証
    const content = screen.getByClassName("sui_card_content").element();
    expect(content.classList.contains("custom")).toBe(true);
    expect(content.classList.contains("sui_card_content")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CardContent render={<p />}>本文</CardContent>);

    // 検証
    expect(screen.getByClassName("sui_card_content").element().tagName).toBe("P");
  });
});
