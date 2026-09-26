import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { useHoverCardContext } from "../../../src/hover-card/hover-card.context.js";
import { HoverCard } from "../../../src/hover-card/hover-card.jsx";
import { HoverCardRoot } from "../../../src/hover-card/hover-card.root.jsx";
import "../_locators.js";

type Member = {
  name: string;
};

describe("HoverCardRoot", () => {
  test("自身の見た目を持つ要素を表示しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <HoverCardRoot>
        <span>内容</span>
      </HoverCardRoot>,
    );

    // 検証
    expect(screen.getByText("内容").query()?.textContent).toBe("内容");
    expect(screen.getByClassName("sui_hover_card_portal").query()).toBe(null);
  });

  test("大きさと角丸と枠線を子パーツへ伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useHoverCardContext();

      return <span>{`${ctx.size}/${ctx.radius}/${ctx.outlined}`}</span>;
    }

    // 実行
    const screen = await render(
      <HoverCardRoot size="lg" radius="sm" outlined>
        <Probe />
      </HoverCardRoot>,
    );

    // 検証
    expect(screen.getByText("lg/sm/true").query()?.textContent).toBe("lg/sm/true");
  });

  test("角丸の既定値は大きさにする", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useHoverCardContext();

      return <span>{ctx.radius}</span>;
    }

    // 実行
    const screen = await render(
      <HoverCardRoot size="sm">
        <Probe />
      </HoverCardRoot>,
    );

    // 検証
    expect(screen.getByText("sm").query()?.textContent).toBe("sm");
  });
});

describe("HoverCard", () => {
  test("閉じているときは内容を表示しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <HoverCard trigger={<a href="#terms">利用規約</a>}>利用規約の概要</HoverCard>,
    );

    // 検証
    expect(screen.getByText("利用規約").query()?.textContent).toBe("利用規約");
    expect(screen.getByText("利用規約の概要").query()).toBe(null);
  });

  test("既定で開いた状態では内容を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <HoverCard defaultOpen trigger={<a href="#terms">利用規約</a>}>
        利用規約の概要
      </HoverCard>,
    );

    // 検証
    const content = screen.getByClassName("sui_hover_card_content").element();
    expect(content.textContent).toBe("利用規約の概要");
  });

  test("トリガーを関連付けて payload を内容へ渡す", async ({ expect }) => {
    // 準備
    const handle = HoverCard.createHandle<Member>();

    // 実行
    const screen = await render(
      <>
        <HoverCard.Trigger handle={handle} delay={0} payload={{ name: "田中" }}>
          {(props) => (
            <a href="#member" {...props}>
              作成者
            </a>
          )}
        </HoverCard.Trigger>
        <HoverCard handle={handle}>
          {({ payload }) => <span>{payload?.name ?? "なし"}</span>}
        </HoverCard>
      </>,
    );
    await screen.getByText("作成者").hover();

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByText("田中").query()?.textContent).toBe("田中");
    });
  });

  test("内容用の props をポップアップへ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <HoverCard
        className="custom-content"
        data-testid="card"
        defaultOpen
        trigger={<a href="#terms">開く</a>}
      >
        内容
      </HoverCard>,
    );

    // 検証
    const content = screen.getByClassName("sui_hover_card_content").element();
    expect(content.classList.contains("custom-content")).toBe(true);
    expect(content.dataset["testid"]).toBe("card");
  });
});
