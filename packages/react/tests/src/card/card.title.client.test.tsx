import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { CardTitle } from "../../../src/card/card.title.jsx";
import "../_locators.js";

describe("CardTitle", () => {
  test("タイトルとして描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CardTitle>定期レポート</CardTitle>);

    // 検証
    const title = screen.getByClassName("sui_card_title").element();
    expect(title.tagName).toBe("DIV");
    expect(title.textContent).toBe("定期レポート");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CardTitle className="custom" />);

    // 検証
    const title = screen.getByClassName("sui_card_title").element();
    expect(title.classList.contains("custom")).toBe(true);
    expect(title.classList.contains("sui_card_title")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CardTitle render={<h3>定期レポート</h3>} />);

    // 検証
    expect(screen.getByClassName("sui_card_title").element().tagName).toBe("H3");
  });
});
