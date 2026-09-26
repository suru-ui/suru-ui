import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { HoverCardContent } from "../../../src/hover-card/hover-card.content.jsx";
import { HoverCardPortal } from "../../../src/hover-card/hover-card.portal.jsx";
import { HoverCardPositioner } from "../../../src/hover-card/hover-card.positioner.jsx";
import { HoverCardRoot } from "../../../src/hover-card/hover-card.root.jsx";
import { HoverCardTrigger } from "../../../src/hover-card/hover-card.trigger.jsx";
import "../_locators.js";

/**
 * 開いた状態を検証できるよう、ホバーカードのパーツを直接組み立てます。
 */
function renderCard(trigger: React.ReactNode) {
  return render(
    <HoverCardRoot>
      {trigger}
      <HoverCardPortal>
        <HoverCardPositioner>
          <HoverCardContent>内容</HoverCardContent>
        </HoverCardPositioner>
      </HoverCardPortal>
    </HoverCardRoot>,
  );
}

describe("HoverCardTrigger", () => {
  test("指定した要素をそのまま描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderCard(
      <HoverCardTrigger>
        {(props) => (
          <a href="#terms" {...props}>
            利用規約
          </a>
        )}
      </HoverCardTrigger>,
    );

    // 検証
    const trigger = screen.getByRole("link", { name: "利用規約" }).element();
    expect(trigger.tagName).toBe("A");
    expect(trigger.getAttribute("href")).toBe("#terms");
    expect(trigger.classList.contains("sui_hover_card_trigger")).toBe(true);
  });

  test("要素を直接指定して描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderCard(
      <HoverCardTrigger>
        <a href="#help">ヘルプ</a>
      </HoverCardTrigger>,
    );

    // 検証
    const trigger = screen.getByRole("link", { name: "ヘルプ" }).element();
    expect(trigger.getAttribute("href")).toBe("#help");
  });

  test("ホバーでホバーカードを開く", async ({ expect }) => {
    // 準備と実行
    const screen = await renderCard(
      <HoverCardTrigger delay={0}>
        {(props) => (
          <a href="#terms" {...props}>
            利用規約
          </a>
        )}
      </HoverCardTrigger>,
    );
    await screen.getByRole("link", { name: "利用規約" }).hover();

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByText("内容").query()?.textContent).toBe("内容");
    });
  });
});
