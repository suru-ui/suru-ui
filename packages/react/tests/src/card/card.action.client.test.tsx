import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { CardAction } from "../../../src/card/card.action.jsx";
import "../_locators.js";

describe("CardAction", () => {
  test("操作要素として描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CardAction>
        <button type="button">設定</button>
      </CardAction>,
    );

    // 検証
    expect(screen.getByClassName("sui_card_action").element().tagName).toBe("DIV");
    expect(screen.getByRole("button", { name: "設定" }).query()).not.toBe(null);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CardAction className="custom" />);

    // 検証
    const action = screen.getByClassName("sui_card_action").element();
    expect(action.classList.contains("custom")).toBe(true);
    expect(action.classList.contains("sui_card_action")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CardAction render={<aside />} />);

    // 検証
    expect(screen.getByClassName("sui_card_action").element().tagName).toBe("ASIDE");
  });
});
