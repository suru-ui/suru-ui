import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { HoverCardContent } from "../../../src/hover-card/content/hover-card.content.jsx";
import { HoverCardPortal } from "../../../src/hover-card/portal/hover-card.portal.jsx";
import { HoverCardPositioner } from "../../../src/hover-card/positioner/hover-card.positioner.jsx";
import { HoverCardRoot } from "../../../src/hover-card/root/hover-card.root.jsx";
import "../_locators.js";

describe("HoverCardPositioner", () => {
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
