import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { Popover } from "../popover.jsx";
import { usePopoverContext } from "./popover.root.context.js";
import { PopoverRoot } from "./popover.root.jsx";
import "../../../tests/src/_locators.js";

describe("PopoverRoot", () => {
  test("自身の見た目を持つ要素を表示しない", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <PopoverRoot>
        <span>内容</span>
      </PopoverRoot>,
    );

    // 検証。
    expect(screen.getByText("内容").query()?.textContent).toBe("内容");
    expect(screen.getByClassName("sui_popover_portal").query()).toBe(null);
  });

  test("大きさと角丸と枠線を子パーツへ伝える", async ({ expect }) => {
    // 準備。
    function Probe() {
      const ctx = usePopoverContext();

      return <span>{`${ctx.size}/${ctx.radius}/${ctx.outlined}`}</span>;
    }

    // 実行。
    const screen = await render(
      <PopoverRoot size="lg" radius="sm" outlined>
        <Probe />
      </PopoverRoot>,
    );

    // 検証。
    expect(screen.getByText("lg/sm/true").query()?.textContent).toBe("lg/sm/true");
  });

  test("角丸の既定値は大きさにする", async ({ expect }) => {
    // 準備。
    function Probe() {
      const ctx = usePopoverContext();

      return <span>{ctx.radius}</span>;
    }

    // 実行。
    const screen = await render(
      <PopoverRoot size="sm">
        <Probe />
      </PopoverRoot>,
    );

    // 検証。
    expect(screen.getByText("sm").query()?.textContent).toBe("sm");
  });
});

describe("Popover", () => {
  test("閉じているときは内容を表示しない", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Popover trigger={<button>開く</button>}>ポップオーバーの内容</Popover>,
    );

    // 検証。
    expect(screen.getByRole("button", { name: "開く" }).query()?.textContent).toBe("開く");
    expect(screen.getByText("ポップオーバーの内容").query()).toBe(null);
  });

  test("既定で開いた状態では内容を表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Popover trigger={<button>開く</button>} defaultOpen>
        ポップオーバーの内容
      </Popover>,
    );

    // 検証。
    const content = screen.getByClassName("sui_popover_popup").element();
    expect(content.textContent).toBe("ポップオーバーの内容");
  });

  test("内容用の props をポップアップへ渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Popover
        trigger={<button>開く</button>}
        className="custom-content"
        defaultOpen
        data-testid="popover"
      >
        内容
      </Popover>,
    );

    // 検証。
    const content = screen.getByClassName("sui_popover_popup").element();
    expect(content.classList.contains("custom-content")).toBe(true);
    expect(content.dataset["testid"]).toBe("popover");
  });
});
