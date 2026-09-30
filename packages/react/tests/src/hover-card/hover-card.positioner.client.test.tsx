import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { HoverCardContent } from "../../../src/hover-card/hover-card.content.jsx";
import { HoverCard } from "../../../src/hover-card/hover-card.jsx";
import { HoverCardPortal } from "../../../src/hover-card/hover-card.portal.jsx";
import { HoverCardPositioner } from "../../../src/hover-card/hover-card.positioner.jsx";
import { HoverCardRoot } from "../../../src/hover-card/hover-card.root.jsx";
import "../_locators.js";

const trigger = <a href="#terms">利用規約</a>;

/**
 * トリガーの上に十分な空間を作り、上側への配置を検証できるようにします。
 */
function renderPlaced(card: React.ReactNode) {
  return render(<div style={{ paddingBlockStart: "300px" }}>{card}</div>);
}

describe("HoverCardPositioner", () => {
  test("既定ではトリガーの下へ配置する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderPlaced(
      <HoverCard defaultOpen trigger={trigger}>
        内容
      </HoverCard>,
    );

    // 検証
    await vi.waitFor(() => {
      const content = screen
        .getByClassName("sui_hover_card_content")
        .element()
        .getBoundingClientRect();
      const anchor = screen
        .getByRole("link", { name: "利用規約" })
        .element()
        .getBoundingClientRect();
      expect(Math.abs(content.top - anchor.bottom)).toBeLessThanOrEqual(1);
    });
  });

  test("指定した側へ配置する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderPlaced(
      <HoverCard
        defaultOpen
        trigger={trigger}
        slotProps={{ positioner: { side: "top", sideOffset: 8 } }}
      >
        内容
      </HoverCard>,
    );

    // 検証
    await vi.waitFor(() => {
      const content = screen
        .getByClassName("sui_hover_card_content")
        .element()
        .getBoundingClientRect();
      const anchor = screen
        .getByRole("link", { name: "利用規約" })
        .element()
        .getBoundingClientRect();
      expect(Math.abs(anchor.top - content.bottom - 8)).toBeLessThanOrEqual(1);
    });
    expect(screen.getByClassName("sui_hover_card_positioner").element().dataset["side"]).toBe(
      "top",
    );
  });

  test("配置コンテナーを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <HoverCardRoot defaultOpen>
        <HoverCardPortal>
          <HoverCardPositioner>
            <HoverCardContent>内容</HoverCardContent>
          </HoverCardPositioner>
        </HoverCardPortal>
      </HoverCardRoot>,
    );

    // 検証
    const positioner = screen.getByClassName("sui_hover_card_positioner").element();
    expect(positioner.tagName).toBe("DIV");
    expect(positioner.classList.contains("sui_hover_card_positioner")).toBe(true);
  });

  test("render の関数へルートの状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <HoverCardRoot defaultOpen size="lg" radius="sm" outlined>
        <HoverCardPortal>
          <HoverCardPositioner
            render={(props, state) => (
              <div {...props} data-probe={`${state.size}/${state.radius}/${state.outlined}`} />
            )}
          >
            <HoverCardContent>内容</HoverCardContent>
          </HoverCardPositioner>
        </HoverCardPortal>
      </HoverCardRoot>,
    );

    // 検証
    const positioner = screen.getByClassName("sui_hover_card_positioner").element();
    expect(positioner.getAttribute("data-probe")).toBe("lg/sm/true");
  });
});
