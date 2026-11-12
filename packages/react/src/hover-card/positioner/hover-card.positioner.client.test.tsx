import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { HoverCardPopup } from "../popup/hover-card.popup.jsx";
import { HoverCardPortal } from "../portal/hover-card.portal.jsx";
import { HoverCardRoot } from "../root/hover-card.root.jsx";
import { HoverCardPositioner } from "./hover-card.positioner.jsx";
import "../../../tests/src/_locators.js";

describe("HoverCardPositioner", () => {
  test("配置コンテナーを描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <HoverCardRoot defaultOpen>
        <HoverCardPortal>
          <HoverCardPositioner>
            <HoverCardPopup>内容</HoverCardPopup>
          </HoverCardPositioner>
        </HoverCardPortal>
      </HoverCardRoot>,
    );

    // 検証。
    const positioner = screen.getByClassName("sui_hover_card_positioner").element();
    expect(positioner.tagName).toBe("DIV");
    expect(positioner.classList.contains("sui_hover_card_positioner")).toBe(true);
  });

  test("render の関数へルートの状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <HoverCardRoot size="lg" radius="sm" outlined defaultOpen>
        <HoverCardPortal>
          <HoverCardPositioner
            render={(props, state) => (
              <div {...props} data-probe={`${state.size}/${state.radius}/${state.outlined}`} />
            )}
          >
            <HoverCardPopup>内容</HoverCardPopup>
          </HoverCardPositioner>
        </HoverCardPortal>
      </HoverCardRoot>,
    );

    // 検証。
    const positioner = screen.getByClassName("sui_hover_card_positioner").element();
    expect(positioner.getAttribute("data-probe")).toBe("lg/sm/true");
  });
});
