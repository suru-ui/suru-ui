import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "../stat.parts.js";
import { StatRoot } from "../root/stat.root.jsx";
import { StatDescription } from "./stat.description.jsx";
import "../../../tests/src/_locators.js";

describe("StatDescription", () => {
  test("dd として説明を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <StatRoot>
        <StatDescription>先月より</StatDescription>
      </StatRoot>,
    );

    // 検証
    const description = screen.getByText("先月より").element();
    expect(description.tagName).toBe("DD");
    expect(description.textContent).toBe("先月より");
    expect(description.classList.contains("sui_stat_description")).toBe(true);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <StatRoot>
        <StatDescription className="custom">先月より</StatDescription>
      </StatRoot>,
    );

    // 検証
    const description = screen.getByText("先月より").element();
    expect(description.classList.contains("custom")).toBe(true);
    expect(description.classList.contains("sui_stat_description")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <StatRoot>
        <StatDescription render={<p />}>先月より</StatDescription>
      </StatRoot>,
    );

    // 検証
    expect(screen.getByText("先月より").element().tagName).toBe("P");
  });
});
