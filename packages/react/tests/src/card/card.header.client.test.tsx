import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { CardHeader } from "../../../src/card/card.header.jsx";
import "../_locators.js";

describe("CardHeader", () => {
  test("ヘッダーとして描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CardHeader>見出し</CardHeader>);

    // 検証
    const header = screen.getByClassName("sui_card_header").element();
    expect(header.tagName).toBe("DIV");
    expect(header.textContent).toBe("見出し");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CardHeader className="custom" />);

    // 検証
    const header = screen.getByClassName("sui_card_header").element();
    expect(header.classList.contains("custom")).toBe(true);
    expect(header.classList.contains("sui_card_header")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CardHeader render={<header />} />);

    // 検証
    expect(screen.getByClassName("sui_card_header").element().tagName).toBe("HEADER");
  });
});
