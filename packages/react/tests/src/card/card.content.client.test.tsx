import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { CardContent } from "../../../src/card/card.content.jsx";
import { CardRoot } from "../../../src/card/card.root.jsx";
import "../_locators.js";

describe("CardContent", () => {
  test("本文として描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CardRoot>
        <CardContent>本文です。</CardContent>
      </CardRoot>,
    );

    // 検証
    const content = screen.getByClassName("sui_card_content").element();
    expect(content.tagName).toBe("DIV");
    expect(content.textContent).toBe("本文です。");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CardRoot>
        <CardContent className="custom">本文</CardContent>
      </CardRoot>,
    );

    // 検証
    const content = screen.getByClassName("sui_card_content").element();
    expect(content.classList.contains("custom")).toBe(true);
    expect(content.classList.contains("sui_card_content")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CardRoot>
        <CardContent render={<p />}>本文</CardContent>
      </CardRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_card_content").element().tagName).toBe("P");
  });

  test("render の関数へルートの状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CardRoot size="lg" radius="sm" outlined>
        <CardContent
          render={(props, state) => (
            <div {...props} data-probe={`${state.size}/${state.radius}/${state.outlined}`} />
          )}
        />
      </CardRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_card_content").element().getAttribute("data-probe")).toBe(
      "lg/sm/true",
    );
  });
});
