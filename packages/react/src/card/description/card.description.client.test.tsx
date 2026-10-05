import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { CardHeader } from "../header/card.header.jsx";
import { CardRoot } from "../root/card.root.jsx";
import { CardDescription } from "./card.description.jsx";
import "../../../tests/src/_locators.js";

describe("CardDescription", () => {
  test("説明として描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CardRoot>
        <CardDescription>毎週のスナップショットを共有します。</CardDescription>
      </CardRoot>,
    );

    // 検証
    const description = screen.getByClassName("sui_card_description").element();
    expect(description.tagName).toBe("DIV");
    expect(description.textContent).toBe("毎週のスナップショットを共有します。");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CardRoot>
        <CardDescription className="custom" />
      </CardRoot>,
    );

    // 検証
    const description = screen.getByClassName("sui_card_description").element();
    expect(description.classList.contains("custom")).toBe(true);
    expect(description.classList.contains("sui_card_description")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CardRoot>
        <CardDescription render={<p />} />
      </CardRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_card_description").element().tagName).toBe("P");
  });

  test("render の関数へ親パーツの状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CardRoot size="lg" radius="sm" outlined>
        <CardHeader>
          <CardDescription
            render={(props, state) => (
              <div {...props} data-probe={`${state.size}/${state.radius}/${state.outlined}`} />
            )}
          />
        </CardHeader>
      </CardRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_card_description").element().getAttribute("data-probe")).toBe(
      "lg/sm/true",
    );
  });
});
