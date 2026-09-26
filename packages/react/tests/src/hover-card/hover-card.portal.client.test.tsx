import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../../src/errors.js";
import { HoverCard } from "../../../src/hover-card/hover-card.jsx";
import { HoverCardPortal } from "../../../src/hover-card/hover-card.portal.jsx";
import "../_locators.js";

describe("HoverCardPortal", () => {
  test("ポップアップを別の場所へ配置する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <HoverCard defaultOpen trigger={<a href="#terms">利用規約</a>}>
        内容
      </HoverCard>,
    );

    // 検証
    const portal = screen.getByClassName("sui_hover_card_portal").element();
    expect(portal.tagName).toBe("DIV");
    expect(portal.getAttribute("data-scope")).toBe("");
    expect(screen.container.contains(portal)).toBe(false);
  });

  test("大きさと角丸と枠線をクラスにする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <HoverCard defaultOpen size="lg" radius="sm" outlined trigger={<a href="#terms">利用規約</a>}>
        内容
      </HoverCard>,
    );

    // 検証
    const portal = screen.getByClassName("sui_hover_card_portal").element();
    expect(portal.classList.contains("sui_hover_card_portal-size_lg")).toBe(true);
    expect(portal.classList.contains("sui_hover_card_portal-radius_sm")).toBe(true);
    expect(portal.classList.contains("sui_hover_card_portal-outlined")).toBe(true);
  });

  test("Root の外ではエラーを投げる", async ({ expect }) => {
    // 実行と検証
    await expect(render(<HoverCardPortal />)).rejects.toThrow(ContextMissingError);
  });
});
