import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { HoverCard } from "../hover-card.jsx";
import { HoverCardPortal } from "../portal/hover-card.portal.jsx";
import { HoverCardPositioner } from "../positioner/hover-card.positioner.jsx";
import { HoverCardRoot } from "../root/hover-card.root.jsx";
import { HoverCardPopup } from "./hover-card.popup.jsx";
import "../../../tests/src/_locators.js";

describe("HoverCardPopup", () => {
  test("内容を表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <HoverCard trigger={<a href="#terms">利用規約</a>} defaultOpen>
        利用規約の概要
      </HoverCard>,
    );

    // 検証。
    const content = screen.getByClassName("sui_hover_card_popup").element();
    expect(content.tagName).toBe("DIV");
    expect(content.textContent).toBe("利用規約の概要");
  });

  test("指定したクラスを加える", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <HoverCard trigger={<a href="#terms">利用規約</a>} className="custom-content" defaultOpen>
        内容
      </HoverCard>,
    );

    // 検証。
    const content = screen.getByClassName("sui_hover_card_popup").element();
    expect(content.classList.contains("custom-content")).toBe(true);
  });

  test("描画する要素を差し替える", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <HoverCard
        render={<section data-testid="section" />}
        trigger={<a href="#terms">利用規約</a>}
        defaultOpen
      >
        内容
      </HoverCard>,
    );

    // 検証。
    const content = screen.getByClassName("sui_hover_card_popup").element();
    expect(content.tagName).toBe("SECTION");
    expect(content.textContent).toBe("内容");
  });

  test("直接組み立てても描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <HoverCardRoot defaultOpen>
        <HoverCardPortal>
          <HoverCardPositioner>
            <HoverCardPopup id="content">内容</HoverCardPopup>
          </HoverCardPositioner>
        </HoverCardPortal>
      </HoverCardRoot>,
    );

    // 検証。
    expect(screen.getByClassName("sui_hover_card_popup").element().id).toBe("content");
  });

  test("render の関数へルートと内容の状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <HoverCardRoot size="lg" radius="sm" outlined defaultOpen>
        <HoverCardPortal>
          <HoverCardPositioner>
            <HoverCardPopup
              render={(props, state) => (
                <div
                  {...props}
                  data-probe={`${state.size}/${state.radius}/${state.outlined}/${String(state.open)}`}
                />
              )}
            >
              内容
            </HoverCardPopup>
          </HoverCardPositioner>
        </HoverCardPortal>
      </HoverCardRoot>,
    );

    // 検証。
    const content = screen.getByClassName("sui_hover_card_popup").element();
    expect(content.getAttribute("data-probe")).toBe("lg/sm/true/true");
  });
});
