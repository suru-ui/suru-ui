import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { CardHeader } from "../header/card.header.jsx";
import { CardRoot } from "../root/card.root.jsx";
import { CardAction } from "./card.action.jsx";
import "../../../tests/src/_locators.js";

describe("CardAction", () => {
  test("操作要素として描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CardRoot>
        <CardAction>
          <button type="button">設定</button>
        </CardAction>
      </CardRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_card_action").element().tagName).toBe("DIV");
    expect(screen.getByRole("button", { name: "設定" }).query()).not.toBe(null);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CardRoot>
        <CardAction className="custom" />
      </CardRoot>,
    );

    // 検証
    const action = screen.getByClassName("sui_card_action").element();
    expect(action.classList.contains("custom")).toBe(true);
    expect(action.classList.contains("sui_card_action")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CardRoot>
        <CardAction render={<aside />} />
      </CardRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_card_action").element().tagName).toBe("ASIDE");
  });

  test("render の関数へ親パーツの状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CardRoot size="lg" radius="sm" outlined>
        <CardHeader>
          <CardAction
            render={(props, state) => (
              <div {...props} data-probe={`${state.size}/${state.radius}/${state.outlined}`} />
            )}
          />
        </CardHeader>
      </CardRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_card_action").element().getAttribute("data-probe")).toBe(
      "lg/sm/true",
    );
  });
});
