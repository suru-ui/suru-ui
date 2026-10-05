import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { CardRoot } from "../root/card.root.jsx";
import { CardHeader } from "./card.header.jsx";
import "../../../tests/src/_locators.js";

describe("CardHeader", () => {
  test("ヘッダーとして描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CardRoot>
        <CardHeader>見出し</CardHeader>
      </CardRoot>,
    );

    // 検証
    const header = screen.getByClassName("sui_card_header").element();
    expect(header.tagName).toBe("DIV");
    expect(header.textContent).toBe("見出し");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CardRoot>
        <CardHeader className="custom" />
      </CardRoot>,
    );

    // 検証
    const header = screen.getByClassName("sui_card_header").element();
    expect(header.classList.contains("custom")).toBe(true);
    expect(header.classList.contains("sui_card_header")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CardRoot>
        <CardHeader render={<header />} />
      </CardRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_card_header").element().tagName).toBe("HEADER");
  });

  test("render の関数へルートの状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CardRoot size="lg" radius="sm" outlined>
        <CardHeader
          render={(props, state) => (
            <div {...props} data-probe={`${state.size}/${state.radius}/${state.outlined}`} />
          )}
        />
      </CardRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_card_header").element().getAttribute("data-probe")).toBe(
      "lg/sm/true",
    );
  });
});
