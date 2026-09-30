import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/avatar/avatar.parts.js";
import { AvatarFallback } from "../../../src/avatar/avatar.fallback.jsx";
import { AvatarRoot } from "../../../src/avatar/avatar.root.jsx";
import "../_locators.js";

describe("AvatarFallback", () => {
  test("内容と修飾クラスを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AvatarRoot>
        <AvatarFallback>名</AvatarFallback>
      </AvatarRoot>,
    );

    // 検証
    const fallback = screen.getByClassName("sui_avatar_fallback").element();
    expect(fallback.tagName).toBe("SPAN");
    expect(fallback.classList.contains("sui_avatar_fallback")).toBe(true);
    expect(fallback.textContent).toBe("名");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AvatarRoot>
        <AvatarFallback className="custom">名</AvatarFallback>
      </AvatarRoot>,
    );

    // 検証
    const fallback = screen.getByClassName("sui_avatar_fallback").element();
    expect(fallback.classList.contains("custom")).toBe(true);
    expect(fallback.classList.contains("sui_avatar_fallback")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AvatarRoot>
        <AvatarFallback render={<div />}>名</AvatarFallback>
      </AvatarRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_avatar_fallback").element().tagName).toBe("DIV");
  });
});
