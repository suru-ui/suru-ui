import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { CardDescription } from "../../../src/card/card.description.jsx";
import "../_locators.js";

describe("CardDescription", () => {
  test("説明として描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CardDescription>毎週のスナップショットを共有します。</CardDescription>,
    );

    // 検証
    const description = screen.getByClassName("sui_card_description").element();
    expect(description.tagName).toBe("DIV");
    expect(description.textContent).toBe("毎週のスナップショットを共有します。");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CardDescription className="custom" />);

    // 検証
    const description = screen.getByClassName("sui_card_description").element();
    expect(description.classList.contains("custom")).toBe(true);
    expect(description.classList.contains("sui_card_description")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CardDescription render={<p />} />);

    // 検証
    expect(screen.getByClassName("sui_card_description").element().tagName).toBe("P");
  });
});
