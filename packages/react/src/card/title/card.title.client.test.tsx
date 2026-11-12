import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { CardHeader } from "../header/card.header.jsx";
import { CardRoot } from "../root/card.root.jsx";
import { CardTitle } from "./card.title.jsx";
import "../../../tests/src/_locators.js";

describe("CardTitle", () => {
  test("タイトルとして描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <CardRoot>
        <CardTitle>定期レポート</CardTitle>
      </CardRoot>,
    );

    // 検証。
    const title = screen.getByClassName("sui_card_title").element();
    expect(title.tagName).toBe("DIV");
    expect(title.textContent).toBe("定期レポート");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <CardRoot>
        <CardTitle className="custom" />
      </CardRoot>,
    );

    // 検証。
    const title = screen.getByClassName("sui_card_title").element();
    expect(title.classList.contains("custom")).toBe(true);
    expect(title.classList.contains("sui_card_title")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <CardRoot>
        <CardTitle render={<h3>定期レポート</h3>} />
      </CardRoot>,
    );

    // 検証。
    expect(screen.getByClassName("sui_card_title").element().tagName).toBe("H3");
  });

  test("render の関数へ親パーツの状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <CardRoot size="lg" radius="sm" outlined>
        <CardHeader>
          <CardTitle
            render={(props, state) => (
              <div {...props} data-probe={`${state.size}/${state.radius}/${state.outlined}`} />
            )}
          />
        </CardHeader>
      </CardRoot>,
    );

    // 検証。
    expect(screen.getByClassName("sui_card_title").element().getAttribute("data-probe")).toBe(
      "lg/sm/true",
    );
  });
});
