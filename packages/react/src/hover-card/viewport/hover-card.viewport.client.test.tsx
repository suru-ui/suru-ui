import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { HoverCardPopup } from "../popup/hover-card.popup.jsx";
import { HoverCardPortal } from "../portal/hover-card.portal.jsx";
import { HoverCardPositioner } from "../positioner/hover-card.positioner.jsx";
import { HoverCardRoot } from "../root/hover-card.root.jsx";
import { HoverCardViewport } from "./hover-card.viewport.jsx";
import "../hover-card.parts.js";
import "../../../tests/src/_locators.js";

/**
 * ビューポートはポップアップ内でのみ使うため、必要なパーツを直接組み立てます。
 */
function renderCard() {
  return render(
    <HoverCardRoot defaultOpen>
      <HoverCardPortal>
        <HoverCardPositioner>
          <HoverCardPopup>
            <HoverCardViewport>内容</HoverCardViewport>
          </HoverCardPopup>
        </HoverCardPositioner>
      </HoverCardPortal>
    </HoverCardRoot>,
  );
}

describe("HoverCardViewport", () => {
  test("内容の切り替え領域を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderCard();

    // 検証
    const viewport = screen.getByClassName("sui_hover_card_viewport").element();
    expect(viewport.tagName).toBe("DIV");
    expect(viewport.textContent).toBe("内容");
  });

  test("内容を縦に並べる", async ({ expect }) => {
    // 準備と実行
    const screen = await renderCard();

    // 検証
    const style = getComputedStyle(screen.getByClassName("sui_hover_card_viewport").element());
    expect(style.display).toBe("flex");
    expect(style.flexDirection).toBe("column");
  });
});
