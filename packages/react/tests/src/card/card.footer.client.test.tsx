import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { CardFooter } from "../../../src/card/card.footer.jsx";
import "../_locators.js";

describe("CardFooter", () => {
  test("フッターとして描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CardFooter>
        <button type="button">保存</button>
      </CardFooter>,
    );

    // 検証
    expect(screen.getByClassName("sui_card_footer").element().tagName).toBe("DIV");
    expect(screen.getByRole("button", { name: "保存" }).query()).not.toBe(null);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CardFooter className="custom" />);

    // 検証
    const footer = screen.getByClassName("sui_card_footer").element();
    expect(footer.classList.contains("custom")).toBe(true);
    expect(footer.classList.contains("sui_card_footer")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CardFooter render={<footer />} />);

    // 検証
    expect(screen.getByClassName("sui_card_footer").element().tagName).toBe("FOOTER");
  });
});
