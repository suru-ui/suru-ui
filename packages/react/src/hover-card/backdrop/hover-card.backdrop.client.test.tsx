import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { HoverCardContent } from "../content/hover-card.content.jsx";
import { HoverCard } from "../hover-card.jsx";
import { HoverCardPortal } from "../portal/hover-card.portal.jsx";
import { HoverCardPositioner } from "../positioner/hover-card.positioner.jsx";
import { HoverCardRoot } from "../root/hover-card.root.jsx";
import { HoverCardBackdrop } from "./hover-card.backdrop.jsx";
import "../../../tests/src/_locators.js";

describe("HoverCardBackdrop", () => {
  test("指定しないときは表示しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <HoverCard trigger={<a href="#terms">利用規約</a>} defaultOpen>
        内容
      </HoverCard>,
    );

    // 検証
    expect(screen.getByClassName("sui_hover_card_backdrop").query()).toBe(null);
  });

  test("指定するとオーバーレイを表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <HoverCard trigger={<a href="#terms">利用規約</a>} backdrop defaultOpen>
        内容
      </HoverCard>,
    );

    // 検証
    const backdrop = screen.getByClassName("sui_hover_card_backdrop").element();
    expect(backdrop.tagName).toBe("DIV");
  });

  test("直接組み立てても表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <HoverCardRoot defaultOpen>
        <HoverCardPortal>
          <HoverCardBackdrop id="backdrop" />
          <HoverCardPositioner>
            <HoverCardContent>内容</HoverCardContent>
          </HoverCardPositioner>
        </HoverCardPortal>
      </HoverCardRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_hover_card_backdrop").element().id).toBe("backdrop");
  });
});
