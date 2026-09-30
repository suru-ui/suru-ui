import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { HoverCardArrow } from "../../../src/hover-card/hover-card.arrow.jsx";
import { HoverCardContent } from "../../../src/hover-card/hover-card.content.jsx";
import { HoverCard } from "../../../src/hover-card/hover-card.jsx";
import { HoverCardPortal } from "../../../src/hover-card/hover-card.portal.jsx";
import { HoverCardPositioner } from "../../../src/hover-card/hover-card.positioner.jsx";
import { HoverCardRoot } from "../../../src/hover-card/hover-card.root.jsx";
import "../_locators.js";

describe("HoverCardArrow", () => {
  test("指定しないときは表示しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <HoverCard defaultOpen trigger={<a href="#terms">利用規約</a>}>
        内容
      </HoverCard>,
    );

    // 検証
    expect(screen.getByClassName("sui_hover_card_arrow").query()).toBe(null);
  });

  test("有効にすると矢印を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <HoverCard defaultOpen arrow trigger={<a href="#terms">利用規約</a>}>
        内容
      </HoverCard>,
    );

    // 検証
    const arrow = screen.getByClassName("sui_hover_card_arrow").element();
    expect(arrow.tagName).toBe("DIV");
  });

  test("配置された側のクラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <HoverCard
        defaultOpen
        arrow
        trigger={<a href="#terms">利用規約</a>}
        slotProps={{ positioner: { side: "right", sideOffset: 8 } }}
      >
        内容
      </HoverCard>,
    );

    // 検証
    const arrow = screen.getByClassName("sui_hover_card_arrow").element();
    const side = screen.getByClassName("sui_hover_card_positioner").element().dataset["side"];
    expect(arrow.classList.contains(`sui_hover_card_arrow-side_${side}`)).toBe(true);
  });

  test("直接組み立てても表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <HoverCardRoot defaultOpen>
        <HoverCardPortal>
          <HoverCardPositioner>
            <HoverCardContent>
              <HoverCardArrow id="arrow" />
              内容
            </HoverCardContent>
          </HoverCardPositioner>
        </HoverCardPortal>
      </HoverCardRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_hover_card_arrow").element().id).toBe("arrow");
  });
});
