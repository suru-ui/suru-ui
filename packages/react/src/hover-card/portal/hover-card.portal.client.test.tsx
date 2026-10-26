import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../errors.js";
import { HoverCard } from "../hover-card.jsx";
import { HoverCardPopup } from "../popup/hover-card.popup.jsx";
import { HoverCardPositioner } from "../positioner/hover-card.positioner.jsx";
import { HoverCardRoot } from "../root/hover-card.root.jsx";
import { HoverCardPortal } from "./hover-card.portal.jsx";
import "../../../tests/src/_locators.js";

describe("HoverCardPortal", () => {
  test("ポータル要素として描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <HoverCard trigger={<a href="#terms">利用規約</a>} defaultOpen>
        内容
      </HoverCard>,
    );

    // 検証
    const portal = screen.getByClassName("sui_hover_card_portal").element();
    expect(portal.tagName).toBe("DIV");
    expect(portal.getAttribute("data-scope")).toBe("");
  });

  test("大きさと角丸と枠線をクラスにする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <HoverCard size="lg" radius="sm" trigger={<a href="#terms">利用規約</a>} outlined defaultOpen>
        内容
      </HoverCard>,
    );

    // 検証
    const portal = screen.getByClassName("sui_hover_card_portal").element();
    expect(portal.classList.contains("sui_hover_card_portal-size_lg")).toBe(true);
    expect(portal.classList.contains("sui_hover_card_portal-radius_sm")).toBe(true);
    expect(portal.classList.contains("sui_hover_card_portal-outlined")).toBe(true);
  });

  test("render の関数へルートの状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <HoverCardRoot size="lg" radius="sm" outlined defaultOpen>
        <HoverCardPortal
          render={(props, state) => (
            <div {...props} data-probe={`${state.size}/${state.radius}/${state.outlined}`} />
          )}
        >
          <HoverCardPositioner>
            <HoverCardPopup>内容</HoverCardPopup>
          </HoverCardPositioner>
        </HoverCardPortal>
      </HoverCardRoot>,
    );

    // 検証
    const portal = screen.getByClassName("sui_hover_card_portal").element();
    expect(portal.tagName).toBe("DIV");
    expect(portal.getAttribute("data-probe")).toBe("lg/sm/true");
  });

  test("Root の外ではエラーを投げる", async ({ expect }) => {
    // 実行と検証
    await expect(render(<HoverCardPortal />)).rejects.toThrow(ContextMissingError);
  });
});
