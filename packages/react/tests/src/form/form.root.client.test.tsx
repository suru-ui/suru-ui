import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/form/form.parts.js";
import { FormRoot } from "../../../src/form/form.root.jsx";
import "../_locators.js";

describe("FormRoot", () => {
  test("フォーム要素を基底クラスとスコープの始点付きで描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FormRoot />);

    // 検証
    const root = screen.getByClassName("sui_form").element();
    expect(root.tagName).toBe("FORM");
    expect(root.getAttribute("data-scope")).toBe("");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FormRoot className="custom" />);

    // 検証
    const root = screen.getByClassName("sui_form").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_form")).toBe(true);
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FormRoot render={<section />} />);

    // 検証
    const root = screen.getByClassName("sui_form").element();
    expect(root.tagName).toBe("SECTION");
    expect(root.getAttribute("data-scope")).toBe("");
  });

  test("HTML 属性とアクセシブルな名前を引き継ぐ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FormRoot aria-label="お問い合わせ" method="post" />);

    // 検証
    const root = screen.getByRole("form", { name: "お問い合わせ" }).element();
    expect(root.getAttribute("method")).toBe("post");
  });

  test("子要素を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FormRoot>
        <span>内容</span>
      </FormRoot>,
    );

    // 検証
    expect(screen.getByText("内容").query()).not.toBe(null);
  });
});
