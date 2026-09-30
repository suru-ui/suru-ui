import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { HoverCardContent } from "../../../src/hover-card/hover-card.content.jsx";
import { HoverCard } from "../../../src/hover-card/hover-card.jsx";
import { HoverCardPortal } from "../../../src/hover-card/hover-card.portal.jsx";
import { HoverCardPositioner } from "../../../src/hover-card/hover-card.positioner.jsx";
import { HoverCardRoot } from "../../../src/hover-card/hover-card.root.jsx";
import "../_locators.js";

describe("HoverCardContent", () => {
  test("内容を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <HoverCard defaultOpen trigger={<a href="#terms">利用規約</a>}>
        利用規約の概要
      </HoverCard>,
    );

    // 検証
    const content = screen.getByClassName("sui_hover_card_content").element();
    expect(content.tagName).toBe("DIV");
    expect(content.textContent).toBe("利用規約の概要");
  });

  test("指定したクラスを加える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <HoverCard defaultOpen className="custom-content" trigger={<a href="#terms">利用規約</a>}>
        内容
      </HoverCard>,
    );

    // 検証
    const content = screen.getByClassName("sui_hover_card_content").element();
    expect(content.classList.contains("custom-content")).toBe(true);
  });

  test("描画する要素を差し替える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <HoverCard
        defaultOpen
        render={<section data-testid="section" />}
        trigger={<a href="#terms">利用規約</a>}
      >
        内容
      </HoverCard>,
    );

    // 検証
    const content = screen.getByClassName("sui_hover_card_content").element();
    expect(content.tagName).toBe("SECTION");
    expect(content.textContent).toBe("内容");
  });

  test("直接組み立てても描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <HoverCardRoot defaultOpen>
        <HoverCardPortal>
          <HoverCardPositioner>
            <HoverCardContent id="content">内容</HoverCardContent>
          </HoverCardPositioner>
        </HoverCardPortal>
      </HoverCardRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_hover_card_content").element().id).toBe("content");
  });

  test("render の関数へルートと内容の状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <HoverCardRoot defaultOpen size="lg" radius="sm" outlined>
        <HoverCardPortal>
          <HoverCardPositioner>
            <HoverCardContent
              render={(props, state) => (
                <div
                  {...props}
                  data-probe={`${state.size}/${state.radius}/${state.outlined}/${String(state.open)}`}
                />
              )}
            >
              内容
            </HoverCardContent>
          </HoverCardPositioner>
        </HoverCardPortal>
      </HoverCardRoot>,
    );

    // 検証
    const content = screen.getByClassName("sui_hover_card_content").element();
    expect(content.getAttribute("data-probe")).toBe("lg/sm/true/true");
  });
});
